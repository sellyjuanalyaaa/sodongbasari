import React from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save } from "lucide-react";
import InputError from '@/components/input-error';

interface ElectionType {
    id: number;
    name: string;
    description: string | null;
    order: number;
}

interface Props {
    electionType: ElectionType | null;
}

export default function Form({ electionType }: Props) {
    const isEdit = !!electionType;

    const { data, setData, post, put, processing, errors } = useForm({
        name: electionType?.name || '',
        description: electionType?.description || '',
        order: electionType?.order || 0,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEdit) {
            put(route('admin.election-types.update', electionType.id));
        } else {
            post(route('admin.election-types.store'));
        }
    };

    return (
        <AdminLayout title={isEdit ? 'Edit Jenis Pemilu' : 'Tambah Jenis Pemilu'}>
            <Head title={isEdit ? 'Edit Jenis Pemilu' : 'Tambah Jenis Pemilu'} />

            <div className="mb-6">
                <Link href={route('admin.election-types.index')}>
                    <Button variant="ghost" className="mb-4">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Kembali
                    </Button>
                </Link>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                    {isEdit ? 'Edit Jenis Pemilu' : 'Tambah Jenis Pemilu'}
                </h1>
                <p className="text-gray-500 mt-1">Masukkan informasi jenis pemilu</p>
            </div>

            <Card className="border-gray-100 shadow-sm max-w-2xl">
                <CardHeader className="bg-gray-50 border-b border-gray-100">
                    <CardTitle className="text-lg font-semibold">Form Jenis Pemilu</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Nama */}
                        <div className="space-y-2">
                            <Label htmlFor="name">Nama Jenis Pemilu <span className="text-red-500">*</span></Label>
                            <Input
                                id="name"
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Contoh: Pilpres, Pileg, Pilkada"
                                className={errors.name ? 'border-red-500' : ''}
                            />
                            <InputError message={errors.name} />
                            <p className="text-xs text-gray-500">Singkatan atau nama jenis pemilu</p>
                        </div>

                        {/* Deskripsi */}
                        <div className="space-y-2">
                            <Label htmlFor="description">Deskripsi</Label>
                            <Textarea
                                id="description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                placeholder="Contoh: Pemilihan Presiden dan Wakil Presiden"
                                rows={3}
                                className={errors.description ? 'border-red-500' : ''}
                            />
                            <InputError message={errors.description} />
                            <p className="text-xs text-gray-500">Penjelasan lengkap (opsional)</p>
                        </div>

                        {/* Urutan */}
                        <div className="space-y-2">
                            <Label htmlFor="order">Urutan Tampilan</Label>
                            <Input
                                id="order"
                                type="number"
                                min="0"
                                value={data.order}
                                onChange={(e) => setData('order', parseInt(e.target.value) || 0)}
                                placeholder="0"
                                className={errors.order ? 'border-red-500' : ''}
                            />
                            <InputError message={errors.order} />
                            <p className="text-xs text-gray-500">Urutan tampilan di dropdown (angka lebih kecil tampil lebih dulu)</p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-3 pt-4">
                            <Button
                                type="submit"
                                disabled={processing}
                                className="bg-orange-600 hover:bg-orange-700"
                            >
                                <Save className="mr-2 h-4 w-4" />
                                {processing ? 'Menyimpan...' : 'Simpan'}
                            </Button>
                            <Link href={route('admin.election-types.index')}>
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
