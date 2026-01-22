
import React from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, TrendingUp, CalendarDays, MousePointerClick, Globe } from "lucide-react";

interface VisitorIndexProps {
    visitors: {
        data: Array<{
            id: number;
            ip_address: string;
            user_agent: string;
            page_url: string;
            referer: string;
            visit_date: string;
            created_at: string;
        }>;
        links: any;
        current_page: number;
        last_page: number;
    };
    stats: {
        total_unique_visitors: number;
        total_page_views: number;
        today_visitors: number;
        monthly_visitors: number;
    };
    topPages: Array<{
        page_url: string;
        views: number;
    }>;
}

export default function VisitorIndex({ visitors, stats, topPages }: VisitorIndexProps) {
    const statCards = [
        { title: "Total Pengunjung", value: stats.total_unique_visitors.toLocaleString('id-ID'), icon: Eye, color: "text-indigo-600", bg: "bg-indigo-50" },
        { title: "Total Page Views", value: stats.total_page_views.toLocaleString('id-ID'), icon: MousePointerClick, color: "text-amber-600", bg: "bg-amber-50" },
        { title: "Pengunjung Hari Ini", value: stats.today_visitors.toLocaleString('id-ID'), icon: TrendingUp, color: "text-cyan-600", bg: "bg-cyan-50" },
        { title: "Pengunjung Bulan Ini", value: stats.monthly_visitors.toLocaleString('id-ID'), icon: CalendarDays, color: "text-pink-600", bg: "bg-pink-50" },
    ];

    const getBrowserFromUserAgent = (userAgent: string) => {
        if (!userAgent) return 'Unknown';
        if (userAgent.includes('Chrome')) return 'Chrome';
        if (userAgent.includes('Firefox')) return 'Firefox';
        if (userAgent.includes('Safari')) return 'Safari';
        if (userAgent.includes('Edge')) return 'Edge';
        return 'Other';
    };

    return (
        <AdminLayout title="Pengunjung Website">
            <Head title="Pengunjung Website" />

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Pengunjung Website</h1>
                <p className="text-gray-500 mt-1">Monitor dan analisis pengunjung website desa.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4 mb-6">
                {statCards.map((item, index) => (
                    <Card key={index} className="border-gray-100 shadow-sm bg-white hover:shadow-md transition-all duration-200 group">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                            <CardTitle className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                                {item.title}
                            </CardTitle>
                            <div className={`h-10 w-10 rounded-lg ${item.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                <item.icon className={`h-5 w-5 ${item.color}`} />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-gray-900">{item.value}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Top Pages */}
            <div className="grid gap-6 lg:grid-cols-2 mb-6">
                <Card className="border-gray-100 shadow-sm bg-white">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold text-gray-900">Halaman Terpopuler</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {topPages.slice(0, 5).map((page, index) => (
                                <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                                    <div className="flex items-center gap-2 flex-1 min-w-0">
                                        <Globe className="h-4 w-4 text-gray-400 flex-shrink-0" />
                                        <span className="text-sm text-gray-700 truncate" title={page.page_url}>
                                            {new URL(page.page_url).pathname}
                                        </span>
                                    </div>
                                    <span className="text-sm font-semibold text-gray-900 ml-2">{page.views} views</span>
                                </div>
                            ))}
                            {topPages.length === 0 && (
                                <p className="text-sm text-gray-400 text-center py-4">Belum ada data</p>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Visitors */}
                <Card className="border-gray-100 shadow-sm bg-white">
                    <CardHeader>
                        <CardTitle className="text-lg font-bold text-gray-900">Pengunjung Terbaru</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {visitors.data.slice(0, 5).map((visitor, index) => (
                                <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                                    <div className="flex flex-col gap-1 flex-1 min-w-0">
                                        <span className="text-sm font-medium text-gray-700">{visitor.ip_address}</span>
                                        <span className="text-xs text-gray-400">{getBrowserFromUserAgent(visitor.user_agent)}</span>
                                    </div>
                                    <span className="text-xs text-gray-500 ml-2">
                                        {new Date(visitor.created_at).toLocaleString('id-ID', { 
                                            day: '2-digit', 
                                            month: 'short', 
                                            hour: '2-digit', 
                                            minute: '2-digit' 
                                        })}
                                    </span>
                                </div>
                            ))}
                            {visitors.data.length === 0 && (
                                <p className="text-sm text-gray-400 text-center py-4">Belum ada data</p>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Visitors Table */}
            <Card className="border-gray-100 shadow-sm bg-white">
                <CardHeader>
                    <CardTitle className="text-lg font-bold text-gray-900">Detail Pengunjung</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="relative w-full overflow-auto">
                        <table className="w-full caption-bottom text-sm">
                            <thead className="[&_tr]:border-b">
                                <tr className="border-b transition-colors hover:bg-gray-50">
                                    <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">IP Address</th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Browser</th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Halaman</th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Tanggal Kunjungan</th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Waktu</th>
                                </tr>
                            </thead>
                            <tbody className="[&_tr:last-child]:border-0">
                                {visitors.data.map((visitor) => (
                                    <tr key={visitor.id} className="border-b transition-colors hover:bg-gray-50">
                                        <td className="p-4 align-middle font-mono text-sm text-gray-700">{visitor.ip_address}</td>
                                        <td className="p-4 align-middle text-gray-700">
                                            {getBrowserFromUserAgent(visitor.user_agent)}
                                        </td>
                                        <td className="p-4 align-middle">
                                            <span className="text-sm text-gray-700 max-w-md truncate block" title={visitor.page_url}>
                                                {visitor.page_url ? new URL(visitor.page_url).pathname : '-'}
                                            </span>
                                        </td>
                                        <td className="p-4 align-middle text-gray-700">
                                            {new Date(visitor.visit_date).toLocaleDateString('id-ID', { 
                                                day: '2-digit', 
                                                month: 'short', 
                                                year: 'numeric' 
                                            })}
                                        </td>
                                        <td className="p-4 align-middle text-gray-500 text-sm">
                                            {new Date(visitor.created_at).toLocaleTimeString('id-ID', { 
                                                hour: '2-digit', 
                                                minute: '2-digit' 
                                            })}
                                        </td>
                                    </tr>
                                ))}
                                {visitors.data.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="p-4 text-center text-gray-400">Belum ada data pengunjung.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </AdminLayout>
    );
}
