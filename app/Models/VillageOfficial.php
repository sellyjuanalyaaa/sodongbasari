<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VillageOfficial extends Model
{
    protected $fillable = [
        'name',
        'position',
        'photo',
        'order',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function getPhotoAttribute($value)
    {
        if (!$value)
            return null;
        // Clean up path if it contains duplicate /storage prefixes or absolute paths
        return str_replace('/storage/app/public/', '/storage/', $value);
    }
}
