// @ts-nocheck
import { Link } from '@inertiajs/react';
import React from 'react';
import { route } from 'ziggy-js';

export default function NewsCard({ post }) {
    return (
        <div className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 overflow-hidden flex flex-col h-full">
            <div className="h-48 overflow-hidden relative">
                <img
                    src={post.image_path || `https://placehold.co/600x400?text=Berita`}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-[#EFA00B] text-white text-xs font-bold rounded-full shadow-lg">
                        {post.category}
                    </span>
                </div>
            </div>
            <div className="p-6 flex-1 flex flex-col">
                <div className="text-slate-500 text-xs mb-3 flex items-center gap-2">
                    <span>📅 {new Date(post.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-[#EFA00B] transition-colors line-clamp-2">
                    <Link href={route('news.show', post.slug)}>
                        {post.title}
                    </Link>
                </h3>
                <p className="text-slate-600 text-sm line-clamp-3 mb-4 flex-1">
                    {post.content}
                </p>
                <Link href={route('news.show', post.slug)} className="inline-flex items-center text-[#EFA00B] font-semibold hover:text-[#D48C00] mt-auto">
                    Baca Selengkapnya
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </Link>
            </div>
        </div>
    );
}
