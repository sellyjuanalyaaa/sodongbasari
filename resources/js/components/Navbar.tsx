import { Link, usePage } from '@inertiajs/react';
import React, { useState } from 'react';
import { route } from 'ziggy-js';
import { Menu, X, ChevronDown } from 'lucide-react';

interface NavLink {
    name: string;
    route: string;
    children?: Array<{ name: string; route: string }>;
}

interface NavbarProps {
    logo?: string;
    logoText?: string;
    logoSubtext?: string;
    links?: NavLink[];
    ctaText?: string;
    ctaRoute?: string;
    variant?: 'light' | 'dark';
    accentColor?: string;
}

export default function Navbar({
    logo = '/images/logo-kabupaten-pemalang.png',
    logoText = 'Logo',
    logoSubtext = '',
    links = [
        { name: 'Home', route: 'home' },
        { name: 'Sodong Basari', route: 'sodong-basari' },
        { name: 'Statistik', route: 'statistics' },
        { name: 'Potensi Desa', route: 'potentials' },
        { name: 'Info & Berita', route: 'news.index' },
    ],
    ctaText = 'Sign Up',
    ctaRoute = 'register',
    variant = 'light',
    accentColor = '#3B82F6',
}: NavbarProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const current = route().current();

    const isDark = variant === 'dark';
    const bgColor = isDark ? 'bg-slate-900' : 'bg-white';
    const borderColor = isDark ? 'border-slate-800' : 'border-slate-200';
    const textColor = isDark ? 'text-slate-100' : 'text-slate-900';
    const secondaryText = isDark ? 'text-slate-400' : 'text-slate-700';
    const hoverBg = isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-50';

    const isActive = (linkRoute: string) => current === linkRoute || current?.startsWith(linkRoute);

    return (
        <>
            {/* Navbar */}
            <nav className={`${bgColor} border-b ${borderColor} fixed w-full z-50 shadow-sm`}>
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo Section */}
                        <Link href={route('home')} className="flex items-center gap-2 flex-shrink-0">
                            {logo && (
                                <img
                                    src={logo}
                                    alt={logoText}
                                    className="w-8 h-8 object-contain"
                                />
                            )}
                            <span className={`text-sm font-semibold ${textColor}`}>
                                {logoText}
                            </span>
                        </Link>

                        {/* Desktop Navigation - Center */}
                        <div className="hidden md:flex items-center gap-8">
                            {links.map((link) => (
                                <div key={link.name} className="relative group">
                                    <Link
                                        href={route(link.route)}
                                        className={`text-sm font-medium transition-colors duration-200 ${
                                            isActive(link.route)
                                                ? 'text-slate-900'
                                                : secondaryText
                                        } hover:text-slate-900`}
                                    >
                                        {link.name}
                                    </Link>

                                    {/* Dropdown Menu */}
                                    {link.children && link.children.length > 0 && (
                                        <div
                                            className={`absolute left-0 mt-0 w-48 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 origin-top-left pt-2`}
                                            style={{
                                                backgroundColor: isDark ? 'rgb(30, 41, 59)' : 'rgb(255, 255, 255)',
                                            }}
                                        >
                                            <div className={`${isDark ? 'bg-slate-800' : 'bg-white'} rounded-lg border ${borderColor} py-2`}>
                                                {link.children.map((child) => (
                                                    <Link
                                                        key={child.name}
                                                        href={route(child.route)}
                                                        className={`block px-4 py-2 text-sm font-medium transition-colors ${hoverBg}`}
                                                    >
                                                        {child.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Right Section - CTA Button & Mobile Menu */}
                        <div className="flex items-center gap-4">
                            {/* CTA Button (Desktop) */}
                            <Link
                                href={route(ctaRoute)}
                                className="hidden md:inline-block px-6 py-2 rounded-lg font-medium text-white transition-all duration-200 hover:shadow-lg"
                                style={{
                                    backgroundColor: accentColor,
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.filter = 'brightness(0.9)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.filter = 'brightness(1)';
                                }}
                            >
                                {ctaText}
                            </Link>

                            {/* Mobile Menu Button */}
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className={`md:hidden p-2 rounded-lg transition-colors duration-200 ${hoverBg}`}
                                aria-label="Toggle menu"
                            >
                                {isMenuOpen ? (
                                    <X className={`w-6 h-6 ${secondaryText}`} />
                                ) : (
                                    <Menu className={`w-6 h-6 ${secondaryText}`} />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    {isMenuOpen && (
                        <div className={`md:hidden border-t ${borderColor} py-4 animate-in slide-in-from-top duration-200`}>
                            <div className="space-y-2">
                                {links.map((link) => (
                                    <div key={link.name}>
                                        <Link
                                            href={route(link.route)}
                                            className={`flex items-center justify-between px-4 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 ${hoverBg}`}
                                            style={{
                                                backgroundColor: isActive(link.route)
                                                    ? isDark
                                                        ? 'rgba(59, 130, 246, 0.1)'
                                                        : 'rgba(59, 130, 246, 0.08)'
                                                    : 'transparent',
                                                color: isActive(link.route) ? accentColor : 'inherit',
                                            }}
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            {link.name}
                                            {link.children && link.children.length > 0 && (
                                                <ChevronDown className="w-4 h-4 opacity-50" />
                                            )}
                                        </Link>

                                        {/* Mobile Dropdown */}
                                        {link.children && link.children.length > 0 && (
                                            <div className="pl-4 space-y-1 py-2">
                                                {link.children.map((child) => (
                                                    <Link
                                                        key={child.name}
                                                        href={route(child.route)}
                                                        className={`block px-3 py-2 text-sm rounded-lg transition-colors duration-200 ${hoverBg}`}
                                                        onClick={() => setIsMenuOpen(false)}
                                                    >
                                                        {child.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}

                                {/* Mobile CTA Button */}
                                <div className="px-4 pt-4 border-t border-slate-200">
                                    <Link
                                        href={route(ctaRoute)}
                                        className="block w-full py-2 px-4 rounded-lg font-medium text-white text-center transition-all duration-200"
                                        style={{ backgroundColor: accentColor }}
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {ctaText}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </nav>

            {/* Spacer */}
            <div className="h-16" />
        </>
    );
}
