<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Statistic;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class StatisticController extends Controller
{
    public function index()
    {
        $statistics = Statistic::orderBy('year', 'desc')->get();
        
        return Inertia::render('Admin/Statistics/Index', [
            'statistics' => $statistics,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Statistics/Form');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'year' => 'required|integer|unique:statistics,year',
            'infographic_image' => 'nullable|image|max:5120',
            'infographic_image_right' => 'nullable|image|max:5120',
            'total_population' => 'required|integer|min:0',
            'male_population' => 'required|integer|min:0',
            'female_population' => 'required|integer|min:0',
            'total_families' => 'required|integer|min:0',
            'total_rt' => 'required|integer|min:0',
            'total_rw' => 'required|integer|min:0',
            'total_dusun' => 'required|integer|min:0',
            'tidak_sekolah' => 'required|integer|min:0',
            'sd_sederajat' => 'required|integer|min:0',
            'smp_sederajat' => 'required|integer|min:0',
            'sma_sederajat' => 'required|integer|min:0',
            'diploma' => 'required|integer|min:0',
            'sarjana' => 'required|integer|min:0',
            'petani' => 'required|integer|min:0',
            'pedagang' => 'required|integer|min:0',
            'pns' => 'required|integer|min:0',
            'wiraswasta' => 'required|integer|min:0',
            'lainnya' => 'required|integer|min:0',
            'islam' => 'required|integer|min:0',
            'kristen' => 'required|integer|min:0',
            'katolik' => 'required|integer|min:0',
            'hindu' => 'required|integer|min:0',
            'budha' => 'required|integer|min:0',
            // Tempat Ibadah
            'masjid' => 'required|integer|min:0',
            'mushola' => 'required|integer|min:0',
            'gereja' => 'required|integer|min:0',
            'pura' => 'required|integer|min:0',
            'vihara' => 'required|integer|min:0',
            // Fasilitas Kesehatan
            'puskesmas' => 'required|integer|min:0',
            'posyandu' => 'required|integer|min:0',
            'klinik' => 'required|integer|min:0',
            // Fasilitas Olahraga
            'lapangan_sepakbola' => 'required|integer|min:0',
            'lapangan_voli' => 'required|integer|min:0',
            'lapangan_badminton' => 'required|integer|min:0',
            'gor' => 'required|integer|min:0',
            // Wisata
            'pantai' => 'required|integer|min:0',
            'taman' => 'required|integer|min:0',
            'cagar_budaya' => 'required|integer|min:0',
            'wisata_alam' => 'required|integer|min:0',
            // Migrasi Penduduk
            'penduduk_datang' => 'required|integer|min:0',
            'penduduk_keluar' => 'required|integer|min:0',
        ]);

        if ($request->hasFile('infographic_image')) {
            $path = $request->file('infographic_image')->store('statistics', 'public');
            $validated['infographic_image'] = "/storage/$path";
        }

        if ($request->hasFile('infographic_image_right')) {
            $path = $request->file('infographic_image_right')->store('statistics', 'public');
            $validated['infographic_image_right'] = "/storage/$path";
        }

        Statistic::create($validated);

        return redirect()->route('admin.statistics.index')
            ->with('success', 'Data statistik berhasil ditambahkan.');
    }

    public function edit(Statistic $statistic)
    {
        return Inertia::render('Admin/Statistics/Form', [
            'statistic' => $statistic,
        ]);
    }

    public function update(Request $request, Statistic $statistic)
    {
        $validated = $request->validate([
            'year' => 'required|integer|unique:statistics,year,' . $statistic->id,
            'infographic_image' => 'nullable|image|max:5120',
            'infographic_image_right' => 'nullable|image|max:5120',
            'total_population' => 'required|integer|min:0',
            'male_population' => 'required|integer|min:0',
            'female_population' => 'required|integer|min:0',
            'total_families' => 'required|integer|min:0',
            'total_rt' => 'required|integer|min:0',
            'total_rw' => 'required|integer|min:0',
            'total_dusun' => 'required|integer|min:0',
            'tidak_sekolah' => 'required|integer|min:0',
            'sd_sederajat' => 'required|integer|min:0',
            'smp_sederajat' => 'required|integer|min:0',
            'sma_sederajat' => 'required|integer|min:0',
            'diploma' => 'required|integer|min:0',
            'sarjana' => 'required|integer|min:0',
            'petani' => 'required|integer|min:0',
            'pedagang' => 'required|integer|min:0',
            'pns' => 'required|integer|min:0',
            'wiraswasta' => 'required|integer|min:0',
            'lainnya' => 'required|integer|min:0',
            'islam' => 'required|integer|min:0',
            'kristen' => 'required|integer|min:0',
            'katolik' => 'required|integer|min:0',
            'hindu' => 'required|integer|min:0',
            'budha' => 'required|integer|min:0',
            // Tempat Ibadah
            'masjid' => 'required|integer|min:0',
            'mushola' => 'required|integer|min:0',
            'gereja' => 'required|integer|min:0',
            'pura' => 'required|integer|min:0',
            'vihara' => 'required|integer|min:0',
            // Fasilitas Kesehatan
            'puskesmas' => 'required|integer|min:0',
            'posyandu' => 'required|integer|min:0',
            'klinik' => 'required|integer|min:0',
            // Fasilitas Olahraga
            'lapangan_sepakbola' => 'required|integer|min:0',
            'lapangan_voli' => 'required|integer|min:0',
            'lapangan_badminton' => 'required|integer|min:0',
            'gor' => 'required|integer|min:0',
            // Wisata
            'pantai' => 'required|integer|min:0',
            'taman' => 'required|integer|min:0',
            'cagar_budaya' => 'required|integer|min:0',
            'wisata_alam' => 'required|integer|min:0',
            // Migrasi Penduduk
            'penduduk_datang' => 'required|integer|min:0',
            'penduduk_keluar' => 'required|integer|min:0',
        ]);

        if ($request->hasFile('infographic_image')) {
            if ($statistic->infographic_image) {
                $oldPath = str_replace('/storage/', '', $statistic->infographic_image);
                Storage::disk('public')->delete($oldPath);
            }
            
            $path = $request->file('infographic_image')->store('statistics', 'public');
            $validated['infographic_image'] = "/storage/$path";
        }

        if ($request->hasFile('infographic_image_right')) {
            if ($statistic->infographic_image_right) {
                $oldPath = str_replace('/storage/', '', $statistic->infographic_image_right);
                Storage::disk('public')->delete($oldPath);
            }
            
            $path = $request->file('infographic_image_right')->store('statistics', 'public');
            $validated['infographic_image_right'] = "/storage/$path";
        }

        $statistic->update($validated);

        return redirect()->route('admin.statistics.index')
            ->with('success', 'Data statistik berhasil diperbarui.');
    }

    public function destroy(Statistic $statistic)
    {
        if ($statistic->infographic_image) {
            $oldPath = str_replace('/storage/', '', $statistic->infographic_image);
            Storage::disk('public')->delete($oldPath);
        }

        if ($statistic->infographic_image_right) {
            $oldPath = str_replace('/storage/', '', $statistic->infographic_image_right);
            Storage::disk('public')->delete($oldPath);
        }
        
        $statistic->delete();
        
        return redirect()->route('admin.statistics.index')
            ->with('success', 'Data statistik berhasil dihapus.');
    }
}
