
import React, { useState } from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, Trash2, Upload, Image as ImageIcon } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function HeroEdit({ images }: { images: any[] }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        image: null as File | null,
    });
    const [preview, setPreview] = useState<string | null>(null);

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
        post(route('admin.hero.store'), {
            onSuccess: () => {
                reset();
                setPreview(null);
            },
        });
    };

    const handleDelete = (id: number) => {
        router.delete(route('admin.hero.destroy', id), {
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout title="Pengaturan Slider">
            <Head title="Pengaturan Slider" />

            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Slider Hero</h1>
                <p className="text-gray-500 mt-1">Kelola gambar slider yang tampil di halaman depan website desa.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Upload Form */}
                <Card>
                    <CardHeader>
                        <CardTitle>Upload Gambar Baru</CardTitle>
                        <CardDescription>Format: JPG, PNG. Max 15MB. Rasio Landscape disarankan.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="title" className="text-gray-900 font-semibold">Judul (Opsional)</Label>
                                <Input
                                    id="title"
                                    value={data.title}
                                    onChange={e => setData('title', e.target.value)}
                                    placeholder="Contoh: Pemandangan Desa"
                                />
                                {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="image" className="text-gray-900 font-semibold">Pilih Gambar</Label>
                                <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50 relative overflow-hidden min-h-[200px]">
                                    {preview ? (
                                        <img src={preview} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
                                    ) : (
                                        <div className="text-center text-gray-400">
                                            <Upload className="h-10 w-10 mx-auto mb-2" />
                                            <span className="text-sm">Klik untuk upload</span>
                                        </div>
                                    )}
                                    <Input
                                        id="image"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="absolute inset-0 opacity-0 cursor-pointer h-full"
                                        required
                                    />
                                </div>
                                {errors.image && <p className="text-sm text-red-500">{errors.image}</p>}
                            </div>

                            <Button type="submit" disabled={processing} className="w-full bg-orange-600 hover:bg-orange-700 text-white">
                                {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Upload Slider
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* List Images */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Gambar Aktif</h3>
                    {images.length === 0 && <p className="text-muted-foreground text-sm">Belum ada gambar slider.</p>}

                    <div className="grid gap-4">
                        {images.map((img) => (
                            <div key={img.id} className="group relative rounded-lg border bg-white shadow-sm overflow-hidden aspect-video">
                                <img src={img.image_path} alt={img.title} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="destructive" size="sm">
                                                <Trash2 className="h-4 w-4 mr-1" /> Hapus
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Hapus gambar ini?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Gambar akan dihapus dari slider halaman depan.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Batal</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => handleDelete(img.id)} className="bg-red-600">
                                                    Hapus
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                                {img.title && (
                                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-2 text-xs truncate">
                                        {img.title}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
