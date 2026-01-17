<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Institution;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class InstitutionController extends Controller
{
    public function index()
    {
        $institutions = Institution::withCount('members')->get();
        return Inertia::render('Admin/Institutions/Index', [
            'institutions' => $institutions
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Institutions/Form');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $logoPath = null;
        if ($request->hasFile('logo')) {
            $path = $request->file('logo')->store('institutions', 'public');
            $logoPath = "/storage/$path";
        }

        Institution::create([
            'name' => $validated['name'],
            'description' => $validated['description'],
            'logo_path' => $logoPath,
        ]);

        return to_route('admin.institutions.index')->with('success', 'Lembaga berhasil ditambahkan.');
    }

    public function edit(Institution $institution)
    {
        return Inertia::render('Admin/Institutions/Form', [
            'institution' => $institution
        ]);
    }

    public function update(Request $request, Institution $institution)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $updateData = [
            'name' => $validated['name'],
            'description' => $validated['description'],
        ];

        if ($request->hasFile('logo')) {
            if ($institution->logo_path) {
                $oldPath = str_replace('/storage/', '', $institution->logo_path);
                Storage::disk('public')->delete($oldPath);
            }
            $path = $request->file('logo')->store('institutions', 'public');
            $updateData['logo_path'] = "/storage/$path";
        }

        $institution->update($updateData);

        return to_route('admin.institutions.index')->with('success', 'Lembaga berhasil diperbarui.');
    }

    public function destroy(Institution $institution)
    {
        if ($institution->logo_path) {
            $oldPath = str_replace('/storage/', '', $institution->logo_path);
            Storage::disk('public')->delete($oldPath);
        }
        $institution->delete();

        return to_route('admin.institutions.index')->with('success', 'Lembaga berhasil dihapus.');
    }
}
