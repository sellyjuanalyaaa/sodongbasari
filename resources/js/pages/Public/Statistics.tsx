import React from 'react';
import PublicLayout from '@/layouts/PublicLayout';
import { Head, router } from '@inertiajs/react';
import VillageMap from '@/components/VillageMap';
import { Users, Home, MapPin, GraduationCap, Briefcase, Church, Building2, Heart, DollarSign, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { OrangeAccentTop, OrangeAccentBottom, DotsPattern } from '@/components/SvgDecorations';
import { AccentImage3, CloudAccent } from '@/components/ImageAccents';
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
    penduduk_datang?: number;
    penduduk_keluar?: number;
    kelahiran?: number;
    kematian?: number;
    masjid?: number;
    mushola?: number;
    gereja?: number;
    pura?: number;
    vihara?: number;
    puskesmas?: number;
    posyandu?: number;
    klinik?: number;
    lapangan_sepakbola?: number;
    lapangan_voli?: number;
    lapangan_badminton?: number;
    gor?: number;
    pantai?: number;
    taman?: number;
    cagar_budaya?: number;
    wisata_alam?: number;
    visited_data?: any; // Add generic if needed or keep loose
}

interface DemographicData {
    id: number;
    year: number;
    total_male: number;
    total_female: number;
    total_families: number;
    mutation_in?: number;
    mutation_out?: number;
}

interface BudgetData {
    id: number;
    year: number;
    type: string;
    amount: number;
}

interface ElectoralRollData {
    id: number;
    year: number;
    male_voters: number;
    female_voters: number;
    total_voters: number;
    election_type: string;
}

interface Props {
    villageInfo: any;
    statistics: StatisticData | null;
    historicalStatistics: StatisticData[];
    availableYears?: number[];
    selectedYear?: number;
    demographics?: DemographicData[];
    budgets?: BudgetData[];
    electoralRolls?: ElectoralRollData[];
}

