<?php

namespace App\Http\Controllers;

use App\Models\Budget;
use App\Models\Demographic;
use App\Models\Institution;
use App\Models\LawProduct;
use App\Models\LawProductCategory;
use App\Models\Post;
use App\Models\Potential;
use App\Models\PotentialCategory;
use App\Models\Statistic;
use App\Models\VillageInfo;
use App\Models\VillageOfficial;
use App\Models\Visitor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
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

        $latestStat = \App\Models\Statistic::orderBy('year', 'desc')->first();

        $likedPosts = session()->get('liked_posts', []);

        return Inertia::render('Public/Home', array_merge($this->getCommonProps(), [
            'latestNews' => Post::with(['category', 'creator'])
                ->latest('published_at')
                ->take(3)
                ->get(),
            'stats' => [
                'population' => $latestStat ? ($latestStat->male_population + $latestStat->female_population) : 0,
                'families' => $latestStat ? $latestStat->total_families : 0,
                'area' => '1500 Ha', // You might want to make this dynamic later or keep it static
            ],
            'heroImages' => \App\Models\HeroImage::where('is_active', true)->orderBy('order')->get(),
            'homeStatistics' => \App\Models\HomeStatistic::where('is_active', true)->orderBy('order')->get(),
            'officials' => VillageOfficial::where('is_active', true)->orderBy('order')->take(8)->get(),
            'categoryColors' => $categories->mapWithKeys(function ($cat) {
                return [$cat->name => $cat->color];
            }),
            'likedPosts' => $likedPosts,
        ]));
    }

    public function sodongBasari()
    {
        return Inertia::render('Public/SodongBasari', array_merge($this->getCommonProps(), [
            'officials' => VillageOfficial::where('is_active', true)->orderBy('order')->get(),
            'institutions' => Institution::all(),
            'formerHeads' => \App\Models\FormerVillageHead::orderBy('order', 'asc')->get(),
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

        $potentials = Potential::with('creator')->get()->map(function ($potential) use ($categories, $colorMap) {
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

    public function statistics(\Illuminate\Http\Request $request)
    {
        $year = $request->input('year');

        // Get available years for archive list
        $availableYears = Statistic::orderBy('year', 'desc')->pluck('year');

        // Determine which statistic to show
        if ($year) {
            $statistic = Statistic::where('year', $year)->first();
        } else {
            $statistic = Statistic::orderBy('year', 'desc')->first();
        }

        // If requested year not found, fallback to latest
        if (!$statistic && $availableYears->isNotEmpty()) {
            $statistic = Statistic::where('year', $availableYears->first())->first();
        }

        $historicalStatistics = Statistic::orderBy('year', 'asc')->get(); // All data for charts

        $demographics = Demographic::orderBy('year', 'desc')->get(); // Archive data for "Data Kependudukan"

        $electoralRolls = \App\Models\ElectoralRoll::orderBy('year', 'desc')->get(); // Data Pemilih Tetap

        return Inertia::render('Public/Statistics', array_merge($this->getCommonProps(), [
            'statistics' => $statistic,
            'historicalStatistics' => $historicalStatistics,
            'availableYears' => $availableYears,
            'selectedYear' => $statistic ? $statistic->year : null,
            'demographics' => $demographics,
            'budgets' => Budget::orderBy('year', 'desc')->get(),
            'electoralRolls' => $electoralRolls,
            // 'boundary' => json_decode(Storage::disk('public')->get('geojson/batas_desa.json')),
            // 'boundary' => json_decode(file_get_contents(public_path('geojson/batas_desa.json'))),
        ]));
    }

    public function laws(Request $request)
    {
        $lawProduct = LawProduct::query()
            ->with('category')
            ->when($request->search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('title', 'like', "%{$search}%")
                        ->orWhere('description', 'like', "%{$search}%");
                });
            })
            ->when($request->category, function ($query, $category) {
                $query->where('category_id', $category);
            })
            ->when($request->years, function ($query, $years) {
                $query->whereYear('establish', $years);
            })
            ->when($request->status, function ($query, $status) {
                $query->where('status', $status);
            })
            ->when($request->sorting, function ($query, $sorting) {
                match ($sorting) {
                    'popular' => $query->orderByDesc('downloads'),
                    'oldest' => $query->orderBy('establish'),
                    'a-z' => $query->orderBy('title'),
                    'z-a' => $query->orderByDesc('title'),
                    default => $query->latest('establish'),
                };
            }, function ($query) {
                $query->latest('establish');
            })
            ->paginate(6)
            ->withQueryString();

        $years = LawProduct::selectRaw('YEAR(establish) as year')
            ->distinct()
            ->orderByDesc('year')
            ->pluck('year');

        return Inertia::render('Public/LawProducts/Index', array_merge(
            $this->getCommonProps(),
            [
                'lawProducts' => $lawProduct,
                'stats' => [
                    'totalCat' => LawProductCategory::count(),
                    'docThisYear' => LawProduct::whereYear('establish', now()->year)->count(),
                    'lastUpdate' => LawProduct::max('updated_at') ?? LawProduct::max('created_at'),
                ],
                'category' => LawProductCategory::select('id', 'name', 'icon', 'color')
                    ->orderBy('name')
                    ->get(),
                'years' => $years,
                'filters' => $request->only([
                    'search',
                    'category',
                    'years',
                    'status',
                    'sorting',
                ]),
            ]
        ));
    }

    public function lawShow(String $slug)
    {
        $lawProduct = LawProduct::where('slug', $slug)->with('category')->firstOrFail();
        $related = LawProduct::query()
            ->where('id', '!=', $lawProduct->id)
            ->orderByDesc('establish')
            ->take(4)
            ->get()
            ->values();

        return Inertia::render('Public/LawProducts/Show', array_merge($this->getCommonProps(), [
            'lawProduct' => [
                ...$lawProduct->toArray(),
                'fileUrl' => route('laws.open', $lawProduct->slug)
            ],
            'related' => $related,
        ]));
    }

    /**
     * Open pdf file for preview.
     */
    public function openPDF(String $slug)
    {
        $lawProduct = LawProduct::where('slug', $slug)->firstOrFail();
        $path = Storage::disk('public')->path($lawProduct->path);

        if (!$lawProduct->path || !Storage::disk('public')->exists($lawProduct->path)) {
            abort(404, 'Dokumen tidak ditemukan.');
        }

        return response()->file($path);
    }

    /**
     * Download pdf file.
     */
    public function downloadPDF(String $slug)
    {
        $lawProduct = LawProduct::where('slug', $slug)->firstOrFail();
        $path = Storage::disk('public')->path($lawProduct->path);

        if (!$lawProduct->path || !Storage::disk('public')->exists($lawProduct->path)) {
            abort(404, 'Dokumen tidak ditemukan.');
        }

        $lawProduct->increment('downloads');

        return response()->download($path);
    }

    public function services()
    {
        return Inertia::render('Public/Services', array_merge($this->getCommonProps(), [
            // Add services model if exists later
        ]));
    }

    public function news()
    {
        $mostTrending = Post::with(['category', 'creator'])
            ->orderBy('view_count', 'desc')
            ->take(5)
            ->get();

        $likedPosts = session()->get('liked_posts', []);

        return Inertia::render('Public/News/Index', array_merge($this->getCommonProps(), [
            'posts' => Post::with(['category', 'creator'])->latest()->paginate(9),
            'mostTrending' => $mostTrending,
            'likedPosts' => $likedPosts,
        ]));
    }

    public function newsShow($slug)
    {
        $post = Post::with(['category', 'creator'])->where('slug', $slug)->firstOrFail();

        // Increment view count
        $post->incrementViewCount();

        $likedPosts = session()->get('liked_posts', []);

        return Inertia::render('Public/News/Show', array_merge($this->getCommonProps(), [
            'post' => $post,
            'related' => Post::where('id', '!=', $post->id)->latest()->take(3)->get(),
            'likedPosts' => $likedPosts,
        ]));
    }

    public function institutionShow($id)
    {
        $institution = Institution::with('activeMembers')->findOrFail($id);

        return Inertia::render('Public/InstitutionDetail', array_merge($this->getCommonProps(), [
            'institution' => $institution,
        ]));
    }

    public function toggleLike($id)
    {
        $post = Post::findOrFail($id);

        // Get liked posts from session
        $likedPosts = session()->get('liked_posts', []);

        // Check if already liked
        if (in_array($id, $likedPosts)) {
            // Unlike: remove from session and decrement
            $likedPosts = array_diff($likedPosts, [$id]);
            $post->decrementLikesCount();
            $isLiked = false;
        } else {
            // Like: add to session and increment
            $likedPosts[] = $id;
            $post->incrementLikesCount();
            $isLiked = true;
        }

        // Update session
        session()->put('liked_posts', $likedPosts);

        // Refresh post to get updated likes_count
        $post->refresh();

        return response()->json([
            'success' => true,
            'likes_count' => $post->likes_count,
            'is_liked' => $isLiked,
        ]);
    }
}
