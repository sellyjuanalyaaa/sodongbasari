<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        \App\Models\Post::observe(\App\Observers\NotificationObserver::class);
        \App\Models\Potential::observe(\App\Observers\NotificationObserver::class);
        \App\Models\Institution::observe(\App\Observers\NotificationObserver::class);
        \App\Models\VillageOfficial::observe(\App\Observers\NotificationObserver::class);
        \App\Models\Slider::observe(\App\Observers\NotificationObserver::class);
        \App\Models\VillageInfo::observe(\App\Observers\NotificationObserver::class);
        \App\Models\Budget::observe(\App\Observers\NotificationObserver::class);
        \App\Models\Demographic::observe(\App\Observers\NotificationObserver::class);
    }
}
