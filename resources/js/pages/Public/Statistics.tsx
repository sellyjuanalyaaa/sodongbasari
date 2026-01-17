import React from 'react';
import PublicLayout from '@/layouts/PublicLayout';
import { Head } from '@inertiajs/react';
import SectionTitle from '@/components/SectionTitle';
import VillageMap from '@/components/VillageMap';
import { Users, Home, MapPin, GraduationCap, Briefcase, Church, Building2, Heart, DollarSign } from 'lucide-react';

interface StatisticData {
    year: number;
    infographic_image: string | null;
    infographic_image_right: string | null;
    total_population: number;
    male_population: number;
    female_population: number;
    total_families: number;
    total_rt: number;
    total_rw: number;
    total_dusun: number;
    tidak_sekolah: number;
    sd_sederajat: number;
    smp_sederajat: number;
    sma_sederajat: number;
    diploma: number;
    sarjana: number;
    petani: number;
    pedagang: number;
    pns: number;
    wiraswasta: number;
    lainnya: number;
    islam: number;
    kristen: number;
    katolik: number;
    hindu: number;
    budha: number;
}

interface Props {
    villageInfo: any;
    statistics: StatisticData | null;
}

export default function Statistics({ villageInfo, statistics }: Props) {
    if (!statistics) {
        return (
            <PublicLayout villageInfo={villageInfo}>
                <Head title="Statistik Desa" />
                <div className="py-20 bg-slate-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <SectionTitle title="Data & Informasi" subtitle="Statistik Desa" />
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center text-slate-500">
                            <p>Data statistik belum tersedia.</p>
                        </div>
                    </div>
                </div>
            </PublicLayout>
        );
    }

    return (
        <PublicLayout villageInfo={villageInfo}>
            <Head title="Statistik Desa" />
            <div className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header dengan Data Utama */}
                    <div className="bg-gradient-to-r from-orange-400 to-orange-300 rounded-t-3xl p-8 mb-2">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-4">
                                <div className="bg-white rounded-full p-3">
                                    <Building2 className="h-12 w-12 text-green-600" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-800">PEMERINTAH DESA SODONG BASARI</h1>
                                    <p className="text-gray-700">KECAMATAN BELIK KABUPATEN PEMALANG</p>
                                </div>
                            </div>
                        </div>
                        
                        {/* 3 Box Data Utama */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
                                <div className="flex justify-center mb-2">
                                    <div className="bg-yellow-100 rounded-full p-3">
                                        <Users className="h-8 w-8 text-yellow-600" />
                                    </div>
                                </div>
                                <h3 className="text-4xl font-bold text-gray-800">{statistics.total_families}</h3>
                                <p className="text-sm text-gray-600 font-semibold">KEPALA KELUARGA</p>
                            </div>
                            
                            <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
                                <div className="flex justify-center mb-2">
                                    <div className="bg-pink-100 rounded-full p-3">
                                        <Users className="h-8 w-8 text-pink-600" />
                                    </div>
                                </div>
                                <h3 className="text-4xl font-bold text-gray-800">{statistics.female_population}</h3>
                                <p className="text-sm text-gray-600 font-semibold">JIWA WANITA/JIWA</p>
                            </div>
                            
                            <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
                                <div className="flex justify-center mb-2">
                                    <div className="bg-orange-100 rounded-full p-3">
                                        <Users className="h-8 w-8 text-orange-600" />
                                    </div>
                                </div>
                                <h3 className="text-4xl font-bold text-gray-800">{statistics.male_population}</h3>
                                <p className="text-sm text-gray-600 font-semibold">JIWA</p>
                            </div>
                        </div>
                    </div>

                    {/* Grid Layout Utama */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
                        {/* Kolom Kiri - Peta & Data Lainnya */}
                        <div className="lg:col-span-1 space-y-2">
                            {/* Jumlah Penduduk Sesuai RT */}
                            <div className="bg-orange-400 rounded-2xl p-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <MapPin className="h-6 w-6 text-white" />
                                    <h3 className="text-lg font-bold text-white">WILAYAH SODONG BASARI</h3>
                                </div>
                                <VillageMap
                                    villageName="Desa Sodong Basari"
                                    totalRt={statistics.total_rt}
                                    totalRw={statistics.total_rw}
                                />
                                <div className="mt-4 grid grid-cols-2 gap-4">
                                    <div className="bg-orange-500 rounded-xl p-4 text-center">
                                        <h4 className="text-3xl font-bold text-white">{statistics.total_rt}</h4>
                                        <p className="text-xs text-white font-semibold">RUKUN TETANGGA</p>
                                    </div>
                                    <div className="bg-orange-600 rounded-xl p-4 text-center">
                                        <h4 className="text-3xl font-bold text-white">{statistics.total_rw}</h4>
                                        <p className="text-xs text-white font-semibold">RUKUN WARGA</p>
                                    </div>
                                </div>
                            </div>

                            {/* Data Lembaga */}
                            <div className="bg-orange-300 rounded-2xl p-6">
                                <h3 className="text-center text-white font-bold mb-4">data lembaga</h3>
                                <div className="bg-white rounded-xl p-8 text-center shadow-sm">
                                    <Building2 className="h-12 w-12 text-orange-500 mx-auto mb-2" />
                                    <p className="text-gray-700 text-sm font-semibold">Grafik Lembaga Desa</p>
                                </div>
                            </div>

                            {/* Tingkat Kematian */}
                            <div className="bg-orange-300 rounded-2xl p-6">
                                <h3 className="text-center text-white font-bold mb-4">tingkat kematian</h3>
                                <div className="bg-white rounded-xl p-8 text-center shadow-sm">
                                    <Heart className="h-12 w-12 text-orange-500 mx-auto mb-2" />
                                    <p className="text-gray-700 text-sm font-semibold">Grafik Kematian</p>
                                </div>
                            </div>

                            {/* Agama */}
                            <div className="bg-orange-300 rounded-2xl p-6">
                                <h3 className="text-center text-white font-bold mb-4">agama</h3>
                                <div className="bg-white rounded-xl p-8 shadow-sm">
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-gray-700 text-sm">
                                            <span className="font-medium">Islam</span>
                                            <span className="font-bold">{statistics.islam}</span>
                                        </div>
                                        <div className="flex justify-between text-gray-700 text-sm">
                                            <span className="font-medium">Kristen</span>
                                            <span className="font-bold">{statistics.kristen}</span>
                                        </div>
                                        <div className="flex justify-between text-gray-700 text-sm">
                                            <span className="font-medium">Katolik</span>
                                            <span className="font-bold">{statistics.katolik}</span>
                                        </div>
                                        <div className="flex justify-between text-gray-700 text-sm">
                                            <span className="font-medium">Hindu</span>
                                            <span className="font-bold">{statistics.hindu}</span>
                                        </div>
                                        <div className="flex justify-between text-gray-700 text-sm">
                                            <span className="font-medium">Buddha</span>
                                            <span className="font-bold">{statistics.budha}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Kolom Tengah - 5 Box & Grafik */}
                        <div className="lg:col-span-1 space-y-2">
                            {/* 5 Box Data Tambahan */}
                            <div className="grid grid-cols-3 gap-2">
                                <div className="bg-orange-400 rounded-xl p-4 text-center">
                                    <div className="bg-white rounded-lg p-2 mb-2 inline-block">
                                        <Users className="h-6 w-6 text-orange-600" />
                                    </div>
                                    <h4 className="text-2xl font-bold text-white">{statistics.male_population + statistics.female_population}</h4>
                                    <p className="text-xs text-white font-semibold">JUMLAH PENDUDUK</p>
                                </div>
                                <div className="bg-orange-400 rounded-xl p-4 text-center">
                                    <div className="bg-white rounded-lg p-2 mb-2 inline-block">
                                        <Users className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <h4 className="text-2xl font-bold text-white">{statistics.male_population}</h4>
                                    <p className="text-xs text-white font-semibold">LAKI-LAKI</p>
                                </div>
                                <div className="bg-orange-400 rounded-xl p-4 text-center">
                                    <div className="bg-white rounded-lg p-2 mb-2 inline-block">
                                        <Users className="h-6 w-6 text-pink-600" />
                                    </div>
                                    <h4 className="text-2xl font-bold text-white">{statistics.female_population}</h4>
                                    <p className="text-xs text-white font-semibold">PEREMPUAN</p>
                                </div>
                                <div className="bg-orange-400 rounded-xl p-4 text-center">
                                    <div className="bg-white rounded-lg p-2 mb-2 inline-block">
                                        <GraduationCap className="h-6 w-6 text-yellow-600" />
                                    </div>
                                    <h4 className="text-2xl font-bold text-white">{statistics.sarjana + statistics.diploma}</h4>
                                    <p className="text-xs text-white font-semibold">PENDIDIKAN PERGURUAN TINGGI</p>
                                </div>
                                <div className="bg-orange-400 rounded-xl p-4 text-center col-span-2">
                                    <div className="bg-white rounded-lg p-2 mb-2 inline-block">
                                        <Briefcase className="h-6 w-6 text-red-600" />
                                    </div>
                                    <h4 className="text-2xl font-bold text-white">{statistics.petani + statistics.pedagang + statistics.pns + statistics.wiraswasta}</h4>
                                    <p className="text-xs text-white font-semibold">PENDUDUK USIA KERJA (15-64 TH)</p>
                                </div>
                            </div>

                            {/* Grafik Penduduk Berdasar Usia dan Jenis Kelamin */}
                            <div className="bg-orange-400 rounded-2xl p-6">
                                <h3 className="text-center text-white font-bold mb-4">PENDUDUK SESUAI USIA DAN JENIS KELAMIN</h3>
                                <div className="bg-white rounded-xl p-4">
                                    {/* Dummy Bar Chart */}
                                    <div className="space-y-2">
                                        {[
                                            { range: '65 TAHUN KE ATAS', male: 15, female: 12 },
                                            { range: '60-65 TAHUN', male: 18, female: 16 },
                                            { range: '56-65 TAHUN', male: 22, female: 20 },
                                            { range: '36-45 TAHUN', male: 28, female: 26 },
                                            { range: '26-35 TAHUN', male: 25, female: 24 },
                                            { range: '17-25 TAHUN', male: 20, female: 22 },
                                            { range: '13-16 TAHUN', male: 12, female: 11 },
                                            { range: '6-12 TAHUN', male: 14, female: 13 },
                                            { range: '0-5 TAHUN', male: 8, female: 9 },
                                        ].map((item, idx) => (
                                            <div key={idx} className="flex items-center gap-2 text-xs">
                                                <span className="w-24 text-gray-700 font-medium">{item.range}</span>
                                                <div className="flex-1 flex gap-1">
                                                    <div className="flex-1 bg-gray-100 rounded">
                                                        <div 
                                                            className="bg-blue-500 h-4 rounded flex items-center justify-end pr-1"
                                                            style={{ width: `${item.male * 3}%` }}
                                                        >
                                                            <span className="text-white text-xs font-bold">{item.male}%</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex-1 bg-gray-100 rounded">
                                                        <div 
                                                            className="bg-pink-500 h-4 rounded flex items-center justify-end pr-1"
                                                            style={{ width: `${item.female * 3}%` }}
                                                        >
                                                            <span className="text-white text-xs font-bold">{item.female}%</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex justify-center gap-4 mt-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 bg-blue-500 rounded"></div>
                                            <span className="text-xs text-gray-700 font-semibold">LAKI-LAKI</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 bg-pink-500 rounded"></div>
                                            <span className="text-xs text-gray-700 font-semibold">PEREMPUAN</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Pekerjaan */}
                            <div className="bg-orange-300 rounded-2xl p-6">
                                <h3 className="text-center text-white font-bold mb-4">pekerjaan</h3>
                                <div className="bg-white rounded-xl p-6 shadow-sm">
                                    <div className="space-y-3">
                                        <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                                            <div className="flex justify-between text-gray-700">
                                                <span className="text-sm font-medium">Petani</span>
                                                <span className="font-bold">{statistics.petani}</span>
                                            </div>
                                        </div>
                                        <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                                            <div className="flex justify-between text-gray-700">
                                                <span className="text-sm font-medium">Pedagang</span>
                                                <span className="font-bold">{statistics.pedagang}</span>
                                            </div>
                                        </div>
                                        <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                                            <div className="flex justify-between text-gray-700">
                                                <span className="text-sm font-medium">PNS</span>
                                                <span className="font-bold">{statistics.pns}</span>
                                            </div>
                                        </div>
                                        <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                                            <div className="flex justify-between text-gray-700">
                                                <span className="text-sm font-medium">Wiraswasta</span>
                                                <span className="font-bold">{statistics.wiraswasta}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Sumber Pendapatan Desa */}
                            <div className="bg-orange-300 rounded-2xl p-6">
                                <h3 className="text-center text-white font-bold mb-4">sumber pendapatan desa</h3>
                                <div className="bg-white rounded-xl p-8 text-center shadow-sm">
                                    <DollarSign className="h-12 w-12 text-orange-500 mx-auto mb-2" />
                                    <p className="text-gray-700 text-sm font-semibold">Grafik Pendapatan</p>
                                </div>
                            </div>
                        </div>

                        {/* Kolom Kanan - Fasilitas */}
                        <div className="lg:col-span-1 space-y-2">
                            {/* Fasilitas Umum - Ibadah */}
                            <div className="bg-orange-300 rounded-2xl p-6">
                                <h3 className="text-center text-white font-bold mb-4">fasilitas umum</h3>
                                <h4 className="text-center text-white font-semibold mb-3">ibadah</h4>
                                <div className="bg-white rounded-xl p-8 text-center shadow-sm">
                                    <Church className="h-12 w-12 text-orange-500 mx-auto mb-2" />
                                    <p className="text-gray-700 text-sm font-semibold">Grafik Tempat Ibadah</p>
                                </div>
                            </div>

                            {/* Pendidikan */}
                            <div className="bg-orange-300 rounded-2xl p-6">
                                <h4 className="text-center text-white font-semibold mb-3">pendidikan</h4>
                                <div className="bg-white rounded-xl p-6 shadow-sm">
                                    <div className="space-y-2">
                                        <div className="bg-gray-50 rounded-lg p-3 text-gray-700 text-sm text-center border border-gray-200">
                                            <span className="font-medium">Tidak Sekolah: {statistics.tidak_sekolah}</span>
                                        </div>
                                        <div className="bg-gray-50 rounded-lg p-3 text-gray-700 text-sm text-center border border-gray-200">
                                            <span className="font-medium">SD: {statistics.sd_sederajat}</span>
                                        </div>
                                        <div className="bg-gray-50 rounded-lg p-3 text-gray-700 text-sm text-center border border-gray-200">
                                            <span className="font-medium">SMP: {statistics.smp_sederajat}</span>
                                        </div>
                                        <div className="bg-gray-50 rounded-lg p-3 text-gray-700 text-sm text-center border border-gray-200">
                                            <span className="font-medium">SMA: {statistics.sma_sederajat}</span>
                                        </div>
                                        <div className="bg-gray-50 rounded-lg p-3 text-gray-700 text-sm text-center border border-gray-200">
                                            <span className="font-medium">Diploma: {statistics.diploma}</span>
                                        </div>
                                        <div className="bg-gray-50 rounded-lg p-3 text-gray-700 text-sm text-center border border-gray-200">
                                            <span className="font-medium">Sarjana: {statistics.sarjana}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Olahraga */}
                            <div className="bg-orange-300 rounded-2xl p-6">
                                <h4 className="text-center text-white font-semibold mb-3">olahraga</h4>
                                <div className="bg-white rounded-xl p-8 text-center shadow-sm">
                                    <Users className="h-12 w-12 text-orange-500 mx-auto mb-2" />
                                    <p className="text-gray-700 text-sm font-semibold">Grafik Fasilitas Olahraga</p>
                                </div>
                            </div>

                            {/* Wisata */}
                            <div className="bg-orange-300 rounded-2xl p-6">
                                <h4 className="text-center text-white font-semibold mb-3">wisata</h4>
                                <div className="bg-white rounded-xl p-8 text-center shadow-sm">
                                    <MapPin className="h-12 w-12 text-orange-500 mx-auto mb-2" />
                                    <p className="text-gray-700 text-sm font-semibold">Grafik Tempat Wisata</p>
                                </div>
                            </div>

                            {/* Faskes */}
                            <div className="bg-orange-300 rounded-2xl p-6">
                                <h4 className="text-center text-white font-semibold mb-3">faskes</h4>
                                <div className="bg-white rounded-xl p-8 text-center shadow-sm">
                                    <Heart className="h-12 w-12 text-orange-500 mx-auto mb-2" />
                                    <p className="text-gray-700 text-sm font-semibold">Grafik Fasilitas Kesehatan</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Infografis Anggaran - Di bagian bawah */}
                    {(statistics.infographic_image || statistics.infographic_image_right) && (
                        <div className="mt-8 mb-4">
                            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Anggaran Pendapatan dan Belanja Desa {statistics.year}</h3>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {statistics.infographic_image && (
                                    <div className="bg-white p-6 rounded-2xl shadow-sm">
                                        <img 
                                            src={statistics.infographic_image} 
                                            alt={`Infografis Anggaran ${statistics.year} - Kiri`}
                                            className="w-full h-auto rounded-xl"
                                        />
                                    </div>
                                )}
                                {statistics.infographic_image_right && (
                                    <div className="bg-white p-6 rounded-2xl shadow-sm">
                                        <img 
                                            src={statistics.infographic_image_right} 
                                            alt={`Infografis Anggaran ${statistics.year} - Kanan`}
                                            className="w-full h-auto rounded-xl"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </PublicLayout>
    );
}
