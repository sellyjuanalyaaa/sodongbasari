<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HeroImage extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function getImagePathAttribute($value)
    {
        // Fix for incorrect paths that might be stored in database (e.g. from previous seeders)
        // Replaces /storage/app/public/ with /storage/ to ensure valid public URLs
        return str_replace('/storage/app/public/', '/storage/', $value);
    }
}
