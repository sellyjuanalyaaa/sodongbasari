
import React, { useState, useEffect } from 'react';
import PublicLayout from '@/layouts/PublicLayout';
import HeroSection from '@/components/HeroSection';
import NewsCard from '@/components/NewsCard';
import { Users } from 'lucide-react';

import { Head, Link } from '@inertiajs/react';
import { route } from 'ziggy-js';

// Data Statistik Slider
const subStats = [
    {
        title: "Sarana Olahraga",
        type: "budget",
        data: [
            { label: "Sudah Terealisasi", value: "Rp 120.000.000,00", color: "bg-[#71d338]", textColor: "text-slate-800" }, // Green
            { label: "Belum Terealisasi", value: "Rp 123.000.000,00", color: "bg-[#e5459f]", textColor: "text-slate-800" }  // Pink
        ]
    },
    {
        title: "Objek Wisata",
        type: "budget",
        data: [
            { label: "Sudah Terealisasi", value: "Rp 120.000.000,00", color: "bg-[#71d338]", textColor: "text-slate-800" },
            { label: "Belum Terealisasi", value: "Rp 123.000.000,00", color: "bg-[#e5459f]", textColor: "text-slate-800" }
        ]
    },
    {
        title: "Sarana Pendidikan",
        type: "budget",
        data: [
            { label: "Sudah Terealisasi", value: "Rp 120.000.000,00", color: "bg-[#71d338]", textColor: "text-slate-800" },
            { label: "Belum Terealisasi", value: "Rp 123.000.000,00", color: "bg-[#e5459f]", textColor: "text-slate-800" }
        ]
    },
    {
        title: "Profil Desa Sodong",
        subtitle: "Luas Wilayah",
        type: "budget",
        data: [
            { label: "Sudah Terealisasi", value: "Rp 120.000.000,00", color: "bg-[#71d338]", textColor: "text-slate-800" },
            { label: "Belum Terealisasi", value: "Rp 123.000.000,00", color: "bg-[#e5459f]", textColor: "text-slate-800" }
        ]
    },
    {
        title: "Tempat Ibadah",
        type: "landmark",
        image: "/images/mosque.png", // Local image
        data: [
            { label: "Masjid", value: "4", color: "bg-[#71d338]", textColor: "text-slate-900" },
            { label: "Mushola", value: "13", color: "bg-[#e5459f]", textColor: "text-slate-900" }
        ]
    }
];

// Helper component for counting up animation
// Helper component for counting up animation
const AnimatedCounter = ({ value, duration = 2000 }: { value: any; duration?: number }) => {
    const [count, setCount] = useState(0);

    // Robust parser for IDR format (e.g., "Rp 120.000.000,00") and standard numbers
    const parseValue = (val: any) => {
        if (typeof val === 'number') return val;
        // Remove "Rp" and whitespace
        const cleanVal = val.toString().replace(/Rp|\s/g, '');
        let clean = cleanVal;

        // Check if it has comma as decimal separator (Indonesian format)
        if (clean.includes(',') && clean.indexOf(',') > clean.lastIndexOf('.')) {
            // Remove dots (thousands) and replace comma with dot
            clean = clean.replace(/\./g, '').replace(',', '.');
        } else {
            // Assume standard format or just remove non-numeric chars except dot
            clean = clean.replace(/[^0-9.]/g, '');
        }

        return parseFloat(clean) || 0;
    };

    const targetValue = parseValue(value);
    const isCurrency = typeof value === 'string' && value.includes('Rp');

    useEffect(() => {
        let startTime: number | null = null;
        let animationFrameId: number;
        const startValue = 0; // Animate from 0 for a full effect, handled smoothly by easing

        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);

            // Easing function: easeOutExpo (starts fast, slows down gently)
            // This creates a very "premium" and smooth feel compared to linear
            const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

            const currentCount = Math.floor(startValue + (targetValue - startValue) * ease);
            setCount(currentCount);

            if (progress < 1) {
                animationFrameId = window.requestAnimationFrame(animate);
            }
        };

        animationFrameId = window.requestAnimationFrame(animate);

        return () => {
            if (animationFrameId) window.cancelAnimationFrame(animationFrameId);
        };
    }, [value, duration, targetValue]);

    // Format output
    if (isCurrency) {
        return <span>Rp {count.toLocaleString('id-ID')},00</span>;
    }

    return <span>{count.toLocaleString('id-ID')}</span>;
};

