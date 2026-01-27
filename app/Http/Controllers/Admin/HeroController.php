<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HeroImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class HeroController extends Controller
{
    public function edit()
    {
        return Inertia::render('Admin/Hero/Edit', [
            'images' => HeroImage::orderBy('order')->get()
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:15360', // 15MB
            'title' => 'nullable|string|max:255',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('hero', 'public');
            HeroImage::create([
                'image_path' => "/storage/$path",
                'title' => $request->title,
                'order' => HeroImage::max('order') + 1,
            ]);
        }

        return back()->with('success', 'Gambar slider berhasil ditambahkan.');
    }

    public function destroy(HeroImage $heroImage)
    {
        if ($heroImage->image_path) {
            $oldPath = str_replace('/storage/', '', $heroImage->image_path);
            Storage::disk('public')->delete($oldPath);
        }
        $heroImage->delete();

        return back()->with('success', 'Gambar slider berhasil dihapus.');
    }
}
