<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Visitor;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VisitorController extends Controller
{
    public function index(Request $request)
    {
        $query = Visitor::query()->orderBy('created_at', 'desc');

        // Filter by date range if provided
        if ($request->has('start_date') && $request->has('end_date')) {
            $query->whereBetween('visit_date', [$request->start_date, $request->end_date]);
        }

        $visitors = $query->paginate(20);

        // Get statistics
        $stats = [
            'total_unique_visitors' => Visitor::getTotalUniqueVisitors(),
            'total_page_views' => Visitor::getTotalPageViews(),
            'today_visitors' => Visitor::getTodayVisitors(),
            'monthly_visitors' => Visitor::getMonthlyVisitors(),
        ];

        // Get top pages
        $topPages = Visitor::selectRaw('page_url, COUNT(*) as views')
            ->groupBy('page_url')
            ->orderBy('views', 'desc')
            ->limit(10)
            ->get();

        return Inertia::render('Admin/Visitors/Index', [
            'visitors' => $visitors,
            'stats' => $stats,
            'topPages' => $topPages,
            'filters' => $request->only(['start_date', 'end_date']),
        ]);
    }
}
