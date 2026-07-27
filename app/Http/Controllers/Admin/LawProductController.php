<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\LawProduct;
use App\Models\LawProductCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class LawProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $lawProduct = LawProduct::with('category')->latest()->paginate(10);
        return Inertia::render('Admin/LawProducts/Index', [
            'lawProduct' => $lawProduct,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/LawProducts/Form', [
            'categories' => LawProductCategory::orderBy('name')->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', 'unique:law_products,slug'],
            'category' => ['required', 'exists:law_product_categories,id'],
            'description' => ['required', 'string'],
            'establish' => ['required', 'date'],
            'path' => ['required', 'file', 'mimes:pdf,doc,docx,jpg,jpeg,png,webp', 'max:10240'],
            'status' => ['required', 'in:active,edited,revoked'],
            'downloads' => ['required', 'integer', 'min:0'],
        ]);

        $storedPath = null;
        if ($request->hasFile('path')) {
            try {
                $path = $request->file('path')->store('law-products', 'public');
                $storedPath = $path;
                Log::info('Law Product Document Uploaded', ['path' => $path]);
            } catch (\Exception $e) {
                Log::error('Law Product Document Upload Failed', [
                    'error' => $e->getMessage(),
                    'trace' => $e->getTraceAsString()
                ]);
                return back()->withErrors(['path' => 'Gagal mengupload dokumen: ' . $e->getMessage()]);
            }
        }

        LawProduct::create([
            'title' => $validated['title'],
            'slug' => $validated['slug'],
            'category_id' => $validated['category'],
            'description' => $validated['description'],
            'establish' => $validated['establish'],
            'path' => $storedPath,
            'status' => $validated['status'],
            'downloads' => $validated['downloads'],
        ]);

        return redirect()->route('admin.law-products.index')
            ->with('success', 'Produk hukum berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(LawProduct $lawProduct)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(LawProduct $lawProduct)
    {
        return Inertia::render('Admin/LawProducts/Form', [
            'lawProduct' => $lawProduct,
            'categories' => LawProductCategory::orderBy('name')->get(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, LawProduct $lawProduct)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', 'unique:law_products,slug,' . $lawProduct->id . ',id'],
            'category' => ['required', 'exists:law_product_categories,id'],
            'description' => ['required', 'string'],
            'establish' => ['required', 'date'],
            'path' => ['nullable', 'file', 'mimes:pdf,doc,docx,jpg,jpeg,png,webp', 'max:10240'],
            'status' => ['required', 'in:active,edited,revoked'],
            'downloads' => ['required', 'integer', 'min:0'],
        ]);

        $storedPath = $lawProduct->path;
        if ($request->hasFile('path')) {
            try {
                // Delete old doc
                if ($storedPath && Storage::disk('public')->exists($storedPath)) {
                    Storage::disk('public')->delete($storedPath);
                }

                $path = $request->file('path')->store('law-products', 'public');
                $storedPath = $path;
                Log::info('Law Product Document Updated', ['path' => $path]);
            } catch (\Exception $e) {
                Log::error('Law Product Document Update Failed', [
                    'error' => $e->getMessage(),
                    'trace' => $e->getTraceAsString()
                ]);
                return back()->withErrors(['path' => 'Gagal memperarui dokumen: ' . $e->getMessage()]);
            }
        }

        $lawProduct->update([
            'title' => $validated['title'],
            'slug' => $validated['slug'],
            'category_id' => $validated['category'],
            'description' => $validated['description'],
            'establish' => $validated['establish'],
            'path' => $storedPath,
            'status' => $validated['status'],
            'downloads' => $validated['downloads'],
        ]);

        return redirect()->route('admin.law-products.index')
            ->with('success', 'Produk hukum berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(LawProduct $lawProduct)
    {
        if ($lawProduct->path && Storage::disk('public')->exists($lawProduct->path)) {
            Storage::disk('public')->delete($lawProduct->path);
        }

        $lawProduct->delete();

        return redirect()->route('admin.law-products.index')
            ->with('success', 'Produk hukum berhasil dihapus.');
    }
}
