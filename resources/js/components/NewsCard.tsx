
import { Link } from '@inertiajs/react';
import React from 'react';
import { route } from 'ziggy-js';

export default function NewsCard({ post }: { post: any }) {
    // SVG placeholder untuk gambar yang tidak tersedia
    const placeholderImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400'%3E%3Crect fill='%23f1f5f9' width='600' height='400'/%3E%3Cg fill='%2394a3b8'%3E%3Cpath d='M240 180h120v40H240zm-60 60h240v16H180z'/%3E%3Ccircle cx='280' cy='140' r='20'/%3E%3C/g%3E%3Ctext x='300' y='210' font-family='system-ui' font-size='16' fill='%23475569' text-anchor='middle'%3EBerita%3C/text%3E%3C/svg%3E";
    
    return (
        <div className="group bg-white rounded-lg border border-slate-200 hover:border-slate-300 transition-all duration-500 ease-out overflow-hidden flex flex-col h-full hover:shadow-sm">
            <div className="h-48 overflow-hidden relative bg-slate-100">
                <img
                    src={post.image_path || placeholderImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                    onError={(e) => {
                        e.currentTarget.src = placeholderImage;
                    }}
                />
                <div className="absolute top-4 left-4">
                    {post.category && (
                        <span 
                            className="px-3 py-1.5 text-white text-xs font-medium rounded-full backdrop-blur-sm"
                            style={{ backgroundColor: post.category.color || '#1e293b' }}
                        >
                            {post.category.name}
                        </span>
                    )}
                </div>
            </div>
            <div className="p-6 flex-1 flex flex-col">
                <div className="text-slate-400 text-xs mb-3 font-light tracking-wide">
                    {new Date(post.published_at).toLocaleDateString('id-ID', { 
                        day: 'numeric', 
                        month: 'long', 
                        year: 'numeric',
                        timeZone: 'Asia/Jakarta'
                    })}
                </div>
                <h3 className="text-lg font-medium text-slate-900 mb-3 group-hover:text-slate-600 transition-colors duration-300 line-clamp-2 leading-snug">
                    <Link href={route('news.show', post.slug)}>
                        {post.title}
                    </Link>
                </h3>
                <p className="text-slate-500 text-[13px] leading-relaxed line-clamp-3 mb-4 flex-1 font-light">
                    {post.content}
                </p>
                <Link href={route('news.show', post.slug)} className="inline-flex items-center text-slate-900 text-sm font-medium hover:text-slate-600 mt-auto group/link">
                    Baca Selengkapnya
                    <svg className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </Link>
            </div>
        </div>
    );
}
