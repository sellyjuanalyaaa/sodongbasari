
import React, { useState, useEffect } from 'react';
import PublicLayout from '@/layouts/PublicLayout';
import HeroSection from '@/components/HeroSection';
import SectionTitle from '@/components/SectionTitle';
import NewsCard from '@/components/NewsCard';
import { Users } from 'lucide-react';

import { Head, Link } from '@inertiajs/react';
import { route } from 'ziggy-js';

// Data Berita Manual sesuai Contoh
const featuredNews = [
    {
        id: 1,
        title: "Lomba Foto & Reels",
        category: "Kamandaka",
        published_at: "2022-11-20",
        image_path: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        content: "Yuk ikutan lombanya! Buat karya semenarik mungkin dan menangkan hadiah jutaan rupiah...",
        slug: "lomba-foto-reels"
    },
    {
        id: 2,
        title: "Event Kamandaka Ciptarasa",
        category: "Taman Sari",
        published_at: "2022-11-23",
        image_path: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        content: "Rangkaian acara Kamandaka Ciptarasa bulan November akan dimeriahkan dengan berbagai lomba...",
        slug: "event-kamandaka"
    },
    {
        id: 3,
        title: "Pagelaran Wayang Kulit",
        category: "Budaya",
        published_at: "2022-11-25",
        image_path: "https://images.unsplash.com/photo-1583071299210-c6c113f4cb28?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        content: "Acara wayang kulit dengan lakon yang terkenal yaitu 'Semar Mbangun Kayangan'...",
        slug: "wayang-kulit"
    }
];

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

    // Use latestNews from database if available, fallback to featuredNews
    const displayNews = latestNews.length > 0 ? latestNews : featuredNews;

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
            <section className="py-16 bg-[#FFFDF7]">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-12">
                        {/* Avatar Side */}
                        <div className="flex-shrink-0 relative group">
                            <div className="w-56 h-56 md:w-64 md:h-64 relative z-10">
                                <img
                                    src="/images/kepala-desa.png"
                                    alt="Kepala Desa"
                                    className="w-full h-full object-contain filter drop-shadow-2xl hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            {/* Simple decorative circle behind avatar */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#EFA00B]/10 rounded-full blur-2xl -z-10"></div>
                        </div>

                        {/* Text Side */}
                        <div className="flex-1 max-w-2xl text-left">
                            <div className="relative">
                                <span className="text-6xl text-slate-800 font-serif leading-none block mb-4">"</span>
                                <p className="text-slate-600 text-base md:text-lg leading-relaxed mb-8">
                                    Selamat datang di Website Resmi Desa Sodong Basari, Belik, Kabupaten Pemalang.
                                    <br /><br />
                                    Website ini menjadi pusat informasi dan layanan desa untuk mendukung keterbukaan, pelayanan publik, dan kemajuan masyarakat. Terima kasih telah berkunjung — kritik dan saran selalu kami harapkan demi Sodong Basari yang lebih baik.
                                </p>
                            </div>

                            <div className="border-l-4 border-[#EFA00B] pl-4">
                                <h3 className="text-lg font-bold text-slate-900 uppercase tracking-widest">SUWARNO, S.H.</h3>
                                <p className="text-[#EFA00B] font-medium text-sm mt-1">PJ Kepala Desa Sodong Basari</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Statistics Section Carousel */}
            <section className="py-20 bg-slate-200 overflow-hidden relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center justify-between relative gap-6">

                        {/* Left Navigation Button */}
                        <button
                            onClick={prevStat}
                            className="hidden md:flex flex-shrink-0 w-12 h-12 bg-white rounded-lg shadow-sm items-center justify-center text-slate-400 hover:text-[#EFA00B] hover:shadow-md transition-all z-20"
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
                        </button>

                        {/* Main Content Area */}
                        <div className="flex-1 flex flex-col md:flex-row items-center w-full min-h-[300px]">

                            {/* Static Main Title */}
                            <div className="w-full md:w-1/4 mb-8 md:mb-0 md:pr-8 text-center md:text-left">
                                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
                                    Statistik <br />
                                    <span className="text-slate-900">Desa</span>
                                </h2>
                            </div>

                            {/* Dynamic Content Wrapper - Animated */}
                            <div key={currentStat} className="flex-1 flex flex-col md:flex-row items-center justify-between w-full animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">

                                {/* 1. Stat Title & Subtitle (Orange) */}
                                <div className="w-full md:w-1/3 text-center md:text-left mb-8 md:mb-0">
                                    <h3 className="text-2xl md:text-3xl font-bold text-[#EFA00B] leading-tight">
                                        {displayStats[currentStat].title}
                                    </h3>
                                    {displayStats[currentStat].subtitle && (
                                        <p className="text-xl text-[#f59e0b] font-semibold mt-2">
                                            {displayStats[currentStat].subtitle}
                                        </p>
                                    )}
                                    {!displayStats[currentStat].subtitle && (
                                        <p className="text-lg text-slate-500 mt-2 font-medium">Data Terkini 2024</p>
                                    )}
                                </div>

                                {/* 2. Visual Chart (Center) */}
                                <div className="w-full md:w-1/3 flex justify-center mb-8 md:mb-0 relative">
                                    <div className="w-48 h-48 md:w-56 md:h-56 relative animate-in zoom-in-95 duration-700 ease-out fill-mode-both" style={{ animationDelay: '100ms' }}>
                                        {displayStats[currentStat].type === 'landmark' ? (
                                            <div className="w-full h-full flex items-center justify-center bg-white/50 rounded-full p-2 backdrop-blur-sm shadow-sm">
                                                <img src={displayStats[currentStat].image} className="w-full h-full object-contain drop-shadow-lg transform transition-transform scale-150 hover:scale-[1.6]" alt="Landmark" />
                                            </div>
                                        ) : displayStats[currentStat].type === 'count' ? (
                                            <div className="relative w-full h-full flex items-center justify-center">
                                                <div className="absolute inset-4 bg-[#EFA00B]/20 rounded-full blur-xl animate-pulse"></div>
                                                <div className="w-full h-full rounded-full border-4 border-[#EFA00B] flex items-center justify-center bg-white/50 backdrop-blur-sm shadow-lg">
                                                    <span className="text-6xl text-[#EFA00B]">👥</span>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="relative w-full h-full">
                                                {/* Outer Glow */}
                                                <div className="absolute inset-4 bg-white/40 rounded-full blur-xl"></div>
                                                <svg viewBox="0 0 36 36" className="w-full h-full block transform -rotate-90 drop-shadow-lg">
                                                    {/* Background Ring */}
                                                    <path className="text-slate-300/30" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                                                    {/* Green Segment */}
                                                    <path className="text-[#71d338] transition-all duration-1000 ease-out" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray="60, 100" strokeLinecap="round" />
                                                    {/* Pink Segment */}
                                                    <path className="text-[#e5459f] transition-all duration-1000 ease-out" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray="30, 100" strokeDashoffset="-65" strokeLinecap="round" />
                                                </svg>
                                                {/* Inner Circle for Donut Effect */}
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="w-32 h-32 bg-slate-200 rounded-full shadow-inner flex items-center justify-center">
                                                        <div className="w-24 h-24 bg-slate-100 rounded-full shadow-sm"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* 3. Legend Data (Right) */}
                                <div className="w-full md:w-1/3 flex flex-col justify-center gap-6 pl-0 md:pl-8 animate-in slide-in-from-right-8 duration-500 ease-out" style={{ animationDelay: '200ms' }}>
                                    {displayStats[currentStat].type === 'count' ? (
                                        <div className="flex flex-col group cursor-default">
                                            <div className="flex items-center gap-3 mb-1">
                                                <div className="w-3 h-3 rounded-full bg-[#EFA00B] ring-2 ring-white shadow-sm"></div>
                                                <span className="text-slate-500 text-sm font-semibold tracking-wide uppercase">Populasi Desa</span>
                                            </div>
                                            <p className="text-2xl font-extrabold text-slate-800 pl-6">
                                                {displayStats[currentStat].subtitle ? displayStats[currentStat].subtitle.split(' ')[0] : '3.500'}
                                            </p>
                                        </div>
                                    ) : (
                                        displayStats[currentStat].data.map((item, idx) => (
                                            <div key={idx} className="flex flex-col group cursor-default">
                                                <div className="flex items-center gap-3 mb-1">
                                                    <div className={`w-3 h-3 rounded-full ${item.color} ring-2 ring-white shadow-sm group-hover:scale-125 transition-transform`}></div>
                                                    <span className="text-slate-500 text-sm font-semibold tracking-wide uppercase">{item.label}</span>
                                                </div>
                                                <p className={`text-2xl font-extrabold ${item.textColor || 'text-slate-800'} pl-6`}>
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
                            className="hidden md:flex flex-shrink-0 w-12 h-12 bg-white rounded-lg shadow-sm items-center justify-center text-slate-400 hover:text-[#EFA00B] hover:shadow-md transition-all z-20"
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                        </button>
                    </div>
                </div>
            </section>

            {/* Organizational Structure Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-slate-800 mb-2">Struktur Organisasi dan Tata Kerja</h2>
                        <p className="text-slate-600">Perangkat Desa Sodong Basari</p>
                    </div>

                    {officials.length === 0 ? (
                        <div className="text-center py-12">
                            <Users className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                            <p className="text-gray-500">Data perangkat desa belum tersedia</p>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
                                {officials.map((official) => (
                                    <div key={official.id} className="flex flex-col items-center group">
                                        <div className="mb-4">
                                            {official.photo ? (
                                                <img 
                                                    src={official.photo} 
                                                    alt={official.name}
                                                    className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover border-4 border-white shadow-lg group-hover:scale-110 transition-transform duration-300"
                                                />
                                            ) : (
                                                <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center border-4 border-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                                                    <Users className="h-12 w-12 md:h-14 md:w-14 text-white" />
                                                </div>
                                            )}
                                        </div>
                                        <h4 className="font-bold text-slate-900 text-sm md:text-base text-center">{official.name}</h4>
                                        <p className="text-xs md:text-sm text-orange-600 font-semibold uppercase text-center mt-1">{official.position}</p>
                                    </div>
                                ))}
                            </div>
                            
                            <div className="text-center mt-12">
                                <Link href={route('sodong-basari')} className="inline-flex items-center px-6 py-3 border border-[#EFA00B] text-[#EFA00B] font-semibold rounded-lg hover:bg-orange-50 transition">
                                    Lihat Selengkapnya
                                    <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </section>
            {/* Latest News Section */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <SectionTitle title="Kabar & Kegiatan Desa" subtitle="Berita Terkini" />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {displayNews.map((post) => (
                            <NewsCard key={post.id} post={post} />
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link href={route('news.index')} className="inline-flex items-center px-6 py-3 border border-[#EFA00B] text-[#EFA00B] font-semibold rounded-lg hover:bg-orange-50 transition">
                            Lihat Semua Berita
                            <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
