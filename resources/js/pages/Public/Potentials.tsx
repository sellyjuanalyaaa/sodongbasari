
import React from 'react';
import PublicLayout from '@/layouts/PublicLayout';
import { Head } from '@inertiajs/react';
import SectionTitle from '@/components/SectionTitle';

export default function Potentials({ villageInfo, potentials }: { villageInfo: any, potentials: any[] }) {
    return (
        <PublicLayout villageInfo={villageInfo}>
            <Head title="Potensi Desa" />
            <div className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <SectionTitle title="Kekayaan Lokal" subtitle="Potensi Desa" />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {potentials && potentials.length > 0 ? (
                            potentials.map((item: any) => (
                                <div key={item.id} className="bg-white rounded-xl overflow-hidden shadow-sm group hover:shadow-md transition flex flex-col h-full">
                                    <div className="h-48 bg-slate-200 overflow-hidden relative shrink-0">
                                        {item.image_path ? (
                                            <img src={item.image_path} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-slate-400 bg-slate-100">
                                                <span className="text-xs">No Image</span>
                                            </div>
                                        )}
                                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[#EFA00B] uppercase tracking-wider shadow-sm">
                                            {item.category}
                                        </div>
                                    </div>
                                    <div className="p-6 flex flex-col flex-1">
                                        <h3 className="font-bold text-lg text-slate-800 mb-2">{item.name}</h3>
                                        <p className="text-slate-600 text-sm line-clamp-3 mb-4 flex-1">{item.description}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-1 md:col-span-3 text-center py-12 text-slate-500">
                                <div className="bg-slate-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl">🏞️</span>
                                </div>
                                <p>Belum ada data potensi yang ditambahkan.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
