<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\FormerVillageHead;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class FormerVillageHeadController extends Controller
{
    public function index()
    {
        $formerHeads = FormerVillageHead::orderBy('start_year', 'desc')->get();
        
        return Inertia::render('Admin/FormerVillageHeads/Index', [
            'formerHeads' => $formerHeads,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/FormerVillageHeads/Form');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'start_year' => 'required|integer|min:1900|max:' . date('Y'),
            'end_year' => 'required|integer|min:1900|max:' . date('Y') . '|gte:start_year',
            'achievement' => 'nullable|string',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'order' => 'nullable|integer',
        ]);

        if ($request->hasFile('photo')) {
            $validated['photo'] = $request->file('photo')->store('former-village-heads', 'public');
        }

        FormerVillageHead::create($validated);

        return redirect()->route('admin.former-village-heads.index')
            ->with('success', 'Data mantan kepala desa berhasil ditambahkan');
    }

    public function edit(FormerVillageHead $formerVillageHead)
    {
        return Inertia::render('Admin/FormerVillageHeads/Form', [
            'formerHead' => $formerVillageHead,
        ]);
    }

    public function update(Request $request, FormerVillageHead $formerVillageHead)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'start_year' => 'required|integer|min:1900|max:' . date('Y'),
            'end_year' => 'required|integer|min:1900|max:' . date('Y') . '|gte:start_year',
            'achievement' => 'nullable|string',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'order' => 'nullable|integer',
        ]);

        if ($request->hasFile('photo')) {
            if ($formerVillageHead->photo) {
                Storage::disk('public')->delete($formerVillageHead->photo);
            }
            $validated['photo'] = $request->file('photo')->store('former-village-heads', 'public');
        }

        $formerVillageHead->update($validated);

        return redirect()->route('admin.former-village-heads.index')
            ->with('success', 'Data mantan kepala desa berhasil diperbarui');
    }

    public function destroy(FormerVillageHead $formerVillageHead)
    {
        if ($formerVillageHead->photo) {
            Storage::disk('public')->delete($formerVillageHead->photo);
        }

        $formerVillageHead->delete();

        return redirect()->route('admin.former-village-heads.index')
            ->with('success', 'Data mantan kepala desa berhasil dihapus');
    }
}