export default function Home({ villageInfo, heroImages = [], stats = {}, officials = [], latestNews = [] }: { villageInfo: any, heroImages?: any[], stats?: any, officials?: any[], latestNews?: any[] }) {
    const [currentStat, setCurrentStat] = useState(0);

    const populationStat = {
        title: "Total Penduduk",
        subtitle: stats?.population ? `${Number(stats.population).toLocaleString('id-ID')} Jiwa` : "Data Belum Tersedia",
        type: "count",
        data: []
    };

    const displayStats = [populationStat, ...subStats];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentStat((prev) => (prev + 1) % displayStats.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [displayStats.length]); // Add dependency

    const nextStat = () => setCurrentStat((prev) => (prev + 1) % displayStats.length);
    const prevStat = () => setCurrentStat((prev) => (prev - 1 + displayStats.length) % displayStats.length);

    return (
        <PublicLayout villageInfo={villageInfo}>
            <Head title="Beranda" />

            {/* Hero Section */}
            <HeroSection villageInfo={villageInfo} heroImages={heroImages} />

            {/* Welcome Section (Head of Village) */}
            <section className="py-24 bg-white">
                <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-16 md:gap-20">
                        {/* Avatar Side */}
                        <div className="flex-shrink-0 relative">
                            <div className="w-72 h-72 md:w-96 md:h-96 relative">
                                <img
                                    src="/images/kepala-desa.png"
                                    alt="Kepala Desa"
                                    className="w-full h-full object-contain filter drop-shadow-xl hover:scale-[1.02] transition-transform duration-500 ease-out"
                                />
                            </div>
                            {/* Subtle decorative element */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-amber-50 rounded-full blur-3xl -z-10 opacity-60"></div>
                        </div>

                        {/* Text Side */}
                        <div className="flex-1 max-w-xl">
                            <div className="relative mb-10">
                                <span className="text-7xl text-orange-600/20 font-serif leading-none block mb-6 select-none">"</span>
                                <p className="text-slate-600 text-[15px] leading-[1.8] -mt-12 font-light">
                                    Selamat datang di Website Resmi Desa Sodong Basari, Belik, Kabupaten Pemalang.
                                    <br /><br />
                                    Website ini menjadi pusat informasi dan layanan desa untuk mendukung keterbukaan, pelayanan publik, dan kemajuan masyarakat. Terima kasih telah berkunjung — kritik dan saran selalu kami harapkan demi Sodong Basari yang lebih baik.
                                </p>
                            </div>

                            <div className="border-l-2 border-slate-900 pl-6">
                                <h3 className="text-base font-semibold text-slate-900 tracking-wide">SUWARNO, S.H.</h3>
                                <p className="text-slate-500 text-sm mt-1.5">PJ Kepala Desa Sodong Basari</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Statistics Section Carousel */}
            <section className="py-24 bg-slate-50 overflow-hidden relative">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                    <div className="flex flex-col md:flex-row items-center justify-between relative gap-8">

                        {/* Left Navigation Button */}
                        <button
                            onClick={prevStat}
                            className="hidden md:flex flex-shrink-0 w-11 h-11 bg-white/80 backdrop-blur-sm rounded-full border border-slate-200 items-center justify-center text-slate-400 hover:text-slate-900 hover:border-slate-300 hover:bg-white transition-all duration-300 z-20"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                        </button>

                        {/* Main Content Area */}
                        <div className="flex-1 flex flex-col md:flex-row items-center w-full min-h-[320px]">

                            {/* Static Main Title */}
                            <div className="w-full md:w-1/4 mb-10 md:mb-0 md:pr-10 text-center md:text-left">
                                <h2 className="text-[2.5rem] md:text-5xl font-light text-slate-900 leading-[1.1] tracking-tight">
                                    Statistik <br />
                                    <span className="font-medium">Desa</span>
                                </h2>
                            </div>

                            {/* Dynamic Content Wrapper - Animated */}
                            <div key={currentStat} className="flex-1 flex flex-col md:flex-row items-center justify-between w-full animate-in fade-in slide-in-from-bottom-2 duration-700 ease-out">

                                {/* 1. Stat Title & Subtitle */}
                                <div className="w-full md:w-1/3 text-center md:text-left mb-10 md:mb-0">
                                    <h3 className="text-2xl md:text-3xl font-medium text-slate-900 leading-tight">
                                        {displayStats[currentStat].title}
                                    </h3>
                                    {displayStats[currentStat].subtitle && (
                                        <p className="text-lg text-slate-600 font-normal mt-3">
                                            {displayStats[currentStat].subtitle}
                                        </p>
                                    )}
                                    {!displayStats[currentStat].subtitle && (
                                        <p className="text-sm text-slate-400 mt-3 font-light tracking-wide">Data Terkini 2024</p>
                                    )}
                                </div>

                                {/* 2. Visual Chart (Center) */}
                                <div className="w-full md:w-1/3 flex justify-center mb-10 md:mb-0 relative">
                                    <div className="w-48 h-48 md:w-52 md:h-52 relative animate-in zoom-in-95 duration-700 ease-out fill-mode-both" style={{ animationDelay: '150ms' }}>
                                        {displayStats[currentStat].type === 'landmark' ? (
                                            <div className="w-full h-full flex items-center justify-center bg-white rounded-full p-2 shadow-sm border border-slate-100">
                                                <img src={displayStats[currentStat].image} className="w-full h-full object-contain drop-shadow-md transform transition-transform scale-150 hover:scale-[1.55] duration-300" alt="Landmark" />
                                            </div>
                                        ) : displayStats[currentStat].type === 'count' ? (
                                            <div className="relative w-full h-full flex items-center justify-center">
                                                <div className="absolute inset-6 bg-slate-900/5 rounded-full blur-2xl"></div>
                                                <div className="w-full h-full rounded-full border-[3px] border-slate-900 flex items-center justify-center bg-white shadow-sm">
                                                    <span className="text-5xl">👥</span>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="relative w-full h-full">
                                                <svg viewBox="0 0 36 36" className="w-full h-full block transform -rotate-90 drop-shadow-sm">
                                                    {/* Background Ring */}
                                                    <path className="text-slate-200" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3.5" />
                                                    {/* Green Segment */}
                                                    <path className="text-emerald-400 transition-all duration-1000 ease-out" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3.5" strokeDasharray="60, 100" strokeLinecap="round" />
                                                    {/* Pink Segment */}
                                                    <path className="text-rose-400 transition-all duration-1000 ease-out" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3.5" strokeDasharray="30, 100" strokeDashoffset="-65" strokeLinecap="round" />
                                                </svg>
                                                {/* Inner Circle for Donut Effect */}
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="w-28 h-28 bg-white rounded-full shadow-sm flex items-center justify-center border border-slate-100">
                                                        <div className="w-20 h-20 bg-slate-50 rounded-full"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* 3. Legend Data (Right) */}
                                <div className="w-full md:w-1/3 flex flex-col justify-center gap-7 pl-0 md:pl-10 animate-in slide-in-from-right-4 duration-500 ease-out" style={{ animationDelay: '250ms' }}>
                                    {displayStats[currentStat].type === 'count' ? (
                                        <div className="flex flex-col">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="w-2.5 h-2.5 rounded-full bg-slate-900"></div>
                                                <span className="text-slate-500 text-xs font-medium tracking-wider uppercase">Populasi Desa</span>
                                            </div>
                                            <p className="text-2xl font-semibold text-slate-900 pl-5">
                                                {displayStats[currentStat].subtitle ? displayStats[currentStat].subtitle.split(' ')[0] : '3.500'}
                                            </p>
                                        </div>
                                    ) : (
                                        displayStats[currentStat].data.map((item, idx) => (
                                            <div key={idx} className="flex flex-col group cursor-default">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <div className={`w-2.5 h-2.5 rounded-full ${item.color.replace('bg-[#71d338]', 'bg-emerald-400').replace('bg-[#e5459f]', 'bg-rose-400')} group-hover:scale-125 transition-transform duration-300`}></div>
                                                    <span className="text-slate-500 text-xs font-medium tracking-wider uppercase">{item.label}</span>
                                                </div>
                                                <p className="text-2xl font-semibold text-slate-900 pl-5">
                                                    <AnimatedCounter value={item.value} />
                                                </p>
                                            </div>
                                        ))
                                    )}
                                </div>

                            </div>
                        </div>

                        {/* Right Navigation Button */}
                        <button
                            onClick={nextStat}
                            className="hidden md:flex flex-shrink-0 w-11 h-11 bg-white/80 backdrop-blur-sm rounded-full border border-slate-200 items-center justify-center text-slate-400 hover:text-slate-900 hover:border-slate-300 hover:bg-white transition-all duration-300 z-20"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        </button>
                    </div>
                </div>
            </section>

            {/* Organizational Structure Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-light text-slate-900 mb-3 tracking-tight">Struktur Organisasi</h2>
                        <p className="text-slate-500 text-sm font-light">Perangkat Desa Sodong Basari</p>
                    </div>

                    {officials.length === 0 ? (
                        <div className="text-center py-16">
                            <Users className="h-16 w-16 mx-auto text-slate-200 mb-4" />
                            <p className="text-slate-400 text-sm">Data perangkat desa belum tersedia</p>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 lg:gap-12">
                                {officials.map((official) => (
                                    <div key={official.id} className="flex flex-col items-center group">
                                        <div className="mb-5 relative">
                                            {official.photo ? (
                                                <img 
                                                    src={official.photo} 
                                                    alt={official.name}
                                                    className="w-28 h-28 md:w-32 md:h-32 rounded-full object-cover border-2 border-slate-100 shadow-sm group-hover:scale-105 transition-all duration-500 ease-out group-hover:shadow-md"
                                                />
                                            ) : (
                                                <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-slate-100 flex items-center justify-center border-2 border-slate-200 group-hover:scale-105 transition-all duration-500 ease-out">
                                                    <Users className="h-12 w-12 md:h-14 md:w-14 text-slate-300" />
                                                </div>
                                            )}
                                        </div>
                                        <h4 className="font-medium text-slate-900 text-sm md:text-[15px] text-center">{official.name}</h4>
                                        <p className="text-xs md:text-[13px] text-slate-500 uppercase text-center mt-1.5 tracking-wide">{official.position}</p>
                                    </div>
                                ))}
                            </div>
                            
                            <div className="text-center mt-16">
                                <Link href={route('sodong-basari')} className="inline-flex items-center px-8 py-3 border border-slate-900 text-slate-900 font-medium text-sm rounded-full hover:bg-slate-900 hover:text-white transition-all duration-300">
                                    Lihat Selengkapnya
                                    <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </section>
            {/* Latest News Section */}
            <section className="py-24 bg-slate-50">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-light text-slate-900 mb-3 tracking-tight">Kabar & Kegiatan</h2>
                        <p className="text-slate-500 text-sm font-light">Berita Terkini</p>
                    </div>

                    {latestNews.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {latestNews.map((post) => (
                                    <NewsCard key={post.id} post={post} />
                                ))}
                            </div>

                            <div className="text-center mt-16">
                                <Link href={route('news.index')} className="inline-flex items-center px-8 py-3 border border-slate-900 text-slate-900 font-medium text-sm rounded-full hover:bg-slate-900 hover:text-white transition-all duration-300">
                                    Lihat Semua Berita
                                    <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-16">
                            <div className="text-slate-300 mb-4">
                                <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                </svg>
                            </div>
                            <p className="text-slate-400 text-sm">Belum ada berita tersedia</p>
                        </div>
                    )}
                </div>
            </section>
        </PublicLayout>
    );
}
