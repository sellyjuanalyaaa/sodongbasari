<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Budget;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BudgetController extends Controller
{
    public function index()
    {
        $budgets = Budget::orderBy('year', 'desc')->get();
        return Inertia::render('Admin/Budgets/Index', [
            'budgets' => $budgets
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Budgets/Form');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'year' => 'required|integer|min:2000|max:2100',
            'type' => 'required|in:Pendapatan,Belanja,Pembiayaan', // Sesuai permintaan kategori
            'amount' => 'required|numeric|min:0',
        ]);

        Budget::create($validated);

        return to_route('admin.budgets.index')->with('success', 'Data anggaran berhasil ditambahkan.');
    }

    public function edit(Budget $budget)
    {
        return Inertia::render('Admin/Budgets/Form', [
            'budget' => $budget
        ]);
    }

    public function update(Request $request, Budget $budget)
    {
        $validated = $request->validate([
            'year' => 'required|integer|min:2000|max:2100',
            'type' => 'required|in:Pendapatan,Belanja,Pembiayaan',
            'amount' => 'required|numeric|min:0',
        ]);

        $budget->update($validated);

        return to_route('admin.budgets.index')->with('success', 'Data anggaran berhasil diperbarui.');
    }

    public function destroy(Budget $budget)
    {
        $budget->delete();
        return to_route('admin.budgets.index')->with('success', 'Data anggaran berhasil dihapus.');
    }
}
