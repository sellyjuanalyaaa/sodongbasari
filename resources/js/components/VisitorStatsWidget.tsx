import React, { useState } from 'react';
import { Eye } from 'lucide-react';

interface VisitorStats {
    today: number;
    yesterday: number;
    this_week: number;
    last_week: number;
    this_month: number;
    last_month: number;
    total: number;
}

export default function VisitorStatsWidget({ stats }: { stats: VisitorStats }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const statsData = [
        { label: 'Hari Ini', value: stats.today },
        { label: 'Kemarin', value: stats.yesterday },
        { label: 'Minggu Ini', value: stats.this_week },
        { label: 'Minggu Lalu', value: stats.last_week },
        { label: 'Bulan Ini', value: stats.this_month },
        { label: 'Bulan Lalu', value: stats.last_month },
    ];

    return (
        <div className="fixed bottom-6 left-6 z-40">
            {/* Collapsed Button */}
            {!isExpanded && (
                <button
                    onClick={() => setIsExpanded(true)}
                    className="flex items-center gap-2 bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-5 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group backdrop-blur-sm"
                >
                    <Eye className="h-4 w-4 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium">Kunjungan</span>
                    <span className="bg-white/25 px-2 py-0.5 rounded-full text-xs font-semibold">
                        {stats.today}
                    </span>
                    <span className="text-xs opacity-90">Hari Ini</span>
                </button>
            )}

            {/* Expanded Card */}
            {isExpanded && (
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-2xl shadow-2xl p-6 min-w-[280px] animate-in slide-in-from-bottom-4 duration-300 backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-5">
                        <h3 className="font-semibold text-lg flex items-center gap-2">
                            <Eye className="h-5 w-5" />
                            Jumlah Kunjungan
                        </h3>
                        <button
                            onClick={() => setIsExpanded(false)}
                            className="text-white/80 hover:text-white hover:bg-white/10 rounded-full p-1 transition-all"
                        >
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="space-y-3">
                        {statsData.map((stat, index) => (
                            <div 
                                key={index}
                                className="flex justify-between items-center py-2 border-b border-white/10 last:border-0"
                            >
                                <span className="text-sm text-white/90">{stat.label}</span>
                                <span className="text-base font-semibold">{stat.value.toLocaleString('id-ID')}</span>
                            </div>
                        ))}
                        
                        {/* Total */}
                        <div className="flex justify-between items-center pt-3 border-t-2 border-white/30 mt-3">
                            <span className="text-sm font-semibold text-white">Total Kunjungan</span>
                            <span className="text-lg font-bold">{stats.total.toLocaleString('id-ID')}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
