<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'published_at' => 'datetime',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function incrementViewCount()
    {
        $this->increment('view_count');
    }

    public function incrementLikesCount()
    {
        $this->increment('likes_count');
    }

    public function decrementLikesCount()
    {
        $this->decrement('likes_count');
    }
}
