<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\HeroSlide;
use Illuminate\Http\Request;

class AdminHeroSlideController extends Controller
{
    public function index()
    {
        return response()->json(HeroSlide::orderBy('sort_order')->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'image' => 'required|string',
            'label' => 'nullable|string|max:255',
            'meta' => 'nullable|string|max:255',
            'sort_order' => 'required|integer',
        ]);

        $slide = HeroSlide::create($validated);

        return response()->json([
            'message' => 'Hero slide added successfully!',
            'slide' => $slide
        ], 201);
    }

    public function show($id)
    {
        $slide = HeroSlide::findOrFail($id);
        return response()->json($slide);
    }

    public function update(Request $request, $id)
    {
        $slide = HeroSlide::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'image' => 'required|string',
            'label' => 'nullable|string|max:255',
            'meta' => 'nullable|string|max:255',
            'sort_order' => 'required|integer',
        ]);

        $slide->update($validated);

        return response()->json([
            'message' => 'Hero slide updated successfully!',
            'slide' => $slide
        ]);
    }

    public function destroy($id)
    {
        $slide = HeroSlide::findOrFail($id);
        $slide->delete();

        return response()->json([
            'message' => 'Hero slide deleted successfully!'
        ]);
    }
}
