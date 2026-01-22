<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\FormerVillageHead;

class FormerVillageHeadSeeder extends Seeder
{
    public function run(): void
    {
        $formerHeads = [
            [
                'name' => 'H. Ahmad Suryadi',
                'start_year' => 2005,
                'end_year' => 2011,
                'achievement' => 'Membangun infrastruktur jalan desa sepanjang 5 km, meningkatkan akses pendidikan dengan pembangunan SD Negeri, dan mengembangkan program pemberdayaan ekonomi masyarakat melalui UMKM.',
                'order' => 1,
            ],
            [
                'name' => 'Drs. Bambang Prasetyo',
                'start_year' => 2011,
                'end_year' => 2017,
                'achievement' => 'Mengembangkan sistem irigasi pertanian, membangun balai desa yang representatif, meningkatkan program kesehatan masyarakat dengan Posyandu di setiap dusun, dan meraih penghargaan Desa Terbaik tingkat Kabupaten.',
                'order' => 2,
            ],
            [
                'name' => 'H. Sutrisno, S.Sos',
                'start_year' => 2017,
                'end_year' => 2023,
                'achievement' => 'Digitalisasi administrasi desa, pengembangan potensi wisata desa, program desa mandiri energi dengan instalasi panel surya, peningkatan kualitas SDM aparatur desa, dan meraih penghargaan Desa Inovatif.',
                'order' => 3,
            ],
        ];

        foreach ($formerHeads as $head) {
            FormerVillageHead::create($head);
        }
    }
}
