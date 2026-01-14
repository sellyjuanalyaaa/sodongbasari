// @ts-nocheck
import { Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { route } from 'ziggy-js';

export default function HeroSection({ villageInfo }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Default fallback images if local ones aren't available yet, but we are using local ones.
    const heroImages = [
        '/images/hero/hero-1.jpg',
        '/images/hero/hero-2.jpg',
        '/images/hero/hero-3.jpg',
        '/images/hero/hero-4.jpg',
        '/images/hero/hero-5.jpg',
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000); // Change image every 5 seconds

        return () => clearInterval(interval);
    }, []);

    // Function to manually set the slide
    const setSlide = (index) => {
        setCurrentImageIndex(index);
    };

    return (
        <div className="relative bg-slate-900 text-white overflow-hidden h-[600px] md:h-[700px] lg:h-[800px]">
            {/* Carousel Images */}
            <div className="absolute inset-0 w-full h-full">
                {heroImages.map((image, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                            }`}
                        style={{ backgroundImage: `url('${image}')` }}
                    >
                        {/* Overlay for better text readability - Darker for contrast with Gold/Orange */}
                        <div className="absolute inset-0 bg-black/40 mix-blend-multiply"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 opacity-90"></div>
                    </div>
                ))}
            </div>

            {/* Content */}
            <div className="relative h-full flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8 z-10 pt-20">
                <div className="relative inline-block mb-8 group">
                    {/* Liquid Blobs - colorless/white for clear liquid feel */}
                    <div className="absolute top-0 left-0 w-full h-full bg-white/10 rounded-full blur-md opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                    <div className="absolute -top-4 -left-4 w-24 h-24 bg-white/10 rounded-full blur-md opacity-20 animate-pulse"></div>
                    <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-md opacity-20 animate-pulse animation-delay-1000"></div>

                    <span className="relative z-10 inline-block py-2 px-6 rounded-full bg-white/5 backdrop-blur-md border border-white/20 text-white text-sm font-bold tracking-wider shadow-[0_4px_30px_rgba(0,0,0,0.1)] transition-all duration-300 hover:bg-white/10 hover:scale-105 hover:border-white/40 cursor-default select-none">
                        Selamat Datang di Website Resmi
                    </span>
                </div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4 drop-shadow-2xl text-white">
                    Selamat Datang di Sodong Basari
                </h1>
                <p className="max-w-3xl text-lg md:text-2xl lg:text-3xl text-slate-100 mb-12 drop-shadow-md font-medium leading-relaxed tracking-wide">
                    Harmoni Alam, Budaya, dan Kehidupan Masyarakat
                </p>

                <div className="flex flex-col sm:flex-row gap-5 items-center w-full sm:w-auto">
                    <Link
                        href={route('sodong-basari')}
                        className="w-full sm:w-auto px-10 py-4 rounded-full bg-[#EFA00B] hover:bg-[#D48C00] text-white font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-[#EFA00B]/50 hover:-translate-y-1"
                    >
                        Profil Desa
                    </Link>
                    <Link
                        href={route('news.index')}
                        className="w-full sm:w-auto px-10 py-4 rounded-full bg-white text-slate-800 hover:bg-slate-100 font-bold text-lg transition-all duration-300 shadow-lg hover:-translate-y-1"
                    >
                        Berita Terkini
                    </Link>
                </div>

                {/* Carousel Indicators */}
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-4 z-20">
                    {heroImages.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setSlide(index)}
                            className={`rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#EFA00B] ${index === currentImageIndex
                                ? 'bg-[#EFA00B] w-12 h-3'
                                : 'bg-white/50 hover:bg-white w-3 h-3'
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
