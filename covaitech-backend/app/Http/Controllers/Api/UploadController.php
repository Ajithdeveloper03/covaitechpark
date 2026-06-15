<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UploadController extends Controller
{
    public function upload(Request $request)
    {
        $request->validate([
            'file' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:10240', // Max 10MB
            'folder' => 'nullable|string'
        ]);

        $folder = $request->input('folder', 'uploads');

        if ($request->hasFile('file')) {
            $path = $request->file('file')->store($folder, 'public');
            
            return response()->json([
                'path' => $path,
                'url' => asset('storage/' . $path)
            ]);
        }

        return response()->json(['error' => 'No file uploaded'], 400);
    }
}
