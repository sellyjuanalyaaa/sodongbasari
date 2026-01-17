<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Potential;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

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
        return Inertia::render('Admin/Potentials/Form');
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

        Potential::create([
            'name' => $validated['name'],
            'description' => $validated['description'],
            'category' => $validated['category'],
            'image_path' => $imagePath,
        ]);

        return to_route('admin.potentials.index')->with('success', 'Data potensi berhasil ditambahkan.');
    }

    public function edit(Potential $potential)
    {
        return Inertia::render('Admin/Potentials/Form', [
            'potential' => $potential
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
