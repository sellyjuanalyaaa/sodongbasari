<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Institution extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'abbreviation',
        'description',
        'leader_name',
        'logo_path',
    ];

    public function members()
    {
        return $this->hasMany(InstitutionMember::class)->orderBy('order');
    }

    public function activeMembers()
    {
        return $this->hasMany(InstitutionMember::class)->where('is_active', true)->orderBy('order');
    }
}
