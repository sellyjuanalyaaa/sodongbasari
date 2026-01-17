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
    // Route::get('/layanan', 'services')->name('services'); // Layanan Desa - Ditiadakan
    Route::get('/news', 'news')->name('news.index');
    Route::get('/news/{slug}', 'newsShow')->name('news.show');
    Route::get('/lembaga/{id}', 'institutionShow')->name('institution.show');
});

// Admin/Auth Routes
// Fix default redirect to /dashboard
Route::get('/dashboard', function () {
    return redirect()->route('admin.dashboard');
})->middleware(['auth', 'verified']);

// Admin Routes
Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [\App\Http\Controllers\Admin\DashboardController::class, 'index'])->name('dashboard');
    
    // CRUD Resources
    Route::resource('posts', \App\Http\Controllers\Admin\PostController::class);
    Route::resource('potentials', \App\Http\Controllers\Admin\PotentialController::class);
    Route::resource('institutions', \App\Http\Controllers\Admin\InstitutionController::class);
    Route::resource('institutions.members', \App\Http\Controllers\Admin\InstitutionMemberController::class);
    Route::resource('demographics', \App\Http\Controllers\Admin\DemographicController::class);
    Route::resource('budgets', \App\Http\Controllers\Admin\BudgetController::class);
    Route::resource('statistics', \App\Http\Controllers\Admin\StatisticController::class);
    Route::resource('officials', \App\Http\Controllers\Admin\VillageOfficialController::class);
    
    // Settings
    Route::get('/hero-settings', [\App\Http\Controllers\Admin\HeroController::class, 'edit'])->name('hero.edit');
    Route::post('/hero-settings', [\App\Http\Controllers\Admin\HeroController::class, 'store'])->name('hero.store'); // Changed to store for adding
    Route::delete('/hero-settings/{heroImage}', [\App\Http\Controllers\Admin\HeroController::class, 'destroy'])->name('hero.destroy');
});

require __DIR__.'/settings.php';
