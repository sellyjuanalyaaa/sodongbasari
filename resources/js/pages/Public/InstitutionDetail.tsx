
import React from 'react';
import PublicLayout from '@/layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';
import SectionTitle from '@/components/SectionTitle';
import { Users, ArrowLeft, Building2 } from 'lucide-react';

interface Member {
    id: number;
    name: string;
    position: string;
    photo: string | null;
    order: number;
}

interface Institution {
    id: number;
    name: string;
    abbreviation: string | null;
    description: string;
    logo_path: string | null;
    active_members: Member[];
}

interface Props {
    villageInfo: any;
    institution: Institution;
}

export default function InstitutionDetail({ villageInfo, institution }: Props) {
    return (
        <PublicLayout villageInfo={villageInfo}>
            <Head title={institution.name} />
            <div className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-6">
                        <Link 
                            href="/sodong-basari" 
                            className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium"
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Kembali ke Sodong Basari
                        </Link>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 mb-8">
                        <div className="flex items-start gap-6 mb-6">
                            {institution.logo_path ? (
                                <img 
                                    src={institution.logo_path} 
                                    alt={institution.name}
                                    className="h-24 w-24 object-contain"
                                />
                            ) : (
                                <div className="h-24 w-24 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
                                    <Building2 className="h-12 w-12 text-white" />
                                </div>
                            )}
                            <div className="flex-1">
                                <h1 className="text-3xl font-bold text-slate-800 mb-2">{institution.name}</h1>
                                {institution.abbreviation && (
                                    <p className="text-orange-600 font-semibold text-lg mb-4">({institution.abbreviation})</p>
                                )}
                            </div>
                        </div>
                        
                        <div className="prose max-w-none">
                            <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                                {institution.description}
                            </p>
                        </div>
                    </div>

                    {/* Anggota Lembaga */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                        <div className="flex items-center gap-2 mb-6">
                            <Users className="h-6 w-6 text-orange-600" />
                            <h3 className="text-2xl font-bold text-slate-800">Anggota {institution.name}</h3>
                        </div>
                        
                        {institution.active_members && institution.active_members.length === 0 ? (
                            <div className="text-center py-12">
                                <Users className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                                <p className="text-gray-500">Data anggota belum tersedia</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {institution.active_members?.map((member) => (
                                    <div key={member.id} className="group">
                                        <div className="bg-gradient-to-br from-orange-50 to-white border-2 border-orange-100 rounded-2xl p-6 text-center hover:shadow-lg hover:border-orange-300 transition-all duration-300">
                                            <div className="mb-4">
                                                {member.photo ? (
                                                    <img 
                                                        src={member.photo} 
                                                        alt={member.name}
                                                        className="w-24 h-24 mx-auto rounded-full object-cover border-4 border-white shadow-md group-hover:scale-110 transition-transform duration-300"
                                                    />
                                                ) : (
                                                    <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center border-4 border-white shadow-md">
                                                        <Users className="h-12 w-12 text-white" />
                                                    </div>
                                                )}
                                            </div>
                                            <h4 className="font-bold text-gray-800 text-sm mb-2">{member.name}</h4>
                                            <p className="text-xs text-orange-600 font-semibold uppercase">{member.position}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
