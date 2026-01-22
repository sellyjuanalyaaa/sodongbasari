import React, { FormEventHandler } from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft } from "lucide-react";
import InputError from '@/components/input-error';

interface Category {
    id: number;
    name: string;
    color: string;
    description: string | null;
    order: number;
    is_active: boolean;
}

interface Props {
    category?: Category;
}

const colorOptions = [
    { value: 'from-emerald-500 to-teal-500', label: 'Hijau/Teal (Wisata)', preview: 'bg-gradient-to-r from-emerald-500 to-teal-500' },
    { value: 'from-yellow-500 to-amber-500', label: 'Kuning/Amber (UMKM)', preview: 'bg-gradient-to-r from-yellow-500 to-amber-500' },
    { value: 'from-green-600 to-lime-600', label: 'Hijau Tua/Lime (Pertanian)', preview: 'bg-gradient-to-r from-green-600 to-lime-600' },
    { value: 'from-purple-500 to-indigo-500', label: 'Ungu/Indigo (Kerajinan)', preview: 'bg-gradient-to-r from-purple-500 to-indigo-500' },
    { value: 'from-red-500 to-rose-500', label: 'Merah/Rose (Kuliner)', preview: 'bg-gradient-to-r from-red-500 to-rose-500' },
    { value: 'from-blue-500 to-cyan-500', label: 'Biru/Cyan', preview: 'bg-gradient-to-r from-blue-500 to-cyan-500' },
    { value: 'from-pink-500 to-purple-500', label: 'Pink/Ungu', preview: 'bg-gradient-to-r from-pink-500 to-purple-500' },
    { value: 'from-orange-500 to-amber-500', label: 'Orange/Amber', preview: 'bg-gradient-to-r from-orange-500 to-amber-500' },
];

export default function Form({ category }: Props) {
    const { data, setData, post, put, processing, errors } = useForm({
        name: category?.name || '',
        color: category?.color || 'from-orange-500 to-amber-500',
        description: category?.description || '',
        order: category?.order || 0,
        is_active: category?.is_active ?? true,
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        if (category) {
            put(route('admin.potential-categories.update', category.id));
        } else {
            post(route('admin.potential-categories.store'));
        }
    };

    return (
        <AdminLayout title={category ? 'Edit Kategori' : 'Tambah Kategori'}>
            <Head title={category ? 'Edit Kategori' : 'Tambah Kategori'} />
            
            <div className="mb-6">
                <Link href={route('admin.potential-categories.index')}>
                    <Button variant="ghost" size="sm">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Kembali
                    </Button>
                </Link>
            </div>

            <div className="max-w-2xl">
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">
                    {category ? 'Edit Kategori' : 'Tambah Kategori'}
                </h1>
                <p className="text-gray-500 mb-8">
                    {category ? 'Perbarui informasi kategori potensi' : 'Tambahkan kategori baru untuk potensi desa'}
                </p>

                <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
                    <div>
                        <Label htmlFor="name">Nama Kategori</Label>
                        <Input
                            id="name"
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="mt-1"
                            placeholder="Contoh: Wisata Alam, UMKM, dll"
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div>
                        <Label htmlFor="color">Warna Badge</Label>
                        <Select value={data.color} onValueChange={(value) => setData('color', value)}>
                            <SelectTrigger className="mt-1">
                                <SelectValue placeholder="Pilih warna" />
                            </SelectTrigger>
                            <SelectContent>
                                {colorOptions.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        <div className="flex items-center gap-2">
                                            <div className={`w-16 h-4 rounded ${option.preview}`}></div>
                                            <span>{option.label}</span>
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <InputError message={errors.color} className="mt-2" />
                        
                        {/* Preview */}
                        <div className="mt-3">
                            <p className="text-sm text-gray-500 mb-2">Preview:</p>
                            <div className={`inline-flex px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-gradient-to-r ${data.color} uppercase tracking-wide shadow-lg`}>
                                {data.name || 'Nama Kategori'}
                            </div>
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="description">Deskripsi (Opsional)</Label>
                        <Textarea
                            id="description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            className="mt-1"
                            rows={3}
                            placeholder="Deskripsi singkat tentang kategori ini"
                        />
                        <InputError message={errors.description} className="mt-2" />
                    </div>

                    <div>
                        <Label htmlFor="order">Urutan Tampilan</Label>
                        <Input
                            id="order"
                            type="number"
                            value={data.order}
                            onChange={(e) => setData('order', parseInt(e.target.value))}
                            className="mt-1"
                            min="0"
                        />
                        <InputError message={errors.order} className="mt-2" />
                        <p className="text-sm text-gray-500 mt-1">Urutan kategori dalam dropdown (semakin kecil, semakin di atas)</p>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="is_active">Status Aktif</Label>
                            <p className="text-sm text-gray-500">Kategori aktif dapat dipilih saat menambah potensi</p>
                        </div>
                        <Switch
                            id="is_active"
                            checked={data.is_active}
                            onCheckedChange={(checked: boolean) => setData('is_active', checked)}
                        />
                    </div>

                    <div className="flex gap-2 pt-4">
                        <Button type="submit" disabled={processing} className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600">
                            {category ? 'Update Kategori' : 'Simpan Kategori'}
                        </Button>
                        <Link href={route('admin.potential-categories.index')}>
                            <Button type="button" variant="outline">
                                Batal
                            </Button>
                        </Link>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
