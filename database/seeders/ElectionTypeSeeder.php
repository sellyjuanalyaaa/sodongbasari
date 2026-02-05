<?php

namespace Database\Seeders;

use App\Models\ElectionType;
use Illuminate\Database\Seeder;

class ElectionTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $electionTypes = [
            ['name' => 'Pilpres', 'description' => 'Pemilihan Presiden dan Wakil Presiden', 'order' => 1],
            ['name' => 'Pileg', 'description' => 'Pemilihan Legislatif', 'order' => 2],
            ['name' => 'Pilkada', 'description' => 'Pemilihan Kepala Daerah', 'order' => 3],
            ['name' => 'Pilgub', 'description' => 'Pemilihan Gubernur', 'order' => 4],
            ['name' => 'Pilbup', 'description' => 'Pemilihan Bupati', 'order' => 5],
            ['name' => 'Pilwalkot', 'description' => 'Pemilihan Walikota', 'order' => 6],
            ['name' => 'Pilkades', 'description' => 'Pemilihan Kepala Desa', 'order' => 7],
        ];

        foreach ($electionTypes as $type) {
            ElectionType::create($type);
        }
    }
}
