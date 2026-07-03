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

// ─── PUBLIC AUTH (Rate-limited: 5 attempts per minute per IP) ───────────────
Route::middleware('throttle:5,1')->post('/login', [AuthController::class, 'login']);

// ─── PUBLIC SITE FRONTEND ────────────────────────────────────────────────────
Route::middleware('throttle:5,1')->post('/contact', [ContactController::class, 'store']);
Route::middleware('throttle:60,1')->group(function () {
    Route::get('/blogs', [BlogController::class, 'index']);
    Route::get('/blogs/{slug}', [BlogController::class, 'show']);
    Route::get('/galleries', [GalleryController::class, 'index']);
    Route::get('/settings', [SettingController::class, 'index']);
    Route::get('/hero-slides', function () {
        return response()->json(App\Models\HeroSlide::orderBy('sort_order')->get());
    });
});

// ─── AUTHENTICATED ADMIN API (Sanctum + throttle 120/min) ───────────────────
Route::middleware(['auth:sanctum', 'throttle:120,1'])->group(function () {
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

// NOTE: The /migrate-live-db route has been removed for security.
// Run migrations via: php artisan migrate --force (SSH only)
