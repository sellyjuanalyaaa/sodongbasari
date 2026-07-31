import { Link, router } from '@inertiajs/react';
import React, { useState } from 'react';
import { route } from 'ziggy-js';
import axios from 'axios';
import { Eye, Heart, User } from 'lucide-react';

export default function NewsCard({ post, likedPosts = [] }: { post: any, likedPosts?: number[] }) {
    // SVG placeholder untuk gambar yang tidak tersedia
    const placeholderImage = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400'%3E%3Crect fill='%23f1f5f9' width='600' height='400'/%3E%3Cg fill='%2394a3b8'%3E%3Cpath d='M240 180h120v40H240zm-60 60h240v16H180z'/%3E%3Ccircle cx='280' cy='140' r='20'/%3E%3C/g%3E%3Ctext x='300' y='210' font-family='system-ui' font-size='16' fill='%23475569' text-anchor='middle'%3EBerita%3C/text%3E%3C/svg%3E";
    
    const [likesCount, setLikesCount] = useState(post.likes_count || 0);
    const [isLiked, setIsLiked] = useState(likedPosts.includes(post.id));
    const [isLiking, setIsLiking] = useState(false);

    const handleLike = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (isLiking) return;
        
        setIsLiking(true);
        
        try {
            const response = await axios.post(route('news.like', post.id));
            setLikesCount(response.data.likes_count);
            setIsLiked(response.data.is_liked);
        } catch (error) {
            console.error('Error toggling like:', error);
        } finally {
            setIsLiking(false);
        }
    };
    
    // Function to strip HTML tags and get plain text excerpt
    const getPlainTextExcerpt = (html: string, maxLength: number = 150): string => {
        // Remove HTML tags
        const text = html.replace(/<[^>]*>/g, '');
        // Remove extra whitespaces and newlines
        const cleanText = text.replace(/\s+/g, ' ').trim();
        // Truncate to maxLength
        if (cleanText.length > maxLength) {
            return cleanText.substring(0, maxLength) + '...';
        }
        return cleanText;
    };

    return (
        <Link 
            href={route('news.show', post.slug)}
            className="group bg-white rounded-lg overflow-hidden flex flex-col h-full hover:shadow-lg transition-all duration-300"
        >
            {/* News Image */}
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

            {/* Descirption */}
            <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-[#EFA00B] transition-colors line-clamp-2">
                    {post.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 mb-4 flex-1">
                    {getPlainTextExcerpt(post.content, 120)}
                </p>
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                            <User className="w-3.5 h-3.5"/>
                            <span className="font-medium">{post.creator?.name || 'Administrator'}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                                <Eye className="w-3 h-3"/>
                                <span>{post.view_count || Math.floor(Math.random() * 50) + 10} views</span>
                            </div>
                            <button 
                                onClick={handleLike}
                                disabled={isLiking}
                                className="flex items-center gap-1 text-[11px] hover:scale-110 transition-transform disabled:opacity-50"
                            >
                                <Heart className={`w-3 h-3 transition-colors ${isLiked ? 'fill-red-500 text-red-500' : 'fill-none text-slate-400'}`}/>
                                <span className={isLiked ? 'text-red-500 font-medium' : 'text-slate-400'}>{likesCount}</span>
                            </button>
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
