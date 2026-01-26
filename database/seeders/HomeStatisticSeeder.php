<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\HomeStatistic;

class HomeStatisticSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $statistics = [
            [
                'title' => 'Sarana Pendidikan',
                'subtitle' => null,
                'type' => 'budget',
                'image' => null,
                'data' => [
                    ['label' => 'Sudah Terealisasi', 'value' => 'Rp 120.000.000,00', 'color' => 'bg-green-500', 'textColor' => 'text-white'],
                    ['label' => 'Belum Terealisasi', 'value' => 'Rp 123.000.000,00', 'color' => 'bg-pink-500', 'textColor' => 'text-white']
                ],
                'order' => 1,
                'is_active' => true,
            ],
            [
                'title' => 'Profil Desa Sodong',
                'subtitle' => 'Luas Wilayah',
                'type' => 'budget',
                'image' => null,
                'data' => [
                    ['label' => 'Luas Pemukiman', 'value' => '450 Ha', 'color' => 'bg-blue-500', 'textColor' => 'text-white'],
                    ['label' => 'Luas Pertanian', 'value' => '1050 Ha', 'color' => 'bg-green-500', 'textColor' => 'text-white']
                ],
                'order' => 2,
                'is_active' => true,
            ],
            [
                'title' => 'Tempat Ibadah',
                'subtitle' => null,
                'type' => 'landmark',
                'image' => null, // Admin will upload image later
                'data' => [
                    ['label' => 'Masjid', 'value' => '4', 'color' => 'bg-green-500', 'textColor' => 'text-white'],
                    ['label' => 'Mushola', 'value' => '13', 'color' => 'bg-orange-500', 'textColor' => 'text-white']
                ],
                'order' => 3,
                'is_active' => true,
            ],
        ];

        foreach ($statistics as $statistic) {
            HomeStatistic::create($statistic);
        }
    }
}
