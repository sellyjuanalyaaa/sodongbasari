<?php

namespace App\Http\Controllers;

use App\Models\ElectionType;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ElectionTypeController extends Controller
{
    public function index()
    {
        $electionTypes = ElectionType::orderBy('order')->orderBy('name')->get();

        return Inertia::render('Admin/ElectionTypes/Index', [
            'electionTypes' => $electionTypes,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/ElectionTypes/Form', [
            'electionType' => null,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100|unique:election_types,name',
            'description' => 'nullable|string|max:255',
            'order' => 'nullable|integer|min:0',
        ]);

        ElectionType::create($validated);

        return redirect()->route('admin.election-types.index')
            ->with('success', 'Jenis pemilu berhasil ditambahkan.');
    }

    public function edit(ElectionType $electionType)
    {
        return Inertia::render('Admin/ElectionTypes/Form', [
            'electionType' => $electionType,
        ]);
    }

    public function update(Request $request, ElectionType $electionType)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:100|unique:election_types,name,' . $electionType->id,
            'description' => 'nullable|string|max:255',
            'order' => 'nullable|integer|min:0',
        ]);

        $electionType->update($validated);

        return redirect()->route('admin.election-types.index')
            ->with('success', 'Jenis pemilu berhasil diupdate.');
    }

    public function destroy(ElectionType $electionType)
    {
        // Check if election type is being used
        if ($electionType->electoralRolls()->exists()) {
            return back()->with('error', 'Jenis pemilu tidak dapat dihapus karena masih digunakan pada data DPT.');
        }

        $electionType->delete();

        return redirect()->route('admin.election-types.index')
            ->with('success', 'Jenis pemilu berhasil dihapus.');
    }
}
