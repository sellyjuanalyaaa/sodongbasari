<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Demographic extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'year' => 'integer',
        'total_male' => 'integer',
        'total_female' => 'integer',
        'total_families' => 'integer',
        'mutation_in' => 'integer',
        'mutation_out' => 'integer',
    ];

    protected $appends = ['total_population'];

    public function getTotalPopulationAttribute()
    {
        return $this->total_male + $this->total_female;
    }
}
