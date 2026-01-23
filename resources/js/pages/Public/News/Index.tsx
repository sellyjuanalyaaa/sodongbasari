
import React from 'react';
import PublicLayout from '@/layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';
import SectionTitle from '@/components/SectionTitle';
import NewsCard from '@/components/NewsCard';
import { TrendingUp, Eye } from 'lucide-react';
import { OrangeAccentTop, DotsPattern } from '@/components/SvgDecorations';
import { AccentImage3 } from '@/components/ImageAccents';

export default function Index({ villageInfo, posts, mostTrending }) {
    return (
        <PublicLayout villageInfo={villageInfo}>
            <Head title="Berita Desa" />
            <div className="py-24 bg-white relative overflow-hidden">
                <OrangeAccentTop className="right-0 top-0 opacity-100" />
                <DotsPattern className="left-0 bottom-0 opacity-20" />
                <AccentImage3 className="right-[-5%] top-[10%] w-[500px] opacity-10 -rotate-12" />
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                    <div className="text-center mb-16">
                        <div className="inline-block px-4 py-1.5 bg-orange-50 border border-orange-200 rounded-full mb-4">
                            <span className="text-[#EFA00B] text-xs font-medium uppercase tracking-wide">Kabar Terbaru</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-light text-slate-900 mb-3 tracking-tight">Info & Berita</h2>
                        <p className="text-slate-500 text-sm font-light">Informasi & Perkembangan Desa</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Main News Grid */}
                        <div className="lg:col-span-3">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {posts?.data?.length > 0 ? (
                                    posts.data.map((post) => (
                                        <NewsCard key={post.id} post={post} />
                                    ))
                                ) : (
                                    <div className="col-span-3 text-center py-20">
                                        <div className="bg-slate-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 border border-slate-200">
                                            <span className="text-3xl">📰</span>
                                        </div>
                                        <p className="text-slate-400 text-sm font-light">Belum ada berita terbaru yang dipublikasikan.</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Most Trending Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="bg-slate-50 rounded-xl border border-slate-200 p-6 sticky top-20">
                                <div className="flex items-center gap-2 mb-6">
                                    <TrendingUp className="h-5 w-5 text-[#EFA00B]" />
                                    <h3 className="font-medium text-slate-900 text-base">Paling Banyak Dibaca</h3>
                                </div>
                                {mostTrending && mostTrending.length > 0 ? (
                                    <div className="space-y-4">
                                        {mostTrending.map((post, index) => (
                                            <Link
                                                key={post.id}
                                                href={`/news/${post.slug}`}
                                                className="block group"
                                            >
                                                <div className="flex gap-3 p-3 bg-white rounded-lg border border-slate-200 hover:border-orange-200 hover:shadow-sm transition-all">
                                                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-orange-500 to-[#EFA00B] text-white rounded-lg flex items-center justify-center font-medium text-sm shadow-sm">
                                                        {index + 1}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="text-sm font-medium text-slate-900 group-hover:text-[#EFA00B] transition-colors line-clamp-2 mb-1.5">
                                                            {post.title}
                                                        </h4>
                                                        <div className="flex items-center gap-3 text-xs text-slate-500">
                                                            {post.category && (
                                                                <span
                                                                    className="px-2 py-0.5 rounded-full font-medium"
                                                                    style={{
                                                                        backgroundColor: `${post.category.color}20`,
                                                                        color: post.category.color
                                                                    }}
                                                                >
                                                                    {post.category.name}
                                                                </span>
                                                            )}
                                                            <div className="flex items-center gap-1">
                                                                <Eye className="h-3 w-3" />
                                                                <span>{post.view_count || 0}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-slate-400 font-light text-center py-8">Belum ada data trending.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
