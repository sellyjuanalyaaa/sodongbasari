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
    ];
}
