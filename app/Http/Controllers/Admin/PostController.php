<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Models\Category;
use App\Models\User;
use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Inertia\Inertia;
use App\Mail\AdminNotification;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::with(['category', 'creator'])->latest()->paginate(10);
        return Inertia::render('Admin/Posts/Index', [
            'posts' => $posts
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Posts/Form', [
            'categories' => Category::all(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'content' => 'required|string',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('posts', 'public');
            $imagePath = "/storage/$path";
        }

        $post = Post::create([
            'title' => $validated['title'],
            'slug' => Str::slug($validated['title']) . '-' . Str::random(5),
            'category_id' => $validated['category_id'],
            'created_by' => auth()->id(),
            'content' => $validated['content'],
            'image_path' => $imagePath,
            'published_at' => now(),
        ]);

        // Create notification in database
        $user = auth()->user();
        Notification::create([
            'title' => 'Berita Baru Ditambahkan',
            'message' => 'Berita baru "' . $post->title . '" telah ditambahkan ke website.',
            'type' => 'success',
            'action_text' => 'Lihat Berita',
            'action_url' => route('admin.posts.index'),
            'data' => [
                'post_id' => $post->id,
                'title' => $post->title,
                'category' => Category::find($post->category_id)->name ?? '-',
                'created_by' => $user ? $user->name : 'System',
            ],
        ]);

        // Send email notification to admin
        try {
            $admin = User::first(); // Atau gunakan User::where('role', 'admin')->first();
            if ($admin && $admin->email) {
                $user = auth()->user();
                Mail::to($admin->email)->send(new AdminNotification(
                    'Berita Baru Ditambahkan',
                    'Berita baru telah ditambahkan ke website.',
                    'Lihat Berita',
                    route('admin.posts.index'),
                    [
                        'judul' => $post->title,
                        'kategori' => Category::find($post->category_id)->name ?? '-',
                        'dibuat_oleh' => $user ? $user->name : 'System',
                        'waktu' => now()->format('d M Y H:i'),
                    ]
                ));
            }
        } catch (\Exception $e) {
            // Log error tapi jangan stop proses
            Log::error('Failed to send email: ' . $e->getMessage());
        }

        return to_route('admin.posts.index')->with('success', 'Berita berhasil ditambahkan.');
    }

    public function edit(Post $post)
    {
        return Inertia::render('Admin/Posts/Form', [
            'post' => $post,
            'categories' => Category::all(),
        ]);
    }

    public function update(Request $request, Post $post)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'content' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $updateData = [
            'title' => $validated['title'],
            'category_id' => $validated['category_id'],
            'content' => $validated['content'],
        ];

        if ($request->hasFile('image')) {
            // Delete old image
            if ($post->image_path) {
                $oldPath = str_replace('/storage/', '', $post->image_path);
                Storage::disk('public')->delete($oldPath);
            }
            
            $path = $request->file('image')->store('posts', 'public');
            $updateData['image_path'] = "/storage/$path";
        }

        $post->update($updateData);

        return to_route('admin.posts.index')->with('success', 'Berita berhasil diperbarui.');
    }

    public function destroy(Post $post)
    {
        if ($post->image_path) {
            $oldPath = str_replace('/storage/', '', $post->image_path);
            Storage::disk('public')->delete($oldPath);
        }
        
        $post->delete();

        return to_route('admin.posts.index')->with('success', 'Berita berhasil dihapus.');
    }
}
