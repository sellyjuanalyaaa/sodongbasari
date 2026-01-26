import React from 'react';

export const DotsPattern = ({ className = "" }: { className?: string }) => (
    <svg className={`absolute text-slate-100 ${className}`} width="404" height="404" fill="none" viewBox="0 0 404 404" aria-hidden="true">
        <defs>
            <pattern id="pk-dots-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <rect x="0" y="0" width="4" height="4" fill="currentColor" />
            </pattern>
        </defs>
        <rect width="404" height="404" fill="url(#pk-dots-pattern)" />
    </svg>
);

export const Blob1 = ({ className = "" }: { className?: string }) => (
    <svg className={`absolute text-emerald-50/50 ${className}`} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path fill="currentColor" d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.1,-19.2,95.8,-4.9C93.5,9.3,82.2,22.9,71.1,34.3C60,45.7,49.1,54.9,37.3,62.3C25.5,69.7,12.8,75.3,-0.7,76.5C-14.2,77.7,-28.4,74.5,-40.9,67.6C-53.4,60.7,-64.2,50.1,-71.4,37.6C-78.6,25.1,-82.2,10.7,-81.1,-3.2C-80,-17.1,-74.2,-30.5,-65.2,-41.2C-56.2,-52,-44,-60.1,-31.6,-68.2C-19.2,-76.3,-6.6,-84.4,7.1,-96.7L20.8,-109L44.7,-76.4Z" transform="translate(100 100)" />
    </svg>
);

export const Blob2 = ({ className = "" }: { className?: string }) => (
    <svg className={`absolute text-amber-50/50 ${className}`} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path fill="currentColor" d="M39.9,-65.7C54.1,-60.5,69.6,-53.8,78.9,-42.3C88.2,-30.8,91.3,-14.5,89.3,1.1C87.3,16.7,80.2,31.6,71.1,44.9C62,58.2,50.9,69.9,38.1,76.1C25.3,82.3,10.8,83,-2.6,87.5C-16,92,-28.3,100.3,-40.1,96.8C-51.9,93.3,-63.2,78,-71.8,62.9C-80.4,47.8,-86.3,32.9,-86.9,17.7C-87.5,2.5,-82.8,-13.1,-75.4,-26.8C-68,-40.5,-57.9,-52.3,-46.1,-58.5C-34.3,-64.7,-20.8,-65.3,-6.7,-53.7L7.4,-42.1L39.9,-65.7Z" transform="translate(100 100)" />
    </svg>
);

export const WaveAccent = ({ className = "" }: { className?: string }) => (
    <svg className={`absolute text-slate-100 ${className}`} viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
        <path fill="currentColor" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
    </svg>
);

export const OrangeAccentTop = ({ className = "" }: { className?: string }) => (
    <svg className={`absolute pointer-events-none ${className}`} width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="350" cy="50" r="100" stroke="#EFA00B" strokeWidth="2" strokeOpacity="0.1" />
        <circle cx="350" cy="50" r="140" stroke="#EFA00B" strokeWidth="1" strokeOpacity="0.05" />
        <circle cx="350" cy="50" r="60" fill="#EFA00B" fillOpacity="0.03" />
        <path d="M280 50 L320 50" stroke="#EFA00B" strokeWidth="2" strokeOpacity="0.2" />
        <path d="M350 120 L350 160" stroke="#EFA00B" strokeWidth="2" strokeOpacity="0.2" />
        <circle cx="250" cy="150" r="4" fill="#EFA00B" fillOpacity="0.3" />
        <circle cx="180" cy="80" r="3" fill="#EFA00B" fillOpacity="0.2" />
    </svg>
);

export const OrangeAccentBottom = ({ className = "" }: { className?: string }) => (
    <svg className={`absolute pointer-events-none ${className}`} width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="50" y="250" width="100" height="100" rx="20" stroke="#EFA00B" strokeWidth="2" strokeOpacity="0.1" transform="rotate(-10 100 300)" />
        <rect x="80" y="280" width="60" height="60" rx="15" fill="#EFA00B" fillOpacity="0.03" transform="rotate(-15 110 310)" />
        <line x1="180" y1="200" x2="250" y2="220" stroke="#EFA00B" strokeWidth="2" strokeOpacity="0.15" />
        <line x1="40" y1="360" x2="120" y2="380" stroke="#EFA00B" strokeWidth="2" strokeOpacity="0.15" />
        <circle cx="300" cy="300" r="6" fill="#EFA00B" fillOpacity="0.2" />
        <circle cx="280" cy="240" r="3" fill="#EFA00B" fillOpacity="0.2" />
    </svg>
);

export const CloudDecoration = ({ className = "" }: { className?: string }) => (
    <svg className={`absolute pointer-events-none ${className}`} width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Main cloud shape - traditional style */}
        <path d="M 80 150 
                 C 80 140, 85 130, 95 130
                 C 100 120, 110 115, 120 120
                 C 125 110, 135 105, 145 110
                 C 150 100, 165 100, 170 110
                 C 180 105, 190 110, 195 120
                 C 205 115, 215 120, 220 130
                 C 230 130, 235 140, 235 150
                 C 235 160, 230 170, 220 170
                 L 95 170
                 C 85 170, 80 160, 80 150 Z" 
              stroke="#EFA00B" 
              strokeWidth="4" 
              fill="none" 
              strokeLinecap="round"
              strokeLinejoin="round" />
        
        {/* Inner decorative curves - swirls */}
        <path d="M 110 145 C 115 140, 120 140, 125 145" 
              stroke="#EFA00B" 
              strokeWidth="3" 
              fill="none" 
              strokeLinecap="round" />
        <path d="M 140 140 C 145 135, 150 135, 155 140" 
              stroke="#EFA00B" 
              strokeWidth="3" 
              fill="none" 
              strokeLinecap="round" />
        <path d="M 170 145 C 175 140, 180 140, 185 145" 
              stroke="#EFA00B" 
              strokeWidth="3" 
              fill="none" 
              strokeLinecap="round" />
        
        {/* Small decorative elements */}
        <circle cx="100" cy="155" r="4" fill="#EFA00B" opacity="0.5" />
        <circle cx="150" cy="158" r="5" fill="#EFA00B" opacity="0.5" />
        <circle cx="200" cy="155" r="4" fill="#EFA00B" opacity="0.5" />
        
        {/* Additional swirls */}
        <path d="M 95 135 C 98 130, 102 130, 105 135" 
              stroke="#EFA00B" 
              strokeWidth="2.5" 
              fill="none" 
              strokeLinecap="round" />
        <path d="M 210 135 C 213 130, 217 130, 220 135" 
              stroke="#EFA00B" 
              strokeWidth="2.5" 
              fill="none" 
              strokeLinecap="round" />
    </svg>
);
