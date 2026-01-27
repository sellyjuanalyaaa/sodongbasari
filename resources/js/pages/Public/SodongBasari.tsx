
import React from 'react';
import PublicLayout from '@/layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';
import { Users, Building2, ArrowRight } from 'lucide-react';
import { AccentImage3, CloudAccent } from '@/components/ImageAccents';
import { OrangeAccentTop, OrangeAccentBottom, DotsPattern, Blob1 } from '@/components/SvgDecorations';

interface Official {
    id: number;
    name: string;
    position: string;
    photo: string | null;
    order: number;
}

interface Institution {
    id: number;
    name: string;
    abbreviation: string | null;
    description: string;
    logo_path: string | null;
}

interface FormerVillageHead {
    id: number;
    name: string;
    photo: string | null;
    start_year: number;
    end_year: number;
    achievement: string | null;
}

interface Props {
    villageInfo: any;
    officials: Official[];
    institutions: Institution[];
    formerHeads: FormerVillageHead[];
}

export default function SodongBasari({ villageInfo, officials, institutions, formerHeads }: Props) {
    return (
        <PublicLayout villageInfo={villageInfo}>
            <Head title="Sodong Basari" />
            <div className="py-24 bg-white relative overflow-hidden">
                <OrangeAccentTop className="right-0 top-0 opacity-100" />
                <AccentImage3 className="left-[-10%] bottom-[10%] w-[500px] opacity-10 rotate-[15deg]" />
                <AccentImage3 className="right-[-5%] top-[20%] w-[400px] opacity-5 -rotate-45" />
                <CloudAccent className="bottom-[45%] left-[10%] w-[175px] h-[175px] opacity-19 rotate-28" />
                <CloudAccent className="top-[35%] left-[35%] w-[160px] h-[160px] opacity-18 -rotate-15" />
                <CloudAccent className="bottom-[65%] right-[20%] w-[145px] h-[145px] opacity-17 rotate-25" />
                <CloudAccent className="top-[70%] left-[18%] w-[135px] h-[135px] opacity-16 -rotate-32" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
                    <div className="text-center mb-12 sm:mb-16">
                        <div className="inline-block px-3 sm:px-4 py-1.5 bg-orange-50 border border-orange-200 rounded-full mb-4">
                            <span className="text-[#EFA00B] text-xs font-medium uppercase tracking-wide">Profil Desa</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-slate-900 mb-3 tracking-tight">Tentang Desa</h2>
                        <p className="text-slate-500 text-xs sm:text-sm font-light">Sodong Basari</p>
                    </div>

                    {/* Visi & Misi - Unified Card */}
                    {(villageInfo?.vision || villageInfo?.mission) && (
                        <div className="bg-white rounded-3xl border border-orange-100 shadow-xl overflow-hidden mb-8 md:mb-12 flex flex-col md:flex-row relative group hover:shadow-2xl transition-all duration-500">
                            {/* Decorative Abstract Blobs */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-50 rounded-full blur-3xl opacity-50 pointer-events-none -mr-16 -mt-16"></div>
                            <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-50 rounded-full blur-2xl opacity-50 pointer-events-none -ml-12 -mb-12"></div>

                            {/* Visi Section - Left/Top Side */}
                            {villageInfo?.vision && (
                                <div className="w-full md:w-5/12 p-8 md:p-12 bg-gradient-to-br from-orange-500 to-amber-600 text-white relative overflow-hidden flex flex-col justify-center">
                                    {/* Background Pattern */}
                                    <div className="absolute inset-0 opacity-10">
                                        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                                            <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
                                        </svg>
                                    </div>

                                    <div className="relative z-10">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white border border-white/30 shadow-inner">
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                            </div>
                                            <h3 className="text-2xl font-bold tracking-tight text-white">Visi Desa</h3>
                                        </div>

                                        <div className="relative">
                                            <span className="absolute -top-4 -left-2 text-6xl text-orange-200 opacity-40 font-serif leading-none select-none">"</span>
                                            <p className="text-lg md:text-xl font-medium leading-relaxed italic text-orange-50 pl-4 relative z-10">
                                                {villageInfo.vision}
                                            </p>
                                            <span className="absolute -bottom-6 right-0 text-6xl text-orange-200 opacity-40 font-serif leading-none select-none rotate-180">"</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Misi Section - Right/Bottom Side */}
                            {villageInfo?.mission && (
                                <div className="w-full md:w-7/12 p-8 md:p-12 bg-white relative">
                                    <div className="relative z-10">
                                        <div className="flex items-center gap-3 mb-8">
                                            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center border border-orange-200">
                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138z" />
                                                </svg>
                                            </div>
                                            <h3 className="text-2xl font-bold tracking-tight text-slate-900 leading-none">Misi Desa</h3>
                                        </div>

                                        <div className="space-y-4">
                                            {villageInfo.mission.split('\n').filter((item: string) => item.trim()).map((item: string, index: number) => (
                                                <div key={index} className="flex gap-4 p-3 rounded-lg hover:bg-orange-50 transition-colors duration-300">
                                                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-orange-500 to-amber-500 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-sm mt-0.5">
                                                        {index + 1}
                                                    </div>
                                                    <p className="text-slate-600 text-[15px] leading-relaxed font-light flex-1">
                                                        {item.replace(/^\d+\.\s*/, '')}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Gambaran Umum */}
                    <div className="bg-slate-50 p-8 md:p-10 rounded-xl border border-slate-200 mb-8">
                        <h3 className="text-xl md:text-2xl font-medium text-slate-900 mb-6 tracking-tight">Gambaran Umum Desa Sodong Basari</h3>
                        <p className="text-slate-600 text-[15px] leading-relaxed mb-5 font-light">
                            Desa Sodong Basari merupakan <span className="font-medium text-slate-900">desa definitif</span> yang berlokasi di wilayah Kecamatan Belik, Kabupaten Pemalang, Provinsi Jawa Tengah. Penetapan wilayah administratif desa ini didasarkan pada <span className="font-medium text-slate-900">Peraturan Bupati Pemalang Nomor 8 Tahun 2021</span> yang mengatur secara rinci mengenai peta dan batas wilayah desa.
                        </p>
                        <p className="text-slate-600 text-[15px] leading-relaxed font-light">
                            Keberadaan regulasi tersebut menjadi landasan hukum yang kuat bagi penyelenggaraan pemerintahan desa dalam menciptakan tata kelola yang tertib dan teratur. Dengan adanya kepastian batas wilayah, pemerintah desa dapat melaksanakan perencanaan pembangunan dan memberikan pelayanan kepada masyarakat secara lebih optimal dan terarah.
                        </p>
                        <DotsPattern className="right-0 top-0 opacity-30" />
                    </div>

                    {/* Letak dan Batas Wilayah */}
                    <div className="bg-slate-50 p-8 md:p-10 rounded-xl border border-slate-200 mb-8">
                        <h3 className="text-xl md:text-2xl font-medium text-slate-900 mb-6 tracking-tight">Letak dan Batas Wilayah</h3>
                        <p className="text-slate-600 text-[15px] leading-relaxed mb-7 font-light">
                            Desa Sodong Basari memiliki batas wilayah sebagai berikut:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-white border border-slate-200 rounded-lg p-5 hover:border-orange-200 hover:shadow-sm transition-all group">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-9 h-9 bg-gradient-to-br from-slate-900 to-slate-700 rounded-full flex items-center justify-center text-white text-sm font-medium group-hover:from-orange-500 group-hover:to-[#EFA00B] transition-all">U</div>
                                    <h4 className="font-medium text-slate-900">Sebelah Utara</h4>
                                </div>
                                <p className="text-slate-600 text-sm ml-12 font-light">Desa Kalisaeh & Desa Sikasur, Kecamatan Belik</p>
                            </div>
                            <div className="bg-white border border-slate-200 rounded-lg p-5 hover:border-orange-200 hover:shadow-sm transition-all group">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-9 h-9 bg-gradient-to-br from-slate-900 to-slate-700 rounded-full flex items-center justify-center text-white text-sm font-medium group-hover:from-orange-500 group-hover:to-[#EFA00B] transition-all">S</div>
                                    <h4 className="font-medium text-slate-900">Sebelah Selatan</h4>
                                </div>
                                <p className="text-slate-600 text-sm ml-12 font-light">Desa Bulakan, Kecamatan Belik</p>
                            </div>
                            <div className="bg-white border border-slate-200 rounded-lg p-5 hover:border-orange-200 hover:shadow-sm transition-all group">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-9 h-9 bg-gradient-to-br from-slate-900 to-slate-700 rounded-full flex items-center justify-center text-white text-sm font-medium group-hover:from-orange-500 group-hover:to-[#EFA00B] transition-all">B</div>
                                    <h4 className="font-medium text-slate-900">Sebelah Barat</h4>
                                </div>
                                <p className="text-slate-600 text-sm ml-12 font-light">Desa Moga, Kecamatan Moga</p>
                            </div>
                            <div className="bg-white border border-slate-200 rounded-lg p-5 hover:border-orange-200 hover:shadow-sm transition-all group">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-9 h-9 bg-gradient-to-br from-slate-900 to-slate-700 rounded-full flex items-center justify-center text-white text-sm font-medium group-hover:from-orange-500 group-hover:to-[#EFA00B] transition-all">T</div>
                                    <h4 className="font-medium text-slate-900">Sebelah Timur</h4>
                                </div>
                                <p className="text-slate-600 text-sm ml-12 font-light">Desa Mendelem, Kecamatan Belik</p>
                            </div>
                        </div>
                        <p className="text-slate-500 text-xs mt-6 font-light italic">
                            * Batas-batas tersebut ditetapkan berdasarkan titik koordinat kartometrik yang dituangkan secara rinci dalam peta batas desa dan lampiran peraturan.
                        </p>
                    </div>

                    {/* Luas Wilayah dan Pembagian Dusun */}
                    <div className="bg-slate-50 p-8 md:p-10 rounded-xl border border-slate-200 mb-8">
                        <h3 className="text-xl md:text-2xl font-medium text-slate-900 mb-8 tracking-tight">Luas Wilayah dan Pembagian Dusun</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
                            <div className="bg-gradient-to-br from-orange-500 to-[#EFA00B] rounded-lg p-6 text-white text-center shadow-lg shadow-orange-200">
                                <div className="text-3xl font-semibold mb-2">441,48</div>
                                <div className="text-sm text-white/90 font-light">Hektare (±)</div>
                                <div className="text-xs text-white/70 mt-2 font-light tracking-wide">Luas Wilayah Desa</div>
                            </div>
                            <div className="bg-white rounded-lg p-6 text-center border border-slate-200 hover:border-orange-200 hover:shadow-sm transition-all">
                                <div className="text-3xl font-semibold text-slate-900 mb-2">2</div>
                                <div className="text-sm text-slate-600 font-light">Dusun</div>
                                <div className="text-xs text-slate-400 mt-2 font-light tracking-wide">Pembagian Wilayah</div>
                            </div>
                            <div className="bg-white rounded-lg p-6 text-center border border-slate-200 hover:border-orange-200 hover:shadow-sm transition-all">
                                <div className="text-3xl font-semibold text-slate-900 mb-2">4 RW</div>
                                <div className="text-sm text-slate-600 font-light">17 RT</div>
                                <div className="text-xs text-slate-400 mt-2 font-light tracking-wide">Struktur Wilayah</div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <div className="bg-white border-l-4 border-[#EFA00B] rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                                <h4 className="font-medium text-slate-900 text-base mb-2">Dusun Sodong Barat</h4>
                                <p className="text-slate-600 text-sm font-light leading-relaxed">
                                    Wilayah bagian barat Desa Sodong Basari yang menjadi bagian penting dalam pengelolaan pemerintahan dan pelayanan masyarakat di tingkat lokal.
                                </p>
                            </div>
                            <div className="bg-white border-l-4 border-[#EFA00B] rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                                <h4 className="font-medium text-slate-900 text-base mb-2">Dusun Sodong Timur</h4>
                                <p className="text-slate-600 text-sm font-light leading-relaxed">
                                    Wilayah bagian timur Desa Sodong Basari yang menjadi bagian penting dalam pengelolaan pemerintahan dan pelayanan masyarakat di tingkat lokal.
                                </p>
                            </div>
                        </div>

                        <p className="text-slate-500 text-sm font-light">
                            Pembagian dusun ini menjadi dasar dalam pengelolaan pemerintahan dan pelayanan masyarakat di tingkat lokal. Setiap dusun memiliki peran strategis dalam pembangunan desa dan peningkatan kesejahteraan masyarakat.
                        </p>
                    </div>

                    {/* Struktur Organisasi */}
                    <div className="bg-slate-50 p-8 md:p-10 rounded-xl border border-slate-200">
                        <div className="flex items-center gap-3 mb-8 relative z-10">
                            <Users className="h-5 w-5 text-[#EFA00B]" />
                            <h3 className="text-xl md:text-2xl font-medium text-slate-900 tracking-tight">Struktur Organisasi dan Tata Kerja</h3>
                        </div>
                        <Blob1 className="right-0 top-0 -translate-y-1/2 opacity-30 w-64 h-64" />

                        {officials.length === 0 ? (
                            <div className="text-center py-16">
                                <Users className="h-16 w-16 mx-auto text-slate-200 mb-4" />
                                <p className="text-slate-400 text-sm">Data perangkat desa belum tersedia</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {officials.map((official) => (
                                    <div key={official.id} className="group">
                                        <div className="bg-white border border-slate-200 rounded-lg p-5 text-center hover:shadow-sm hover:border-slate-300 transition-all duration-300">
                                            <div className="mb-4">
                                                {official.photo ? (
                                                    <img
                                                        src={official.photo}
                                                        alt={official.name}
                                                        className="w-24 h-24 mx-auto rounded-full object-cover border-2 border-slate-100 group-hover:scale-105 transition-transform duration-300"
                                                    />
                                                ) : (
                                                    <div className="w-24 h-24 mx-auto rounded-full bg-slate-100 flex items-center justify-center border-2 border-slate-200">
                                                        <Users className="h-10 w-10 text-slate-400" />
                                                    </div>
                                                )}
                                            </div>
                                            <h4 className="font-medium text-slate-900 text-sm mb-1.5">{official.name}</h4>
                                            <p className="text-xs text-slate-500 uppercase tracking-wide">{official.position}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Riwayat Kepala Desa */}
                    {formerHeads && formerHeads.length > 0 && (
                        <div className="mt-12 bg-white rounded-2xl border border-slate-100 shadow-sm md:p-12 p-6 relative overflow-hidden">
                            {/* Background accent */}
                            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                                <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 0C44.7715 0 0 44.7715 0 100C0 155.228 44.7715 200 100 200C155.228 200 200 155.228 200 100C200 44.7715 155.228 0 100 0Z" fill="currentColor" className="text-orange-500" />
                                </svg>
                            </div>

                            <div className="flex items-center gap-4 mb-8 relative z-10">
                                <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center border border-orange-100">
                                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-semibold text-slate-900 tracking-tight">Riwayat Kepala Desa</h3>
                                    <p className="text-slate-500 text-sm font-light">Dedikasi pemimpin dari masa ke masa</p>
                                </div>
                            </div>

                            {/* Horizontal Carousel Container */}
                            <div className="relative group">
                                <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 pt-2 px-1 -mx-1 scrollbar-hide" style={{ scrollBehavior: 'smooth' }}>
                                    {formerHeads.map((head, index) => (
                                        <div
                                            key={head.id}
                                            className="snap-center flex-shrink-0 w-full md:w-[400px] bg-white rounded-xl border border-slate-200 hover:border-orange-300 hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden group/card"
                                        >
                                            {/* Header with Photo & Name */}
                                            <div className="p-6 pb-0 flex items-center gap-4">
                                                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-slate-100 overflow-hidden flex-shrink-0 shadow-sm">
                                                    {head.photo ? (
                                                        <img
                                                            src={`/storage/${head.photo}`}
                                                            alt={head.name}
                                                            className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-500"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                                                            <Users className="w-8 h-8 text-slate-300" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-orange-50 text-orange-600 text-[10px] font-bold uppercase tracking-wider mb-1">
                                                        Periode {index + 1}
                                                    </span>
                                                    <h4 className="text-lg font-bold text-slate-900 leading-tight capitalize group-hover/card:text-orange-600 transition-colors">
                                                        {head.name}
                                                    </h4>
                                                    <p className="text-sm text-slate-500 mt-1 flex items-center gap-1.5">
                                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                                        {head.start_year} - {head.end_year}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Content Body */}
                                            <div className="p-6 flex-1 flex flex-col">
                                                <div className="w-full h-px bg-slate-100 mb-4"></div>
                                                {head.achievement ? (
                                                    <div className="relative pl-3 border-l-2 border-orange-200">
                                                        <p className="text-sm text-slate-600 italic font-light leading-relaxed line-clamp-4">
                                                            "{head.achievement}"
                                                        </p>
                                                    </div>
                                                ) : (
                                                    <div className="text-center py-6 text-slate-400 text-sm font-light italic">
                                                        - Tidak ada data prestasi -
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {/* Hint overlay for horizontal scroll on desktop if needed, usually scrollbar is enough or trackpad */}
                                <div className="absolute right-0 top-0 bottom-8 w-12 bg-gradient-to-l from-white to-transparent pointer-events-none md:hidden"></div>
                            </div>
                        </div>
                    )}

                    {/* Lembaga Desa */}
                    <div className="bg-slate-50 p-8 md:p-10 rounded-xl border border-slate-200 mt-8">
                        <div className="flex items-center gap-3 mb-8">
                            <Building2 className="h-5 w-5 text-[#EFA00B]" />
                            <h3 className="text-xl md:text-2xl font-medium text-slate-900 tracking-tight">Lembaga Desa</h3>
                        </div>

                        {institutions.length === 0 ? (
                            <div className="text-center py-16">
                                <Building2 className="h-16 w-16 mx-auto text-slate-200 mb-4" />
                                <p className="text-slate-400 text-sm">Data lembaga desa belum tersedia</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {institutions.map((institution) => (
                                    <Link
                                        key={institution.id}
                                        href={`/lembaga/${institution.id}`}
                                        className="group"
                                    >
                                        <div className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-md hover:border-orange-200 transition-all duration-300 h-full">
                                            <div className="flex items-start gap-4 mb-4">
                                                {institution.logo_path ? (
                                                    <img
                                                        src={institution.logo_path}
                                                        alt={institution.name}
                                                        className="w-14 h-14 object-contain"
                                                    />
                                                ) : (
                                                    <div className="w-14 h-14 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                        <Building2 className="h-7 w-7 text-slate-400" />
                                                    </div>
                                                )}
                                                <div className="flex-1">
                                                    <h4 className="font-medium text-slate-900 text-base mb-1 group-hover:text-[#EFA00B] transition-colors">
                                                        {institution.name}
                                                    </h4>
                                                    {institution.abbreviation && (
                                                        <p className="text-xs text-slate-500 font-light">
                                                            ({institution.abbreviation})
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <p className="text-sm text-slate-600 line-clamp-3 mb-4 font-light leading-relaxed">
                                                {institution.description}
                                            </p>
                                            <div className="flex items-center text-slate-600 text-sm font-medium group-hover:text-[#EFA00B] group-hover:gap-2 transition-all">
                                                Lihat Detail
                                                <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <OrangeAccentBottom className="left-0 bottom-0 opacity-100" />
            </div>
        </PublicLayout>
    );
}
