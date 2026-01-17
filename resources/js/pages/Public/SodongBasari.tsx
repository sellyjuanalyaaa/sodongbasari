
import React from 'react';
import PublicLayout from '@/layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';
import SectionTitle from '@/components/SectionTitle';
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
            <div className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <SectionTitle title="Tentang Desa" subtitle="Sodong Basari" />
                    
                    {/* Gambaran Umum */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 mb-8">
                        <h3 className="text-2xl font-bold text-slate-800 mb-4">Gambaran Umum Desa Sodong Basari</h3>
                        <p className="text-slate-700 leading-relaxed mb-4">
                            Desa Sodong Basari merupakan <span className="font-semibold text-[#EFA00B]">desa definitif</span> yang berlokasi di wilayah Kecamatan Belik, Kabupaten Pemalang, Provinsi Jawa Tengah. Penetapan wilayah administratif desa ini didasarkan pada <span className="font-semibold">Peraturan Bupati Pemalang Nomor 8 Tahun 2021</span> yang mengatur secara rinci mengenai peta dan batas wilayah desa.
                        </p>
                        <p className="text-slate-700 leading-relaxed mb-4">
                            Keberadaan regulasi tersebut menjadi landasan hukum yang kuat bagi penyelenggaraan pemerintahan desa dalam menciptakan tata kelola yang tertib dan teratur. Dengan adanya kepastian batas wilayah, pemerintah desa dapat melaksanakan perencanaan pembangunan dan memberikan pelayanan kepada masyarakat secara lebih optimal dan terarah.
                        </p>
                    </div>

                    {/* Letak dan Batas Wilayah */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 mb-8">
                        <h3 className="text-2xl font-bold text-slate-800 mb-6">Letak dan Batas Wilayah</h3>
                        <p className="text-slate-700 leading-relaxed mb-6">
                            Desa Sodong Basari memiliki batas wilayah sebagai berikut:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-gradient-to-br from-blue-50 to-white border-2 border-blue-100 rounded-xl p-5">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">U</div>
                                    <h4 className="font-bold text-slate-800">Sebelah Utara</h4>
                                </div>
                                <p className="text-slate-600 text-sm ml-13">Desa Kalisaeh, Kecamatan Belik</p>
                            </div>
                            <div className="bg-gradient-to-br from-red-50 to-white border-2 border-red-100 rounded-xl p-5">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">S</div>
                                    <h4 className="font-bold text-slate-800">Sebelah Selatan</h4>
                                </div>
                                <p className="text-slate-600 text-sm ml-13">Desa Bulakan, Kecamatan Belik</p>
                            </div>
                            <div className="bg-gradient-to-br from-green-50 to-white border-2 border-green-100 rounded-xl p-5">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">B</div>
                                    <h4 className="font-bold text-slate-800">Sebelah Barat</h4>
                                </div>
                                <p className="text-slate-600 text-sm ml-13">Desa Moga, Kecamatan Moga</p>
                            </div>
                            <div className="bg-gradient-to-br from-yellow-50 to-white border-2 border-yellow-100 rounded-xl p-5">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold">T</div>
                                    <h4 className="font-bold text-slate-800">Sebelah Timur</h4>
                                </div>
                                <p className="text-slate-600 text-sm ml-13">Desa Sikasur, Kecamatan Belik</p>
                            </div>
                        </div>
                        <p className="text-slate-600 text-sm mt-6 italic">
                            * Batas-batas tersebut ditetapkan berdasarkan titik koordinat kartometrik yang dituangkan secara rinci dalam peta batas desa dan lampiran peraturan.
                        </p>
                    </div>

                    {/* Luas Wilayah dan Pembagian Dusun */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 mb-8">
                        <h3 className="text-2xl font-bold text-slate-800 mb-6">Luas Wilayah dan Pembagian Dusun</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                            <div className="bg-gradient-to-br from-[#EFA00B] to-[#D48C00] rounded-xl p-6 text-white text-center">
                                <div className="text-4xl font-bold mb-2">441,48</div>
                                <div className="text-sm opacity-90">Hektare (±)</div>
                                <div className="text-xs opacity-75 mt-2">Luas Wilayah Desa</div>
                            </div>
                            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white text-center">
                                <div className="text-4xl font-bold mb-2">2</div>
                                <div className="text-sm opacity-90">Dusun</div>
                                <div className="text-xs opacity-75 mt-2">Pembagian Wilayah</div>
                            </div>
                            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white text-center">
                                <div className="text-4xl font-bold mb-2">4 RW</div>
                                <div className="text-sm opacity-90">17 RT</div>
                                <div className="text-xs opacity-75 mt-2">Struktur Wilayah</div>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-gradient-to-r from-orange-50 to-white border-l-4 border-[#EFA00B] rounded-lg p-6">
                                <h4 className="font-bold text-slate-800 text-lg mb-2">📍 Dusun Sodong Barat</h4>
                                <p className="text-slate-600 text-sm">
                                    Wilayah bagian barat Desa Sodong Basari yang menjadi bagian penting dalam pengelolaan pemerintahan dan pelayanan masyarakat di tingkat lokal.
                                </p>
                            </div>
                            <div className="bg-gradient-to-r from-orange-50 to-white border-l-4 border-[#EFA00B] rounded-lg p-6">
                                <h4 className="font-bold text-slate-800 text-lg mb-2">📍 Dusun Sodong Timur</h4>
                                <p className="text-slate-600 text-sm">
                                    Wilayah bagian timur Desa Sodong Basari yang menjadi bagian penting dalam pengelolaan pemerintahan dan pelayanan masyarakat di tingkat lokal.
                                </p>
                            </div>
                        </div>
                        
                        <p className="text-slate-600 text-sm mt-6">
                            Pembagian dusun ini menjadi dasar dalam pengelolaan pemerintahan dan pelayanan masyarakat di tingkat lokal. Setiap dusun memiliki peran strategis dalam pembangunan desa dan peningkatan kesejahteraan masyarakat.
                        </p>
                    </div>

                    {/* Struktur Organisasi */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                        <div className="flex items-center gap-2 mb-6">
                            <Users className="h-6 w-6 text-orange-600" />
                            <h3 className="text-2xl font-bold text-slate-800">Struktur Organisasi dan Tata Kerja</h3>
                        </div>
                        
                        {officials.length === 0 ? (
                            <div className="text-center py-12">
                                <Users className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                                <p className="text-gray-500">Data perangkat desa belum tersedia</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {officials.map((official) => (
                                    <div key={official.id} className="group">
                                        <div className="bg-gradient-to-br from-orange-50 to-white border-2 border-orange-100 rounded-2xl p-6 text-center hover:shadow-lg hover:border-orange-300 transition-all duration-300">
                                            <div className="mb-4">
                                                {official.photo ? (
                                                    <img 
                                                        src={official.photo} 
                                                        alt={official.name}
                                                        className="w-24 h-24 mx-auto rounded-full object-cover border-4 border-white shadow-md group-hover:scale-110 transition-transform duration-300"
                                                    />
                                                ) : (
                                                    <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center border-4 border-white shadow-md">
                                                        <Users className="h-12 w-12 text-white" />
                                                    </div>
                                                )}
                                            </div>
                                            <h4 className="font-bold text-gray-800 text-sm mb-2">{official.name}</h4>
                                            <p className="text-xs text-orange-600 font-semibold uppercase">{official.position}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Lembaga Desa */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 mt-8">
                        <div className="flex items-center gap-2 mb-6">
                            <Building2 className="h-6 w-6 text-orange-600" />
                            <h3 className="text-2xl font-bold text-slate-800">Lembaga Desa</h3>
                        </div>
                        
                        {institutions.length === 0 ? (
                            <div className="text-center py-12">
                                <Building2 className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                                <p className="text-gray-500">Data lembaga desa belum tersedia</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {institutions.map((institution) => (
                                    <Link 
                                        key={institution.id} 
                                        href={`/lembaga/${institution.id}`}
                                        className="group"
                                    >
                                        <div className="bg-gradient-to-br from-orange-50 to-white border-2 border-orange-100 rounded-2xl p-6 hover:shadow-lg hover:border-orange-300 transition-all duration-300 h-full">
                                            <div className="flex items-start gap-4 mb-4">
                                                {institution.logo_path ? (
                                                    <img 
                                                        src={institution.logo_path} 
                                                        alt={institution.name}
                                                        className="w-16 h-16 object-contain"
                                                    />
                                                ) : (
                                                    <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                                        <Building2 className="h-8 w-8 text-white" />
                                                    </div>
                                                )}
                                                <div className="flex-1">
                                                    <h4 className="font-bold text-gray-800 text-lg mb-1 group-hover:text-orange-600 transition-colors">
                                                        {institution.name}
                                                    </h4>
                                                    {institution.abbreviation && (
                                                        <p className="text-xs text-orange-600 font-semibold">
                                                            ({institution.abbreviation})
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                                                {institution.description}
                                            </p>
                                            <div className="flex items-center text-orange-600 text-sm font-semibold group-hover:gap-2 transition-all">
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
