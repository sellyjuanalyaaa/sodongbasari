
import React from 'react';
import PublicLayout from '@/layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { OrangeAccentTop, DotsPattern } from '@/components/SvgDecorations';
import { AccentImage3, CloudAccent } from '@/components/ImageAccents';

export default function Potentials({ villageInfo, potentials, categoryColors }: { villageInfo: any, potentials: any[], categoryColors: Record<string, string> }) {
    // SVG placeholder untuk potensi yang tidak memiliki gambar
    const placeholderImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect fill='%23f8fafc' width='400' height='300'/%3E%3Cg fill='%2394a3b8'%3E%3Cpath d='M160 120h80v26H160zm-40 40h160v12H120z'/%3E%3Ccircle cx='186' cy='93' r='13'/%3E%3C/g%3E%3Ctext x='200' y='170' font-family='system-ui' font-size='14' fill='%23475569' text-anchor='middle'%3EPotensi Desa%3C/text%3E%3C/svg%3E";

    return (
        <PublicLayout villageInfo={villageInfo}>
            <Head title="Potensi Desa" />
            <div className="py-24 bg-white relative overflow-hidden">
                <OrangeAccentTop className="right-0 top-0 opacity-100" />
                <DotsPattern className="left-0 bottom-0 opacity-20" />
                <AccentImage3 className="left-[-5%] bottom-[20%] w-[400px] opacity-10 rotate-45" />
                <AccentImage3 className="right-[-5%] top-[10%] w-[400px] opacity-10 -rotate-12" />
                <CloudAccent className="top-[55%] right-[18%] w-[200px] h-[200px] opacity-22 -rotate-22 z-0" />
                <CloudAccent className="top-[30%] left-[25%] w-[190px] h-[190px] opacity-20 rotate-18 z-0" />
                <CloudAccent className="bottom-[40%] right-[35%] w-[175px] h-[175px] opacity-23 -rotate-28 z-0" />
                <CloudAccent className="top-[70%] left-[15%] w-[185px] h-[185px] opacity-19 rotate-25 z-0" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
                    <div className="text-center mb-12 sm:mb-16">
                        <div className="inline-block px-3 sm:px-4 py-1.5 bg-orange-50 border border-orange-200 rounded-full mb-4">
                            <span className="text-[#EFA00B] text-xs font-medium uppercase tracking-wide">Kekayaan Lokal</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-slate-900 mb-3 tracking-tight">Potensi Desa</h2>
                        <p className="text-slate-500 text-xs sm:text-sm font-light">Produk Unggulan & Sumber Daya Desa</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {potentials && potentials.length > 0 ? (
                            potentials.map((item: any) => (
                                <Link
                                    key={item.id}
                                    href={route('potentials.show', item.id)}
                                    className="group bg-white rounded-lg overflow-hidden flex flex-col h-full hover:shadow-lg transition-all duration-300"
                                >
                                    <div className="h-56 overflow-hidden relative bg-slate-100">
                                        <img
                                            src={item.image_path || placeholderImage}
                                            alt={item.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            onError={(e) => {
                                                e.currentTarget.src = placeholderImage;
                                            }}
                                        />
                                        <div className="absolute top-4 left-4">
                                            <span 
                                                className="px-3 py-1.5 text-white text-xs font-medium rounded-full backdrop-blur-sm shadow-sm"
                                                style={{ 
                                                    backgroundColor: item.category_color || '#EFA00B'
                                                }}
                                            >
                                                {item.category}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-5 flex-1 flex flex-col">
                                        <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-[#EFA00B] transition-colors line-clamp-2">
                                            {item.name}
                                        </h3>
                                        <p className="text-[13px] leading-relaxed line-clamp-3 mb-4 flex-1">
                                            <span className="font-semibold text-slate-900">{item.name.split(' ')[0]}</span>
                                            <span className="text-slate-600"> {item.description}</span>
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                    <span className="font-medium">Administrator</span>
                                                </div>
                                                <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                                                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                    <span>Dilihat {Math.floor(Math.random() * 50) + 10} kali</span>
                                                </div>
                                            </div>
                                            <div className="px-3 py-2 bg-[#EFA00B] text-white text-xs font-semibold rounded">
                                                {new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }).replace('.', '')}
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
