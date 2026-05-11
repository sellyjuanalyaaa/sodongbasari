import AppLogoIcon from '@/components/app-logo-icon';
import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    title?: string;
    description?: string;
}

export default function AuthSplitLayout({
    children,
    title,
    description,
}: PropsWithChildren<AuthLayoutProps>) {
    const { name } = usePage<SharedData>().props;

    return (
        <div className="grid relative h-screen overflow-hidden flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 bg-gradient-to-br from-slate-50 to-white">
            {/* Left Column - Hero Section */}
            <div className="relative hidden h-screen flex-col bg-gradient-to-br from-blue-400 via-blue-500 to-orange-500 p-10 text-white lg:flex dark:border-r overflow-hidden lg:justify-between">
                {/* Decorative Blobs */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-blue-300 rounded-full blur-3xl opacity-20 -mr-40 -mt-40 pointer-events-none"></div>
                <div className="absolute bottom-10 left-0 w-96 h-96 bg-orange-400 rounded-full blur-3xl opacity-20 -ml-48 -mb-40 pointer-events-none"></div>
                <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-purple-400 rounded-full blur-3xl opacity-15 pointer-events-none"></div>

                {/* Content */}
                <div className="relative z-20 flex items-center text-lg font-medium">
                    <Link href={route('home')} className="flex items-center gap-3 group">
                        <div className="p-2 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/30 group-hover:bg-white/30 transition-all duration-300 shadow-lg">
                            <img src="/images/logo-kabupaten-pemalang.png" alt="Logo Kabupaten Pemalang" className="size-8 object-contain" />
                        </div>
                        <div>
                            <span className="font-bold tracking-tight text-xl drop-shadow-lg block">Sodong Basari</span>
                            <span className="text-xs text-white/70 drop-shadow font-normal">Sistem Informasi Desa</span>
                        </div>
                    </Link>
                </div>

                <div className="relative z-20 mt-auto mb-0">
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl shadow-2xl max-w-lg hover:bg-white/15 transition-all duration-300">
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0">
                                <svg className="w-8 h-8 text-orange-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <blockquote className="space-y-3">
                                <p className="text-lg font-medium text-white leading-relaxed">
                                    "Membangun desa dengan semangat gotong royong, mewujudkan masyarakat yang sejahtera, mandiri, dan berbudaya."
                                </p>
                                <div className="text-xs font-semibold text-orange-100 tracking-wide uppercase">
                                    - Pemerintahan Desa Sodong Basari
                                </div>
                            </blockquote>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column - Form */}
            <div className="w-full h-screen flex flex-col items-center justify-start pt-4 lg:px-8 lg:pt-6 relative">
                {/* Background Elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-orange-100 rounded-full blur-3xl opacity-10 -mr-48 -mt-48 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-10 -ml-36 -mb-36 pointer-events-none"></div>

                <div className="relative z-10 w-full max-w-sm mx-auto px-4">
                    <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-2xl border border-slate-100 backdrop-blur-sm max-h-[calc(100vh-48px)] overflow-hidden">
                        <Link
                            href={route('home')}
                            className="relative z-20 flex flex-col items-center justify-center lg:hidden mb-8"
                        >
                            <div className="p-3 bg-gradient-to-br from-orange-100 to-orange-50 rounded-2xl mb-3 border border-orange-200">
                                <img src="/images/logo-kabupaten-pemalang.png" alt="Logo Kabupaten Pemalang" className="size-10 object-contain" />
                            </div>
                            <span className="font-bold text-lg text-slate-900">Sodong Basari</span>
                        </Link>

                        <div className="flex flex-col items-center text-center gap-2 mb-6">
                            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">{title}</h1>
                            <p className="text-sm text-slate-500 font-normal leading-relaxed max-w-sm">
                                {description}
                            </p>
                        </div>

                        <div className="mb-6">
                            {children}
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}
