
import React from 'react';
import PublicLayout from '@/layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';
import { Users, Building2, ArrowRight } from 'lucide-react';

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

interface Props {
    villageInfo: any;
    officials: Official[];
    institutions: Institution[];
}

export default function SodongBasari({ villageInfo, officials, institutions }: Props) {
    return (
        <PublicLayout villageInfo={villageInfo}>
            <Head title="Sodong Basari" />
            <div className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                    <div className="text-center mb-16">
                        <div className="inline-block px-4 py-1.5 bg-orange-50 border border-orange-200 rounded-full mb-4">
                            <span className="text-[#EFA00B] text-xs font-medium uppercase tracking-wide">Profil Desa</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-light text-slate-900 mb-3 tracking-tight">Tentang Desa</h2>
                        <p className="text-slate-500 text-sm font-light">Sodong Basari</p>
                    </div>
                    
                    {/* Gambaran Umum */}
                    <div className="bg-slate-50 p-8 md:p-10 rounded-xl border border-slate-200 mb-8">
                        <h3 className="text-xl md:text-2xl font-medium text-slate-900 mb-6 tracking-tight">Gambaran Umum Desa Sodong Basari</h3>
                        <p className="text-slate-600 text-[15px] leading-relaxed mb-5 font-light">
                            Desa Sodong Basari merupakan <span className="font-medium text-slate-900">desa definitif</span> yang berlokasi di wilayah Kecamatan Belik, Kabupaten Pemalang, Provinsi Jawa Tengah. Penetapan wilayah administratif desa ini didasarkan pada <span className="font-medium text-slate-900">Peraturan Bupati Pemalang Nomor 8 Tahun 2021</span> yang mengatur secara rinci mengenai peta dan batas wilayah desa.
                        </p>
                        <p className="text-slate-600 text-[15px] leading-relaxed font-light">
                            Keberadaan regulasi tersebut menjadi landasan hukum yang kuat bagi penyelenggaraan pemerintahan desa dalam menciptakan tata kelola yang tertib dan teratur. Dengan adanya kepastian batas wilayah, pemerintah desa dapat melaksanakan perencanaan pembangunan dan memberikan pelayanan kepada masyarakat secara lebih optimal dan terarah.
                        </p>
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
                                <p className="text-slate-600 text-sm ml-12 font-light">Desa Kalisaeh, Kecamatan Belik</p>
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
                                <p className="text-slate-600 text-sm ml-12 font-light">Desa Sikasur, Kecamatan Belik</p>
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
                        <div className="flex items-center gap-3 mb-8">
                            <Users className="h-5 w-5 text-[#EFA00B]" />
                            <h3 className="text-xl md:text-2xl font-medium text-slate-900 tracking-tight">Struktur Organisasi dan Tata Kerja</h3>
                        </div>
                        
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
            </div>
        </PublicLayout>
    );
}
