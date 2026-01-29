<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\VillageInfo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VillageInfoController extends Controller
{
    public function edit()
    {
        $villageInfo = VillageInfo::first();

        if (!$villageInfo) {
            $villageInfo = VillageInfo::create([
                'name' => 'Desa Sodong Basari',
                'description' => '',
                'vision' => '',
                'mission' => '',
            ]);
        }

        return Inertia::render('Admin/VillageInfo/Edit', [
            'villageInfo' => $villageInfo,
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'vision' => 'nullable|string',
            'mission' => 'nullable|string',
            'head_of_village_name' => 'nullable|string|max:255',
            'welcome_message' => 'nullable|string',
            'head_of_village_photo' => 'nullable|image|mimes:jpeg,jpg,png|max:2048',
        ]);

        $villageInfo = VillageInfo::first();

        if (!$villageInfo) {
            $villageInfo = VillageInfo::create([
                'name' => 'Desa Sodong Basari',
                'description' => '',
            ]);
        }

        \Illuminate\Support\Facades\Log::info('VillageInfo Update Attempt', [
            'user' => auth()->id(),
            'has_file' => $request->hasFile('head_of_village_photo')
        ]);

        // Handle photo upload
        if ($request->hasFile('head_of_village_photo')) {
            try {
                // Delete old photo if exists
                if ($villageInfo->head_of_village_photo) {
                    \Storage::disk('public')->delete($villageInfo->head_of_village_photo);
                }

                $path = $request->file('head_of_village_photo')->store('village-head', 'public');
                $validated['head_of_village_photo'] = '/storage/' . $path;

                \Illuminate\Support\Facades\Log::info('VillageInfo Photo Uploaded', ['path' => $path]);
            } catch (\Exception $e) {
                \Illuminate\Support\Facades\Log::error('VillageInfo Photo Upload Failed', [
                    'error' => $e->getMessage(),
                    'trace' => $e->getTraceAsString()
                ]);
                return back()->withErrors(['head_of_village_photo' => 'Gagal mengupload foto. Cek log server.']);
            }
        }

        $villageInfo->update($validated);

        return redirect()->route('admin.village-info.edit')
            ->with('success', 'Informasi desa berhasil diperbarui');
    }
}
