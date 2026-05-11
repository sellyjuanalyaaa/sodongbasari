import { Link, usePage } from '@inertiajs/react';
import React from 'react';
import { route } from 'ziggy-js';
import Navbar from '@/components/Navbar';
import VisitorStatsWidget from '@/components/VisitorStatsWidget';
import BackToTop from '@/components/BackToTop';

export default function PublicLayoutModern({ children, villageInfo }: { children: React.ReactNode; villageInfo: any }) {
    const { visitorStats } = usePage().props as any;

    const navLinks = [
        { name: 'Home', route: 'home' },
        { name: 'Sodong Basari', route: 'sodong-basari' },
        { name: 'Statistik Desa', route: 'statistics' },
        { name: 'Potensi Desa', route: 'potentials' },
        { name: 'Info & Berita', route: 'news.index' },
    ];

    return (
        <div className="min-h-screen bg-white font-sans text-slate-800">
            {/* Navbar */}
            <Navbar
                logo="/images/logo-kabupaten-pemalang.png"
                logoText={villageInfo?.name || 'Logo'}
                links={navLinks}
                ctaText="Sign Up"
                ctaRoute="register"
                variant="light"
                accentColor="#3B82F6"
            />

            {/* Main Content */}
            <main className="min-h-[calc(100vh-200px)]">
                {children}
            </main>

            {/* Visitor Stats Widget */}
            {visitorStats && <VisitorStatsWidget stats={visitorStats} />}

            {/* Back to Top Button */}
            <BackToTop />

            {/* Minimalist Modern Footer */}
            <footer className="bg-slate-900/95 backdrop-blur-sm text-slate-300 py-16 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
                        {/* Brand & Description */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold text-white tracking-widest uppercase border-b-2 border-[#EFA00B] inline-block pb-2">
                                Tim KKN Unsoed Sodong Basari
                            </h3>
                            <p className="text-slate-400 leading-relaxed text-sm md:text-base max-w-xl">
                                Website ini dikembangkan sebagai bentuk dukungan terhadap digitalisasi desa.
                                Melalui platform ini, kami berharap informasi dan layanan desa dapat diakses dengan lebih mudah, cepat, dan transparan oleh seluruh masyarakat.
                            </p>
                            <a 
                                href="https://www.instagram.com/kkn13_sodongbasari?igsh=YXQ3dm1kczMwa2Rv" 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex items-center gap-2 bg-[#EFA00B] text-white text-sm font-bold py-3 px-6 rounded-lg transition-all hover:bg-[#D48C00] hover:pl-8"
                            >
                                Kunjungi Kami
                                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </a>
                        </div>

                        {/* Quick Info Columns */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:pl-12 border-l border-white/5">
                            {/* Address & Contact */}
                            <div className="space-y-4">
                                <h4 className="text-white font-bold text-sm uppercase tracking-wide">Lokasi & Kontak</h4>
                                <div className="space-y-3 text-sm text-slate-400">
                                    <a 
                                        href="https://maps.google.com/?q=Balai+Desa+Sodong+Basari+Belik+Pemalang" 
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex gap-3 hover:text-[#EFA00B] transition-colors group"
                                    >
                                        <svg className="w-5 h-5 text-[#EFA00B] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                        <span>Desa Sodong Basari,<br />Kec. Belik, Kab. Pemalang<br />Jawa Tengah 52356</span>
                                    </a>
                                    <a 
                                        href="mailto:sodongbasari@desakupemalang.id"
                                        className="flex gap-3 hover:text-[#EFA00B] transition-colors group"
                                    >
                                        <svg className="w-5 h-5 text-[#EFA00B] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                        <span>sodongbasari@desakupemalang.id</span>
                                    </a>
                                </div>
                            </div>

                            {/* Highlights & Services */}
                            <div className="space-y-4">
                                <h4 className="text-white font-bold text-sm uppercase tracking-wide">Potensi & Layanan</h4>
                                <div className="space-y-2 text-sm text-slate-400">
                                    <Link href={route('potentials')} className="flex gap-3 hover:text-[#EFA00B] transition-colors">
                                        <span className="text-[#EFA00B]">→</span>
                                        <span>Lihat Potensi Desa</span>
                                    </Link>
                                    <Link href={route('news.index')} className="flex gap-3 hover:text-[#EFA00B] transition-colors">
                                        <span className="text-[#EFA00B]">→</span>
                                        <span>Berita & Informasi</span>
                                    </Link>
                                    <Link href={route('statistics')} className="flex gap-3 hover:text-[#EFA00B] transition-colors">
                                        <span className="text-[#EFA00B]">→</span>
                                        <span>Statistik Desa</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer Bottom */}
                    <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-slate-500 text-center sm:text-left">
                            © {new Date().getFullYear()} Desa Sodong Basari. Dikembangkan dengan ❤️ oleh Tim KKN Unsoed.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="text-slate-400 hover:text-[#EFA00B] transition-colors">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                            </a>
                            <a href="https://www.instagram.com/kkn13_sodongbasari" className="text-slate-400 hover:text-[#EFA00B] transition-colors">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0m5.521 17.425h-2.892v-5.404c0-1.289-.46-2.167-1.613-2.167-.88 0-1.403.592-1.635 1.162-.084.205-.105.491-.105.777v5.632h-2.891s.037-9.138 0-10.089h2.891v1.429c.448-.691 1.25-1.674 3.04-1.674 2.22 0 3.886 1.452 3.886 4.576v5.758zM5.337 6.685c-.993 0-1.64-.66-1.64-1.486 0-.844.648-1.486 1.678-1.486 1.03 0 1.64.642 1.66 1.486 0 .826-.63 1.486-1.698 1.486zm-1.44 10.74h2.894V7.248H3.897v10.177z"/></svg>
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
