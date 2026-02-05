import React from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save } from "lucide-react";
import InputError from '@/components/input-error';

interface ElectoralRoll {
    id: number;
    year: number;
    male_voters: number;
    female_voters: number;
    total_voters: number;
    election_type: string;
}

interface ElectionType {
    id: number;
    name: string;
    description: string | null;
    order: number;
}

interface Props {
    electoralRoll: ElectoralRoll | null;
    electionTypes: ElectionType[];
}

export default function Form({ electoralRoll, electionTypes }: Props) {
    const isEdit = !!electoralRoll;

    const { data, setData, post, put, processing, errors } = useForm({
        year: electoralRoll?.year || new Date().getFullYear(),
        male_voters: electoralRoll?.male_voters || 0,
        female_voters: electoralRoll?.female_voters || 0,
        election_type: electoralRoll?.election_type || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEdit) {
            put(route('admin.electoral-rolls.update', electoralRoll.id));
        } else {
            post(route('admin.electoral-rolls.store'));
        }
    };

    const totalVoters = (data.male_voters || 0) + (data.female_voters || 0);

    return (
        <AdminLayout title={isEdit ? 'Edit Data DPT' : 'Tambah Data DPT'}>
            <Head title={isEdit ? 'Edit Data DPT' : 'Tambah Data DPT'} />

            <div className="mb-6">
                <Link href={route('admin.electoral-rolls.index')}>
                    <Button variant="ghost" className="mb-4">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Kembali
                    </Button>
                </Link>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                    {isEdit ? 'Edit Data Pemilih Tetap' : 'Tambah Data Pemilih Tetap'}
                </h1>
                <p className="text-gray-500 mt-1">Masukkan data pemilih tetap untuk tahun tertentu</p>
            </div>

            <Card className="border-gray-100 shadow-sm max-w-3xl">
                <CardHeader className="bg-gray-50 border-b border-gray-100">
                    <CardTitle className="text-lg font-semibold">Form Data DPT</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Tahun */}
                            <div className="space-y-2">
                                <Label htmlFor="year">Tahun <span className="text-red-500">*</span></Label>
                                <Input
                                    id="year"
                                    type="number"
                                    min="1900"
                                    max="2100"
                                    value={data.year}
                                    onChange={(e) => setData('year', parseInt(e.target.value))}
                                    placeholder="2024"
                                    className={errors.year ? 'border-red-500' : ''}
                                />
                                <InputError message={errors.year} />
                            </div>

                            {/* Jenis Pemilu */}
                            <div className="space-y-2">
                                <Label htmlFor="election_type">Jenis Pemilu <span className="text-red-500">*</span></Label>
                                <select
                                    id="election_type"
                                    value={data.election_type}
                                    onChange={(e) => setData('election_type', e.target.value)}
                                    className={`flex h-10 w-full rounded-md border ${errors.election_type ? 'border-red-500' : 'border-input'} bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`}
                                >
                                    <option value="">Pilih Jenis Pemilu</option>
                                    {electionTypes.map((type) => (
                                        <option key={type.id} value={type.name}>
                                            {type.name} {type.description ? `- ${type.description}` : ''}
                                        </option>
                                    ))}
                                </select>
                                <InputError message={errors.election_type} />
                                {electionTypes.length === 0 && (
                                    <p className="text-xs text-amber-600">
                                        Belum ada jenis pemilu. Silakan tambahkan terlebih dahulu.
                                    </p>
                                )}
                            </div>

                            {/* Laki-laki */}
                            <div className="space-y-2">
                                <Label htmlFor="male_voters">Jumlah Pemilih Laki-Laki <span className="text-red-500">*</span></Label>
                                <Input
                                    id="male_voters"
                                    type="number"
                                    min="0"
                                    value={data.male_voters}
                                    onChange={(e) => setData('male_voters', parseInt(e.target.value) || 0)}
                                    placeholder="0"
                                    className={errors.male_voters ? 'border-red-500' : ''}
                                />
                                <InputError message={errors.male_voters} />
                            </div>

                            {/* Perempuan */}
                            <div className="space-y-2">
                                <Label htmlFor="female_voters">Jumlah Pemilih Perempuan <span className="text-red-500">*</span></Label>
                                <Input
                                    id="female_voters"
                                    type="number"
                                    min="0"
                                    value={data.female_voters}
                                    onChange={(e) => setData('female_voters', parseInt(e.target.value) || 0)}
                                    placeholder="0"
                                    className={errors.female_voters ? 'border-red-500' : ''}
                                />
                                <InputError message={errors.female_voters} />
                            </div>
                        </div>

                        {/* Total Display */}
                        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-orange-900">Total Pemilih:</span>
                                <span className="text-2xl font-bold text-orange-900">
                                    {totalVoters.toLocaleString('id-ID')}
                                </span>
                            </div>
                            <p className="text-xs text-orange-700 mt-2">
                                Total akan dihitung otomatis dari jumlah laki-laki + perempuan
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-3 pt-4">
                            <Button
                                type="submit"
                                disabled={processing}
                                className="bg-orange-600 hover:bg-orange-700"
                            >
                                <Save className="mr-2 h-4 w-4" />
                                {processing ? 'Menyimpan...' : 'Simpan Data'}
                            </Button>
                            <Link href={route('admin.electoral-rolls.index')}>
                                <Button type="button" variant="outline">
                                    Batal
                                </Button>
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </AdminLayout>
    );
}
