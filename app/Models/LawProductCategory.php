<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LawProductCategory extends Model
{
    protected $fillable = [
        'name',
        'description',
        'icon',
        'color',
    ];
}
