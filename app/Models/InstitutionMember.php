<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InstitutionMember extends Model
{
    protected $fillable = [
        'institution_id',
        'name',
        'position',
        'photo',
        'order',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function institution()
    {
        return $this->belongsTo(Institution::class);
    }
}
