<?php

namespace Database\Seeders;

use App\Models\Institution;
use Illuminate\Database\Seeder;

class InstitutionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $institutions = [
            [
                'name' => 'Badan Permusyawaratan Desa',
                'abbreviation' => 'BPD',
                'description' => 'Badan Permusyawaratan Desa (BPD) adalah lembaga yang merupakan perwujudan demokrasi dalam penyelenggaraan pemerintahan desa. BPD berfungsi menetapkan Peraturan Desa bersama Kepala Desa, menampung dan menyalurkan aspirasi masyarakat, serta melakukan pengawasan terhadap penyelenggaraan pemerintahan desa.',
            ],
            [
                'name' => 'Koperasi Desa',
                'abbreviation' => 'KOPDES',
                'description' => 'Koperasi Desa (KOPDES) adalah badan usaha yang beranggotakan orang-orang atau badan hukum koperasi dengan melandaskan kegiatannya berdasarkan prinsip koperasi sekaligus sebagai gerakan ekonomi rakyat yang berdasar atas asas kekeluargaan. KOPDES bertujuan untuk meningkatkan kesejahteraan ekonomi masyarakat desa.',
            ],
            [
                'name' => 'Badan Usaha Milik Desa',
                'abbreviation' => 'BUMDes',
                'description' => 'Badan Usaha Milik Desa (BUMDes) adalah badan usaha yang seluruh atau sebagian besar modalnya dimiliki oleh desa melalui penyertaan secara langsung yang berasal dari kekayaan desa yang dipisahkan guna mengelola aset, jasa pelayanan, dan usaha lainnya untuk sebesar-besarnya kesejahteraan masyarakat desa.',
            ],
        ];

        foreach ($institutions as $institution) {
            Institution::create($institution);
        }
    }
}

