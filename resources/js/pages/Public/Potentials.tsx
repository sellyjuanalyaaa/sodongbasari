
import React from 'react';
import PublicLayout from '@/layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';
import { route } from 'ziggy-js';

export default function Potentials({ villageInfo, potentials, categoryColors }: { villageInfo: any, potentials: any[], categoryColors: Record<string, string> }) {
    // SVG placeholder untuk potensi yang tidak memiliki gambar
    const placeholderImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect fill='%23f8fafc' width='400' height='300'/%3E%3Cg fill='%2394a3b8'%3E%3Cpath d='M160 120h80v26H160zm-40 40h160v12H120z'/%3E%3Ccircle cx='186' cy='93' r='13'/%3E%3C/g%3E%3Ctext x='200' y='170' font-family='system-ui' font-size='14' fill='%23475569' text-anchor='middle'%3EPotensi Desa%3C/text%3E%3C/svg%3E";
    
    const getCategoryColor = (category: string) => {
        // Ambil warna dari database, fallback ke orange
        return categoryColors[category] || 'from-orange-500 to-[#EFA00B]';
    };
    
    return (
        <PublicLayout villageInfo={villageInfo}>
            <Head title="Potensi Desa" />
            <div className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                    <div className="text-center mb-16">
                        <div className="inline-block px-4 py-1.5 bg-orange-50 border border-orange-200 rounded-full mb-4">
                            <span className="text-[#EFA00B] text-xs font-medium uppercase tracking-wide">Kekayaan Lokal</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-light text-slate-900 mb-3 tracking-tight">Potensi Desa</h2>
                        <p className="text-slate-500 text-sm font-light">Produk Unggulan & Sumber Daya Desa</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {potentials && potentials.length > 0 ? (
                            potentials.map((item: any) => (
                                <Link
                                    key={item.id}
                                    href={route('potentials.show', item.id)}
                                    className="group"
                                >
                                    <div className="bg-white rounded-xl overflow-hidden border border-slate-200 hover:border-orange-200 hover:shadow-md transition-all duration-300 flex flex-col h-full">
                                        <div className="h-52 bg-slate-50 overflow-hidden relative shrink-0">
                                            <img 
                                                src={item.image_path || placeholderImage} 
                                                alt={item.name} 
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                onError={(e) => {
                                                    e.currentTarget.src = placeholderImage;
                                                }}
                                            />
                                            <div className={`absolute top-4 right-4 bg-gradient-to-r ${getCategoryColor(item.category)} px-3 py-1.5 rounded-lg text-xs font-medium text-white uppercase tracking-wide shadow-lg`}>
                                                {item.category}
                                            </div>
                                        </div>
                                        <div className="p-6 flex flex-col flex-1">
                                            <h3 className="font-medium text-lg text-slate-900 mb-2 group-hover:text-[#EFA00B] transition-colors">{item.name}</h3>
                                            <p className="text-slate-600 text-sm font-light line-clamp-3 leading-relaxed flex-1 mb-4">{item.description}</p>
                                            <div className="inline-flex items-center text-[#EFA00B] text-sm font-medium group-hover:gap-2 transition-all">
                                                Lihat Detail
                                                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="col-span-1 md:col-span-3 text-center py-20">
                                <div className="bg-slate-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 border border-slate-200">
                                    <span className="text-3xl">🏞️</span>
                                </div>
                                <p className="text-slate-400 text-sm font-light">Belum ada data potensi desa yang ditambahkan.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
