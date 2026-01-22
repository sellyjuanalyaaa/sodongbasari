
import React, { useState } from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Save, Loader2, Image as ImageIcon } from "lucide-react";
import { Switch } from "@/components/ui/switch";

export default function SliderForm({ slider }: { slider?: any }) {
    const isEdit = !!slider;

    const { data, setData, post: submitPost, processing, errors } = useForm({
        title: slider?.title || '',
        link: slider?.link || '',
        order: slider?.order || 0,
        is_active: slider?.is_active ?? true,
        image: null as File | null,
        _method: isEdit ? 'PUT' : 'POST',
    });

    const [preview, setPreview] = useState<string | null>(slider?.image_path || null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('image', file);
            const objectUrl = URL.createObjectURL(file);
            setPreview(objectUrl);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEdit) {
            submitPost(route('admin.sliders.update', slider.id));
        } else {
            submitPost(route('admin.sliders.store'));
        }
    };

    return (
        <AdminLayout title={isEdit ? "Edit Slider" : "Tambah Slider"}>
            <Head title={isEdit ? "Edit Slider" : "Tambah Slider"} />

            <div className="flex items-center gap-4 mb-8">
                <Button variant="outline" size="icon" asChild className="border-gray-200 hover:bg-gray-100">
                    <Link href={route('admin.sliders.index')}>
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">{isEdit ? "Edit Slider" : "Tambah Slider Baru"}</h1>
                    <p className="text-gray-500 mt-1">{isEdit ? "Perbarui informasi slider." : "Isi form untuk menambahkan slider baru."}</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="max-w-4xl">
                <Card className="bg-white border-gray-100 shadow-sm">
                    <CardContent className="p-6 space-y-6">
                        {/* Title */}
                        <div className="space-y-2">
                            <Label htmlFor="title" className="text-gray-900 font-semibold">Judul Slider</Label>
                            <Input
                                id="title"
                                value={data.title}
                                onChange={e => setData('title', e.target.value)}
                                placeholder="Masukkan judul slider..."
                                required
                                className="border-gray-200 focus:border-orange-500 focus:ring-orange-200 text-gray-900"
                            />
                            {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
                        </div>

                        {/* Link */}
                        <div className="space-y-2">
                            <Label htmlFor="link" className="text-gray-900 font-semibold">Link (Opsional)</Label>
                            <Input
                                id="link"
                                type="url"
                                value={data.link}
                                onChange={e => setData('link', e.target.value)}
                                placeholder="https://example.com"
                                className="border-gray-200 focus:border-orange-500 focus:ring-orange-200 text-gray-900"
                            />
                            <p className="text-xs text-gray-500">Link yang akan dibuka ketika slider diklik (opsional).</p>
                            {errors.link && <p className="text-sm text-red-500">{errors.link}</p>}
                        </div>

                        {/* Order */}
                        <div className="space-y-2">
                            <Label htmlFor="order" className="text-gray-900 font-semibold">Urutan</Label>
                            <Input
                                id="order"
                                type="number"
                                min="0"
                                value={data.order}
                                onChange={e => setData('order', parseInt(e.target.value))}
                                placeholder="0"
                                required
                                className="border-gray-200 focus:border-orange-500 focus:ring-orange-200 text-gray-900 max-w-xs"
                            />
                            <p className="text-xs text-gray-500">Slider dengan urutan lebih kecil akan ditampilkan terlebih dahulu.</p>
                            {errors.order && <p className="text-sm text-red-500">{errors.order}</p>}
                        </div>

                        {/* Status */}
                        <div className="flex items-center space-x-3">
                            <Switch
                                id="is_active"
                                checked={data.is_active}
                                onCheckedChange={(checked: boolean) => setData('is_active', checked)}
                            />
                            <Label htmlFor="is_active" className="text-gray-900 font-semibold cursor-pointer">
                                Aktif
                            </Label>
                        </div>
                        {errors.is_active && <p className="text-sm text-red-500">{errors.is_active}</p>}

                        {/* Image Upload */}
                        <div className="space-y-2">
                            <Label htmlFor="image" className="text-gray-900 font-semibold">Gambar Slider</Label>
                            <div className="flex gap-4 items-start">
                                <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center w-full max-w-md h-48 bg-gray-50 relative overflow-hidden">
                                    {preview ? (
                                        <img src={preview} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
                                    ) : (
                                        <div className="text-center text-gray-400">
                                            <ImageIcon className="h-8 w-8 mx-auto mb-2" />
                                            <span className="text-xs">No image selected</span>
                                        </div>
                                    )}
                                </div>
                                <div className="space-y-2 flex-1">
                                    <Input
                                        id="image"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="cursor-pointer border-gray-200 focus:ring-orange-200"
                                        required={!isEdit}
                                    />
                                    <p className="text-xs text-gray-500">Format: JPG, PNG, GIF. Max 2MB. Rekomendasi: 1920x600px</p>
                                    {errors.image && <p className="text-sm text-red-500">{errors.image}</p>}
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end pt-4">
                            <Button type="submit" disabled={processing} className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white">
                                {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                <Save className="mr-2 h-4 w-4" />
                                {isEdit ? "Perbarui Slider" : "Tambah Slider"}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </AdminLayout>
    );
}
