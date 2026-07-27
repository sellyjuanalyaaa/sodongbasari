<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\LawProductCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LawProductCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $category = LawProductCategory::all();
        return Inertia::render('Admin/LawProductCategories/Index', [
            'categories' => $category,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/LawProductCategories/Form');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'icon' => ['required', 'string', 'max:100'],
            'color' => ['required', 'string', 'max:255'],
        ]);

        LawProductCategory::create($validated);

        return redirect()->route('admin.law-product-categories.index')->with('success', 'Kategori produk hukum berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(LawProductCategory $lawProductCategory)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(LawProductCategory $lawProductCategory)
    {
        return Inertia::render('Admin/LawProductCategories/Form', [
            'category' => $lawProductCategory,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, LawProductCategory $lawProductCategory)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'icon' => ['required', 'string', 'max:100'],
            'color' => ['required', 'string', 'max:255'],
        ]);

        $lawProductCategory->update($validated);

        return redirect()->route('admin.law-product-categories.index')
            ->with('success', 'Kategori produk hukum berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(LawProductCategory $lawProductCategory)
    {
        $lawProductCategory->delete();

        return redirect()->route('admin.law-product-categories.index')->with('success', 'Kategori produk hukum berhasil dihapus.');
    }
}
