<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FormerVillageHead extends Model
{
    protected $fillable = [
        'name',
        'photo',
        'start_year',
        'end_year',
        'achievement',
        'order',
    ];

    protected $casts = [
        'start_year' => 'integer',
        'end_year' => 'integer',
    ];
}
