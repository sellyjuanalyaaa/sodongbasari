<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Institution;
use App\Models\InstitutionMember;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class InstitutionMemberController extends Controller
{
    public function index(Institution $institution)
    {
        $institution->load('members');
        return Inertia::render('Admin/InstitutionMembers/Index', [
            'institution' => $institution,
            'members' => $institution->members
        ]);
    }

    public function create(Institution $institution)
    {
        return Inertia::render('Admin/InstitutionMembers/Form', [
            'institution' => $institution
        ]);
    }

    public function store(Request $request, Institution $institution)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'order' => 'required|integer|min:0',
            'is_active' => 'boolean',
        ]);

        $photoPath = null;
        if ($request->hasFile('photo')) {
            $path = $request->file('photo')->store('institution-members', 'public');
            $photoPath = "/storage/$path";
        }

        $institution->members()->create([
            'name' => $validated['name'],
            'position' => $validated['position'],
            'photo' => $photoPath,
            'order' => $validated['order'],
            'is_active' => $validated['is_active'] ?? true,
        ]);

        return to_route('admin.institutions.members.index', $institution)->with('success', 'Anggota berhasil ditambahkan.');
    }

    public function edit(Institution $institution, InstitutionMember $member)
    {
        return Inertia::render('Admin/InstitutionMembers/Form', [
            'institution' => $institution,
            'member' => $member
        ]);
    }

    public function update(Request $request, Institution $institution, InstitutionMember $member)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'remove_photo' => 'nullable|boolean',
            'order' => 'required|integer|min:0',
            'is_active' => 'boolean',
        ]);

        $updateData = [
            'name' => $validated['name'],
            'position' => $validated['position'],
            'order' => $validated['order'],
            'is_active' => $validated['is_active'] ?? true,
        ];

        // Handle photo removal
        if ($request->input('remove_photo') && $member->photo) {
            $oldPath = str_replace('/storage/', '', $member->photo);
            Storage::disk('public')->delete($oldPath);
            $updateData['photo'] = null;
        }

        // Handle new photo upload
        if ($request->hasFile('photo')) {
            if ($member->photo) {
                $oldPath = str_replace('/storage/', '', $member->photo);
                Storage::disk('public')->delete($oldPath);
            }
            $path = $request->file('photo')->store('institution-members', 'public');
            $updateData['photo'] = "/storage/$path";
        }

        $member->update($updateData);

        return to_route('admin.institutions.members.index', $institution)->with('success', 'Anggota berhasil diperbarui.');
    }

    public function destroy(Institution $institution, InstitutionMember $member)
    {
        if ($member->photo) {
            $oldPath = str_replace('/storage/', '', $member->photo);
            Storage::disk('public')->delete($oldPath);
        }
        $member->delete();

        return to_route('admin.institutions.members.index', $institution)->with('success', 'Anggota berhasil dihapus.');
    }
}

