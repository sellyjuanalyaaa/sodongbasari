<?php

namespace App\Http\Controllers;

use App\Models\Budget;
use App\Models\Demographic;
use App\Models\Institution;
use App\Models\Post;
use App\Models\Potential;
use App\Models\PotentialCategory;
use App\Models\Statistic;
use App\Models\VillageInfo;
use App\Models\VillageOfficial;
use App\Models\Visitor;
use Inertia\Inertia;

class PublicController extends Controller
{
    private function getCommonProps()
    {
        return [
            'villageInfo' => VillageInfo::first(),
            'visitorStats' => Visitor::getAllStats(),
        ];
    }

    public function index()
    {
        $categories = PotentialCategory::where('is_active', true)->get()->keyBy('name');

        return Inertia::render('Public/Home', array_merge($this->getCommonProps(), [
            'latestNews' => Post::with(['category', 'creator'])
                ->latest('published_at')
                ->take(3)
                ->get(),
            'stats' => [
                'population' => \App\Models\Demographic::orderBy('year', 'desc')->get()->first()?->total_male + \App\Models\Demographic::orderBy('year', 'desc')->get()->first()?->total_female ?? 0,
                'area' => '1500 Ha',
            ],
            'heroImages' => \App\Models\HeroImage::where('is_active', true)->orderBy('order')->get(),
            'homeStatistics' => \App\Models\HomeStatistic::where('is_active', true)->orderBy('order')->get(),
            'officials' => VillageOfficial::where('is_active', true)->orderBy('order')->take(8)->get(),
            'categoryColors' => $categories->mapWithKeys(function ($cat) {
                return [$cat->name => $cat->color];
            }),
        ]));
    }

    public function sodongBasari()
    {
        return Inertia::render('Public/SodongBasari', array_merge($this->getCommonProps(), [
            'officials' => VillageOfficial::where('is_active', true)->orderBy('order')->get(),
            'institutions' => Institution::all(),
            'formerHeads' => \App\Models\FormerVillageHead::orderBy('start_year', 'desc')->get(),
        ]));
    }

    public function potentials()
    {
        $categories = PotentialCategory::where('is_active', true)->get()->keyBy('name');

        // Map Tailwind gradient to solid hex color
        $colorMap = [
            'from-emerald-500 to-teal-500' => '#10b981', // Emerald-500
            'from-yellow-500 to-amber-500' => '#eab308', // Yellow-500
            'from-green-600 to-lime-600' => '#16a34a', // Green-600
            'from-purple-500 to-indigo-500' => '#a855f7', // Purple-500
            'from-red-500 to-rose-500' => '#ef4444', // Red-500
        ];

        $potentials = Potential::all()->map(function ($potential) use ($categories, $colorMap) {
            $category = $categories->get($potential->category);
            $hexColor = '#EFA00B'; // Default orange

            if ($category && isset($colorMap[$category->color])) {
                $hexColor = $colorMap[$category->color];
            }

            return array_merge($potential->toArray(), [
                'category_color' => $hexColor
            ]);
        });

        return Inertia::render('Public/Potentials', array_merge($this->getCommonProps(), [
            'potentials' => $potentials,
            'categoryColors' => $categories->mapWithKeys(function ($cat) use ($colorMap) {
                return [$cat->name => $colorMap[$cat->color] ?? '#EFA00B'];
            }),
        ]));
    }

    public function potentialShow($id)
    {
        $potential = Potential::with('creator')->findOrFail($id);

        return Inertia::render('Public/PotentialDetail', array_merge($this->getCommonProps(), [
            'potential' => $potential,
            'relatedPotentials' => Potential::where('id', '!=', $id)
                ->where('category', $potential->category)
                ->take(3)
                ->get(),
        ]));
    }

    public function statistics()
    {
        $latestStatistic = Statistic::orderBy('year', 'desc')->first();
        $historicalStatistics = Statistic::orderBy('year', 'asc')->take(5)->get(); // Get up to 5 years data

        return Inertia::render('Public/Statistics', array_merge($this->getCommonProps(), [
            'statistics' => $latestStatistic,
            'historicalStatistics' => $historicalStatistics,
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
        $mostTrending = Post::with('category')
            ->orderBy('view_count', 'desc')
            ->take(5)
            ->get();

        return Inertia::render('Public/News/Index', array_merge($this->getCommonProps(), [
            'posts' => Post::with('category')->latest()->paginate(9),
            'mostTrending' => $mostTrending,
        ]));
    }

    public function newsShow($slug)
    {
        $post = Post::with(['category', 'creator'])->where('slug', $slug)->firstOrFail();

        // Increment view count
        $post->incrementViewCount();

        return Inertia::render('Public/News/Show', array_merge($this->getCommonProps(), [
            'post' => $post,
            'related' => Post::where('id', '!=', $post->id)->latest()->take(3)->get(),
        ]));
    }

    public function institutionShow($id)
    {
        $institution = Institution::with('activeMembers')->findOrFail($id);

        return Inertia::render('Public/InstitutionDetail', array_merge($this->getCommonProps(), [
            'institution' => $institution,
        ]));
    }
}
