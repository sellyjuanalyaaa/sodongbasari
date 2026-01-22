<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Visitor extends Model
{
    use HasFactory;

    protected $fillable = [
        'ip_address',
        'user_agent',
        'page_url',
        'referer',
        'visit_date',
    ];

    protected $casts = [
        'visit_date' => 'date',
    ];

    /**
     * Get total unique visitors
     */
    public static function getTotalUniqueVisitors()
    {
        return self::distinct('ip_address')->count('ip_address');
    }

    /**
     * Get total page views
     */
    public static function getTotalPageViews()
    {
        return self::count();
    }

    /**
     * Get visitors today
     */
    public static function getTodayVisitors()
    {
        return self::whereDate('visit_date', today())
            ->distinct('ip_address')
            ->count('ip_address');
    }

    /**
     * Get visitors this month
     */
    public static function getMonthlyVisitors()
    {
        return self::whereYear('visit_date', now()->year)
            ->whereMonth('visit_date', now()->month)
            ->distinct('ip_address')
            ->count('ip_address');
    }

    /**
     * Get visitors by date range
     */
    public static function getVisitorsByDateRange($startDate, $endDate)
    {
        return self::whereBetween('visit_date', [$startDate, $endDate])
            ->distinct('ip_address')
            ->count('ip_address');
    }

    /**
     * Get visitors yesterday
     */
    public static function getYesterdayVisitors()
    {
        return self::whereDate('visit_date', today()->subDay())
            ->distinct('ip_address')
            ->count('ip_address');
    }

    /**
     * Get visitors this week
     */
    public static function getThisWeekVisitors()
    {
        return self::whereBetween('visit_date', [now()->startOfWeek(), now()->endOfWeek()])
            ->distinct('ip_address')
            ->count('ip_address');
    }

    /**
     * Get visitors last week
     */
    public static function getLastWeekVisitors()
    {
        return self::whereBetween('visit_date', [
            now()->subWeek()->startOfWeek(),
            now()->subWeek()->endOfWeek()
        ])
            ->distinct('ip_address')
            ->count('ip_address');
    }

    /**
     * Get visitors last month
     */
    public static function getLastMonthVisitors()
    {
        return self::whereYear('visit_date', now()->subMonth()->year)
            ->whereMonth('visit_date', now()->subMonth()->month)
            ->distinct('ip_address')
            ->count('ip_address');
    }

    /**
     * Get all visitor statistics
     */
    public static function getAllStats()
    {
        return [
            'today' => self::getTodayVisitors(),
            'yesterday' => self::getYesterdayVisitors(),
            'this_week' => self::getThisWeekVisitors(),
            'last_week' => self::getLastWeekVisitors(),
            'this_month' => self::getMonthlyVisitors(),
            'last_month' => self::getLastMonthVisitors(),
            'total' => self::getTotalUniqueVisitors(),
        ];
    }
}
