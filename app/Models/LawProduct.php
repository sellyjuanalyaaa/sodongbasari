<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class LawProduct extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'category_id',
        'description',
        'establish',
        'path',
        'status',
        'downloads',
    ];

    protected $casts = [
        'establish' => 'date',
    ];

    protected $appends = [
        'extension',
        'file_size',
    ];

    public function getExtensionAttribute()
    {
        return strtoupper(
            pathinfo($this->path, PATHINFO_EXTENSION)
        );
    }

    function formatBytes($bytes, $precision = 2)
    {
        $units = ['B', 'KB', 'MB', 'GB', 'TB'];
        $bytes = max($bytes, 0);
        $pow = floor(($bytes ? log($bytes) : 0) / log(1024));
        $pow = min($pow, count($units) - 1);
        $bytes /= pow(1024, $pow);
        return round($bytes, $precision) . ' ' . $units[$pow];
    }

    public function getFileSizeAttribute()
    {
        $path = Storage::disk('public')->path($this->path);
        if (!file_exists($path)) {
            return '-';
        }

        return $this->formatBytes(filesize($path));
    }

    // slug handle
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($lawProduct) {
            if (empty($lawProduct->slug)) {
                $lawProduct->slug = Str::slug($lawProduct->title);
            }
        });

        static::updating(function ($lawProduct) {
            if (empty($lawProduct->slug)) {
                $lawProduct->slug = Str::slug($lawProduct->title);
            }
            if ($lawProduct->isDirty('title') && !$lawProduct->isDirty('slug')) {
                $lawProduct->slug = Str::slug($lawProduct->title);
            }
        });
    }

    public function category()
    {
        return $this->belongsTo(LawProductCategory::class);
    }
}
