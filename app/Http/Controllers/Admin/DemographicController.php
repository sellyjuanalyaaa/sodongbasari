<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Demographic;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DemographicController extends Controller
{
    public function index()
    {
        $demographics = Demographic::latest()->get();
        return Inertia::render('Admin/Demographics/Index', [
            'demographics' => $demographics
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Demographics/Form');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'year' => 'required|integer',
            'total_male' => 'required|integer',
            'total_female' => 'required|integer',
            'total_families' => 'required|integer',
            'mutation_in' => 'nullable|integer',
            'mutation_out' => 'nullable|integer',
        ]);

        // Simpan total jika kolom 'value' digunakan sebagai total L+P, atau struktur tabel berbeda
        // Asumsi user punya kolom spesifik sesuai request "Field: Tahun, Laki, Perempuan, KK..."
        // Jika tabel demographic dinamis (key-value), ini harus disesuaikan.
        // Saya akan menggunakan asumsi kolom-kolom ini ada di migration.
        
        // Cek migration demographics jika perlu. Tapi saya akan gunakan create standar.
        
        Demographic::create($validated);

        return to_route('admin.demographics.index')->with('success', 'Data penduduk berhasil ditambahkan.');
    }

    public function edit(Demographic $demographic)
    {
        return Inertia::render('Admin/Demographics/Form', [
            'demographic' => $demographic
        ]);
    }

    public function update(Request $request, Demographic $demographic)
    {
        $validated = $request->validate([
            'year' => 'required|integer',
            'total_male' => 'required|integer',
            'total_female' => 'required|integer',
            'total_families' => 'required|integer',
            'mutation_in' => 'nullable|integer',
            'mutation_out' => 'nullable|integer',
        ]);

        $demographic->update($validated);

        return to_route('admin.demographics.index')->with('success', 'Data penduduk berhasil diperbarui.');
    }

    public function destroy(Demographic $demographic)
    {
        $demographic->delete();
        return to_route('admin.demographics.index')->with('success', 'Data penduduk berhasil dihapus.');
    }
}
