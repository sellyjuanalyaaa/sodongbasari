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
            'total_population' => 'nullable|integer|min:0',
            'male_population' => 'nullable|integer|min:0',
            'female_population' => 'nullable|integer|min:0',
            'total_families' => 'nullable|integer|min:0',
            'total_rt' => 'nullable|integer|min:0',
            'total_rw' => 'nullable|integer|min:0',
            'total_dusun' => 'nullable|integer|min:0',
            'tidak_sekolah' => 'nullable|integer|min:0',
            'sd_sederajat' => 'nullable|integer|min:0',
            'smp_sederajat' => 'nullable|integer|min:0',
            'sma_sederajat' => 'nullable|integer|min:0',
            'diploma' => 'nullable|integer|min:0',
            'sarjana' => 'nullable|integer|min:0',
            'petani' => 'nullable|integer|min:0',
            'pedagang' => 'nullable|integer|min:0',
            'pns' => 'nullable|integer|min:0',
            'wiraswasta' => 'nullable|integer|min:0',
            'lainnya' => 'nullable|integer|min:0',
            'islam' => 'nullable|integer|min:0',
            'kristen' => 'nullable|integer|min:0',
            'katolik' => 'nullable|integer|min:0',
            'hindu' => 'nullable|integer|min:0',
            'budha' => 'nullable|integer|min:0',
            // Tempat Ibadah
            'masjid' => 'nullable|integer|min:0',
            'mushola' => 'nullable|integer|min:0',
            'gereja' => 'nullable|integer|min:0',
            'pura' => 'nullable|integer|min:0',
            'vihara' => 'nullable|integer|min:0',
            // Fasilitas Kesehatan
            'puskesmas' => 'nullable|integer|min:0',
            'posyandu' => 'nullable|integer|min:0',
            'klinik' => 'nullable|integer|min:0',
            // Fasilitas Olahraga
            'lapangan_sepakbola' => 'nullable|integer|min:0',
            'lapangan_voli' => 'nullable|integer|min:0',
            'lapangan_badminton' => 'nullable|integer|min:0',
            'gor' => 'nullable|integer|min:0',
            // Wisata
            'pantai' => 'nullable|integer|min:0',
            'taman' => 'nullable|integer|min:0',
            'cagar_budaya' => 'nullable|integer|min:0',
            'wisata_alam' => 'nullable|integer|min:0',
            // Migrasi Penduduk
            'penduduk_datang' => 'nullable|integer|min:0',
            'penduduk_keluar' => 'nullable|integer|min:0',
            'kelahiran' => 'nullable|integer|min:0',
            'kematian' => 'nullable|integer|min:0',
        ]);

        // Default null values to 0
        foreach ($validated as $key => $value) {
            if (is_null($value) && !in_array($key, ['year', 'infographic_image', 'infographic_image_right'])) {
                $validated[$key] = 0;
            }
        }

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
            'total_population' => 'nullable|integer|min:0',
            'male_population' => 'nullable|integer|min:0',
            'female_population' => 'nullable|integer|min:0',
            'total_families' => 'nullable|integer|min:0',
            'total_rt' => 'nullable|integer|min:0',
            'total_rw' => 'nullable|integer|min:0',
            'total_dusun' => 'nullable|integer|min:0',
            'tidak_sekolah' => 'nullable|integer|min:0',
            'sd_sederajat' => 'nullable|integer|min:0',
            'smp_sederajat' => 'nullable|integer|min:0',
            'sma_sederajat' => 'nullable|integer|min:0',
            'diploma' => 'nullable|integer|min:0',
            'sarjana' => 'nullable|integer|min:0',
            'petani' => 'nullable|integer|min:0',
            'pedagang' => 'nullable|integer|min:0',
            'pns' => 'nullable|integer|min:0',
            'wiraswasta' => 'nullable|integer|min:0',
            'lainnya' => 'nullable|integer|min:0',
            'islam' => 'nullable|integer|min:0',
            'kristen' => 'nullable|integer|min:0',
            'katolik' => 'nullable|integer|min:0',
            'hindu' => 'nullable|integer|min:0',
            'budha' => 'nullable|integer|min:0',
            // Tempat Ibadah
            'masjid' => 'nullable|integer|min:0',
            'mushola' => 'nullable|integer|min:0',
            'gereja' => 'nullable|integer|min:0',
            'pura' => 'nullable|integer|min:0',
            'vihara' => 'nullable|integer|min:0',
            // Fasilitas Kesehatan
            'puskesmas' => 'nullable|integer|min:0',
            'posyandu' => 'nullable|integer|min:0',
            'klinik' => 'nullable|integer|min:0',
            // Fasilitas Olahraga
            'lapangan_sepakbola' => 'nullable|integer|min:0',
            'lapangan_voli' => 'nullable|integer|min:0',
            'lapangan_badminton' => 'nullable|integer|min:0',
            'gor' => 'nullable|integer|min:0',
            // Wisata
            'pantai' => 'nullable|integer|min:0',
            'taman' => 'nullable|integer|min:0',
            'cagar_budaya' => 'nullable|integer|min:0',
            'wisata_alam' => 'nullable|integer|min:0',
            // Migrasi Penduduk
            'penduduk_datang' => 'nullable|integer|min:0',
            'penduduk_keluar' => 'nullable|integer|min:0',
        ]);

        // Default null values to 0
        foreach ($validated as $key => $value) {
            if (is_null($value) && !in_array($key, ['year', 'infographic_image', 'infographic_image_right'])) {
                $validated[$key] = 0;
            }
        }

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
