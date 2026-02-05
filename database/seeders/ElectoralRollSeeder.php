<?php

namespace Database\Seeders;

use App\Models\ElectoralRoll;
use Illuminate\Database\Seeder;

class ElectoralRollSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $electoralRolls = [
            [
                'year' => 2024,
                'male_voters' => 1250,
                'female_voters' => 1180,
                'election_type' => 'Pilpres',
            ],
            [
                'year' => 2024,
                'male_voters' => 1248,
                'female_voters' => 1178,
                'election_type' => 'Pileg',
            ],
            [
                'year' => 2023,
                'male_voters' => 1220,
                'female_voters' => 1150,
                'election_type' => 'Pilkada',
            ],
            [
                'year' => 2022,
                'male_voters' => 1200,
                'female_voters' => 1130,
                'election_type' => 'Pilgub',
            ],
            [
                'year' => 2021,
                'male_voters' => 1180,
                'female_voters' => 1110,
                'election_type' => 'Pilkades',
            ],
        ];

        foreach ($electoralRolls as $roll) {
            ElectoralRoll::create($roll);
        }
    }
}
