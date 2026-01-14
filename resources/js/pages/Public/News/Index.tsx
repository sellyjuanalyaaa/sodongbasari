// @ts-nocheck
import React from 'react';
import PublicLayout from '@/layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';
import SectionTitle from '@/components/SectionTitle';
import NewsCard from '@/components/NewsCard';

export default function Index({ villageInfo, posts }) {
    return (
        <PublicLayout villageInfo={villageInfo}>
            <Head title="Berita Desa" />
            <div className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <SectionTitle title="Kabar Terbaru" subtitle="Info & Berita" />

                    {/* Placeholder for empty state if needed */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* We can map posts.data here when backend is fully ready, for now static or check props */}
                        {posts?.data?.length > 0 ? (
                            posts.data.map((post) => (
                                <NewsCard key={post.id} post={post} />
                            ))
                        ) : (
                            <div className="col-span-3 text-center py-12 text-slate-500">
                                Belum ada berita terbaru.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
