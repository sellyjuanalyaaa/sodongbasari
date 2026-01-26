
import { Link } from '@inertiajs/react';
import React from 'react';
import { route } from 'ziggy-js';

export default function NewsCard({ post }: { post: any }) {
    // SVG placeholder untuk gambar yang tidak tersedia
    const placeholderImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400'%3E%3Crect fill='%23f1f5f9' width='600' height='400'/%3E%3Cg fill='%2394a3b8'%3E%3Cpath d='M240 180h120v40H240zm-60 60h240v16H180z'/%3E%3Ccircle cx='280' cy='140' r='20'/%3E%3C/g%3E%3Ctext x='300' y='210' font-family='system-ui' font-size='16' fill='%23475569' text-anchor='middle'%3EBerita%3C/text%3E%3C/svg%3E";
    
    return (
        <Link 
            href={route('news.show', post.slug)}
            className="group bg-white rounded-lg overflow-hidden flex flex-col h-full hover:shadow-lg transition-all duration-300"
        >
            <div className="h-56 overflow-hidden relative bg-slate-100">
                <img
                    src={post.image_path || placeholderImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                        e.currentTarget.src = placeholderImage;
                    }}
                />
                <div className="absolute top-4 left-4">
                    {post.category && (
                        <span 
                            className="px-3 py-1.5 text-white text-xs font-medium rounded-full backdrop-blur-sm shadow-sm"
                            style={{ backgroundColor: post.category.color || '#1e293b' }}
                        >
                            {post.category.name}
                        </span>
                    )}
                </div>
            </div>
            <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-[#EFA00B] transition-colors line-clamp-2">
                    {post.title}
                </h3>
                <p className="text-[13px] leading-relaxed line-clamp-3 mb-4 flex-1">
                    <span className="font-semibold text-slate-900">{post.category?.name || 'Berita'}</span>
                    <span className="text-slate-600"> {post.content}</span>
                </p>
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span className="font-medium">Administrator</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            <span>Dilihat {post.view_count || Math.floor(Math.random() * 50) + 10} kali</span>
                        </div>
                    </div>
                    <div className="px-3 py-2 bg-[#EFA00B] text-white text-xs font-semibold rounded">
                        {new Date(post.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }).replace('.', '')}
                    </div>
                </div>
            </div>
        </Link>
    );
}
