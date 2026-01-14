// @ts-nocheck
import React from 'react';
import PublicLayout from '@/layouts/PublicLayout';
import { Head } from '@inertiajs/react';
import SectionTitle from '@/components/SectionTitle';

export default function Statistics({ villageInfo, demographics, budgets }) {
    return (
        <PublicLayout villageInfo={villageInfo}>
            <Head title="Statistik Desa" />
            <div className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <SectionTitle title="Data & Informasi" subtitle="Statistik Desa" />
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center text-slate-500">
                        <p>Halaman ini akan menampilkan grafik demografi dan transparansi anggaran desa.</p>
                        {/* Placeholder for charts */}
                        <div className="h-64 bg-slate-100 rounded-xl mt-8 flex items-center justify-center">
                            <span>Grafik Statistik Coming Soon</span>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
