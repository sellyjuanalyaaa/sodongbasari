import React from 'react';
import PublicLayout from '@/layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';
import { MapPin, Phone, Tag, ArrowLeft, ArrowRight, Calendar, User } from 'lucide-react';
import { OrangeAccentTop, OrangeAccentBottom, DotsPattern } from '@/components/SvgDecorations';
import { AccentImage3 } from '@/components/ImageAccents';
import { route } from 'ziggy-js';

interface Potential {
    id: number;
    name: string;
    category: string;
    description: string;
    location: string;
    contact_info: string;
    image_path: string | null;
    created_at: string;
    creator?: {
        name: string;
    };
}

interface Props {
    villageInfo: any;
    potential: Potential;
    relatedPotentials: Potential[];
}

export default function PotentialDetail({ villageInfo, potential, relatedPotentials }: Props) {
    const placeholderImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='500' viewBox='0 0 800 500'%3E%3Crect fill='%23f8fafc' width='800' height='500'/%3E%3Cg fill='%2394a3b8'%3E%3Cpath d='M320 200h160v50H320zm-80 80h320v24H240z'/%3E%3Ccircle cx='372' cy='153' r='26'/%3E%3C/g%3E%3Ctext x='400' y='280' font-family='system-ui' font-size='20' fill='%23475569' text-anchor='middle'%3EPotensi Desa%3C/text%3E%3C/svg%3E";

    const getCategoryLabel = (category: string) => {
        const labels = {
            tourism: 'Wisata',
            product: 'Produk Unggulan',
            agriculture: 'Pertanian',
            craft: 'Kerajinan',
            culinary: 'Kuliner'
        };
        return labels[category as keyof typeof labels] || category;
    };

    return (
        <PublicLayout villageInfo={villageInfo}>
            <Head title={potential.name} />

            <div className="py-24 bg-white relative overflow-hidden">
                <OrangeAccentTop className="right-0 top-0 opacity-100" />
                <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
                    {/* Back Button */}
                    <Link
                        href={route('potentials')}
                        className="inline-flex items-center gap-2 text-slate-600 hover:text-[#EFA00B] transition-colors mb-8 group"
                    >
                        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm font-medium">Kembali ke Potensi Desa</span>
                    </Link>

                    {/* Header Section */}
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-gradient-to-r from-orange-500 to-[#EFA00B] px-4 py-1.5 rounded-lg shadow-sm shadow-orange-200">
                                <span className="text-white text-sm font-medium uppercase tracking-wide">
                                    {getCategoryLabel(potential.category)}
                                </span>
                            </div>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-medium text-slate-900 mb-4 tracking-tight">
                            {potential.name}
                        </h1>

                        {/* Info Meta */}
                        <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                            {potential.location && (
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4 text-[#EFA00B]" />
                                    <span className="font-light">{potential.location}</span>
                                </div>
                            )}
                            {potential.contact_info && (
                                <div className="flex items-center gap-2">
                                    <Phone className="h-4 w-4 text-[#EFA00B]" />
                                    <span className="font-light">{potential.contact_info}</span>
                                </div>
                            )}
                        </div>

                        {/* Created Info */}
                        <div className="mt-4 pt-4 border-t border-slate-200">
                            <div className="flex flex-wrap gap-6 text-xs text-slate-500">
                                {potential.creator && (
                                    <div className="flex items-center gap-2">
                                        <User className="h-3.5 w-3.5 text-orange-500" />
                                        <span>Dibuat oleh <span className="font-medium text-slate-700">{potential.creator.name}</span></span>
                                    </div>
                                )}
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-3.5 w-3.5 text-orange-500" />
                                    <span>Dibuat pada <span className="font-medium text-slate-700">{new Date(potential.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Image */}
                    <div className="bg-slate-50 rounded-xl overflow-hidden mb-8 border border-slate-200">
                        <img
                            src={potential.image_path || placeholderImage}
                            alt={potential.name}
                            className="w-full h-[400px] object-cover"
                            onError={(e) => {
                                e.currentTarget.src = placeholderImage;
                            }}
                        />
                    </div>

                    {/* Description Section */}
                    <div className="bg-slate-50 rounded-xl p-8 border border-slate-200 mb-12">
                        <h2 className="text-xl font-medium text-slate-900 mb-4 flex items-center gap-2">
                            <Tag className="h-5 w-5 text-[#EFA00B]" />
                            Deskripsi
                        </h2>
                        <div className="prose prose-slate max-w-none">
                            <p className="text-slate-700 leading-relaxed font-light whitespace-pre-line">
                                {potential.description}
                            </p>
                        </div>
                    </div>

                    {/* Related Potentials */}
                    {relatedPotentials.length > 0 && (
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-medium text-slate-900 tracking-tight">
                                    Potensi Terkait
                                </h2>
                                <Link
                                    href={route('potentials')}
                                    className="text-sm text-[#EFA00B] hover:text-orange-600 font-medium inline-flex items-center gap-1 group"
                                >
                                    Lihat Semua
                                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {relatedPotentials.map((item) => (
                                    <Link
                                        key={item.id}
                                        href={route('potentials.show', item.id)}
                                        className="group"
                                    >
                                        <div className="bg-white rounded-xl overflow-hidden border border-slate-200 hover:border-orange-200 hover:shadow-md transition-all duration-300 h-full">
                                            <div className="h-40 bg-slate-50 overflow-hidden relative">
                                                <img
                                                    src={item.image_path || placeholderImage}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                    onError={(e) => {
                                                        e.currentTarget.src = placeholderImage;
                                                    }}
                                                />
                                                <div className="absolute top-3 right-3 bg-gradient-to-r from-orange-500 to-[#EFA00B] px-2 py-1 rounded-md text-xs font-medium text-white uppercase tracking-wide shadow-sm">
                                                    {getCategoryLabel(item.category)}
                                                </div>
                                            </div>
                                            <div className="p-4">
                                                <h3 className="font-medium text-base text-slate-900 mb-2 group-hover:text-[#EFA00B] transition-colors line-clamp-2">
                                                    {item.name}
                                                </h3>
                                                <p className="text-slate-600 text-sm font-light line-clamp-2 leading-relaxed">
                                                    {item.description}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                <OrangeAccentBottom className="left-0 bottom-0 opacity-100" />
                <DotsPattern className="right-0 bottom-1/3 opacity-20" />
                <AccentImage3 className="right-[-10%] top-[15%] w-[450px] opacity-10 -rotate-12" />
            </div>
        </PublicLayout>
    );
}
