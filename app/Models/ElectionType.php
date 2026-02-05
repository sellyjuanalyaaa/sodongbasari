<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ElectionType extends Model
{
    protected $fillable = [
        'name',
        'description',
        'order',
    ];

    protected $casts = [
        'order' => 'integer',
    ];

    /**
     * Get electoral rolls for this election type
     */
    public function electoralRolls()
    {
        return $this->hasMany(ElectoralRoll::class, 'election_type', 'name');
    }
}
