import React, { useState } from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Upload, X, Users } from 'lucide-react';
import InputError from '@/components/input-error';

interface Official {
    id: number;
    name: string;
    position: string;
    photo: string | null;
    order: number;
    is_active: boolean;
}

interface Props {
    official: Official | null;
}

export default function Form({ official }: Props) {
    const isEdit = !!official;
    
    const { data, setData, post, processing, errors } = useForm({
        name: official?.name || '',
        position: official?.position || '',
        photo: null as File | null,
        order: official?.order || 1,
        is_active: official?.is_active ?? true,
        _method: isEdit ? 'PUT' : 'POST',
    });

    const [imagePreview, setImagePreview] = useState<string | null>(official?.photo || null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const url = isEdit 
            ? route('admin.officials.update', official.id)
            : route('admin.officials.store');

        post(url);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('photo', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setData('photo', null);
        setImagePreview(null);
    };

    return (
        <AdminLayout>
            <Head title={isEdit ? 'Edit Perangkat Desa' : 'Tambah Perangkat Desa'} />
            
            <div className="py-6">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-6">
                        <Link href={route('admin.officials.index')}>
                            <Button variant="ghost" size="sm" className="mb-4">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Kembali
                            </Button>
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                            <Users className="h-7 w-7 text-orange-600" />
                            {isEdit ? 'Edit Perangkat Desa' : 'Tambah Perangkat Desa'}
                        </h1>
                        <p className="text-sm text-gray-600 mt-1">
                            {isEdit ? 'Perbarui informasi perangkat desa' : 'Tambahkan perangkat desa baru'}
                        </p>
                    </div>

                    {/* Form */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Foto */}
                            <div>
                                <Label htmlFor="photo">Foto</Label>
                                <div className="mt-2">
                                    {imagePreview ? (
                                        <div className="relative inline-block">
                                            <img 
                                                src={imagePreview} 
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
                                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-orange-400 transition">
                                            <Upload className="h-8 w-8 text-gray-400 mb-2" />
                                            <span className="text-sm text-gray-500">Klik untuk upload foto</span>
                                            <input 
                                                type="file" 
                                                className="hidden" 
                                                accept="image/*"
                                                onChange={handleImageChange}
                                            />
                                        </label>
                                    )}
                                </div>
                                {errors.photo && <InputError message={errors.photo} />}
                            </div>

                            {/* Nama */}
                            <div>
                                <Label htmlFor="name">Nama Lengkap *</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="Masukkan nama lengkap"
                                    className="mt-1"
                                />
                                {errors.name && <InputError message={errors.name} />}
                            </div>

                            {/* Jabatan */}
                            <div>
                                <Label htmlFor="position">Jabatan *</Label>
                                <Input
                                    id="position"
                                    type="text"
                                    value={data.position}
                                    onChange={(e) => setData('position', e.target.value)}
                                    placeholder="Contoh: KEPALA DESA"
                                    className="mt-1"
                                />
                                {errors.position && <InputError message={errors.position} />}
                            </div>

                            {/* Urutan */}
                            <div>
                                <Label htmlFor="order">Urutan Tampilan *</Label>
                                <Input
                                    id="order"
                                    type="number"
                                    value={data.order}
                                    onChange={(e) => setData('order', parseInt(e.target.value))}
                                    placeholder="1"
                                    className="mt-1"
                                    min="1"
                                />
                                <p className="text-xs text-gray-500 mt-1">Angka lebih kecil akan ditampilkan lebih dulu</p>
                                {errors.order && <InputError message={errors.order} />}
                            </div>

                            {/* Status */}
                            <div className="flex items-center gap-2">
                                <input
                                    id="is_active"
                                    type="checkbox"
                                    checked={data.is_active}
                                    onChange={(e) => setData('is_active', e.target.checked)}
                                    className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                                />
                                <Label htmlFor="is_active" className="cursor-pointer">Status Aktif</Label>
                            </div>

                            {/* Actions */}
                            <div className="flex justify-end gap-3 pt-4 border-t">
                                <Link href={route('admin.officials.index')}>
                                    <Button type="button" variant="outline">
                                        Batal
                                    </Button>
                                </Link>
                                <Button 
                                    type="submit" 
                                    disabled={processing}
                                    className="bg-orange-600 hover:bg-orange-700"
                                >
                                    {processing ? 'Menyimpan...' : 'Simpan'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
