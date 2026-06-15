<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Gallery;
use Illuminate\Http\Request;

class AdminGalleryController extends Controller
{
    public function index()
    {
        return response()->json(Gallery::orderBy('sort_order')->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'required|string',
            'is_active' => 'required|boolean',
            'sort_order' => 'required|integer',
        ]);

        $gallery = Gallery::create($validated);

        return response()->json([
            'message' => 'Gallery item added successfully!',
            'gallery' => $gallery
        ], 201);
    }

    public function show($id)
    {
        $gallery = Gallery::findOrFail($id);
        return response()->json($gallery);
    }

    public function update(Request $request, $id)
    {
        $gallery = Gallery::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'required|string',
            'is_active' => 'required|boolean',
            'sort_order' => 'required|integer',
        ]);

        $gallery->update($validated);

        return response()->json([
            'message' => 'Gallery item updated successfully!',
            'gallery' => $gallery
        ]);
    }

    public function destroy($id)
    {
        $gallery = Gallery::findOrFail($id);
        $gallery->delete();

        return response()->json([
            'message' => 'Gallery item deleted successfully!'
        ]);
    }
}
