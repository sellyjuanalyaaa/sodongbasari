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
    Route::get('/potensi/{id}', 'potentialShow')->name('potentials.show'); // Detail Potensi
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
Route::middleware(['auth', 'verified', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [\App\Http\Controllers\Admin\DashboardController::class, 'index'])->name('dashboard');

    // CRUD Resources
    Route::resource('posts', \App\Http\Controllers\Admin\PostController::class);
    Route::resource('categories', \App\Http\Controllers\Admin\CategoryController::class);
    Route::resource('sliders', \App\Http\Controllers\Admin\SliderController::class);
    Route::resource('potentials', \App\Http\Controllers\Admin\PotentialController::class);
    Route::resource('potential-categories', \App\Http\Controllers\Admin\PotentialCategoryController::class);
    Route::resource('institutions', \App\Http\Controllers\Admin\InstitutionController::class);
    Route::resource('institutions.members', \App\Http\Controllers\Admin\InstitutionMemberController::class);
    Route::resource('demographics', \App\Http\Controllers\Admin\DemographicController::class);
    Route::resource('budgets', \App\Http\Controllers\Admin\BudgetController::class);
    Route::resource('statistics', \App\Http\Controllers\Admin\StatisticController::class);
    Route::resource('officials', \App\Http\Controllers\Admin\VillageOfficialController::class);
    Route::resource('former-village-heads', \App\Http\Controllers\Admin\FormerVillageHeadController::class);
    Route::resource('home-statistics', \App\Http\Controllers\Admin\HomeStatisticController::class);

    // Visitors
    Route::get('/visitors', [\App\Http\Controllers\Admin\VisitorController::class, 'index'])->name('visitors.index');

    // Notifications
    Route::get('/notifications', [\App\Http\Controllers\Admin\NotificationController::class, 'index'])->name('notifications.index');
    Route::post('/notifications/{id}/mark-as-read', [\App\Http\Controllers\Admin\NotificationController::class, 'markAsRead'])->name('notifications.mark-as-read');
    Route::post('/notifications/mark-all-read', [\App\Http\Controllers\Admin\NotificationController::class, 'markAllAsRead'])->name('notifications.mark-all-read');
    Route::delete('/notifications/{id}', [\App\Http\Controllers\Admin\NotificationController::class, 'destroy'])->name('notifications.destroy');

    // Village Info
    Route::get('/village-info', [\App\Http\Controllers\Admin\VillageInfoController::class, 'edit'])->name('village-info.edit');
    Route::post('/village-info', [\App\Http\Controllers\Admin\VillageInfoController::class, 'update'])->name('village-info.update');

    // Settings
    Route::get('/hero-settings', [\App\Http\Controllers\Admin\HeroController::class, 'edit'])->name('hero.edit');
    Route::post('/hero-settings', [\App\Http\Controllers\Admin\HeroController::class, 'store'])->name('hero.store'); // Changed to store for adding
    Route::delete('/hero-settings/{heroImage}', [\App\Http\Controllers\Admin\HeroController::class, 'destroy'])->name('hero.destroy');
});

require __DIR__ . '/settings.php';
