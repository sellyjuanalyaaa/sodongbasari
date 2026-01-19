import React from 'react';
import PublicLayout from '@/layouts/PublicLayout';
import { Head } from '@inertiajs/react';
import VillageMap from '@/components/VillageMap';
import { Users, Home, MapPin, GraduationCap, Briefcase, Church, Building2, Heart, DollarSign, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

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
                <div className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                        <div className="text-center mb-16">
                            <div className="inline-block px-4 py-1.5 bg-orange-50 border border-orange-200 rounded-full mb-4">
                                <span className="text-[#EFA00B] text-xs font-medium uppercase tracking-wide">Data & Informasi</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-light text-slate-900 mb-3 tracking-tight">Statistik Desa</h2>
                            <p className="text-slate-500 text-sm font-light">Tahun Terkini</p>
                        </div>
                        <div className="bg-slate-50 p-12 rounded-lg border border-slate-200 text-center text-slate-400">
                            <p className="text-sm">Data statistik belum tersedia.</p>
                        </div>
                    </div>
                </div>
            </PublicLayout>
        );
    }

    return (
        <PublicLayout villageInfo={villageInfo}>
            <Head title="Statistik Desa" />
            <div className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                    {/* Header dengan Data Utama */}
                    <div className="bg-gradient-to-br from-orange-50 via-white to-orange-50/50 rounded-2xl p-8 md:p-10 mb-6 border border-orange-100 shadow-sm shadow-orange-100/50">
                        <div className="flex items-center justify-center md:justify-start mb-8">
                            <div className="flex items-center gap-4">
                                <div className="bg-gradient-to-br from-orange-500 to-[#EFA00B] rounded-full p-3 shadow-lg shadow-orange-200">
                                    <Building2 className="h-10 w-10 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-xl md:text-2xl font-medium text-slate-900 tracking-tight">Pemerintah Desa Sodong Basari</h1>
                                    <p className="text-slate-600 text-sm font-light mt-1">Kecamatan Belik, Kabupaten Pemalang</p>
                                </div>
                            </div>
                        </div>
                        
                        {/* 3 Box Data Utama */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-white rounded-xl p-6 text-center border border-slate-200 hover:border-orange-300 hover:shadow-lg hover:shadow-orange-100 transition-all duration-300 group">
                                <div className="flex justify-center mb-3">
                                    <div className="bg-orange-50 rounded-full p-3 group-hover:bg-orange-100 transition-colors">
                                        <Users className="h-7 w-7 text-[#EFA00B] transition-colors" />
                                    </div>
                                </div>
                                <h3 className="text-3xl font-semibold text-slate-900">{statistics.total_families}</h3>
                                <p className="text-xs text-slate-600 font-medium mt-2 tracking-wide uppercase">Kepala Keluarga</p>
                            </div>
                            
                            <div className="bg-white rounded-xl p-6 text-center border border-slate-200 hover:border-green-300 hover:shadow-lg hover:shadow-green-100 transition-all duration-300 group">
                                <div className="flex justify-center mb-3">
                                    <div className="bg-green-50 rounded-full p-3 group-hover:bg-green-100 transition-colors">
                                        <ArrowUpRight className="h-7 w-7 text-green-600 transition-colors" />
                                    </div>
                                </div>
                                <h3 className="text-3xl font-semibold text-slate-900">125</h3>
                                <p className="text-xs text-slate-600 font-medium mt-2 tracking-wide uppercase">Penduduk Datang</p>
                            </div>
                            
                            <div className="bg-white rounded-xl p-6 text-center border border-slate-200 hover:border-red-300 hover:shadow-lg hover:shadow-red-100 transition-all duration-300 group">
                                <div className="flex justify-center mb-3">
                                    <div className="bg-red-50 rounded-full p-3 group-hover:bg-red-100 transition-colors">
                                        <ArrowDownRight className="h-7 w-7 text-red-600 transition-colors" />
                                    </div>
                                </div>
                                <h3 className="text-3xl font-semibold text-slate-900">87</h3>
                                <p className="text-xs text-slate-600 font-medium mt-2 tracking-wide uppercase">Penduduk Keluar</p>
                            </div>
                        </div>
                    </div>

                    {/* Grid Layout Utama */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Kolom Kiri - Peta & Data Lainnya */}
                        <div className="lg:col-span-1 space-y-6">
                            {/* Jumlah Penduduk Sesuai RT */}
                            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                                <div className="flex items-center gap-2 mb-5">
                                    <MapPin className="h-5 w-5 text-[#EFA00B]" />
                                    <h3 className="text-base font-medium text-slate-900">Wilayah Sodong Basari</h3>
                                </div>
                                <VillageMap
                                    villageName="Desa Sodong Basari"
                                    totalRt={statistics.total_rt}
                                    totalRw={statistics.total_rw}
                                />
                                <div className="mt-5 grid grid-cols-2 gap-4">
                                    <div className="bg-white rounded-lg p-4 text-center border border-slate-200">
                                        <h4 className="text-2xl font-semibold text-slate-900">{statistics.total_rt}</h4>
                                        <p className="text-xs text-slate-600 font-medium mt-1 tracking-wide">Rukun Tetangga</p>
                                    </div>
                                    <div className="bg-white rounded-lg p-4 text-center border border-slate-200">
                                        <h4 className="text-2xl font-semibold text-slate-900">{statistics.total_rw}</h4>
                                        <p className="text-xs text-slate-600 font-medium mt-1 tracking-wide">Rukun Warga</p>
                                    </div>
                                </div>
                            </div>

                            {/* Data Lembaga */}
                            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                                <h3 className="text-center text-slate-900 font-medium mb-4 text-sm uppercase tracking-wide">Data Lembaga</h3>
                                <div className="bg-white rounded-lg p-8 text-center">
                                    <Building2 className="h-10 w-10 text-slate-400 mx-auto mb-2" />
                                    <p className="text-slate-500 text-xs font-light">Grafik Lembaga Desa</p>
                                </div>
                            </div>

                            {/* Tingkat Kematian & Kelahiran */}
                            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                                <h3 className="text-center text-slate-900 font-medium mb-4 text-sm uppercase tracking-wide">Kematian & Kelahiran (5 Tahun Terakhir)</h3>
                                <div className="bg-white rounded-lg p-5">
                                    <Line
                                        data={{
                                            labels: ['2021', '2022', '2023', '2024', '2025'],
                                            datasets: [
                                                {
                                                    label: 'Kelahiran',
                                                    data: [45, 52, 48, 55, 50],
                                                    borderColor: 'rgb(34, 197, 94)',
                                                    backgroundColor: 'rgba(34, 197, 94, 0.1)',
                                                    tension: 0.4,
                                                },
                                                {
                                                    label: 'Kematian',
                                                    data: [12, 15, 11, 14, 13],
                                                    borderColor: 'rgb(239, 68, 68)',
                                                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                                                    tension: 0.4,
                                                }
                                            ]
                                        }}
                                        options={{
                                            responsive: true,
                                            maintainAspectRatio: true,
                                            plugins: {
                                                legend: {
                                                    position: 'bottom',
                                                    labels: {
                                                        padding: 15,
                                                        font: { size: 11 }
                                                    }
                                                }
                                            },
                                            scales: {
                                                y: {
                                                    beginAtZero: true,
                                                    ticks: { font: { size: 10 } }
                                                },
                                                x: {
                                                    ticks: { font: { size: 10 } }
                                                }
                                            }
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Agama */}
                            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                                <h3 className="text-center text-slate-900 font-medium mb-4 text-sm uppercase tracking-wide">Agama</h3>
                                <div className="bg-white rounded-lg p-5">
                                    <div className="space-y-3">
                                        <div className="flex justify-between text-slate-700 text-sm">
                                            <span className="font-normal">Islam</span>
                                            <span className="font-semibold">{statistics.islam}</span>
                                        </div>
                                        <div className="flex justify-between text-slate-700 text-sm">
                                            <span className="font-normal">Kristen</span>
                                            <span className="font-semibold">{statistics.kristen}</span>
                                        </div>
                                        <div className="flex justify-between text-slate-700 text-sm">
                                            <span className="font-normal">Katolik</span>
                                            <span className="font-semibold">{statistics.katolik}</span>
                                        </div>
                                        <div className="flex justify-between text-slate-700 text-sm">
                                            <span className="font-normal">Hindu</span>
                                            <span className="font-semibold">{statistics.hindu}</span>
                                        </div>
                                        <div className="flex justify-between text-slate-700 text-sm">
                                            <span className="font-normal">Buddha</span>
                                            <span className="font-semibold">{statistics.budha}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Kolom Tengah - 5 Box & Grafik */}
                        <div className="lg:col-span-1 space-y-6">
                            {/* 5 Box Data Tambahan */}
                            <div className="grid grid-cols-3 gap-3">
                                <div className="bg-slate-50 rounded-lg p-4 text-center border border-slate-200">
                                    <div className="bg-white rounded-lg p-2 mb-2 inline-block">
                                        <Users className="h-5 w-5 text-slate-700" />
                                    </div>
                                    <h4 className="text-xl font-semibold text-slate-900">{statistics.male_population + statistics.female_population}</h4>
                                    <p className="text-[10px] text-slate-600 font-medium mt-1 uppercase tracking-wide">Jumlah Penduduk</p>
                                </div>
                                <div className="bg-slate-50 rounded-lg p-4 text-center border border-slate-200">
                                    <div className="bg-white rounded-lg p-2 mb-2 inline-block">
                                        <Users className="h-5 w-5 text-slate-700" />
                                    </div>
                                    <h4 className="text-xl font-semibold text-slate-900">{statistics.male_population}</h4>
                                    <p className="text-[10px] text-slate-600 font-medium mt-1 uppercase tracking-wide">Laki-Laki</p>
                                </div>
                                <div className="bg-slate-50 rounded-lg p-4 text-center border border-slate-200">
                                    <div className="bg-white rounded-lg p-2 mb-2 inline-block">
                                        <Users className="h-5 w-5 text-slate-700" />
                                    </div>
                                    <h4 className="text-xl font-semibold text-slate-900">{statistics.female_population}</h4>
                                    <p className="text-[10px] text-slate-600 font-medium mt-1 uppercase tracking-wide">Perempuan</p>
                                </div>
                                <div className="bg-slate-50 rounded-lg p-4 text-center border border-slate-200">
                                    <div className="bg-white rounded-lg p-2 mb-2 inline-block">
                                        <GraduationCap className="h-5 w-5 text-slate-700" />
                                    </div>
                                    <h4 className="text-xl font-semibold text-slate-900">{statistics.sarjana + statistics.diploma}</h4>
                                    <p className="text-[10px] text-slate-600 font-medium mt-1 uppercase tracking-wide leading-tight">Pendidikan Perguruan Tinggi</p>
                                </div>
                                <div className="bg-slate-50 rounded-lg p-4 text-center col-span-2 border border-slate-200">
                                    <div className="bg-white rounded-lg p-2 mb-2 inline-block">
                                        <Briefcase className="h-5 w-5 text-slate-700" />
                                    </div>
                                    <h4 className="text-xl font-semibold text-slate-900">{statistics.petani + statistics.pedagang + statistics.pns + statistics.wiraswasta}</h4>
                                    <p className="text-[10px] text-slate-600 font-medium mt-1 uppercase tracking-wide">Penduduk Usia Kerja (15-64 Th)</p>
                                </div>
                            </div>

                            {/* Grafik Penduduk Berdasar Usia dan Jenis Kelamin */}
                            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                                <h3 className="text-center text-slate-900 font-medium mb-5 text-sm uppercase tracking-wide">Penduduk Sesuai Usia dan Jenis Kelamin</h3>
                                <div className="bg-white rounded-lg p-5">
                                    {/* Dummy Bar Chart */}
                                    <div className="space-y-2.5">
                                        {[
                                            { range: '65 Tahun Ke Atas', male: 15, female: 12 },
                                            { range: '60-65 Tahun', male: 18, female: 16 },
                                            { range: '56-65 Tahun', male: 22, female: 20 },
                                            { range: '36-45 Tahun', male: 28, female: 26 },
                                            { range: '26-35 Tahun', male: 25, female: 24 },
                                            { range: '17-25 Tahun', male: 20, female: 22 },
                                            { range: '13-16 Tahun', male: 12, female: 11 },
                                            { range: '6-12 Tahun', male: 14, female: 13 },
                                            { range: '0-5 Tahun', male: 8, female: 9 },
                                        ].map((item, idx) => (
                                            <div key={idx} className="flex items-center gap-2 text-xs">
                                                <span className="w-28 text-slate-600 text-[11px] font-light">{item.range}</span>
                                                <div className="flex-1 flex gap-1.5">
                                                    <div className="flex-1 bg-slate-100 rounded">
                                                        <div 
                                                            className="bg-slate-400 h-3.5 rounded flex items-center justify-end pr-1 transition-all duration-500"
                                                            style={{ width: `${item.male * 3}%` }}
                                                        >
                                                            <span className="text-white text-[10px] font-medium">{item.male}%</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex-1 bg-slate-100 rounded">
                                                        <div 
                                                            className="bg-slate-700 h-3.5 rounded flex items-center justify-end pr-1 transition-all duration-500"
                                                            style={{ width: `${item.female * 3}%` }}
                                                        >
                                                            <span className="text-white text-[10px] font-medium">{item.female}%</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex justify-center gap-6 mt-5 pt-4 border-t border-slate-100">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 bg-slate-400 rounded"></div>
                                            <span className="text-[11px] text-slate-600 font-medium">Laki-Laki</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 bg-slate-700 rounded"></div>
                                            <span className="text-[11px] text-slate-600 font-medium">Perempuan</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Pekerjaan */}
                            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                                <h3 className="text-center text-slate-900 font-medium mb-4 text-sm uppercase tracking-wide">Pekerjaan</h3>
                                <div className="bg-white rounded-lg p-5">
                                    <div className="space-y-2.5">
                                        <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                                            <div className="flex justify-between text-slate-700">
                                                <span className="text-sm font-normal">Petani</span>
                                                <span className="font-semibold">{statistics.petani}</span>
                                            </div>
                                        </div>
                                        <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                                            <div className="flex justify-between text-slate-700">
                                                <span className="text-sm font-normal">Pedagang</span>
                                                <span className="font-semibold">{statistics.pedagang}</span>
                                            </div>
                                        </div>
                                        <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                                            <div className="flex justify-between text-slate-700">
                                                <span className="text-sm font-normal">PNS</span>
                                                <span className="font-semibold">{statistics.pns}</span>
                                            </div>
                                        </div>
                                        <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                                            <div className="flex justify-between text-slate-700">
                                                <span className="text-sm font-normal">Wiraswasta</span>
                                                <span className="font-semibold">{statistics.wiraswasta}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Sumber Pendapatan Desa */}
                            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                                <h3 className="text-center text-slate-900 font-medium mb-4 text-sm uppercase tracking-wide">Sumber Pendapatan Desa</h3>
                                <div className="bg-white rounded-lg p-8 text-center">
                                    <DollarSign className="h-10 w-10 text-slate-400 mx-auto mb-2" />
                                    <p className="text-slate-500 text-xs font-light">Grafik Pendapatan</p>
                                </div>
                            </div>
                        </div>

                        {/* Kolom Kanan - Fasilitas */}
                        <div className="lg:col-span-1 space-y-6">
                            {/* Fasilitas Umum - Digabung Semua */}
                            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                                <h3 className="text-center text-slate-900 font-medium mb-4 text-sm uppercase tracking-wide">Fasilitas Umum</h3>
                                <div className="bg-white rounded-lg p-5">
                                    <div className="space-y-4">
                                        {/* Tempat Ibadah */}
                                        <div className="border-b border-slate-100 pb-3">
                                            <div className="flex items-center gap-2 mb-3">
                                                <Church className="h-4 w-4 text-[#EFA00B]" />
                                                <h4 className="text-sm font-medium text-slate-900">Tempat Ibadah</h4>
                                            </div>
                                            <div className="space-y-2 pl-6">
                                                <div className="flex justify-between text-xs text-slate-600">
                                                    <span>Masjid</span>
                                                    <span className="font-semibold">8</span>
                                                </div>
                                                <div className="flex justify-between text-xs text-slate-600">
                                                    <span>Musholla</span>
                                                    <span className="font-semibold">12</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Fasilitas Kesehatan */}
                                        <div className="border-b border-slate-100 pb-3">
                                            <div className="flex items-center gap-2 mb-3">
                                                <Heart className="h-4 w-4 text-[#EFA00B]" />
                                                <h4 className="text-sm font-medium text-slate-900">Fasilitas Kesehatan</h4>
                                            </div>
                                            <div className="space-y-2 pl-6">
                                                <div className="flex justify-between text-xs text-slate-600">
                                                    <span>Puskesmas Pembantu</span>
                                                    <span className="font-semibold">1</span>
                                                </div>
                                                <div className="flex justify-between text-xs text-slate-600">
                                                    <span>Posyandu</span>
                                                    <span className="font-semibold">5</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Fasilitas Olahraga */}
                                        <div className="border-b border-slate-100 pb-3">
                                            <div className="flex items-center gap-2 mb-3">
                                                <Users className="h-4 w-4 text-[#EFA00B]" />
                                                <h4 className="text-sm font-medium text-slate-900">Fasilitas Olahraga</h4>
                                            </div>
                                            <div className="space-y-2 pl-6">
                                                <div className="flex justify-between text-xs text-slate-600">
                                                    <span>Lapangan Sepak Bola</span>
                                                    <span className="font-semibold">2</span>
                                                </div>
                                                <div className="flex justify-between text-xs text-slate-600">
                                                    <span>Lapangan Voli</span>
                                                    <span className="font-semibold">3</span>
                                                </div>
                                                <div className="flex justify-between text-xs text-slate-600">
                                                    <span>Lapangan Badminton</span>
                                                    <span className="font-semibold">2</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Wisata */}
                                        <div>
                                            <div className="flex items-center gap-2 mb-3">
                                                <MapPin className="h-4 w-4 text-[#EFA00B]" />
                                                <h4 className="text-sm font-medium text-slate-900">Wisata</h4>
                                            </div>
                                            <div className="space-y-2 pl-6">
                                                <div className="flex justify-between text-xs text-slate-600">
                                                    <span>Objek Wisata</span>
                                                    <span className="font-semibold">3</span>
                                                </div>
                                                <div className="flex justify-between text-xs text-slate-600">
                                                    <span>Tempat Kuliner</span>
                                                    <span className="font-semibold">5</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Pendidikan */}
                            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                                <h4 className="text-center text-slate-900 font-medium mb-4 text-sm uppercase tracking-wide">Pendidikan</h4>
                                <div className="bg-white rounded-lg p-5">
                                    <div className="space-y-2">
                                        <div className="bg-slate-50 rounded-lg p-3 text-slate-700 text-sm text-center border border-slate-100">
                                            <span className="font-normal">Tidak Sekolah: <span className="font-semibold">{statistics.tidak_sekolah}</span></span>
                                        </div>
                                        <div className="bg-slate-50 rounded-lg p-3 text-slate-700 text-sm text-center border border-slate-100">
                                            <span className="font-normal">SD: <span className="font-semibold">{statistics.sd_sederajat}</span></span>
                                        </div>
                                        <div className="bg-slate-50 rounded-lg p-3 text-slate-700 text-sm text-center border border-slate-100">
                                            <span className="font-normal">SMP: <span className="font-semibold">{statistics.smp_sederajat}</span></span>
                                        </div>
                                        <div className="bg-slate-50 rounded-lg p-3 text-slate-700 text-sm text-center border border-slate-100">
                                            <span className="font-normal">SMA: <span className="font-semibold">{statistics.sma_sederajat}</span></span>
                                        </div>
                                        <div className="bg-slate-50 rounded-lg p-3 text-slate-700 text-sm text-center border border-slate-100">
                                            <span className="font-normal">Diploma: <span className="font-semibold">{statistics.diploma}</span></span>
                                        </div>
                                        <div className="bg-slate-50 rounded-lg p-3 text-slate-700 text-sm text-center border border-slate-100">
                                            <span className="font-normal">Sarjana: <span className="font-semibold">{statistics.sarjana}</span></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Infografis Anggaran - Di bagian bawah */}
                    {(statistics.infographic_image || statistics.infographic_image_right) && (
                        <div className="mt-12">
                            <h3 className="text-2xl md:text-3xl font-light text-slate-900 mb-8 text-center tracking-tight">
                                Anggaran Pendapatan dan Belanja Desa <span className="font-medium">{statistics.year}</span>
                            </h3>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {statistics.infographic_image && (
                                    <div className="bg-white p-6 rounded-xl border border-slate-200">
                                        <img 
                                            src={statistics.infographic_image} 
                                            alt={`Infografis Anggaran ${statistics.year} - Kiri`}
                                            className="w-full h-auto rounded-lg"
                                        />
                                    </div>
                                )}
                                {statistics.infographic_image_right && (
                                    <div className="bg-white p-6 rounded-xl border border-slate-200">
                                        <img 
                                            src={statistics.infographic_image_right} 
                                            alt={`Infografis Anggaran ${statistics.year} - Kanan`}
                                            className="w-full h-auto rounded-lg"
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
