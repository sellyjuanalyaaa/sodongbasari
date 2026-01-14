// @ts-nocheck
import React from 'react';
import PublicLayout from '@/layouts/PublicLayout';
import { Head } from '@inertiajs/react';
import SectionTitle from '@/components/SectionTitle';

export default function Potentials({ villageInfo, potentials }) {
    return (
        <PublicLayout villageInfo={villageInfo}>
            <Head title="Potensi Desa" />
            <div className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <SectionTitle title="Kekayaan Lokal" subtitle="Potensi Desa" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Static placeholders if empty */}
                        <div className="bg-white rounded-xl overflow-hidden shadow-sm group hover:shadow-md transition">
                            <div className="h-48 bg-slate-200"></div>
                            <div className="p-6">
                                <h3 className="font-bold text-lg text-slate-800 mb-2">Produk UMKM</h3>
                                <p className="text-slate-600 text-sm">Berbagai produk olahan pangan khas desa.</p>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl overflow-hidden shadow-sm group hover:shadow-md transition">
                            <div className="h-48 bg-slate-200"></div>
                            <div className="p-6">
                                <h3 className="font-bold text-lg text-slate-800 mb-2">Wisata Alam</h3>
                                <p className="text-slate-600 text-sm">Pemandangan alam asri di kaki gunung.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
