import React from 'react';

interface AccentProps {
    className?: string;
    style?: React.CSSProperties;
}

export const AccentImage1 = ({ className = "", style }: AccentProps) => (
    <img
        src="/images/accent1.jpeg"
        alt="Decorative Accent 1"
        aria-hidden="true"
        className={`absolute pointer-events-none select-none opacity-40 mix-blend-overlay ${className}`}
        style={style}
    />
);

export const AccentImage2 = ({ className = "", style }: AccentProps) => (
    <img
        src="/images/accent2.jpeg"
        alt="Decorative Accent 2"
        aria-hidden="true"
        className={`absolute pointer-events-none select-none opacity-40 mix-blend-multiply ${className}`}
        style={style}
    />
);

export const AccentImage3 = ({ className = "", style }: AccentProps) => (
    <img
        src="/images/accent3.jpeg"
        alt="Decorative Accent 3"
        aria-hidden="true"
        className={`absolute pointer-events-none select-none opacity-30 ${className}`}
        style={style}
    />
);
