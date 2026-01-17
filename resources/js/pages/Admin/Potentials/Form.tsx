
import React, { useState } from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import { Head, useForm, Link } from '@inertiajs/react'; // Clean import
import { Button } from "@/components/ui/button"; // Standard shadcn
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, ArrowLeft, Upload, Image as ImageIcon } from "lucide-react";

interface PotentialFormProps {
    potential?: any;
}

export default function Form({ potential }: PotentialFormProps) {
    const isEdit = !!potential;
    const { data, setData, post, processing, errors } = useForm({
        _method: isEdit ? 'put' : 'post',
        name: potential?.name || '',
        description: potential?.description || '',
        category: potential?.category || '',
        image: null as File | null,
    });
    const [preview, setPreview] = useState<string | null>(potential?.image_path || null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('image', file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        const routeName = isEdit ? 'admin.potentials.update' : 'admin.potentials.store';
        const routeParams = isEdit ? potential.id : undefined;

        // Use post for both create and update (with _method put for update) to handle file uploads
        post(route(routeName, routeParams));
    };

    return (
        <AdminLayout title={isEdit ? "Edit Potensi" : "Tambah Potensi"}>
            <Head title={isEdit ? "Edit Potensi" : "Tambah Potensi"} />

            <div className="flex items-center gap-4 mb-8">
                <Link href={route('admin.potentials.index')}>
                    <Button variant="outline" size="icon" className="border-gray-200 hover:bg-gray-100">
                        <ArrowLeft className="h-4 w-4 text-gray-600" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{isEdit ? "Edit Potensi" : "Tambah Potensi Desa"}</h1>
                    <p className="text-gray-500 mt-1">{isEdit ? `Perbarui data: ${potential.name}` : "Isi form untuk menambah potensi baru."}</p>
                </div>
            </div>

            <Card className="bg-white border-gray-100 shadow-sm max-w-4xl">
                <CardContent className="pt-6">
                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-gray-900 font-semibold">Nama Potensi</Label>
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    required
                                    placeholder="Contoh: Curug Indah"
                                    className="border-gray-200 focus:border-orange-500 focus:ring-orange-200"
                                />
                                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="category" className="text-gray-900 font-semibold">Kategori</Label>
                                <Select
                                    value={data.category}
                                    onValueChange={val => setData('category', val)}
                                >
                                    <SelectTrigger className="border-gray-200 focus:ring-orange-200">
                                        <SelectValue placeholder="Pilih Kategori" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white border-gray-100">
                                        <SelectItem value="Wisata Alam">Wisata Alam</SelectItem>
                                        <SelectItem value="UMKM">UMKM / Produk Lokal</SelectItem>
                                        <SelectItem value="Pertanian">Pertanian & Perkebunan</SelectItem>
                                        <SelectItem value="Seni Budaya">Seni & Budaya</SelectItem>
                                        <SelectItem value="Lainnya">Lainnya</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.category && <p className="text-sm text-red-500">{errors.category}</p>}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description" className="text-gray-700">Deskripsi</Label>
                            <Textarea
                                id="description"
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                                required
                                className="min-h-[150px] border-gray-200 focus:border-orange-500 focus:ring-orange-200"
                                placeholder="Jelaskan detail potensi ini..."
                            />
                            {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label className="text-gray-700">Gambar Utama</Label>
                            <div className="flex items-start gap-6">
                                <div className="border-2 border-dashed border-gray-200 rounded-lg w-full max-w-md h-48 flex flex-col items-center justify-center bg-gray-50 relative overflow-hidden group hover:border-orange-400 transition-colors">
                                    {preview ? (
                                        <img src={preview} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
                                    ) : (
                                        <div className="text-center text-gray-400 p-4">
                                            <ImageIcon className="h-8 w-8 mx-auto mb-2 opacity-50" />
                                            <span className="text-xs">Upload Gambar (JPG/PNG max 2MB)</span>
                                        </div>
                                    )}
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="absolute inset-0 opacity-0 cursor-pointer h-full"
                                    />
                                </div>
                                <div className="text-xs text-gray-500 pt-2">
                                    <p>Format yang disarankan: JPG, PNG.</p>
                                    <p>Ukuran maksimal: 2MB.</p>
                                    <p className="mt-2 text-orange-600 italic">Gambar yang menarik meningkatkan kunjungan.</p>
                                </div>
                            </div>
                            {errors.image && <p className="text-sm text-red-500">{errors.image}</p>}
                        </div>

                        <div className="flex justify-end gap-4 pt-4 border-t border-gray-100">
                            <Link href={route('admin.potentials.index')}>
                                <Button variant="outline" type="button" className="border-gray-200">Batal</Button>
                            </Link>
                            <Button type="submit" disabled={processing} className="bg-orange-600 hover:bg-orange-700 text-white min-w-[120px]">
                                {processing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                {isEdit ? 'Simpan Perubahan' : 'Simpan Data'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </AdminLayout>
    );
}
