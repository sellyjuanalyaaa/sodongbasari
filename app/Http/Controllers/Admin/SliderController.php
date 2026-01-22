<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Slider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class SliderController extends Controller
{
    public function index()
    {
        $sliders = Slider::orderBy('order')->get();
        return Inertia::render('Admin/Sliders/Index', [
            'sliders' => $sliders
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Sliders/Form');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'link' => 'nullable|url|max:255',
            'order' => 'required|integer|min:0',
            'is_active' => 'required|boolean',
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('sliders', 'public');
            $imagePath = "/storage/$path";
        }

        Slider::create([
            'title' => $validated['title'],
            'image_path' => $imagePath,
            'link' => $validated['link'],
            'order' => $validated['order'],
            'is_active' => $validated['is_active'],
        ]);

        return to_route('admin.sliders.index')->with('success', 'Slider berhasil ditambahkan.');
    }

    public function edit(Slider $slider)
    {
        return Inertia::render('Admin/Sliders/Form', [
            'slider' => $slider,
        ]);
    }

    public function update(Request $request, Slider $slider)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'link' => 'nullable|url|max:255',
            'order' => 'required|integer|min:0',
            'is_active' => 'required|boolean',
        ]);

        $updateData = [
            'title' => $validated['title'],
            'link' => $validated['link'],
            'order' => $validated['order'],
            'is_active' => $validated['is_active'],
        ];

        if ($request->hasFile('image')) {
            // Delete old image
            if ($slider->image_path) {
                $oldPath = str_replace('/storage/', '', $slider->image_path);
                Storage::disk('public')->delete($oldPath);
            }
            
            $path = $request->file('image')->store('sliders', 'public');
            $updateData['image_path'] = "/storage/$path";
        }

        $slider->update($updateData);

        return to_route('admin.sliders.index')->with('success', 'Slider berhasil diperbarui.');
    }

    public function destroy(Slider $slider)
    {
        if ($slider->image_path) {
            $oldPath = str_replace('/storage/', '', $slider->image_path);
            Storage::disk('public')->delete($oldPath);
        }

        $slider->delete();

        return to_route('admin.sliders.index')->with('success', 'Slider berhasil dihapus.');
    }
}
