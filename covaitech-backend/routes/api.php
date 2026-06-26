<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\BlogController;
use App\Http\Controllers\Api\GalleryController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UploadController;
use App\Http\Controllers\Api\AdminBlogController;
use App\Http\Controllers\Api\AdminGalleryController;
use App\Http\Controllers\Api\AdminHeroSlideController;
use App\Http\Controllers\Api\AdminContactController;
use App\Http\Controllers\Api\SettingController;

// Public Auth Endpoints
Route::post('/login', [AuthController::class, 'login']);

// Public Site Frontend Fetching
Route::middleware('throttle:5,1')->post('/contact', [ContactController::class, 'store']);
Route::get('/blogs', [BlogController::class, 'index']);
Route::get('/blogs/{slug}', [BlogController::class, 'show']);
Route::get('/galleries', [GalleryController::class, 'index']);
Route::get('/settings', [SettingController::class, 'index']);
Route::get('/hero-slides', function() {
    return response()->json(App\Models\HeroSlide::orderBy('sort_order')->get());
});

// Secure Authenticated Admin Dashboard API Group
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    
    // Media Upload
    Route::post('/admin/upload', [UploadController::class, 'upload']);
    
    // Administrative CRUD Resource Channels
    Route::apiResource('/admin/blogs', AdminBlogController::class);
    Route::apiResource('/admin/galleries', AdminGalleryController::class);
    Route::apiResource('/admin/hero-slides', AdminHeroSlideController::class);
    Route::apiResource('/admin/contacts', AdminContactController::class)->only(['index', 'show', 'destroy']);
    Route::post('/admin/settings', [SettingController::class, 'update']);
});


Route::get('/migrate-live-db', function () {
    \Illuminate\Support\Facades\Artisan::call('migrate:fresh', ['--force' => true, '--seed' => true]);
    return 'Migrations and Seeding completed successfully! Database is ready.';
});
