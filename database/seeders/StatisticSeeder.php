<?php

namespace Database\Seeders;

use App\Models\Statistic;
use Illuminate\Database\Seeder;

class StatisticSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Statistic::create([
            'year' => 2026,
            'infographic_image' => null, // Can be uploaded via admin panel
            'total_population' => 5420,
            'male_population' => 2710,
            'female_population' => 2710,
            'total_families' => 1450,
            'total_rt' => 24,
            'total_rw' => 8,
            'total_dusun' => 4,
            'tidak_sekolah' => 120,
            'sd_sederajat' => 1250,
            'smp_sederajat' => 1100,
            'sma_sederajat' => 1850,
            'diploma' => 450,
            'sarjana' => 650,
            'petani' => 2100,
            'pedagang' => 850,
            'pns' => 320,
            'wiraswasta' => 1650,
            'lainnya' => 500,
            'islam' => 4950,
            'kristen' => 280,
            'katolik' => 120,
            'hindu' => 45,
            'budha' => 25,
        ]);
    }
}
