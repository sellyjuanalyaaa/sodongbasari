
import React, { useState } from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, ArrowLeft, Upload } from "lucide-react";

interface InstitutionFormProps {
    institution?: any;
}

export default function Form({ institution }: InstitutionFormProps) {
    const isEdit = !!institution;
    const { data, setData, post, processing, errors } = useForm({
        _method: isEdit ? 'put' : 'post',
        name: institution?.name || '',
        description: institution?.description || '',
        logo: null as File | null,
    });
    const [preview, setPreview] = useState<string | null>(institution?.logo_path || null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('logo', file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        const routeName = isEdit ? 'admin.institutions.update' : 'admin.institutions.store';
        const routeParams = isEdit ? institution.id : undefined;

        post(route(routeName, routeParams));
    };

    return (
        <AdminLayout title={isEdit ? "Edit Lembaga" : "Tambah Lembaga"}>
            <Head title={isEdit ? "Edit Lembaga" : "Tambah Lembaga"} />

            <div className="flex items-center gap-4 mb-8">
                <Link href={route('admin.institutions.index')}>
                    <Button variant="outline" size="icon" className="border-gray-200 hover:bg-gray-100">
                        <ArrowLeft className="h-4 w-4 text-gray-600" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{isEdit ? "Edit Lembaga" : "Tambah Lembaga Desa"}</h1>
                    <p className="text-gray-500 mt-1">{isEdit ? `Perbarui data: ${institution.name}` : "Isi form untuk menambah lembaga baru."}</p>
                </div>
            </div>

            <Card className="max-w-3xl bg-white border-gray-100 shadow-sm">
                <CardContent className="pt-6">
                    <form onSubmit={submit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-gray-900 font-semibold">Nama Lembaga</Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                required
                                placeholder="Contoh: BPD, LPMD, PKK"
                                className="border-gray-200 focus:border-orange-500 focus:ring-orange-200"
                            />
                            {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description" className="text-gray-900 font-semibold">Deskripsi / Tugas Pokok</Label>
                            <Textarea
                                id="description"
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                                required
                                className="min-h-[120px] border-gray-200 focus:border-orange-500 focus:ring-orange-200"
                                placeholder="Jelaskan peran lembaga ini..."
                            />
                            {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label className="text-gray-900 font-semibold">Logo Lembaga</Label>
                            <div className="flex items-center gap-6">
                                <div className="border border-gray-200 rounded-lg w-24 h-24 flex items-center justify-center bg-gray-50 relative overflow-hidden">
                                    {preview ? (
                                        <img src={preview} alt="Preview" className="w-full h-full object-contain p-2" />
                                    ) : (
                                        <span className="text-xs text-gray-400">No Logo</span>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="mb-2 border-gray-200 focus:ring-orange-200"
                                    />
                                    <p className="text-xs text-gray-500">Format: PNG transparan disarankan. Max 2MB.</p>
                                </div>
                            </div>
                            {errors.logo && <p className="text-sm text-red-500">{errors.logo}</p>}
                        </div>

                        <div className="flex justify-end gap-4 pt-4 border-t border-gray-100">
                            <Link href={route('admin.institutions.index')}>
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
