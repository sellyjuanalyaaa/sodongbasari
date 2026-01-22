<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PotentialCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PotentialCategoryController extends Controller
{
    public function index()
    {
        $categories = PotentialCategory::orderBy('order')->get();
        
        return Inertia::render('Admin/PotentialCategories/Index', [
            'categories' => $categories
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/PotentialCategories/Form');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'color' => 'required|string|max:255',
            'description' => 'nullable|string',
            'order' => 'required|integer|min:0',
            'is_active' => 'boolean',
        ]);

        PotentialCategory::create($validated);

        return to_route('admin.potential-categories.index')->with('success', 'Kategori berhasil ditambahkan.');
    }

    public function edit(PotentialCategory $potentialCategory)
    {
        return Inertia::render('Admin/PotentialCategories/Form', [
            'category' => $potentialCategory
        ]);
    }

    public function update(Request $request, PotentialCategory $potentialCategory)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'color' => 'required|string|max:255',
            'description' => 'nullable|string',
            'order' => 'required|integer|min:0',
            'is_active' => 'boolean',
        ]);

        $potentialCategory->update($validated);

        return to_route('admin.potential-categories.index')->with('success', 'Kategori berhasil diperbarui.');
    }

    public function destroy(PotentialCategory $potentialCategory)
    {
        $potentialCategory->delete();

        return to_route('admin.potential-categories.index')->with('success', 'Kategori berhasil dihapus.');
    }
}