export default function Statistics({ villageInfo, statistics, historicalStatistics = [], availableYears = [], selectedYear, demographics = [], budgets = [], electoralRolls = [] }: Props) {
    if (!statistics) {
        return (
            <PublicLayout villageInfo={villageInfo}>
                <Head title="Statistik Desa" />
                <div className="py-24 bg-white relative overflow-hidden">
                    <OrangeAccentTop className="right-0 top-0 opacity-100" />
                    <DotsPattern className="left-0 bottom-0 opacity-20" />
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
                        <div className="text-center mb-12 sm:mb-16">
                            <div className="inline-block px-3 sm:px-4 py-1.5 bg-orange-50 border border-orange-200 rounded-full mb-4">
                                <span className="text-[#EFA00B] text-xs font-medium uppercase tracking-wide">Data & Informasi</span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-slate-900 mb-3 tracking-tight">Statistik Desa</h2>
                            <p className="text-slate-500 text-xs sm:text-sm font-light">
                                {selectedYear ? `Tahun ${selectedYear}` : 'Tahun Terkini'}
                            </p>

                            {/* Year Selector */}
                            {availableYears.length > 0 && (
                                <div className="mt-6 flex justify-center">
                                    <select
                                        value={selectedYear || ''}
                                        onChange={(e) => router.get(route('public.statistics'), { year: e.target.value })}
                                        className="appearance-none bg-white border border-gray-200 rounded-lg py-2 pl-4 pr-10 text-sm font-medium text-slate-700 shadow-sm focus:border-orange-500 focus:ring-2 focus:ring-orange-200 cursor-pointer"
                                    >
                                        <option value="" disabled>Pilih Tahun</option>
                                        {availableYears.map(year => (
                                            <option key={year} value={year}>{year}</option>
                                        ))}
                                    </select>
                                </div>
                            )}
                        </div>
                        <div className="bg-slate-50 p-6 sm:p-12 rounded-lg border border-slate-200 text-center text-slate-400">
                            <p className="text-xs sm:text-sm">Data statistik belum tersedia.</p>
                        </div>
                    </div>
                </div>
            </PublicLayout>
        );
    }

    // Prepare data for charts
    const sortedStats = historicalStatistics?.length > 0
        ? [...historicalStatistics].sort((a, b) => a.year - b.year)
        : [statistics];

    const chartLabels = sortedStats.map(s => s.year.toString());
    const dataDatang = sortedStats.map(s => s.penduduk_datang || 0);
    const dataKeluar = sortedStats.map(s => s.penduduk_keluar || 0);
    const dataKelahiran = sortedStats.map(s => s.kelahiran || 0);
    const dataKematian = sortedStats.map(s => s.kematian || 0);

    return (
        <PublicLayout villageInfo={villageInfo}>
            <Head title="Statistik Desa" />
            <div className="py-24 bg-white relative overflow-hidden">
                <OrangeAccentTop className="right-0 top-0 opacity-100 z-0" />
                <OrangeAccentBottom className="left-0 bottom-0 opacity-100 z-0" />
                <DotsPattern className="left-10 top-20 opacity-30 z-0" />
                <AccentImage3 className="left-[-5%] top-[10%] w-[500px] opacity-10 rotate-12 z-0" />
                <AccentImage3 className="right-[-10%] bottom-[-5%] w-[600px] opacity-10 -rotate-45 z-0" />
                <CloudAccent className="top-[50%] left-[15%] w-[180px] h-[180px] opacity-18 rotate-25 z-0" />
                <CloudAccent className="bottom-[35%] right-[12%] w-[160px] h-[160px] opacity-20 -rotate-15 z-0" />
                <CloudAccent className="top-[15%] left-[45%] w-[140px] h-[140px] opacity-16 rotate-35 z-0" />
                <CloudAccent className="bottom-[60%] right-[25%] w-[150px] h-[150px] opacity-19 -rotate-28 z-0" />
                <CloudAccent className="top-[75%] left-[35%] w-[130px] h-[130px] opacity-17 rotate-18 z-0" />

                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
                    {/* Header dengan Data Utama */}
                    <div className="bg-gradient-to-br from-orange-50 via-white to-orange-50/50 rounded-2xl p-8 md:p-10 mb-6 border border-orange-100 shadow-sm shadow-orange-100/50">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="flex items-center gap-4 self-start md:self-center">
                                <div className="bg-gradient-to-br from-orange-500 to-[#EFA00B] rounded-full p-3 shadow-lg shadow-orange-200">
                                    <Building2 className="h-10 w-10 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-xl md:text-2xl font-medium text-slate-900 tracking-tight">Statistik Desa Sodong Basari</h1>
                                    <p className="text-slate-600 text-sm font-light mt-1">Kecamatan Belik, Kabupaten Pemalang</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Horizontal Scroll Layout for Mobile / Grid for Desktop */}
                    <div className="flex overflow-x-auto pb-6 -mx-6 px-6 sm:mx-0 sm:px-0 sm:pb-0 gap-4 snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible">
                        {/* Total Penduduk */}
                        <div className="flex-shrink-0 w-[85vw] sm:w-auto snap-center bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-5 border border-orange-200 shadow-sm hover:shadow-md transition-all">
                            <div className="flex items-center justify-between gap-3">
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs text-orange-700 font-medium uppercase tracking-wide mb-1">Total Penduduk</p>
                                    <h4 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-orange-900 break-all">{(statistics.male_population + statistics.female_population).toLocaleString('id-ID')}</h4>
                                </div>
                                <div className="bg-orange-200 rounded-full p-2.5 sm:p-3 flex-shrink-0">
                                    <Users className="h-5 w-5 sm:h-6 sm:w-6 text-orange-700" />
                                </div>
                            </div>
                        </div>

                        {/* Laki-laki */}
                        <div className="flex-shrink-0 w-[85vw] sm:w-auto snap-center bg-slate-50 rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-all">
                            <div className="flex items-center justify-between gap-3">
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs text-slate-600 font-medium uppercase tracking-wide mb-1">Laki-Laki</p>
                                    <h4 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 break-all">{statistics.male_population.toLocaleString('id-ID')}</h4>
                                </div>
                                <div className="bg-white rounded-full p-2.5 sm:p-3 flex-shrink-0">
                                    <Users className="h-5 w-5 sm:h-6 sm:w-6 text-slate-700" />
                                </div>
                            </div>
                        </div>

                        {/* Perempuan */}
                        <div className="flex-shrink-0 w-[85vw] sm:w-auto snap-center bg-slate-50 rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-all">
                            <div className="flex items-center justify-between gap-3">
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs text-slate-600 font-medium uppercase tracking-wide mb-1">Perempuan</p>
                                    <h4 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 break-all">{statistics.female_population.toLocaleString('id-ID')}</h4>
                                </div>
                                <div className="bg-white rounded-full p-2.5 sm:p-3 flex-shrink-0">
                                    <Users className="h-5 w-5 sm:h-6 sm:w-6 text-slate-700" />
                                </div>
                            </div>
                        </div>

                        {/* Kepala Keluarga */}
                        <div className="flex-shrink-0 w-[85vw] sm:w-auto snap-center bg-slate-50 rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-all">
                            <div className="flex items-center justify-between gap-3">
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs text-slate-600 font-medium uppercase tracking-wide mb-1">Kepala Keluarga</p>
                                    <h4 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 break-all">{statistics.total_families.toLocaleString('id-ID')}</h4>
                                </div>
                                <div className="bg-white rounded-full p-2.5 sm:p-3 flex-shrink-0">
                                    <Users className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600" />
                                </div>
                            </div>
                        </div>

                        {/* Penduduk Datang */}
                        <div className="flex-shrink-0 w-[85vw] sm:w-auto snap-center bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-5 border border-green-200 shadow-sm hover:shadow-md transition-all">
                            <div className="flex items-center justify-between gap-3">
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs text-green-700 font-medium uppercase tracking-wide mb-1">Penduduk Datang</p>
                                    <h4 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-900 break-all">{(statistics.penduduk_datang || 0).toLocaleString('id-ID')}</h4>
                                </div>
                                <div className="bg-green-200 rounded-full p-2.5 sm:p-3 flex-shrink-0">
                                    <ArrowUpRight className="h-5 w-5 sm:h-6 sm:w-6 text-green-700" />
                                </div>
                            </div>
                        </div>

                        {/* Penduduk Keluar */}
                        <div className="flex-shrink-0 w-[85vw] sm:w-auto snap-center bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-5 border border-red-200 shadow-sm hover:shadow-md transition-all">
                            <div className="flex items-center justify-between gap-3">
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs text-red-700 font-medium uppercase tracking-wide mb-1">Penduduk Keluar</p>
                                    <h4 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-red-900 break-all">{(statistics.penduduk_keluar || 0).toLocaleString('id-ID')}</h4>
                                </div>
                                <div className="bg-red-200 rounded-full p-2.5 sm:p-3 flex-shrink-0">
                                    <ArrowDownRight className="h-5 w-5 sm:h-6 sm:w-6 text-red-700" />
                                </div>
                            </div>
                        </div>

                        {/* Penduduk Usia Kerja */}
                        <div className="flex-shrink-0 w-[85vw] sm:w-auto snap-center bg-slate-50 rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-all">
                            <div className="flex items-center justify-between gap-3">
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs text-slate-600 font-medium uppercase tracking-wide mb-1">Usia Kerja (15-64)</p>
                                    <h4 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 break-all">{(statistics.petani + statistics.pedagang + statistics.pns + statistics.wiraswasta).toLocaleString('id-ID')}</h4>
                                </div>
                                <div className="bg-white rounded-full p-2.5 sm:p-3 flex-shrink-0">
                                    <Briefcase className="h-5 w-5 sm:h-6 sm:w-6 text-slate-700" />
                                </div>
                            </div>
                        </div>

                        {/* Perguruan Tinggi */}
                        <div className="flex-shrink-0 w-[85vw] sm:w-auto snap-center bg-slate-50 rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-all">
                            <div className="flex items-center justify-between gap-3">
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs text-slate-600 font-medium uppercase tracking-wide mb-1">Perguruan Tinggi</p>
                                    <h4 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 break-all">{(statistics.sarjana + statistics.diploma).toLocaleString('id-ID')}</h4>
                                </div>
                                <div className="bg-white rounded-full p-2.5 sm:p-3 flex-shrink-0">
                                    <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6 text-slate-700" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Grid for remaining cards */}
                    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 sm:mt-6">
                        {/* Peta - span 2 cols */}
                        <div className="col-span-2 md:col-span-2 bg-slate-50 rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-all">
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
                                    <h4 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-slate-900 break-all">{statistics.total_rt.toLocaleString('id-ID')}</h4>
                                    <p className="text-xs text-slate-600 font-medium mt-1 tracking-wide">RT</p>
                                </div>
                                <div className="bg-white rounded-lg p-4 text-center border border-slate-200">
                                    <h4 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-slate-900 break-all">{statistics.total_rw.toLocaleString('id-ID')}</h4>
                                    <p className="text-xs text-slate-600 font-medium mt-1 tracking-wide">RW</p>
                                </div>
                            </div>
                        </div>

                        {/* Agama */}
                        <div className="col-span-2 md:col-span-1 bg-slate-50 rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-all">
                            <h3 className="text-center text-slate-900 font-medium mb-4 text-sm uppercase tracking-wide">Agama</h3>
                            <div className="bg-white rounded-lg p-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center gap-2 text-slate-700 text-sm">
                                        <span className="font-normal flex-shrink-0">Islam</span>
                                        <span className="font-semibold text-right break-all">{statistics.islam.toLocaleString('id-ID')}</span>
                                    </div>
                                    <div className="flex justify-between items-center gap-2 text-slate-700 text-sm">
                                        <span className="font-normal flex-shrink-0">Kristen</span>
                                        <span className="font-semibold text-right break-all">{statistics.kristen.toLocaleString('id-ID')}</span>
                                    </div>
                                    <div className="flex justify-between items-center gap-2 text-slate-700 text-sm">
                                        <span className="font-normal flex-shrink-0">Katolik</span>
                                        <span className="font-semibold text-right break-all">{statistics.katolik.toLocaleString('id-ID')}</span>
                                    </div>
                                    <div className="flex justify-between items-center gap-2 text-slate-700 text-sm">
                                        <span className="font-normal flex-shrink-0">Hindu</span>
                                        <span className="font-semibold text-right break-all">{statistics.hindu.toLocaleString('id-ID')}</span>
                                    </div>
                                    <div className="flex justify-between items-center gap-2 text-slate-700 text-sm">
                                        <span className="font-normal flex-shrink-0">Buddha</span>
                                        <span className="font-semibold text-right break-all">{statistics.budha.toLocaleString('id-ID')}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Pekerjaan */}
                        <div className="col-span-2 md:col-span-1 bg-slate-50 rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-all">
                            <h3 className="text-center text-slate-900 font-medium mb-4 text-sm uppercase tracking-wide">Pekerjaan</h3>
                            <div className="bg-white rounded-lg p-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center gap-2 text-slate-700 text-sm">
                                        <span className="font-normal flex-shrink-0">Petani</span>
                                        <span className="font-semibold text-right break-all">{statistics.petani.toLocaleString('id-ID')}</span>
                                    </div>
                                    <div className="flex justify-between items-center gap-2 text-slate-700 text-sm">
                                        <span className="font-normal flex-shrink-0">Pedagang</span>
                                        <span className="font-semibold text-right break-all">{statistics.pedagang.toLocaleString('id-ID')}</span>
                                    </div>
                                    <div className="flex justify-between items-center gap-2 text-slate-700 text-sm">
                                        <span className="font-normal flex-shrink-0">PNS</span>
                                        <span className="font-semibold text-right break-all">{statistics.pns.toLocaleString('id-ID')}</span>
                                    </div>
                                    <div className="flex justify-between items-center gap-2 text-slate-700 text-sm">
                                        <span className="font-normal flex-shrink-0">Wiraswasta</span>
                                        <span className="font-semibold text-right break-all">{statistics.wiraswasta.toLocaleString('id-ID')}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Fasilitas Umum */}
                        <div className="col-span-2 bg-slate-50 rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-all">
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
                        <div className="col-span-2 md:col-span-2 bg-slate-50 rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-all">
                            <h3 className="text-center text-slate-900 font-medium mb-4 text-sm uppercase tracking-wide">Migrasi Penduduk ({chartLabels.length > 0 ? `${chartLabels[0]}-${chartLabels[chartLabels.length - 1]}` : 'Tahun Terakhir'})</h3>
                            <div className="bg-white rounded-lg p-5">
                                <Bar
                                    data={{
                                        labels: chartLabels,
                                        datasets: [
                                            {
                                                label: 'Datang',
                                                data: dataDatang,
                                                backgroundColor: 'rgba(34, 197, 94, 0.8)',
                                            },
                                            {
                                                label: 'Keluar',
                                                data: dataKeluar,
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
                        <div className="col-span-2 md:col-span-2 bg-slate-50 rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-all">
                            <h3 className="text-center text-slate-900 font-medium mb-4 text-sm uppercase tracking-wide">Kematian & Kelahiran ({chartLabels.length > 0 ? `${chartLabels[0]}-${chartLabels[chartLabels.length - 1]}` : 'Tahun Terakhir'})</h3>
                            <div className="bg-white rounded-lg p-5">
                                <Line
                                    data={{
                                        labels: chartLabels,
                                        datasets: [
                                            {
                                                label: 'Kelahiran',
                                                data: dataKelahiran,
                                                borderColor: 'rgb(34, 197, 94)',
                                                backgroundColor: 'rgba(34, 197, 94, 0.1)',
                                                tension: 0.4,
                                            },
                                            {
                                                label: 'Kematian',
                                                data: dataKematian,
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
                        <div className="col-span-2 md:col-span-2 bg-slate-50 rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-all">
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
                    {/* Arsip Data Kependudukan Section */}
                    {demographics.length > 0 && (
                        <div className="mt-16 sm:mt-24">
                            <h3 className="text-2xl md:text-3xl font-light text-slate-900 mb-8 text-center tracking-tight">
                                Arsip Data Kependudukan
                            </h3>
                            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm text-left">
                                        <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                                            <tr>
                                                <th scope="col" className="px-6 py-4 font-medium">Tahun</th>
                                                <th scope="col" className="px-6 py-4 font-medium text-center">Laki-laki</th>
                                                <th scope="col" className="px-6 py-4 font-medium text-center">Perempuan</th>
                                                <th scope="col" className="px-6 py-4 font-medium text-center">Total Keluarga (KK)</th>
                                                <th scope="col" className="px-6 py-4 font-medium text-center">Mutasi Masuk</th>
                                                <th scope="col" className="px-6 py-4 font-medium text-center">Mutasi Keluar</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {demographics.map((item) => (
                                                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                                                    <td className="px-6 py-4 font-medium text-slate-900">{item.year}</td>
                                                    <td className="px-6 py-4 text-center text-slate-600">{item.total_male}</td>
                                                    <td className="px-6 py-4 text-center text-slate-600">{item.total_female}</td>
                                                    <td className="px-6 py-4 text-center text-slate-600">{item.total_families}</td>
                                                    <td className="px-6 py-4 text-center text-green-600 font-medium">
                                                        {item.mutation_in ? `+${item.mutation_in}` : '-'}
                                                    </td>
                                                    <td className="px-6 py-4 text-center text-red-600 font-medium">
                                                        {item.mutation_out ? `-${item.mutation_out}` : '-'}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Daftar Pemilih Tetap Section */}
                    {electoralRolls.length > 0 && (
                        <div className="mt-16 sm:mt-24">
                            <h3 className="text-2xl md:text-3xl font-light text-slate-900 mb-8 text-center tracking-tight">
                                Arsip Daftar Pemilih Tetap (DPT)
                            </h3>
                            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm text-left">
                                        <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                                            <tr>
                                                <th scope="col" className="px-6 py-4 font-medium">Tahun</th>
                                                <th scope="col" className="px-6 py-4 font-medium">Jenis Pemilu</th>
                                                <th scope="col" className="px-6 py-4 font-medium text-center">Laki-laki</th>
                                                <th scope="col" className="px-6 py-4 font-medium text-center">Perempuan</th>
                                                <th scope="col" className="px-6 py-4 font-medium text-center">Total Pemilih</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {electoralRolls.map((item) => (
                                                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                                                    <td className="px-6 py-4 font-medium text-slate-900">{item.year}</td>
                                                    <td className="px-6 py-4">
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                                                            {item.election_type}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-center text-slate-600">{item.male_voters.toLocaleString('id-ID')}</td>
                                                    <td className="px-6 py-4 text-center text-slate-600">{item.female_voters.toLocaleString('id-ID')}</td>
                                                    <td className="px-6 py-4 text-center font-semibold text-slate-900">{item.total_voters.toLocaleString('id-ID')}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Transparansi Anggaran Section */}
                    {budgets.length > 0 && (
                        <div className="mt-16 sm:mt-24">
                            <h3 className="text-2xl md:text-3xl font-light text-slate-900 mb-8 text-center tracking-tight">
                                Transparansi Anggaran Desa
                            </h3>
                            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm text-left">
                                        <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                                            <tr>
                                                <th scope="col" className="px-6 py-4 font-medium">Tahun</th>
                                                <th scope="col" className="px-6 py-4 font-medium">Kategori</th>
                                                <th scope="col" className="px-6 py-4 font-medium text-right">Nominal</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {budgets.map((item) => (
                                                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                                                    <td className="px-6 py-4 font-medium text-slate-900">{item.year}</td>
                                                    <td className="px-6 py-4">
                                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.type === 'Pendapatan' ? 'bg-green-100 text-green-800' :
                                                            item.type === 'Belanja' ? 'bg-red-100 text-red-800' :
                                                                'bg-blue-100 text-blue-800'
                                                            }`}>
                                                            {item.type}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-right font-medium text-slate-700">
                                                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.amount)}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </PublicLayout >
    );
}
