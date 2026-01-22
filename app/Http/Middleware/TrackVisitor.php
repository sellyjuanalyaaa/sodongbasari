<?php

namespace App\Http\Middleware;

use App\Models\Visitor;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class TrackVisitor
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Only track GET requests to avoid counting form submissions, etc.
        if ($request->isMethod('GET')) {
            $ipAddress = $request->ip();
            $userAgent = $request->userAgent();
            $pageUrl = $request->fullUrl();
            $referer = $request->header('referer');
            $visitDate = now()->toDateString();

            // Check if this IP has already visited today
            $existingVisit = Visitor::where('ip_address', $ipAddress)
                ->where('visit_date', $visitDate)
                ->where('page_url', $pageUrl)
                ->first();

            // Only record if not visited this page today (unique page view per day)
            if (!$existingVisit) {
                Visitor::create([
                    'ip_address' => $ipAddress,
                    'user_agent' => $userAgent,
                    'page_url' => $pageUrl,
                    'referer' => $referer,
                    'visit_date' => $visitDate,
                ]);
            }
        }

        return $next($request);
    }
}

