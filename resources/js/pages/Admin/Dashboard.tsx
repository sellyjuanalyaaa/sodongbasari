
import React from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Mountain, Users, Receipt, Eye, TrendingUp, CalendarDays, MousePointerClick } from "lucide-react";

interface DashboardProps {
    stats: {
        total_posts: number;
        total_potentials: number;
        total_budget: number;
        total_population: number;
        total_visitors: number;
        today_visitors: number;
        monthly_visitors: number;
        total_page_views: number;
    }
}

export default function Dashboard({ stats }: DashboardProps) {
    const items = [
        { title: "Total Berita", value: stats.total_posts, icon: FileText, color: "text-blue-600", bg: "bg-blue-50" },
        { title: "Potensi Desa", value: stats.total_potentials, icon: Mountain, color: "text-emerald-600", bg: "bg-emerald-50" },
        { title: "Anggaran Desa", value: `Rp ${stats.total_budget.toLocaleString('id-ID')}`, icon: Receipt, color: "text-orange-600", bg: "bg-orange-50" },
        { title: "Total Penduduk", value: stats.total_population, icon: Users, color: "text-purple-600", bg: "bg-purple-50" },
    ];

    const visitorStats = [
        { title: "Total Pengunjung", value: stats.total_visitors.toLocaleString('id-ID'), icon: Eye, color: "text-indigo-600", bg: "bg-indigo-50", desc: "Unique visitors" },
        { title: "Pengunjung Hari Ini", value: stats.today_visitors.toLocaleString('id-ID'), icon: TrendingUp, color: "text-cyan-600", bg: "bg-cyan-50", desc: "Today" },
        { title: "Pengunjung Bulan Ini", value: stats.monthly_visitors.toLocaleString('id-ID'), icon: CalendarDays, color: "text-pink-600", bg: "bg-pink-50", desc: "This month" },
        { title: "Total Page Views", value: stats.total_page_views.toLocaleString('id-ID'), icon: MousePointerClick, color: "text-amber-600", bg: "bg-amber-50", desc: "All time" },
    ];

    return (
        <AdminLayout title="Dashboard">
            <Head title="Dashboard Admin" />

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Dashboard</h1>
                <p className="text-gray-500 mt-1">Selamat datang kembali! Berikut ringkasan data desa Anda.</p>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4 mb-6">
                {items.map((item, index) => (
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
                            <p className="text-xs text-gray-400 mt-1">Data terbaru</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Visitor Statistics Section */}
            <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Statistik Pengunjung Website</h2>
                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                    {visitorStats.map((item, index) => (
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
                                <p className="text-xs text-gray-400 mt-1">{item.desc}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
}
