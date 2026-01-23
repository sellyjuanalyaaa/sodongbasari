<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HomeStatistic extends Model
{
    protected $fillable = [
        'title',
        'subtitle',
        'type',
        'image_path',
        'data',
        'order',
        'is_active',
    ];

    protected $casts = [
        'data' => 'array',
        'is_active' => 'boolean',
    ];
}
