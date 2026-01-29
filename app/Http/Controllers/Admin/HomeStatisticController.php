<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class HomeStatisticController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $statistics = \App\Models\HomeStatistic::orderBy('order')->get();
        return \Inertia\Inertia::render('Admin/HomeStatistics/Index', [
            'statistics' => $statistics,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return \Inertia\Inertia::render('Admin/HomeStatistics/Form');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'type' => 'required|in:budget,landmark,count',
            'image' => 'nullable|image|max:2048',
            'data' => 'nullable|array',
            'order' => 'integer',
            'is_active' => 'boolean',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('images', 'public');
            $validated['image'] = "/storage/$path";
        }

        \App\Models\HomeStatistic::create($validated);

        return redirect()->route('admin.home-statistics.index')->with('success', 'Statistik Beranda berhasil ditambahkan.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $statistic = \App\Models\HomeStatistic::findOrFail($id);
        return \Inertia\Inertia::render('Admin/HomeStatistics/Form', [
            'statistic' => $statistic,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $statistic = \App\Models\HomeStatistic::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'type' => 'required|in:budget,landmark,count',
            'image' => 'nullable|image|max:2048',
            'data' => 'nullable|array',
            'order' => 'integer',
            'is_active' => 'boolean',
        ]);

        if ($request->hasFile('image')) {
            // Optional: Delete old image
            if ($statistic->image) {
                $oldPath = str_replace('/storage/', '', $statistic->image);
                \Storage::disk('public')->delete($oldPath);
            }

            $path = $request->file('image')->store('images', 'public');
            $validated['image'] = "/storage/$path";
        }

        $statistic->update($validated);

        return redirect()->route('admin.home-statistics.index')->with('success', 'Statistik Beranda berhasil diperbaharui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $statistic = \App\Models\HomeStatistic::findOrFail($id);
        $statistic->delete();
        return back()->with('success', 'Statistik Beranda berhasil dihapus.');
    }
}
