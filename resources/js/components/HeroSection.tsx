
import { Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { route } from 'ziggy-js';

export default function HeroSection({ villageInfo, heroImages = [] }: { villageInfo: any, heroImages?: any[] }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Use dynamic images if available, otherwise fallback
    const images = (heroImages && heroImages.length > 0)
        ? heroImages.map(img => img.image_path)
        : [
            '/images/hero/hero-1.jpg',
            '/images/hero/hero-2.jpg',
            '/images/hero/hero-3.jpg',
            '/images/hero/hero-4.jpg',
            '/images/hero/hero-5.jpg',
        ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000); // Change image every 5 seconds

        return () => clearInterval(interval);
    }, [images.length]);

    // Function to manually set the slide
    const setSlide = (index: number) => {
        setCurrentImageIndex(index);
    };

    return (
        <div className="relative bg-slate-900 text-white overflow-hidden h-[600px] md:h-[700px] lg:h-[800px]">
            {/* Carousel Images */}
            <div className="absolute inset-0 w-full h-full">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                            }`}
                        style={{ backgroundImage: `url('${image}')` }}
                    >
                        {/* Subtle overlay for better readability */}
                        <div className="absolute inset-0 bg-black/30"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>
                    </div>
                ))}
            </div>

            {/* Content */}
            <div className="relative h-full flex flex-col justify-center items-center text-center px-6 sm:px-8 lg:px-12 z-10 pt-20">
                <div className="relative inline-block mb-10">
                    <span className="relative z-10 inline-block py-2.5 px-6 rounded-full bg-white/10 backdrop-blur-md border border-white/30 text-white text-xs font-medium tracking-[0.15em] uppercase shadow-sm transition-all duration-300 hover:bg-white/15 hover:scale-[1.02] cursor-default select-none">
                        Website Resmi Desa Sodong Basari
                    </span>
                </div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight mb-6 drop-shadow-lg text-white max-w-5xl leading-[1.1]">
                    Selamat Datang di <span className="font-medium">Sodong Basari</span>
                </h1>
                <p className="max-w-2xl text-base md:text-lg lg:text-xl text-white/90 mb-14 drop-shadow-md font-light leading-relaxed tracking-wide">
                    Harmoni Alam, Budaya, dan Kehidupan Masyarakat
                </p>

                <div className="flex flex-col sm:flex-row gap-4 items-center w-full sm:w-auto">
                    <Link
                        href={route('sodong-basari')}
                        className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white text-slate-900 hover:bg-white/90 font-medium text-sm transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                    >
                        Profil Desa
                    </Link>
                    <Link
                        href={route('news.index')}
                        className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white/10 backdrop-blur-md border border-white/30 text-white hover:bg-white/20 hover:border-white/40 font-medium text-sm transition-all duration-300 hover:-translate-y-0.5"
                    >
                        Berita Terkini
                    </Link>
                </div>

                {/* Carousel Indicators removed as requested */}
            </div>
        </div>
    );
}
