<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\VillageOfficial;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class VillageOfficialController extends Controller
{
    public function index()
    {
        $officials = VillageOfficial::orderBy('order')->get();
        
        return Inertia::render('Admin/VillageOfficials/Index', [
            'officials' => $officials,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/VillageOfficials/Form', [
            'official' => null,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'photo' => 'nullable|image|max:2048',
            'order' => 'required|integer',
            'is_active' => 'boolean',
        ]);

        if ($request->hasFile('photo')) {
            $validated['photo'] = '/storage/' . $request->file('photo')->store('officials', 'public');
        }

        VillageOfficial::create($validated);

        return redirect()->route('admin.officials.index')->with('success', 'Perangkat desa berhasil ditambahkan.');
    }

    public function edit(VillageOfficial $official)
    {
        return Inertia::render('Admin/VillageOfficials/Form', [
            'official' => $official,
        ]);
    }

    public function update(Request $request, VillageOfficial $official)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'photo' => 'nullable|image|max:2048',
            'order' => 'required|integer',
            'is_active' => 'boolean',
        ]);

        if ($request->hasFile('photo')) {
            // Delete old photo
            if ($official->photo) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $official->photo));
            }
            $validated['photo'] = '/storage/' . $request->file('photo')->store('officials', 'public');
        }

        $official->update($validated);

        return redirect()->route('admin.officials.index')->with('success', 'Perangkat desa berhasil diperbarui.');
    }

    public function destroy(VillageOfficial $official)
    {
        if ($official->photo) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $official->photo));
        }

        $official->delete();

        return redirect()->route('admin.officials.index')->with('success', 'Perangkat desa berhasil dihapus.');
    }
}
