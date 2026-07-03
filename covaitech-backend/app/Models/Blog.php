<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    protected $fillable = [
        'title', 'slug', 'category', 'excerpt', 'content', 'bullets', 'faqs',
        'image', 'is_published', 'published_at', 'schema',
        // SEO fields
        'meta_title', 'meta_description', 'meta_keywords',
        'og_image', 'canonical_url', 'focus_keyword',
    ];

    protected $casts = [
        'content' => 'array',
        'bullets' => 'array',
        'faqs' => 'array',
        'is_published' => 'boolean',
        'published_at' => 'datetime',
    ];
}
