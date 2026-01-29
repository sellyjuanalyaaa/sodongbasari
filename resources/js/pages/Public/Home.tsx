import React, { useState, useEffect } from 'react';
import PublicLayout from '@/layouts/PublicLayout';
import HeroSection from '@/components/HeroSection';
import NewsCard from '@/components/NewsCard';
import { Users } from 'lucide-react';
import { OrangeAccentTop, OrangeAccentBottom } from '@/components/SvgDecorations';
import { AccentImage3, CloudAccent } from '@/components/ImageAccents';

import { Head, Link } from '@inertiajs/react';
import { route } from 'ziggy-js';

// Helper component for counting up animation
const AnimatedCounter = ({ value, duration = 2000 }: { value: any; duration?: number }) => {
    const [count, setCount] = useState(0);

    // Robust parser for IDR format (e.g., "Rp 120.000.000,00") and standard numbers
    const parseValue = (val: any) => {
        if (typeof val === 'number') return val;
        if (!val) return 0; // Safeguard against null/undefined
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

export default function Home({ villageInfo, heroImages = [], stats = {}, officials = [], latestNews = [], homeStatistics = [] }: { villageInfo: any, heroImages?: any[], stats?: any, officials?: any[], latestNews?: any[], homeStatistics?: any[] }) {
    const [currentStat, setCurrentStat] = useState(0);

    // Normalize dynamic stats
    const processedHomeStatistics = homeStatistics.map((stat: any) => ({
        ...stat,
        image: stat.image, // Ensure image is included
        rawValue: stat.type === 'count' ? (stat.subtitle || 0) : (stat.data?.[0]?.value || 0),
    }));

    // Debug: Log to see if images are present
    console.log('Home Statistics Data:', processedHomeStatistics);

    // Use ONLY homeStatistics for displayStats as requested
    const displayStats = processedHomeStatistics.length > 0 ? processedHomeStatistics : [];

    useEffect(() => {
        if (displayStats.length === 0) return;
        const timer = setInterval(() => {
            setCurrentStat((prev) => (prev + 1) % displayStats.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [displayStats.length]);

    const nextStat = () => {
        if (displayStats.length === 0) return;
        setCurrentStat((prev) => (prev + 1) % displayStats.length);
    };

    const prevStat = () => {
        if (displayStats.length === 0) return;
        setCurrentStat((prev) => (prev - 1 + displayStats.length) % displayStats.length);
    };

    return (
        <PublicLayout villageInfo={villageInfo}>
            <Head title="Beranda" />

            {/* Hero Section */}
            <HeroSection villageInfo={villageInfo} heroImages={heroImages} />

            {/* Welcome Section (Head of Village) */}
            <section className="py-24 bg-white relative overflow-hidden">
                <OrangeAccentTop className="right-0 top-0 opacity-100" />
                <AccentImage3 className="left-[-5%] bottom-[-10%] w-[400px] opacity-15 -rotate-12" />
                <CloudAccent className="top-[20%] right-[12%] w-[145px] h-[145px] opacity-17 -rotate-25" />
                <CloudAccent className="bottom-[30%] right-[22%] w-[135px] h-[135px] opacity-16 rotate-32" />
                <CloudAccent className="top-[45%] right-[8%] w-[170px] h-[170px] opacity-18 rotate-20" />
                <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-16 md:gap-20">
                        {/* Avatar Side */}
                        <div className="flex-shrink-0 relative">
                            <div className="w-72 h-72 md:w-96 md:h-96 relative">
                                <img
                                    src={villageInfo?.head_of_village_photo || '/images/kepala-desa.png'}
                                    alt={villageInfo?.head_of_village_name || 'Kepala Desa'}
                                    className="w-full h-full object-contain transition-transform duration-500 hover:scale-[1.02]"
                                    style={{ filter: 'drop-shadow(0 25px 50px rgba(0, 0, 0, 0.15))' }}
                                />
                            </div>
                            {/* Subtle decorative element */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-amber-50 rounded-full blur-3xl -z-10 opacity-60"></div>
                        </div>

                        {/* Text Side */}
                        <div className="flex-1 max-w-xl text-center md:text-left">
                            <div className="relative mb-10">
                                <span className="text-7xl text-orange-600/20 font-serif leading-none block mb-6 select-none hidden md:block">"</span>
                                <p className="text-slate-600 text-[15px] leading-[1.8] md:-mt-12 font-light">
                                    {villageInfo?.welcome_message || "Selamat datang di Website Resmi Desa Sodong Basari. Website ini menjadi pusat informasi dan layanan desa untuk mendukung keterbukaan, pelayanan publik, dan kemajuan masyarakat. Terima kasih telah berkunjung — kritik dan saran selalu kami harapkan demi Desa yang lebih baik."}
                                </p>
                            </div>

                            <div className="border-t-2 md:border-t-0 md:border-l-2 border-slate-900 pt-6 md:pt-0 md:pl-6 inline-block md:block">
                                <h3 className="text-base font-semibold text-slate-900 tracking-wide uppercase">{villageInfo?.head_of_village_name || 'Kepala Desa'}</h3>
                                <p className="text-slate-500 text-sm mt-1.5">PJ Kepala Desa Sodong Basari</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Statistics Section Carousel - Premium Orange */}
            <section className="relative overflow-hidden bg-gradient-to-br from-orange-500 to-amber-600 text-white">
                {/* Background Patterns */}
                <div className="absolute inset-0 opacity-10">
                    <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
                    </svg>
                </div>
                <CloudAccent className="top-[10%] right-[5%] w-[300px] h-[300px] opacity-20 rotate-12 mix-blend-overlay text-white" />
                <CloudAccent className="bottom-[10%] left-[5%] w-[250px] h-[250px] opacity-20 -rotate-12 mix-blend-overlay text-white" />

                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10 py-24 md:py-32">
                    <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-24">

                        {/* Left: Text Content & Navigation */}
                        <div className="w-full md:w-1/2 text-center md:text-left">
                            <div className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md border border-white/30 rounded-full mb-6">
                                <span className="text-white text-sm font-medium tracking-wider uppercase">Info Desa Terkini</span>
                            </div>
                            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
                                Statistik <br />
                                <span className="text-amber-200">Desa Sodong Basari</span>
                            </h2>
                            <p className="text-orange-50 text-lg mb-10 font-light max-w-lg mx-auto md:mx-0 leading-relaxed">
                                Transparansi data untuk kemajuan bersama. Berikut adalah data terbaru kondisi demografi dan wilayah desa kami.
                            </p>

                            {/* Navigation Buttons */}
                            {displayStats.length > 0 && (
                                <div className="flex items-center justify-center md:justify-start gap-4">
                                    <button
                                        onClick={prevStat}
                                        className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-orange-600 transition-all duration-300 group"
                                    >
                                        <svg className="w-6 h-6 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                                    </button>
                                    <div className="flex gap-2">
                                        {displayStats.map((_, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setCurrentStat(idx)}
                                                className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentStat ? 'w-8 bg-white' : 'w-2 bg-white/40 hover:bg-white/60'}`}
                                            />
                                        ))}
                                    </div>
                                    <button
                                        onClick={nextStat}
                                        className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-orange-600 transition-all duration-300 group"
                                    >
                                        <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Right: Active Statistic Card */}
                        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
                            {displayStats.length > 0 ? (
                                <div key={currentStat} className="relative w-full max-w-md aspect-square md:aspect-auto md:h-[450px] bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-in slide-in-from-right-8 fade-in duration-700 ease-out">
                                    {/* Decorative blob inside card */}
                                    <div className="absolute -top-20 -right-20 w-60 h-60 bg-orange-50 rounded-full blur-3xl opacity-60 pointer-events-none"></div>
                                    <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-orange-50/50 to-transparent pointer-events-none"></div>

                                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 md:p-12 text-center h-full">
                                        {/* Icon Container */}
                                        <div className="w-24 h-24 rounded-3xl bg-orange-100 flex items-center justify-center mb-8 shadow-inner shadow-orange-200/50 overflow-hidden">
                                            {displayStats[currentStat].image ? (
                                                <img
                                                    src={displayStats[currentStat].image}
                                                    alt={displayStats[currentStat].title}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : displayStats[currentStat].type === 'static' ? (
                                                displayStats[currentStat].icon
                                            ) : displayStats[currentStat].type === 'count' ? (
                                                <Users className="w-10 h-10 text-orange-600" />
                                            ) : (
                                                <span className="text-4xl">📊</span>
                                            )}
                                        </div>

                                        {/* Value */}
                                        <div className="mb-4">
                                            <h3 className="text-5xl md:text-6xl font-bold text-slate-900 tracking-tighter">
                                                {displayStats[currentStat].type === 'count' ? (
                                                    <AnimatedCounter value={parseFloat(displayStats[currentStat].subtitle) || 0} />
                                                ) : displayStats[currentStat].type === 'budget' ? (
                                                    <AnimatedCounter value={displayStats[currentStat].data?.[0]?.value || 0} />
                                                ) : (
                                                    displayStats[currentStat].subtitle || displayStats[currentStat].data?.[0]?.value || 0
                                                )}
                                            </h3>
                                        </div>

                                        {/* Label */}
                                        <p className="text-lg text-slate-500 font-medium uppercase tracking-widest mb-8">
                                            {displayStats[currentStat].title}
                                        </p>

                                        <Link href={route('statistics')} className="inline-flex items-center text-orange-600 font-semibold hover:text-orange-700 transition-colors group">
                                            Lihat Detail
                                            <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                <div className="h-[450px] w-full max-w-md bg-white/10 backdrop-blur-md rounded-[2.5rem] border border-white/20 flex items-center justify-center">
                                    <p className="text-white text-lg">Data statistik belum tersedia</p>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </section>

            {/* Organizational Structure Section */}
            <section className="py-24 bg-white relative overflow-hidden">
                <OrangeAccentBottom className="left-0 top-0 w-[600px] -translate-x-1/3 -translate-y-1/4 opacity-100" />
                <AccentImage3 className="right-[-5%] bottom-[-10%] w-[500px] opacity-10 rotate-[-15deg]" />
                {/* <CloudAccent className="top-[40%] right-[15%] w-[190px] h-[190px] opacity-20 -rotate-18" /> */}
                <CloudAccent className="bottom-[25%] left-[40%] w-[155px] h-[155px] opacity-18 rotate-28" />
                {/* <CloudAccent className="top-[65%] right-[35%] w-[140px] h-[140px] opacity-17 -rotate-22" /> */}
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
            <section className="py-24 bg-slate-50 relative overflow-hidden">
                <AccentImage3 className="left-[-10%] top-1/2 w-[600px] -translate-y-1/2 opacity-10 rotate-[30deg] z-0" />
                <CloudAccent className="top-[25%] right-[8%] w-[230px] h-[230px] opacity-22 rotate-15 z-0" />
                <CloudAccent className="bottom-[20%] right-[25%] w-[195px] h-[195px] opacity-21 -rotate-20 z-0" />
                <CloudAccent className="top-[60%] right-[15%] w-[180px] h-[180px] opacity-20 rotate-30 z-0" />
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
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
