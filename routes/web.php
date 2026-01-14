<?php

use App\Http\Controllers\PublicController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Public Routes (Village Website)
Route::controller(PublicController::class)->group(function () {
    Route::get('/', 'index')->name('home');
    Route::get('/sodong-basari', 'sodongBasari')->name('sodong-basari');
    Route::get('/statistik', 'statistics')->name('statistics'); // Statistik Desa
    Route::get('/potensi', 'potentials')->name('potentials'); // Potensi Desa
    Route::get('/layanan', 'services')->name('services'); // Layanan Desa
    Route::get('/news', 'news')->name('news.index');
    Route::get('/news/{slug}', 'newsShow')->name('news.show');
});

// Admin/Auth Routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
