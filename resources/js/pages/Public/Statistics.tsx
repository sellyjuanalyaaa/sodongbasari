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
                        <div className="flex items-center justify-center md:justify-start">
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
                    </div>

                    {/* Grid Layout Sama Rata */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Total Penduduk */}
                        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200 hover:shadow-lg transition-all">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-orange-700 font-medium uppercase tracking-wide mb-2">Total Penduduk</p>
                                    <h4 className="text-3xl font-bold text-orange-900">{statistics.male_population + statistics.female_population}</h4>
                                </div>
                                <div className="bg-orange-200 rounded-full p-3">
                                    <Users className="h-6 w-6 text-orange-700" />
                                </div>
                            </div>
                        </div>

                        {/* Laki-laki */}
                        <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-all">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-slate-600 font-medium uppercase tracking-wide mb-2">Laki-Laki</p>
                                    <h4 className="text-3xl font-bold text-slate-900">{statistics.male_population}</h4>
                                </div>
                                <div className="bg-white rounded-full p-3">
                                    <Users className="h-6 w-6 text-slate-700" />
                                </div>
                            </div>
                        </div>

                        {/* Perempuan */}
                        <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-all">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-slate-600 font-medium uppercase tracking-wide mb-2">Perempuan</p>
                                    <h4 className="text-3xl font-bold text-slate-900">{statistics.female_population}</h4>
                                </div>
                                <div className="bg-white rounded-full p-3">
                                    <Users className="h-6 w-6 text-slate-700" />
                                </div>
                            </div>
                        </div>

                        {/* Kepala Keluarga */}
                        <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-all">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-slate-600 font-medium uppercase tracking-wide mb-2">Kepala Keluarga</p>
                                    <h4 className="text-3xl font-bold text-slate-900">{statistics.total_families}</h4>
                                </div>
                                <div className="bg-white rounded-full p-3">
                                    <Users className="h-6 w-6 text-orange-600" />
                                </div>
                            </div>
                        </div>

                        {/* Penduduk Datang */}
                        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200 hover:shadow-lg transition-all">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-green-700 font-medium uppercase tracking-wide mb-2">Penduduk Datang</p>
                                    <h4 className="text-3xl font-bold text-green-900">{statistics.penduduk_datang || 0}</h4>
                                </div>
                                <div className="bg-green-200 rounded-full p-3">
                                    <ArrowUpRight className="h-6 w-6 text-green-700" />
                                </div>
                            </div>
                        </div>

                        {/* Penduduk Keluar */}
                        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6 border border-red-200 hover:shadow-lg transition-all">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-red-700 font-medium uppercase tracking-wide mb-2">Penduduk Keluar</p>
                                    <h4 className="text-3xl font-bold text-red-900">{statistics.penduduk_keluar || 0}</h4>
                                </div>
                                <div className="bg-red-200 rounded-full p-3">
                                    <ArrowDownRight className="h-6 w-6 text-red-700" />
                                </div>
                            </div>
                        </div>

                        {/* Penduduk Usia Kerja */}
                        <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-all">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-slate-600 font-medium uppercase tracking-wide mb-2">Usia Kerja (15-64)</p>
                                    <h4 className="text-3xl font-bold text-slate-900">{statistics.petani + statistics.pedagang + statistics.pns + statistics.wiraswasta}</h4>
                                </div>
                                <div className="bg-white rounded-full p-3">
                                    <Briefcase className="h-6 w-6 text-slate-700" />
                                </div>
                            </div>
                        </div>

                        {/* Perguruan Tinggi */}
                        <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-all">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-slate-600 font-medium uppercase tracking-wide mb-2">Perguruan Tinggi</p>
                                    <h4 className="text-3xl font-bold text-slate-900">{statistics.sarjana + statistics.diploma}</h4>
                                </div>
                                <div className="bg-white rounded-full p-3">
                                    <GraduationCap className="h-6 w-6 text-slate-700" />
                                </div>
                            </div>
                        </div>

                        {/* Peta - span 2 cols */}
                        <div className="md:col-span-2 bg-slate-50 rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-all">
                            <div className="flex items-center gap-2 mb-5">
                                <MapPin className="h-5 w-5 text-[#EFA00B]" />
                                <h3 className="text-base font-medium text-slate-900">Wilayah Desa</h3>
                            </div>
                            <VillageMap
                                villageName="Desa Sodong Basari"
                                totalRt={statistics.total_rt}
                                totalRw={statistics.total_rw}
                            />
                            <div className="mt-5 grid grid-cols-2 gap-4">
                                <div className="bg-white rounded-lg p-4 text-center border border-slate-200">
                                    <h4 className="text-2xl font-semibold text-slate-900">{statistics.total_rt}</h4>
                                    <p className="text-xs text-slate-600 font-medium mt-1 tracking-wide">RT</p>
                                </div>
                                <div className="bg-white rounded-lg p-4 text-center border border-slate-200">
                                    <h4 className="text-2xl font-semibold text-slate-900">{statistics.total_rw}</h4>
                                    <p className="text-xs text-slate-600 font-medium mt-1 tracking-wide">RW</p>
                                </div>
                            </div>
                        </div>

                        {/* Agama */}
                        <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-all">
                            <h3 className="text-center text-slate-900 font-medium mb-4 text-sm uppercase tracking-wide">Agama</h3>
                            <div className="bg-white rounded-lg p-4">
                                <div className="space-y-2">
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

                        {/* Pekerjaan */}
                        <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-all">
                            <h3 className="text-center text-slate-900 font-medium mb-4 text-sm uppercase tracking-wide">Pekerjaan</h3>
                            <div className="bg-white rounded-lg p-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-slate-700 text-sm">
                                        <span className="font-normal">Petani</span>
                                        <span className="font-semibold">{statistics.petani}</span>
                                    </div>
                                    <div className="flex justify-between text-slate-700 text-sm">
                                        <span className="font-normal">Pedagang</span>
                                        <span className="font-semibold">{statistics.pedagang}</span>
                                    </div>
                                    <div className="flex justify-between text-slate-700 text-sm">
                                        <span className="font-normal">PNS</span>
                                        <span className="font-semibold">{statistics.pns}</span>
                                    </div>
                                    <div className="flex justify-between text-slate-700 text-sm">
                                        <span className="font-normal">Wiraswasta</span>
                                        <span className="font-semibold">{statistics.wiraswasta}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Fasilitas Umum */}
                        <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-all col-span-2">
                            <h3 className="text-center text-slate-900 font-medium mb-4 text-sm uppercase tracking-wide">Fasilitas Umum</h3>
                            <div className="bg-white rounded-lg p-4">
                                <div className="grid grid-cols-2 gap-4">
                                    {/* Tempat Ibadah */}
                                    <div className="space-y-2">
                                        <h4 className="text-xs font-semibold text-slate-700 mb-2 pb-1 border-b border-slate-200">Tempat Ibadah</h4>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Church className="h-3 w-3 text-[#EFA00B]" />
                                                <span className="text-xs text-slate-600">Masjid</span>
                                            </div>
                                            <span className="text-xs font-bold text-slate-900">{statistics.masjid || 0}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Church className="h-3 w-3 text-[#EFA00B]" />
                                                <span className="text-xs text-slate-600">Mushola</span>
                                            </div>
                                            <span className="text-xs font-bold text-slate-900">{statistics.mushola || 0}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Church className="h-3 w-3 text-[#EFA00B]" />
                                                <span className="text-xs text-slate-600">Gereja</span>
                                            </div>
                                            <span className="text-xs font-bold text-slate-900">{statistics.gereja || 0}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Church className="h-3 w-3 text-[#EFA00B]" />
                                                <span className="text-xs text-slate-600">Pura</span>
                                            </div>
                                            <span className="text-xs font-bold text-slate-900">{statistics.pura || 0}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Church className="h-3 w-3 text-[#EFA00B]" />
                                                <span className="text-xs text-slate-600">Vihara</span>
                                            </div>
                                            <span className="text-xs font-bold text-slate-900">{statistics.vihara || 0}</span>
                                        </div>
                                    </div>

                                    {/* Fasilitas Kesehatan */}
                                    <div className="space-y-2">
                                        <h4 className="text-xs font-semibold text-slate-700 mb-2 pb-1 border-b border-slate-200">Faskes</h4>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Heart className="h-3 w-3 text-[#EFA00B]" />
                                                <span className="text-xs text-slate-600">Puskesmas</span>
                                            </div>
                                            <span className="text-xs font-bold text-slate-900">{statistics.puskesmas || 0}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Heart className="h-3 w-3 text-[#EFA00B]" />
                                                <span className="text-xs text-slate-600">Posyandu</span>
                                            </div>
                                            <span className="text-xs font-bold text-slate-900">{statistics.posyandu || 0}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Heart className="h-3 w-3 text-[#EFA00B]" />
                                                <span className="text-xs text-slate-600">Klinik</span>
                                            </div>
                                            <span className="text-xs font-bold text-slate-900">{statistics.klinik || 0}</span>
                                        </div>
                                    </div>

                                    {/* Fasilitas Olahraga */}
                                    <div className="space-y-2">
                                        <h4 className="text-xs font-semibold text-slate-700 mb-2 pb-1 border-b border-slate-200">Olahraga</h4>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Users className="h-3 w-3 text-[#EFA00B]" />
                                                <span className="text-xs text-slate-600">Lapangan Sepakbola</span>
                                            </div>
                                            <span className="text-xs font-bold text-slate-900">{statistics.lapangan_sepakbola || 0}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Users className="h-3 w-3 text-[#EFA00B]" />
                                                <span className="text-xs text-slate-600">Lapangan Voli</span>
                                            </div>
                                            <span className="text-xs font-bold text-slate-900">{statistics.lapangan_voli || 0}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Users className="h-3 w-3 text-[#EFA00B]" />
                                                <span className="text-xs text-slate-600">Lapangan Badminton</span>
                                            </div>
                                            <span className="text-xs font-bold text-slate-900">{statistics.lapangan_badminton || 0}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Users className="h-3 w-3 text-[#EFA00B]" />
                                                <span className="text-xs text-slate-600">GOR</span>
                                            </div>
                                            <span className="text-xs font-bold text-slate-900">{statistics.gor || 0}</span>
                                        </div>
                                    </div>

                                    {/* Wisata */}
                                    <div className="space-y-2">
                                        <h4 className="text-xs font-semibold text-slate-700 mb-2 pb-1 border-b border-slate-200">Wisata</h4>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <MapPin className="h-3 w-3 text-[#EFA00B]" />
                                                <span className="text-xs text-slate-600">Pantai</span>
                                            </div>
                                            <span className="text-xs font-bold text-slate-900">{statistics.pantai || 0}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <MapPin className="h-3 w-3 text-[#EFA00B]" />
                                                <span className="text-xs text-slate-600">Taman</span>
                                            </div>
                                            <span className="text-xs font-bold text-slate-900">{statistics.taman || 0}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <MapPin className="h-3 w-3 text-[#EFA00B]" />
                                                <span className="text-xs text-slate-600">Cagar Budaya</span>
                                            </div>
                                            <span className="text-xs font-bold text-slate-900">{statistics.cagar_budaya || 0}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <MapPin className="h-3 w-3 text-[#EFA00B]" />
                                                <span className="text-xs text-slate-600">Wisata Alam</span>
                                            </div>
                                            <span className="text-xs font-bold text-slate-900">{statistics.wisata_alam || 0}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Grafik Migrasi - span 2 cols */}
                        <div className="md:col-span-2 bg-slate-50 rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-all">
                            <h3 className="text-center text-slate-900 font-medium mb-4 text-sm uppercase tracking-wide">Migrasi Penduduk (5 Tahun)</h3>
                            <div className="bg-white rounded-lg p-5">
                                <Bar
                                    data={{
                                        labels: ['2021', '2022', '2023', '2024', '2025'],
                                        datasets: [
                                            {
                                                label: 'Datang',
                                                data: [95, 110, 105, 130, 125],
                                                backgroundColor: 'rgba(34, 197, 94, 0.8)',
                                            },
                                            {
                                                label: 'Keluar',
                                                data: [75, 80, 70, 92, 87],
                                                backgroundColor: 'rgba(239, 68, 68, 0.8)',
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
                                                    padding: 10,
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

                        {/* Grafik Kematian & Kelahiran - span 2 cols */}
                        <div className="md:col-span-2 bg-slate-50 rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-all">
                            <h3 className="text-center text-slate-900 font-medium mb-4 text-sm uppercase tracking-wide">Kematian & Kelahiran (5 Tahun)</h3>
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
                                                    padding: 10,
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

                        {/* Pendidikan - span 2 cols */}
                        <div className="md:col-span-2 bg-slate-50 rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-all">
                            <h4 className="text-center text-slate-900 font-medium mb-4 text-sm uppercase tracking-wide">Pendidikan</h4>
                            <div className="bg-white rounded-lg p-5">
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    <div className="bg-slate-50 rounded-lg p-3 text-center border border-slate-100">
                                        <p className="text-xs text-slate-600 mb-1">Tidak Sekolah</p>
                                        <p className="text-lg font-bold text-slate-900">{statistics.tidak_sekolah}</p>
                                    </div>
                                    <div className="bg-slate-50 rounded-lg p-3 text-center border border-slate-100">
                                        <p className="text-xs text-slate-600 mb-1">SD</p>
                                        <p className="text-lg font-bold text-slate-900">{statistics.sd_sederajat}</p>
                                    </div>
                                    <div className="bg-slate-50 rounded-lg p-3 text-center border border-slate-100">
                                        <p className="text-xs text-slate-600 mb-1">SMP</p>
                                        <p className="text-lg font-bold text-slate-900">{statistics.smp_sederajat}</p>
                                    </div>
                                    <div className="bg-slate-50 rounded-lg p-3 text-center border border-slate-100">
                                        <p className="text-xs text-slate-600 mb-1">SMA</p>
                                        <p className="text-lg font-bold text-slate-900">{statistics.sma_sederajat}</p>
                                    </div>
                                    <div className="bg-slate-50 rounded-lg p-3 text-center border border-slate-100">
                                        <p className="text-xs text-slate-600 mb-1">Diploma</p>
                                        <p className="text-lg font-bold text-slate-900">{statistics.diploma}</p>
                                    </div>
                                    <div className="bg-slate-50 rounded-lg p-3 text-center border border-slate-100">
                                        <p className="text-xs text-slate-600 mb-1">Sarjana</p>
                                        <p className="text-lg font-bold text-slate-900">{statistics.sarjana}</p>
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
