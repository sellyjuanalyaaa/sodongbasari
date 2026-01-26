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
        <div className="fixed bottom-6 left-6 z-50">
            {/* Collapsed Button */}
            {!isExpanded && (
                <button
                    onClick={() => setIsExpanded(true)}
                    className="flex items-center gap-3 bg-white/95 backdrop-blur-md border border-slate-200 hover:border-[#EFA00B] text-slate-700 px-4 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                    <div className="w-8 h-8 bg-gradient-to-br from-[#EFA00B] to-orange-600 rounded-lg flex items-center justify-center">
                        <Eye className="h-4 w-4 text-white group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="flex flex-col items-start">
                        <span className="text-xs text-slate-500 font-medium">Pengunjung</span>
                        <div className="flex items-baseline gap-1.5">
                            <span className="text-lg font-bold text-slate-900">{stats.today}</span>
                            <span className="text-xs text-slate-400">hari ini</span>
                        </div>
                    </div>
                </button>
            )}

            {/* Expanded Card */}
            {isExpanded && (
                <div className="bg-white/95 backdrop-blur-md border border-slate-200 rounded-xl shadow-xl p-5 min-w-[300px] animate-in slide-in-from-bottom-4 duration-300">
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-[#EFA00B] to-orange-600 rounded-lg flex items-center justify-center">
                                <Eye className="h-4 w-4 text-white" />
                            </div>
                            <h3 className="font-semibold text-base text-slate-900">
                                Statistik Kunjungan
                            </h3>
                        </div>
                        <button
                            onClick={() => setIsExpanded(false)}
                            className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full p-1 transition-all"
                        >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="space-y-2.5">
                        {statsData.map((stat, index) => (
                            <div 
                                key={index}
                                className="flex justify-between items-center py-2 px-3 rounded-lg hover:bg-slate-50 transition-colors"
                            >
                                <span className="text-sm text-slate-600">{stat.label}</span>
                                <span className="text-sm font-semibold text-slate-900">{stat.value.toLocaleString('id-ID')}</span>
                            </div>
                        ))}
                        
                        {/* Total */}
                        <div className="flex justify-between items-center pt-3 mt-2 border-t border-slate-200 px-3">
                            <span className="text-sm font-semibold text-slate-700">Total Kunjungan</span>
                            <span className="text-lg font-bold text-[#EFA00B]">{stats.total.toLocaleString('id-ID')}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
