// @ts-nocheck
import React from 'react';
import PublicLayout from '@/layouts/PublicLayout';
import { Head } from '@inertiajs/react';
import SectionTitle from '@/components/SectionTitle';

export default function SodongBasari({ villageInfo }) {
    return (
        <PublicLayout villageInfo={villageInfo}>
            <Head title="Sodong Basari" />
            <div className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <SectionTitle title="Tentang Desa" subtitle="Sodong Basari" />
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                        <p className="text-slate-600 leading-relaxed mb-6">
                            Desa Sodong Basari adalah desa yang terletak di Kecamatan Belik, Kabupaten Pemalang.
                            Desa ini memiliki kekayaan alam yang melimpah dan masyarakat yang guyub rukun.
                        </p>
                        <h3 className="text-xl font-bold text-slate-800 mb-4">Visi & Misi</h3>
                        <p className="text-slate-600 mb-4">
                            Mewujudkan Desa Sodong Basari yang mandiri, sejahtera, dan religius melalui tata kelola pemerintahan yang baik.
                        </p>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
