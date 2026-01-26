import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
    const [isVisible, setIsVisible] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const toggleVisibility = () => {
            const scrolled = window.pageYOffset;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const progress = (scrolled / height) * 100;
            
            setScrollProgress(progress);
            
            if (scrolled > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <>
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 z-50 group animate-in fade-in slide-in-from-bottom-4"
                    aria-label="Back to top"
                >
                    <div className="relative w-12 h-12">
                        {/* Background Circle */}
                        <svg className="absolute inset-0 w-12 h-12 -rotate-90">
                            <circle
                                cx="24"
                                cy="24"
                                r="20"
                                stroke="currentColor"
                                strokeWidth="3"
                                fill="none"
                                className="text-slate-200"
                            />
                        </svg>
                        {/* Progress Circle */}
                        <svg className="absolute inset-0 w-12 h-12 -rotate-90">
                            <circle
                                cx="24"
                                cy="24"
                                r="20"
                                stroke="currentColor"
                                strokeWidth="3"
                                fill="none"
                                strokeDasharray={`${2 * Math.PI * 20}`}
                                strokeDashoffset={`${2 * Math.PI * 20 * (1 - scrollProgress / 100)}`}
                                className="text-[#EFA00B] transition-all duration-150"
                                strokeLinecap="round"
                            />
                        </svg>
                        {/* Button Content */}
                        <div className="absolute inset-0 flex items-center justify-center bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                            <ArrowUp className="h-5 w-5 text-slate-700 group-hover:text-[#EFA00B] group-hover:-translate-y-0.5 transition-all" />
                        </div>
                    </div>
                </button>
            )}
        </>
    );
}
