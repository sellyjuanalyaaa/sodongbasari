
import { Link, usePage } from '@inertiajs/react';
import React, { useState } from 'react';
import { route } from 'ziggy-js';
import VisitorStatsWidget from '@/components/VisitorStatsWidget';
import BackToTop from '@/components/BackToTop';

export default function PublicLayout({ children, villageInfo }: { children: React.ReactNode; villageInfo: any }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { visitorStats } = usePage().props as any;

    const links = [
        { name: 'Home', route: 'home' },
        { name: 'Sodong Basari', route: 'sodong-basari' },
        { name: 'Statistik Desa', route: 'statistics' },
        { name: 'Potensi Desa', route: 'potentials' },
        { name: 'Info & Berita', route: 'news.index' },
    ];

    return (
        <div className="min-h-screen bg-white font-sans text-slate-800">
            {/* Navbar - Minimalist Modern with Orange Accent */}
            <nav className="bg-white/95 backdrop-blur-md border-b border-slate-200 fixed w-full z-50 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <div className="flex justify-between h-16 items-center">
                        {/* Logo Area */}
                        <Link href={route('home')} className="flex items-center gap-3 group">
                            <div className="relative">
                                <div className="absolute inset-0 bg-[#EFA00B] rounded-lg blur-sm opacity-0 group-hover:opacity-20 transition-opacity" />
                                <img
                                    src="/images/logo-kabupaten-pemalang.png"
                                    alt="Logo Kabupaten Pemalang"
                                    className="w-9 h-9 object-contain relative z-10"
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-base font-medium text-slate-900 leading-tight">
                                    {villageInfo?.name || 'Desa Sodong Basari'}
                                </span>
                                <span className="text-xs text-slate-500 font-light">Belik, Pemalang</span>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-1">
                            {links.map((link) => (
                                <Link
                                    key={link.name}
                                    href={route(link.route)}
                                    className={`relative px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap ${
                                        route().current(link.route)
                                            ? 'text-[#EFA00B]'
                                            : 'text-slate-700 hover:text-[#EFA00B]'
                                    }`}
                                >
                                    {link.name}
                                    {route().current(link.route) && (
                                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#EFA00B]" />
                                    )}
                                </Link>
                            ))}

                            {/* Search Bar */}
                            <div className="ml-4 pl-4 border-l border-slate-200">
                                <form action="#" method="GET">
                                    <div className="flex items-center bg-slate-50 rounded-lg px-3 py-1.5 w-48 border border-slate-200 focus-within:border-[#EFA00B] focus-within:bg-white transition-all">
                                        <input
                                            type="text"
                                            placeholder="Cari..."
                                            className="bg-transparent border-none outline-none text-slate-900 placeholder-slate-400 text-sm w-full font-light"
                                        />
                                        <button type="submit" className="text-slate-400 hover:text-[#EFA00B] transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden flex items-center">
                            <button 
                                onClick={() => setIsMenuOpen(!isMenuOpen)} 
                                className="p-2 text-slate-700 hover:text-[#EFA00B] focus:outline-none transition-colors"
                            >
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    {isMenuOpen ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden bg-white border-t border-slate-200 animate-in slide-in-from-top duration-200 shadow-lg">
                        <div className="px-6 py-4 space-y-1">
                            {links.map((link) => (
                                <Link
                                    key={link.name}
                                    href={route(link.route)}
                                    className={`block px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                                        route().current(link.route)
                                            ? 'text-[#EFA00B] bg-orange-50'
                                            : 'text-slate-700 hover:text-[#EFA00B] hover:bg-slate-50'
                                    }`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            
                            {/* Mobile Search */}
                            <div className="pt-3">
                                <form action="#" method="GET">
                                    <div className="flex items-center bg-slate-50 rounded-lg px-3 py-2 border border-slate-200">
                                        <input
                                            type="text"
                                            placeholder="Cari..."
                                            className="bg-transparent border-none outline-none text-slate-900 placeholder-slate-400 text-sm w-full font-light"
                                        />
                                        <button type="submit" className="text-slate-400">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                        </button>
                                    </div>
                                </form>
                            </div>
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
                        <div className="flex space-x-3">
                            {/* Instagram */}
                            <a 
                                href="https://instagram.com/desasodongbasari" 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 hover:bg-gradient-to-br hover:from-purple-600 hover:via-pink-600 hover:to-orange-500 hover:text-white transition-all duration-300 group"
                                aria-label="Instagram Desa Sodong Basari"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                </svg>
                            </a>

                            {/* Facebook */}
                            <a 
                                href="https://facebook.com/desasodongbasari" 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all duration-300"
                                aria-label="Facebook Desa Sodong Basari"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                </svg>
                            </a>

                            {/* WhatsApp */}
                            <a 
                                href="https://wa.me/6281234567890" 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 hover:bg-green-600 hover:text-white transition-all duration-300"
                                aria-label="WhatsApp Desa Sodong Basari"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                                </svg>
                            </a>

                            {/* YouTube */}
                            <a 
                                href="https://youtube.com/@desasodongbasari" 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 hover:bg-red-600 hover:text-white transition-all duration-300"
                                aria-label="YouTube Desa Sodong Basari"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                </svg>
                            </a>

                            {/* TikTok */}
                            <a 
                                href="https://tiktok.com/@desasodongbasari" 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 hover:bg-slate-900 hover:text-white transition-all duration-300"
                                aria-label="TikTok Desa Sodong Basari"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                                </svg>
                            </a>
                        </div>
                        <div className="text-xs text-slate-500 font-medium">
                            © {new Date().getFullYear()} Pemerintah Desa Sodong Basari. All rights reserved.
                        </div>
                    </div>
                </div>
            </footer>

            {/* Visitor Stats Widget */}
            {visitorStats && <VisitorStatsWidget stats={visitorStats} />}
            
            {/* Back to Top Button */}
            <BackToTop />
        </div>
    );
}
