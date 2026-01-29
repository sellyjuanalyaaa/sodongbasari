<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HeroImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
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
        Log::info('Hero Image Upload Attempt', [
            'user' => auth()->id(),
            'has_file' => $request->hasFile('image'),
            'file_size' => $request->hasFile('image') ? $request->file('image')->getSize() : null,
            'mime_type' => $request->hasFile('image') ? $request->file('image')->getMimeType() : null,
        ]);

        try {
            $request->validate([
                'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:15360', // 15MB
                'title' => 'nullable|string|max:255',
            ]);

            if ($request->hasFile('image')) {
                try {
                    $file = $request->file('image');

                    // Additional file checks
                    if (!$file->isValid()) {
                        throw new \Exception('File upload tidak valid. Error code: ' . $file->getError());
                    }

                    $path = $file->store('hero', 'public');

                    if (!$path) {
                        throw new \Exception('Gagal menyimpan file ke storage');
                    }

                    HeroImage::create([
                        'image_path' => "/storage/$path",
                        'title' => $request->title,
                        'order' => HeroImage::max('order') + 1,
                    ]);

                    Log::info('Hero Image Uploaded Successfully', ['path' => $path]);

                    return back()->with('success', 'Gambar slider berhasil ditambahkan.');

                } catch (\Exception $e) {
                    Log::error('Hero Image Upload Failed', [
                        'error' => $e->getMessage(),
                        'trace' => $e->getTraceAsString(),
                        'file_name' => $request->hasFile('image') ? $request->file('image')->getClientOriginalName() : null,
                    ]);

                    return back()->withErrors([
                        'image' => 'Gagal mengupload gambar: ' . $e->getMessage()
                    ])->withInput();
                }
            }

            return back()->withErrors(['image' => 'File gambar tidak ditemukan']);

        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::warning('Hero Image Validation Failed', [
                'errors' => $e->errors(),
                'file_size' => $request->hasFile('image') ? $request->file('image')->getSize() : null,
            ]);
            throw $e;
        }
    }

    public function destroy(HeroImage $heroImage)
    {
        try {
            if ($heroImage->image_path) {
                $oldPath = str_replace('/storage/', '', $heroImage->image_path);
                Storage::disk('public')->delete($oldPath);
            }
            $heroImage->delete();

            Log::info('Hero Image Deleted', ['id' => $heroImage->id]);

            return back()->with('success', 'Gambar slider berhasil dihapus.');
        } catch (\Exception $e) {
            Log::error('Hero Image Delete Failed', [
                'error' => $e->getMessage(),
                'id' => $heroImage->id,
            ]);

            return back()->withErrors(['delete' => 'Gagal menghapus gambar: ' . $e->getMessage()]);
        }
    }
}
