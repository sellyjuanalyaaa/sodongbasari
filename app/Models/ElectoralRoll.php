<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ElectoralRoll extends Model
{
    protected $fillable = [
        'year',
        'male_voters',
        'female_voters',
        'total_voters',
        'election_type',
    ];

    protected $casts = [
        'year' => 'integer',
        'male_voters' => 'integer',
        'female_voters' => 'integer',
        'total_voters' => 'integer',
    ];

    /**
     * Boot the model.
     */
    protected static function boot()
    {
        parent::boot();

        static::saving(function ($electoralRoll) {
            // Auto-calculate total if not provided
            if (empty($electoralRoll->total_voters)) {
                $electoralRoll->total_voters = $electoralRoll->male_voters + $electoralRoll->female_voters;
            }
        });
    }
}
