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
        ]);

        $villageInfo = VillageInfo::first();
        
        if (!$villageInfo) {
            $villageInfo = VillageInfo::create([
                'name' => 'Desa Sodong Basari',
                'description' => '',
            ]);
        }
        
        $villageInfo->update($validated);

        return redirect()->route('admin.village-info.edit')
            ->with('success', 'Visi & Misi berhasil diperbarui');
    }
}
