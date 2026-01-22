<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Budget;
use App\Models\Demographic;
use App\Models\Post;
use App\Models\Potential;
use App\Models\Visitor;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'total_posts' => Post::count(),
                'total_potentials' => Potential::count(),
                'total_budget' => Budget::sum('amount'),
                'total_population' => Demographic::orderBy('year', 'desc')->get()->first()?->total_male + Demographic::orderBy('year', 'desc')->get()->first()?->total_female ?? 0,
                'total_visitors' => Visitor::getTotalUniqueVisitors(),
                'today_visitors' => Visitor::getTodayVisitors(),
                'monthly_visitors' => Visitor::getMonthlyVisitors(),
                'total_page_views' => Visitor::getTotalPageViews(),
            ]
        ]);
    }
}
