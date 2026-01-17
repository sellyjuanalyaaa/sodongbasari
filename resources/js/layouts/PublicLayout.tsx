
import { Link } from '@inertiajs/react';
import React, { useState } from 'react';
import { route } from 'ziggy-js';

export default function PublicLayout({ children, villageInfo }: { children: React.ReactNode; villageInfo: any }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const links = [
        { name: 'Home', route: 'home' },
        { name: 'Sodong Basari', route: 'sodong-basari' },
        { name: 'Statistik Desa', route: 'statistics' },
        { name: 'Potensi Desa', route: 'potentials' },
        { name: 'Info & Berita', route: 'news.index' },
    ];

    return (
        <div className="min-h-screen bg-white font-sans text-slate-800">
            {/* Navbar */}
            <nav className="bg-[#EFA00B] text-white shadow-md fixed w-full z-50 transition-all duration-300 border-b border-[#D48C00]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-20 items-center">
                        <div className="flex items-center space-x-3">
                            {/* Logo Area */}
                            <Link href={route('home')} className="flex items-center gap-2 group">
                                <span className="bg-white/20 p-2 rounded-full backdrop-blur-sm group-hover:bg-white/30 transition">
                                    {/* Logo Icon */}
                                    <img
                                        src="/images/logo-kabupaten-pemalang.png"
                                        alt="Logo Kabupaten Pemalang"
                                        className="w-8 h-8 object-contain"
                                    />
                                </span>
                                <span className="text-lg md:text-xl font-bold tracking-tight drop-shadow-sm whitespace-nowrap">
                                    {villageInfo?.name || 'Desa Sodong Basari'}
                                </span>
                            </Link>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center space-x-1 uppercase lg:capitalize">
                            {links.map((link) => (
                                <Link
                                    key={link.name}
                                    href={route(link.route)}
                                    className={`px-3 py-2 rounded-full text-[11px] lg:text-sm font-semibold transition-all duration-200 hover:bg-white/20 hover:shadow-sm whitespace-nowrap ${route().current(link.route) ? 'bg-white/25 shadow-inner' : ''}`}
                                >
                                    {link.name}
                                </Link>
                            ))}

                            {/* Search Bar - Compact White Pill Style */}
                            <div className="ml-2 lg:ml-4 flex items-center">
                                <form action="#" method="GET">
                                    <div className="flex items-center bg-white rounded-full px-3 py-1.5 w-32 lg:w-48 shadow-sm group focus-within:ring-2 focus-within:ring-white/50 transition-all">
                                        <input
                                            type="text"
                                            placeholder="Cari..."
                                            className="bg-transparent border-none outline-none text-slate-800 placeholder-slate-500 font-bold text-xs lg:text-sm w-full"
                                        />
                                        <button type="submit" className="text-slate-800 ml-1 hover:scale-110 transition-transform">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 lg:h-5 lg:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Mobile Button */}
                        <div className="md:hidden flex items-center">
                            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white hover:text-amber-100 focus:outline-none">
                                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    {isMenuOpen ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden bg-[#EFA00B] animate-in slide-in-from-top duration-200 border-t border-[#D48C00] shadow-xl">
                        <div className="px-4 pt-2 pb-4 space-y-2">
                            {links.map((link) => (
                                <Link
                                    key={link.name}
                                    href={route(link.route)}
                                    className={`block px-4 py-3 rounded-xl text-base font-medium transition ${route().current(link.route) ? 'bg-white/20' : 'hover:bg-white/10'}`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </nav>

            {/* Main Content */}
            <main className="pt-16 min-h-[calc(100vh-200px)]">
                {children}
            </main>

            {/* Footer */}
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
                            <button className="group inline-flex items-center gap-2 bg-[#EFA00B] text-white text-sm font-bold py-3 px-6 rounded-lg transition-all hover:bg-[#D48C00] hover:pl-8">
                                Kunjungi Kami
                                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </button>
                        </div>

                        {/* Quick Info Columns */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:pl-12 border-l border-white/5">
                            {/* Address & Contact */}
                            <div className="space-y-4">
                                <h4 className="text-white font-bold text-sm uppercase tracking-wide">Lokasi & Kontak</h4>
                                <div className="space-y-3 text-sm text-slate-400">
                                    <div className="flex gap-3">
                                        <svg className="w-5 h-5 text-[#EFA00B] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                        <span>Desa Sodong Basari,<br />Kec. Belik, Kab. Pemalang<br />Jawa Tengah 52356</span>
                                    </div>
                                    <div className="flex gap-3">
                                        <svg className="w-5 h-5 text-[#EFA00B] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                        <span>admin@sodongbasari.desa.id</span>
                                    </div>
                                    <div className="flex gap-3">
                                        <svg className="w-5 h-5 text-[#EFA00B] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                        <span>+62 812-3456-7890</span>
                                    </div>
                                </div>
                            </div>

                            {/* Highlights & Services */}
                            <div className="space-y-4">
                                <h4 className="text-white font-bold text-sm uppercase tracking-wide">Potensi & Layanan</h4>
                                <ul className="space-y-2 text-sm text-slate-400">
                                    <li className="flex items-center gap-2 hover:text-[#EFA00B] transition-colors cursor-pointer">
                                        <span className="w-1.5 h-1.5 bg-[#EFA00B] rounded-full"></span>
                                        Produk UMKM & Kuliner
                                    </li>
                                    <li className="flex items-center gap-2 hover:text-[#EFA00B] transition-colors cursor-pointer">
                                        <span className="w-1.5 h-1.5 bg-[#EFA00B] rounded-full"></span>
                                        Wisata Alam & Budaya
                                    </li>
                                    <li className="flex items-center gap-2 hover:text-[#EFA00B] transition-colors cursor-pointer">
                                        <span className="w-1.5 h-1.5 bg-[#EFA00B] rounded-full"></span>
                                        Layanan Administrasi
                                    </li>
                                    <li className="flex items-center gap-2 hover:text-[#EFA00B] transition-colors cursor-pointer">
                                        <span className="w-1.5 h-1.5 bg-[#EFA00B] rounded-full"></span>
                                        Pengaduan Masyarakat
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex space-x-4">
                            {/* Social Icons - Clean Circle Style */}
                            {['instagram', 'facebook', 'whatsapp'].map((social) => (
                                <a key={social} href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-[#EFA00B] hover:text-white transition-all">
                                    <span className="sr-only">{social}</span>
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14h-2v-2h2v2zm0-4h-2V7h2v6z" /></svg>
                                </a>
                            ))}
                        </div>
                        <div className="text-xs text-slate-500 font-medium">
                            © {new Date().getFullYear()} Pemerintah Desa Sodong Basari. All rights reserved.
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
