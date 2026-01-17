import React, { useState, FormEventHandler } from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Upload, X } from "lucide-react";
import InputError from '@/components/input-error';

interface Institution {
    id: number;
    name: string;
}

interface Member {
    id: number;
    name: string;
    position: string;
    photo: string | null;
    order: number;
    is_active: boolean;
}

interface Props {
    institution: Institution;
    member?: Member;
}

export default function Form({ institution, member }: Props) {
    const { data, setData, post, put, processing, errors } = useForm({
        name: member?.name || '',
        position: member?.position || '',
        photo: null as File | null,
        order: member?.order || 0,
        is_active: member?.is_active ?? true,
    });

    const [preview, setPreview] = useState<string | null>(member?.photo || null);

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('position', data.position);
        if (data.photo) {
            formData.append('photo', data.photo);
        }
        formData.append('order', data.order.toString());
        formData.append('is_active', data.is_active ? '1' : '0');
        formData.append('_method', member ? 'PUT' : 'POST');

        if (member) {
            post(route('admin.institutions.members.update', [institution.id, member.id]), {
                data: formData,
                forceFormData: true,
            });
        } else {
            post(route('admin.institutions.members.store', institution.id), {
                data: formData,
                forceFormData: true,
            });
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('photo', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setData('photo', null);
        setPreview(null);
    };

    return (
        <AdminLayout title={member ? 'Edit Anggota' : 'Tambah Anggota'}>
            <Head title={member ? 'Edit Anggota' : 'Tambah Anggota'} />
            
            <div className="mb-6">
                <Link href={route('admin.institutions.members.index', institution.id)}>
                    <Button variant="ghost" size="sm">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Kembali
                    </Button>
                </Link>
            </div>

            <div className="max-w-2xl">
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">
                    {member ? 'Edit Anggota' : 'Tambah Anggota'}
                </h1>
                <p className="text-gray-500 mb-8">{institution.name}</p>

                <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
                    <div>
                        <Label htmlFor="photo">Foto Anggota</Label>
                        <div className="mt-2">
                            {preview ? (
                                <div className="relative inline-block">
                                    <img 
                                        src={preview} 
                                        alt="Preview" 
                                        className="h-32 w-32 rounded-lg object-cover border-2 border-gray-200"
                                    />
                                    <button
                                        type="button"
                                        onClick={removeImage}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                            ) : (
                                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <Upload className="h-8 w-8 text-gray-400 mb-2" />
                                        <p className="text-sm text-gray-500">Klik untuk upload foto</p>
                                    </div>
                                    <input 
                                        id="photo" 
                                        type="file" 
                                        className="hidden" 
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                </label>
                            )}
                        </div>
                        <InputError message={errors.photo} className="mt-2" />
                    </div>

                    <div>
                        <Label htmlFor="name">Nama Lengkap</Label>
                        <Input
                            id="name"
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="mt-2"
                            placeholder="Masukkan nama lengkap"
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div>
                        <Label htmlFor="position">Jabatan</Label>
                        <Input
                            id="position"
                            type="text"
                            value={data.position}
                            onChange={(e) => setData('position', e.target.value)}
                            className="mt-2"
                            placeholder="Masukkan jabatan"
                        />
                        <InputError message={errors.position} className="mt-2" />
                    </div>

                    <div>
                        <Label htmlFor="order">Urutan Tampil</Label>
                        <Input
                            id="order"
                            type="number"
                            value={data.order}
                            onChange={(e) => setData('order', parseInt(e.target.value))}
                            className="mt-2"
                            placeholder="0"
                            min="0"
                        />
                        <InputError message={errors.order} className="mt-2" />
                        <p className="text-sm text-gray-500 mt-1">Semakin kecil angka, semakin awal ditampilkan</p>
                    </div>

                    <div className="flex items-center space-x-2">
                        <input
                            id="is_active"
                            type="checkbox"
                            checked={data.is_active}
                            onChange={(e) => setData('is_active', e.target.checked)}
                            className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                        />
                        <Label htmlFor="is_active" className="cursor-pointer">Aktif</Label>
                    </div>

                    <div className="flex justify-end space-x-4 pt-4">
                        <Link href={route('admin.institutions.members.index', institution.id)}>
                            <Button type="button" variant="outline">
                                Batal
                            </Button>
                        </Link>
                        <Button 
                            type="submit" 
                            disabled={processing}
                            className="bg-orange-600 hover:bg-orange-700"
                        >
                            {processing ? 'Menyimpan...' : (member ? 'Update' : 'Simpan')}
                        </Button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
