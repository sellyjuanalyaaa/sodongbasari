
import React, { useState } from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Save, Loader2, Image as ImageIcon } from "lucide-react";

export default function PostForm({ post }: { post?: any }) {
    const isEdit = !!post;

    const { data, setData, post: submitPost, processing, errors } = useForm({
        title: post?.title || '',
        category: post?.category || '',
        content: post?.content || '',
        image: null as File | null,
        _method: isEdit ? 'PUT' : 'POST',
    });

    const [preview, setPreview] = useState<string | null>(post?.image_path || null);

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
            submitPost(route('admin.posts.update', post.id));
        } else {
            submitPost(route('admin.posts.store'));
        }
    };

    return (
        <AdminLayout title={isEdit ? "Edit Berita" : "Tambah Berita"}>
            <Head title={isEdit ? "Edit Berita" : "Tambah Berita"} />

            <div className="flex items-center gap-4 mb-8">
                <Button variant="outline" size="icon" asChild className="border-gray-200 hover:bg-gray-100">
                    <Link href={route('admin.posts.index')}>
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">{isEdit ? "Edit Berita" : "Tambah Berita Baru"}</h1>
                    <p className="text-gray-500 mt-1">{isEdit ? "Perbarui informasi berita dan artikel." : "Isi form untuk membuat berita atau artikel baru."}</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="max-w-4xl">
                <Card className="bg-white border-gray-100 shadow-sm">
                    <CardContent className="p-6 space-y-6">
                        {/* Title */}
                        <div className="space-y-2">
                            <Label htmlFor="title" className="text-gray-900 font-semibold">Judul Berita</Label>
                            <Input
                                id="title"
                                value={data.title}
                                onChange={e => setData('title', e.target.value)}
                                placeholder="Masukkan judul berita..."
                                required
                                className="border-gray-200 focus:border-orange-500 focus:ring-orange-200 text-gray-900"
                            />
                            {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
                        </div>

                        {/* Category */}
                        <div className="space-y-2">
                            <Label htmlFor="category" className="text-gray-900 font-semibold">Kategori</Label>
                            <Select
                                value={data.category}
                                onValueChange={(val) => setData('category', val)}
                            >
                                <SelectTrigger className="border-gray-200 focus:ring-orange-200">
                                    <SelectValue placeholder="Pilih Kategori" />
                                </SelectTrigger>
                                <SelectContent className="bg-white border-gray-100">
                                    <SelectItem value="Berita Desa">Berita Desa</SelectItem>
                                    <SelectItem value="Pengumuman">Pengumuman</SelectItem>
                                    <SelectItem value="Kegiatan">Kegiatan</SelectItem>
                                    <SelectItem value="Artikel">Artikel</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.category && <p className="text-sm text-red-500">{errors.category}</p>}
                        </div>

                        {/* Content */}
                        <div className="space-y-2">
                            <Label htmlFor="content" className="text-gray-900 font-semibold">Isi Berita</Label>
                            <Textarea
                                id="content"
                                rows={10}
                                value={data.content}
                                onChange={e => setData('content', e.target.value)}
                                placeholder="Tulis isi berita di sini..."
                                className="resize-y border-gray-200 focus:border-orange-500 focus:ring-orange-200"
                                required
                            />
                            {errors.content && <p className="text-sm text-red-500">{errors.content}</p>}
                        </div>

                        {/* Image Upload */}
                        <div className="space-y-2">
                            <Label htmlFor="image" className="text-gray-900 font-semibold">Gambar Unggulan (Thumbnail)</Label>
                            <div className="flex gap-4 items-start">
                                <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center w-full max-w-xs h-40 bg-gray-50 relative overflow-hidden">
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
                                    />
                                    <p className="text-xs text-gray-500">Format: JPG, PNG, GIF. Max 2MB.</p>
                                    {errors.image && <p className="text-sm text-red-500">{errors.image}</p>}
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end pt-4">
                            <Button type="submit" disabled={processing} className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white">
                                {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {isEdit ? 'Simpan Perubahan' : 'Terbitkan Berita'}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </AdminLayout>
    );
}
