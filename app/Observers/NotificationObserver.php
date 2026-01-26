<?php

namespace App\Observers;

use App\Models\Notification;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class NotificationObserver
{
    /**
     * Handle the Model "created" event.
     */
    public function created(Model $model): void
    {
        $this->createNotification($model, 'created');
    }

    /**
     * Handle the Model "updated" event.
     */
    public function updated(Model $model): void
    {
        // Avoid notifying for minor updates (logic can be refined)
        if ($model->wasChanged()) {
            $this->createNotification($model, 'updated');
        }
    }

    /**
     * Handle the Model "deleted" event.
     */
    public function deleted(Model $model): void
    {
        $this->createNotification($model, 'deleted');
    }

    private function createNotification(Model $model, string $action): void
    {
        $modelName = class_basename($model);
        $readableName = Str::title(Str::snake($modelName, ' '));

        $actionVerb = match ($action) {
            'created' => 'Ditambahkan',
            'updated' => 'Diperbaharui',
            'deleted' => 'Dihapus',
            default => 'Unknown'
        };

        $title = "Data {$readableName} {$actionVerb}";

        // Try to get a recognizable name from the model
        $itemName = $model->name ?? $model->title ?? $model->id;

        $message = "Data {$readableName} \"{$itemName}\" telah " . strtolower($actionVerb) . ".";

        $pluralModel = Str::plural(Str::kebab($modelName));

        // Map specific models to their route resources if they don't follow the plural-kebab-case convention
        $routeMap = [
            'VillageOfficial' => 'officials',
            'FormerVillageHead' => 'former-village-heads',
            'HomeStatistic' => 'home-statistics',
            'InstitutionMember' => 'institutions.members',
            'PotentialCategory' => 'potential-categories',
            'HeroImage' => 'hero-settings',
        ];

        $resourceName = $routeMap[$modelName] ?? $pluralModel;

        $url = route('admin.dashboard');

        // Only try to link to edit/view if not deleted
        if ($action !== 'deleted') {
            if (\Illuminate\Support\Facades\Route::has("admin.{$resourceName}.edit")) {
                $url = route("admin.{$resourceName}.edit", $model->id);
            } elseif (\Illuminate\Support\Facades\Route::has("admin.{$resourceName}.index")) {
                $url = route("admin.{$resourceName}.index");
            }
        } else {
            // If deleted, try to link to index
            if (\Illuminate\Support\Facades\Route::has("admin.{$resourceName}.index")) {
                $url = route("admin.{$resourceName}.index");
            }
        }

        Notification::create([
            'title' => $title,
            'message' => $message,
            'type' => $action === 'deleted' ? 'warning' : 'info',
            'action_text' => $action === 'deleted' ? 'Lihat Daftar' : 'Lihat Detail',
            'action_url' => $url,
            'is_read' => false,
        ]);
    }
}
