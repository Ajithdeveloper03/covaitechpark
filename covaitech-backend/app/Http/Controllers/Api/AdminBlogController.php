<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class AdminBlogController extends Controller
{
    public function index()
    {
        return response()->json(Blog::latest()->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'excerpt' => 'nullable|string',
            'content' => 'required|array',
            'bullets' => 'nullable|array',
            'faqs' => 'nullable|array',
            'image' => 'nullable|string',
            'is_published' => 'required|boolean',
            'published_at' => 'nullable|date',
        ]);

        // Generate clean unique slug
        $slug = Str::slug($validated['title']);
        $originalSlug = $slug;
        $count = 1;
        while (Blog::where('slug', $slug)->exists()) {
            $slug = $originalSlug . '-' . $count++;
        }
        $validated['slug'] = $slug;

        $blog = Blog::create($validated);

        return response()->json([
            'message' => 'Blog post created successfully!',
            'blog' => $blog
        ], 201);
    }

    public function show($id)
    {
        $blog = Blog::findOrFail($id);
        return response()->json($blog);
    }

    public function update(Request $request, $id)
    {
        $blog = Blog::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'excerpt' => 'nullable|string',
            'content' => 'required|array',
            'bullets' => 'nullable|array',
            'faqs' => 'nullable|array',
            'image' => 'nullable|string',
            'is_published' => 'required|boolean',
            'published_at' => 'nullable|date',
        ]);

        if ($blog->title !== $validated['title']) {
            $slug = Str::slug($validated['title']);
            $originalSlug = $slug;
            $count = 1;
            while (Blog::where('slug', $slug)->where('id', '!=', $id)->exists()) {
                $slug = $originalSlug . '-' . $count++;
            }
            $validated['slug'] = $slug;
        }

        $blog->update($validated);

        return response()->json([
            'message' => 'Blog post updated successfully!',
            'blog' => $blog
        ]);
    }

    public function destroy($id)
    {
        $blog = Blog::findOrFail($id);
        $blog->delete();

        return response()->json([
            'message' => 'Blog post deleted successfully!'
        ]);
    }
}
