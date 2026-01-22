<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Potential;
use App\Models\PotentialCategory;
use App\Models\User;
use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Inertia\Inertia;
use App\Mail\AdminNotification;

class PotentialController extends Controller
{
    public function index()
    {
        $potentials = Potential::latest()->paginate(10);
        return Inertia::render('Admin/Potentials/Index', [
            'potentials' => $potentials
        ]);
    }

    public function create()
    {
        $categories = PotentialCategory::where('is_active', true)->orderBy('order')->get();
        return Inertia::render('Admin/Potentials/Form', [
            'categories' => $categories
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'category' => 'required|string|max:50', 
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('potentials', 'public');
            $imagePath = "/storage/$path";
        }

        $potential = Potential::create([
            'name' => $validated['name'],
            'description' => $validated['description'],
            'category' => $validated['category'],
            'image_path' => $imagePath,
            'created_by' => auth()->id(),
        ]);

        // Create notification in database
        $user = auth()->user();
        Notification::create([
            'title' => 'Potensi Desa Baru Ditambahkan',
            'message' => 'Data potensi desa "' . $potential->name . '" telah ditambahkan ke website.',
            'type' => 'success',
            'action_text' => 'Lihat Potensi',
            'action_url' => route('admin.potentials.index'),
            'data' => [
                'potential_id' => $potential->id,
                'name' => $potential->name,
                'category' => $potential->category,
                'created_by' => $user ? $user->name : 'System',
            ],
        ]);

        // Send email notification
        try {
            $admin = User::first();
            if ($admin && $admin->email) {
                $user = auth()->user();
                Mail::to($admin->email)->send(new AdminNotification(
                    'Potensi Desa Baru Ditambahkan',
                    'Data potensi desa baru telah ditambahkan ke website.',
                    'Lihat Potensi',
                    route('admin.potentials.index'),
                    [
                        'nama' => $potential->name,
                        'kategori' => $potential->category,
                        'dibuat_oleh' => $user ? $user->name : 'System',
                        'waktu' => now()->format('d M Y H:i'),
                    ]
                ));
            }
        } catch (\Exception $e) {
            Log::error('Failed to send email: ' . $e->getMessage());
        }

        return to_route('admin.potentials.index')->with('success', 'Data potensi berhasil ditambahkan.');
    }

    public function edit(Potential $potential)
    {
        $categories = PotentialCategory::where('is_active', true)->orderBy('order')->get();
        return Inertia::render('Admin/Potentials/Form', [
            'potential' => $potential,
            'categories' => $categories
        ]);
    }

    public function update(Request $request, Potential $potential)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'category' => 'required|string|max:50',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $updateData = [
            'name' => $validated['name'],
            'description' => $validated['description'],
            'category' => $validated['category'],
        ];

        if ($request->hasFile('image')) {
            if ($potential->image_path) {
                $oldPath = str_replace('/storage/', '', $potential->image_path);
                Storage::disk('public')->delete($oldPath);
            }
            $path = $request->file('image')->store('potentials', 'public');
            $updateData['image_path'] = "/storage/$path";
        }

        $potential->update($updateData);

        return to_route('admin.potentials.index')->with('success', 'Data potensi berhasil diperbarui.');
    }

    public function destroy(Potential $potential)
    {
        if ($potential->image_path) {
            $oldPath = str_replace('/storage/', '', $potential->image_path);
            Storage::disk('public')->delete($oldPath);
        }
        $potential->delete();

        return to_route('admin.potentials.index')->with('success', 'Data potensi berhasil dihapus.');
    }
}
