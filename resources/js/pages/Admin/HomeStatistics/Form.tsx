import React, { useState } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Save, Plus, Trash2, GripVertical } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

interface HomeStatistic {
    id: number;
    title: string;
    subtitle: string | null;
    type: string;
    image_path: string | null;
    data: any[] | null;
    order: number;
    is_active: boolean;
}

interface Props {
    statistic?: HomeStatistic;
}

interface DataItem {
    label: string;
    value: string;
    color: string;
    textColor: string;
}

export default function Form({ statistic }: Props) {
    const isEditing = !!statistic;

    const { data, setData, post, put, processing, errors, transform } = useForm({
        title: statistic?.title || '',
        subtitle: statistic?.subtitle || '',
        type: statistic?.type || 'budget',
        image: null as File | null,
        data: statistic?.data as DataItem[] || [{ label: '', value: '', color: 'bg-[#71d338]', textColor: 'text-slate-800' }],
        order: statistic?.order || 0,
        is_active: statistic?.is_active ?? true,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEditing) {
            // Transform data to add _method before submission
            transform((data) => ({
                ...data,
                _method: 'put',
            }));
            
            post(route('admin.home-statistics.update', statistic.id), {
                forceFormData: true,
            });
        } else {
            post(route('admin.home-statistics.store'), {
                forceFormData: true,
            });
        }
    };

    const addDataItem = () => {
        setData('data', [...data.data, { label: '', value: '', color: 'bg-[#71d338]', textColor: 'text-slate-800' }]);
    };

    const removeDataItem = (index: number) => {
        const newData = [...data.data];
        newData.splice(index, 1);
        setData('data', newData);
    };

    const updateDataItem = (index: number, field: keyof DataItem, value: string) => {
        const newData = [...data.data];
        newData[index] = { ...newData[index], [field]: value };
        setData('data', newData);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setData('image', e.target.files[0]);
        }
    };

    return (
        <AdminLayout title={isEditing ? "Edit Statistik" : "Tambah Statistik"}>
            <Head title={isEditing ? "Edit Statistik" : "Tambah Statistik"} />

            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <Link href={route('admin.home-statistics.index')}>
                        <Button variant="outline" size="icon">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            {isEditing ? 'Edit Statistik' : 'Tambah Statistik Baru'}
                        </h1>
                        <p className="text-sm text-gray-500">
                            {isEditing ? 'Perbaharui data statistik.' : 'Tambahkan data statistik untuk slider beranda.'}
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Basic Info */}
                        <Card className="md:col-span-2">
                            <CardContent className="p-6 space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="title">Judul Statistik <span className="text-red-500">*</span></Label>
                                        <Input
                                            id="title"
                                            value={data.title}
                                            onChange={(e) => setData('title', e.target.value)}
                                            placeholder="Contoh: Sarana Olahraga"
                                        />
                                        {errors.title && <span className="text-sm text-red-500">{errors.title}</span>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="subtitle">Sub Judul / Nilai Utama</Label>
                                        <Input
                                            id="subtitle"
                                            value={data.subtitle}
                                            onChange={(e) => setData('subtitle', e.target.value)}
                                            placeholder="Contoh: Luas Wilayah (untuk tipe Count)"
                                        />
                                        {errors.subtitle && <span className="text-sm text-red-500">{errors.subtitle}</span>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="type">Tipe Tampilan <span className="text-red-500">*</span></Label>
                                        <Select
                                            value={data.type}
                                            onValueChange={(value) => setData('type', value)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Pilih Tipe" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="budget">Anggaran (Pie/Donut)</SelectItem>
                                                <SelectItem value="landmark">Landmark (Dengan Gambar)</SelectItem>
                                                <SelectItem value="count">Count (Angka Besar)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.type && <span className="text-sm text-red-500">{errors.type}</span>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="order">Urutan Tampil</Label>
                                        <Input
                                            id="order"
                                            type="number"
                                            value={data.order}
                                            onChange={(e) => setData('order', parseInt(e.target.value) || 0)}
                                        />
                                        {errors.order && <span className="text-sm text-red-500">{errors.order}</span>}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="image">Gambar (Opsional / Untuk Landmark)</Label>
                                    <div className="flex items-center gap-4">
                                        {statistic?.image_path && (
                                            <div className="w-20 h-20 rounded-lg overflow-hidden border border-gray-200">
                                                <img src={statistic.image_path} alt="Preview" className="w-full h-full object-cover" />
                                            </div>
                                        )}
                                        <Input
                                            id="image"
                                            type="file"
                                            onChange={handleImageChange}
                                            accept="image/*"
                                            className="flex-1"
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500">Direkomendasikan format PNG transparan untuk Landmark.</p>
                                    {errors.image && <span className="text-sm text-red-500">{errors.image}</span>}
                                </div>

                                <div className="flex items-center gap-2 pt-2">
                                    <Switch
                                        id="is_active"
                                        checked={data.is_active}
                                        onCheckedChange={(checked) => setData('is_active', checked)}
                                    />
                                    <Label htmlFor="is_active">Aktifkan Statistik Ini</Label>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Data Items Input */}
                        {data.type !== 'count' && (
                            <Card className="md:col-span-2">
                                <CardContent className="p-6 space-y-4">
                                    <div className="flex justify-between items-center">
                                        <Label>Data Detail (Grafik/List)</Label>
                                        <Button type="button" variant="outline" size="sm" onClick={addDataItem}>
                                            <Plus className="h-4 w-4 mr-2" /> Tambah Data
                                        </Button>
                                    </div>

                                    <div className="space-y-3">
                                        {data.data.map((item, index) => (
                                            <div key={index} className="flex gap-3 items-end p-3 bg-gray-50 rounded-lg border border-gray-100">
                                                <div className="flex-1 space-y-1">
                                                    <Label className="text-xs">Label</Label>
                                                    <Input
                                                        value={item.label}
                                                        onChange={(e) => updateDataItem(index, 'label', e.target.value)}
                                                        placeholder="Contoh: Sudah Terealisasi"
                                                        className="bg-white"
                                                    />
                                                </div>
                                                <div className="flex-1 space-y-1">
                                                    <Label className="text-xs">Nilai</Label>
                                                    <Input
                                                        value={item.value}
                                                        onChange={(e) => updateDataItem(index, 'value', e.target.value)}
                                                        placeholder="Contoh: Rp 120.000.000"
                                                        className="bg-white"
                                                    />
                                                </div>
                                                <div className="w-32 space-y-1">
                                                    <Label className="text-xs">Warna</Label>
                                                    <Select
                                                        value={item.color}
                                                        onValueChange={(value) => updateDataItem(index, 'color', value)}
                                                    >
                                                        <SelectTrigger className="bg-white">
                                                            <div className="flex items-center gap-2">
                                                                <div className={`w-3 h-3 rounded-full ${item.color.replace('bg-', '')?.includes('[') ? '' : item.color.replace('bg-', 'bg-')}`} style={item.color.includes('[') ? { backgroundColor: item.color.match(/\[(.*?)\]/)?.[1] } : {}} />
                                                                <span>Pilih</span>
                                                            </div>
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="bg-[#71d338]">Hijau (Terealisasi)</SelectItem>
                                                            <SelectItem value="bg-[#e5459f]">Pink (Belum)</SelectItem>
                                                            <SelectItem value="bg-blue-500">Biru</SelectItem>
                                                            <SelectItem value="bg-orange-500">Fanta</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                                    onClick={() => removeDataItem(index)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        ))}
                                        {data.data.length === 0 && (
                                            <p className="text-sm text-gray-500 text-center py-4">Tidak ada data detail. Klik tombol tambah diatas.</p>
                                        )}
                                    </div>
                                    <p className="text-xs text-gray-400">
                                        Untuk tipe "Landmark", color akan menjadi warna bullet point.
                                    </p>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <Link href={route('admin.home-statistics.index')}>
                            <Button type="button" variant="outline">Batal</Button>
                        </Link>
                        <Button type="submit" className="bg-orange-600 hover:bg-orange-700" disabled={processing}>
                            <Save className="h-4 w-4 mr-2" />
                            {isEditing ? 'Simpan Perubahan' : 'Simpan Data'}
                        </Button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
