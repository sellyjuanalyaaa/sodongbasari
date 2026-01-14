<?php

namespace App\Http\Controllers;

use App\Models\Budget;
use App\Models\Demographic;
use App\Models\Institution;
use App\Models\Post;
use App\Models\Potential;
use App\Models\VillageInfo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PublicController extends Controller
{
    private function getCommonProps()
    {
        return [
            'villageInfo' => VillageInfo::first(),
        ];
    }

    public function index()
    {
        return Inertia::render('Public/Home', array_merge($this->getCommonProps(), [
            'latestNews' => Post::where('category', 'news')->latest()->take(3)->get(),
            'announcements' => Post::where('category', 'announcement')->latest()->take(2)->get(),
            'stats' => [
                'population' => Demographic::where('type', 'gender')->sum('value'),
                'area' => '1500 Ha', // Static for now as field wasn't requested
            ]
        ]));
    }

    public function sodongBasari()
    {
        return Inertia::render('Public/SodongBasari', array_merge($this->getCommonProps(), []));
    }

    public function potentials()
    {
        return Inertia::render('Public/Potentials', array_merge($this->getCommonProps(), [
            'potentials' => Potential::all(),
        ]));
    }

    public function statistics()
    {
        return Inertia::render('Public/Statistics', array_merge($this->getCommonProps(), [
            'demographics' => Demographic::all(),
            'budgets' => Budget::orderBy('year', 'desc')->get(),
        ]));
    }

    public function services()
    {
        return Inertia::render('Public/Services', array_merge($this->getCommonProps(), [
            // Add services model if exists later
        ]));
    }

    public function news()
    {
        return Inertia::render('Public/News/Index', array_merge($this->getCommonProps(), [
            'posts' => Post::latest()->paginate(9),
        ]));
    }

    public function newsShow($slug)
    {
        $post = Post::where('slug', $slug)->firstOrFail();
        return Inertia::render('Public/News/Show', array_merge($this->getCommonProps(), [
            'post' => $post,
            'related' => Post::where('id', '!=', $post->id)->latest()->take(3)->get(),
        ]));
    }
}
