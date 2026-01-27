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
        <div className="relative grid min-h-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 bg-slate-50">
            {/* Left Column - Hero Image */}
            <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r overflow-hidden">
                <div className="absolute inset-0 bg-slate-900" />
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-50 mix-blend-overlay transition-all duration-1000 hover:scale-105"
                    style={{ backgroundImage: "url('/images/hero/hero-1.jpg')" }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-orange-600/90 via-orange-700/80 to-amber-900/90" />

                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/20 to-transparent pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>

                <div className="relative z-20 flex items-center text-lg font-medium">
                    <Link href={route('home')} className="flex items-center gap-3 group">
                        <div className="p-2 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20 group-hover:bg-white/20 transition-all duration-300">
                            <AppLogoIcon className="size-8 text-white fill-current" />
                        </div>
                        <span className="font-bold tracking-tight text-xl drop-shadow-md">Sodong Basari</span>
                    </Link>
                </div>

                <div className="relative z-20 mt-auto">
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl shadow-2xl max-w-lg">
                        <svg className="w-8 h-8 text-orange-200 mb-4 opacity-80" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.8954 13.1216 16 12.017 16H9.01703V15C9.01703 14.3333 9.35036 14 10.017 14H13.017C14.9088 14 16.4912 12.6717 16.9065 10.8647C16.9723 10.5786 17.017 10.292 17.017 10C17.017 10 17.017 10 17.017 10C17.017 6.13401 13.883 3 10.017 3C6.15104 3 3.01703 6.13401 3.01703 10C3.01703 13.866 6.15104 17 10.017 17H12.017C12.5693 17 13.017 17.4477 13.017 18V21H14.017ZM19.017 21V18C19.017 16.8954 18.1216 16 17.017 16H15.017V15C15.017 14.3333 15.3504 14 16.017 14H19.017C20.9088 14 22.4912 12.6717 22.9065 10.8647C22.9723 10.5786 23.017 10.292 23.017 10C23.017 10 23.017 10 23.017 10C23.017 6.13401 19.883 3 16.017 3C12.151 3 9.01703 6.13401 9.01703 10C9.01703 13.866 12.151 17 16.017 17H18.017C18.5693 17 19.017 17.4477 19.017 18V21H19.017Z" /></svg>
                        <blockquote className="space-y-4">
                            <p className="text-xl font-medium italic text-white leading-relaxed">
                                "Membangun desa dengan semangat gotong royong, mewujudkan masyarakat yang sejahtera, mandiri, dan berbudaya."
                            </p>
                            <footer className="flex items-center gap-2 text-sm font-semibold text-orange-200 tracking-wide uppercase pt-2 border-t border-white/20">
                                <span className="w-8 h-0.5 bg-orange-200 rounded-full"></span>
                                Pemerintah Desa Sodong Basari
                            </footer>
                        </blockquote>
                    </div>
                </div>
            </div>

            {/* Right Column - Form */}
            <div className="w-full h-full flex flex-col items-center justify-center lg:p-8 relative">
                {/* Background Pattern */}
                <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(#475569 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>

                <div className="relative z-10 w-full max-w-[420px] mx-auto">
                    <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-slate-100">
                        <Link
                            href={route('home')}
                            className="relative z-20 flex flex-col items-center justify-center lg:hidden mb-8"
                        >
                            <div className="p-3 bg-orange-50 rounded-2xl mb-3">
                                <AppLogoIcon className="size-10 text-orange-600 fill-current" />
                            </div>
                            <span className="font-bold text-lg text-slate-900">Sodong Basari</span>
                        </Link>

                        <div className="flex flex-col items-start gap-1 text-left sm:items-center sm:text-center mb-8">
                            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">{title}</h1>
                            <p className="text-sm text-slate-500 font-normal">
                                {description}
                            </p>
                        </div>
                        {children}
                    </div>

                    <div className="mt-8 text-center">
                        <p className="text-xs text-slate-400 font-medium">
                            &copy; {new Date().getFullYear()} Desa Sodong Basari. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
