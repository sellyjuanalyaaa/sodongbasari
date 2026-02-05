<?php

namespace App\Http\Controllers;

use App\Models\ElectoralRoll;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ElectoralRollController extends Controller
{
    public function index()
    {
        $electoralRolls = ElectoralRoll::orderBy('year', 'desc')->get();

        return Inertia::render('Admin/ElectoralRolls/Index', [
            'electoralRolls' => $electoralRolls,
        ]);
    }

    public function create()
    {
        $electionTypes = \App\Models\ElectionType::orderBy('order')->orderBy('name')->get();

        return Inertia::render('Admin/ElectoralRolls/Form', [
            'electoralRoll' => null,
            'electionTypes' => $electionTypes,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'year' => 'required|integer|min:1900|max:2100',
            'male_voters' => 'required|integer|min:0',
            'female_voters' => 'required|integer|min:0',
            'election_type' => 'required|string|max:100',
        ]);

        // Total will be auto-calculated by the model
        $validated['total_voters'] = $validated['male_voters'] + $validated['female_voters'];

        ElectoralRoll::create($validated);

        return redirect()->route('admin.electoral-rolls.index')
            ->with('success', 'Data Pemilih Tetap berhasil ditambahkan.');
    }

    public function edit(ElectoralRoll $electoralRoll)
    {
        $electionTypes = \App\Models\ElectionType::orderBy('order')->orderBy('name')->get();

        return Inertia::render('Admin/ElectoralRolls/Form', [
            'electoralRoll' => $electoralRoll,
            'electionTypes' => $electionTypes,
        ]);
    }

    public function update(Request $request, ElectoralRoll $electoralRoll)
    {
        $validated = $request->validate([
            'year' => 'required|integer|min:1900|max:2100',
            'male_voters' => 'required|integer|min:0',
            'female_voters' => 'required|integer|min:0',
            'election_type' => 'required|string|max:100',
        ]);

        // Total will be auto-calculated by the model
        $validated['total_voters'] = $validated['male_voters'] + $validated['female_voters'];

        $electoralRoll->update($validated);

        return redirect()->route('admin.electoral-rolls.index')
            ->with('success', 'Data Pemilih Tetap berhasil diupdate.');
    }

    public function destroy(ElectoralRoll $electoralRoll)
    {
        $electoralRoll->delete();

        return redirect()->route('admin.electoral-rolls.index')
            ->with('success', 'Data Pemilih Tetap berhasil dihapus.');
    }
}
