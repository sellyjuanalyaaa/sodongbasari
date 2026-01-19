<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

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

        Post::create([
            'title' => $validated['title'],
            'slug' => Str::slug($validated['title']) . '-' . Str::random(5),
            'category_id' => $validated['category_id'],
            'created_by' => auth()->id(),
            'content' => $validated['content'],
            'image_path' => $imagePath,
            'published_at' => now(),
        ]);

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
