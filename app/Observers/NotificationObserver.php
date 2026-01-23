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

    private function createNotification(Model $model, string $action): void
    {
        $modelName = class_basename($model);
        $readableName = Str::title(Str::snake($modelName, ' '));
        $title = "Data {$readableName} " . ($action === 'created' ? 'Ditambahkan' : 'Diperbaharui');

        // Try to get a recognizable name from the model
        $itemName = $model->name ?? $model->title ?? $model->id;

        $message = "Data {$readableName} \"{$itemName}\" telah " . ($action === 'created' ? 'ditambahkan' : 'diperbaharui') . ".";

        // Determine action URL (simplified)
        // Adjust these route names based on your actual route structure
        $pluralModel = Str::plural(Str::kebab($modelName));
        $url = route("admin.{$pluralModel}.edit", $model->id);

        // Fallback if route might not exist or for index
        if (!\Illuminate\Support\Facades\Route::has("admin.{$pluralModel}.edit")) {
            $url = route("admin.{$pluralModel}.index");
        }

        Notification::create([
            'title' => $title,
            'message' => $message,
            'type' => 'info', // or 'success', 'warning'
            'action_text' => 'Lihat Detail',
            'action_url' => $url,
            'is_read' => false,
        ]);
    }
}
