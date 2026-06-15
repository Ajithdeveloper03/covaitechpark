<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    protected $fillable = ['title', 'slug', 'category', 'excerpt', 'content', 'bullets', 'faqs', 'image', 'is_published', 'published_at'];

    protected $casts = [
        'content' => 'array',
        'bullets' => 'array',
        'faqs' => 'array',
        'is_published' => 'boolean',
        'published_at' => 'datetime',
    ];
}
