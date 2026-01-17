<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\VillageOfficial;

class VillageOfficialSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $officials = [
            ['name' => 'SUWARNO', 'position' => 'Pj. KEPALA DESA', 'order' => 1],
            ['name' => 'WILDAN FAILASUF ARIEFIN', 'position' => 'SEKRETARIS DESA', 'order' => 2],
            ['name' => 'LIA MAELIYA ZAKIYAH', 'position' => 'KASI KESRA & PELAYANAN', 'order' => 3],
            ['name' => 'TYO ANWAR MUJAHIDIN', 'position' => 'KASI PEMERINTAHAN', 'order' => 4],
            ['name' => 'ANIB ARWIATUN NISA', 'position' => 'KAUR TU UMUM & KAPER', 'order' => 5],
            ['name' => 'NANDA URIP YULITASARI', 'position' => 'KAUR KEUANGAN', 'order' => 6],
            ['name' => 'MUNAWIR', 'position' => 'KEPALA DUSUN SOBAS BAR', 'order' => 7],
            ['name' => 'HISYAM ALI', 'position' => 'KEPALA DUSUN SOBAS TIM', 'order' => 8],
        ];

        foreach ($officials as $official) {
            VillageOfficial::create($official);
        }
    }
}
