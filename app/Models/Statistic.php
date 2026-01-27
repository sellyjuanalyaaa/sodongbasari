<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Statistic extends Model
{
    protected $fillable = [
        'year',
        'infographic_image',
        'infographic_image_right',
        'total_population',
        'male_population',
        'female_population',
        'total_families',
        'total_rt',
        'total_rw',
        'total_dusun',
        'tidak_sekolah',
        'sd_sederajat',
        'smp_sederajat',
        'sma_sederajat',
        'diploma',
        'sarjana',
        'petani',
        'pedagang',
        'pns',
        'wiraswasta',
        'lainnya',
        'islam',
        'kristen',
        'katolik',
        'hindu',
        'budha',
        // Tempat Ibadah
        'masjid',
        'mushola',
        'gereja',
        'pura',
        'vihara',
        // Fasilitas Kesehatan
        'puskesmas',
        'posyandu',
        'klinik',
        // Fasilitas Olahraga
        'lapangan_sepakbola',
        'lapangan_voli',
        'lapangan_badminton',
        'gor',
        // Wisata
        'pantai',
        'taman',
        'cagar_budaya',
        'wisata_alam',
        // Migrasi Penduduk
        'penduduk_datang',
        'penduduk_keluar',
        'kelahiran',
        'kematian',
    ];

    protected $casts = [
        'year' => 'integer',
        'total_population' => 'integer',
        'male_population' => 'integer',
        'female_population' => 'integer',
        'total_families' => 'integer',
        'total_rt' => 'integer',
        'total_rw' => 'integer',
        'total_dusun' => 'integer',
        'tidak_sekolah' => 'integer',
        'sd_sederajat' => 'integer',
        'smp_sederajat' => 'integer',
        'sma_sederajat' => 'integer',
        'diploma' => 'integer',
        'sarjana' => 'integer',
        'petani' => 'integer',
        'pedagang' => 'integer',
        'pns' => 'integer',
        'wiraswasta' => 'integer',
        'lainnya' => 'integer',
        'islam' => 'integer',
        'kristen' => 'integer',
        'katolik' => 'integer',
        'hindu' => 'integer',
        'budha' => 'integer',
        // Tempat Ibadah
        'masjid' => 'integer',
        'mushola' => 'integer',
        'gereja' => 'integer',
        'pura' => 'integer',
        'vihara' => 'integer',
        // Fasilitas Kesehatan
        'puskesmas' => 'integer',
        'posyandu' => 'integer',
        'klinik' => 'integer',
        // Fasilitas Olahraga
        'lapangan_sepakbola' => 'integer',
        'lapangan_voli' => 'integer',
        'lapangan_badminton' => 'integer',
        'gor' => 'integer',
        // Wisata
        'pantai' => 'integer',
        'taman' => 'integer',
        'cagar_budaya' => 'integer',
        'wisata_alam' => 'integer',
        // Migrasi Penduduk
        'penduduk_datang' => 'integer',
        'penduduk_keluar' => 'integer',
        'kelahiran' => 'integer',
        'kematian' => 'integer',
    ];
}
