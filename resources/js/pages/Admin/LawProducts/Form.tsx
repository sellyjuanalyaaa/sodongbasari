import React, { useMemo, useState } from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
    ArrowLeft,
    FileText,
    Loader2,
    Upload,
    X,
} from 'lucide-react';
import InputError from '@/components/input-error';

interface Category {
    id: number;
    name: string;
    description?: string;
    icon?: string;
    color?: string;
}

interface LawProductFormProps {
    lawProduct?: any;
    categories: Category[];
}

type StatusValue = 'active' | 'edited' | 'revoked';

const statusOptions: Array<{ value: StatusValue; label: string; description: string }> = [
    { value: 'active', label: 'Berlaku', description: 'Dokumen aktif dan digunakan sebagai referensi resmi.' },
    { value: 'edited', label: 'Diubah', description: 'Dokumen pernah mengalami perubahan atau pembaruan.' },
    { value: 'revoked', label: 'Dicabut', description: 'Dokumen tidak lagi berlaku.' },
];

function formatReadableDate(value?: string) {
    if (!value) {
        return '-';
    }

    return new Intl.DateTimeFormat('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(new Date(value));
}

export default function Form({ lawProduct, categories }: LawProductFormProps) {
    const isEdit = !!lawProduct;

    const initialFileLabel = useMemo(() => {
        if (!lawProduct?.path) {
            return '';
        }

        const path = String(lawProduct.path);
        const parts = path.split('/');
        return parts[parts.length - 1] || path;
    }, [lawProduct]);

    const { data, setData, post, processing, errors } = useForm({
        _method: isEdit ? 'put' : 'post',
        title: lawProduct?.title || '',
        slug: lawProduct?.slug || '',
        category: lawProduct?.category_id?.toString() || lawProduct?.category_id || '',
        description: lawProduct?.description || '',
        establish: lawProduct?.establish ? String(lawProduct.establish).slice(0, 10) : '',
        path: null as File | null,
        status: (lawProduct?.status || 'active') as StatusValue,
        downloads: lawProduct?.downloads ?? 0,
    });

    const [preview, setPreview] = useState<string | null>(lawProduct?.image_path || null);
    const [selectedFileName, setSelectedFileName] = useState<string | null>(initialFileLabel);
    const [selectedFileSize, setSelectedFileSize] = useState<number | null>(null);

    const selectedCategory = categories.find((item) => String(item.id) === String(data.category));

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            setData('path', file);
            setSelectedFileName(file.name);
            setSelectedFileSize(file.size);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleRemoveFile = () => {
        setData('path', null);
        setSelectedFileName(null);
        setSelectedFileSize(null);
        setPreview(null);
    };

    function formatFileSize(bytes: number) {
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        const routeName = isEdit ? 'admin.law-products.update' : 'admin.law-products.store';
        const routeParams = isEdit ? lawProduct.id : undefined;

        post(route(routeName, routeParams), {
            forceFormData: true,
        });
    };

    const activeStatus = statusOptions.find((item) => item.value === data.status) || statusOptions[0];

    return (
        <AdminLayout title={isEdit ? 'Edit Produk Hukum' : 'Tambah Produk Hukum'}>
            <Head title={isEdit ? 'Edit Produk Hukum' : 'Tambah Produk Hukum'} />

            <div className="mb-8 flex items-center gap-4">
                <Link href={route('admin.law-products.index')}>
                    <Button variant="outline" size="icon" className="border-gray-200 bg-white hover:bg-gray-50">
                        <ArrowLeft className="h-4 w-4 text-gray-600" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                        {isEdit ? 'Edit Produk Hukum' : 'Tambah Produk Hukum'}
                    </h1>
                    <p className="mt-1 text-gray-500">
                        {isEdit ? `Perbarui data dokumen: ${lawProduct.title}` : 'Isi data untuk menambahkan dokumen produk hukum baru.'}
                    </p>
                </div>
            </div>

            <div className="grid gap-6 xl:grid-cols-[1.6fr_0.9fr]">
                <Card className="border-gray-100 bg-white shadow-sm">
                    <CardContent className="p-0">
                        <form onSubmit={handleSubmit} className="space-y-6 p-6">
                            <div className="grid gap-5 lg:grid-cols-2">
                                <div className="space-y-2 lg:col-span-2">
                                    <Label htmlFor="title" className="text-sm font-semibold text-gray-900">
                                        Judul Dokumen
                                    </Label>
                                    <Input
                                        id="title"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        required
                                        placeholder="Contoh: Peraturan Desa tentang Rencana Kerja Pemerintah Desa Tahun 2026"
                                        className="border-gray-200 focus:border-orange-500 focus:ring-orange-200"
                                    />
                                    {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="slug" className="text-sm font-semibold text-gray-900">
                                        Slug
                                    </Label>
                                    <Input
                                        id="slug"
                                        value={data.slug}
                                        onChange={(e) => setData('slug', e.target.value)}
                                        placeholder="slug-dokumen"
                                        className="w-full font-mono text-sm"
                                    />
                                    <InputError message={errors.slug} />
                                    <p className="text-xs text-gray-500">
                                        URL-friendly identifier. Biarkan kosong untuk generate otomatis.
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="category" className="text-sm font-semibold text-gray-900">
                                        Kategori Dokumen
                                    </Label>
                                    {categories && categories.length > 0 ? (
                                        <Select
                                            value={String(data.category)}
                                            onValueChange={(value) => setData('category', value)}
                                        >
                                            <SelectTrigger className="h-11 border-gray-200 bg-white focus:ring-orange-200">
                                                <SelectValue placeholder="Pilih kategori" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-white">
                                                {categories.map((category) => (
                                                    <SelectItem key={category.id} value={String(category.id)}>
                                                        {category.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    ) : (
                                        <div className="text-sm text-gray-500 p-3 bg-yellow-50 border border-yellow-200 rounded">
                                            Belum ada kategori. <Link href={route('admin.law-product-categories.create')} className="text-orange-600 hover:underline">Buat kategori terlebih dahulu</Link>.
                                        </div>
                                    )}
                                    {errors.category && <p className="text-sm text-red-500">{errors.category}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="establish" className="text-sm font-semibold text-gray-900">
                                        Tanggal Penetapan
                                    </Label>
                                    <Input
                                        id="establish"
                                        type="date"
                                        value={data.establish}
                                        onChange={(event) => setData('establish', event.target.value)}
                                        required
                                        className="h-11 border-gray-200 focus:border-orange-500 focus:ring-orange-200"
                                    />
                                    {errors.establish && <p className="text-sm text-red-500">{errors.establish}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="status" className="text-sm font-semibold text-gray-900">
                                        Status Dokumen
                                    </Label>
                                    <Select value={data.status} onValueChange={(value) => setData('status', value as StatusValue)}>
                                        <SelectTrigger className="h-11 border-gray-200 bg-white focus:ring-orange-200">
                                            <SelectValue placeholder="Pilih status" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white">
                                            {statusOptions.map((option) => (
                                                <SelectItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <p className="text-xs text-gray-500">{activeStatus.description}</p>
                                    {errors.status && <p className="text-sm text-red-500">{errors.status}</p>}
                                </div>

                                <div className="space-y-2 lg:col-span-2">
                                    <Label htmlFor="description" className="text-sm font-semibold text-gray-900">
                                        Deskripsi Dokumen
                                    </Label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(event) => setData('description', event.target.value)}
                                        required
                                        className="min-h-45 border-gray-200 focus:border-orange-500 focus:ring-orange-200"
                                        placeholder="Tulis ringkasan isi, fungsi, dan ruang lingkup dokumen..."
                                    />
                                    {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                                </div>
                            </div>

                            <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50/70 p-4 sm:p-5">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-50 text-[#EFA00B]">
                                        <Upload className="h-5 w-5" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="gap-3 lg:flex-row lg:items-center lg:justify-between">
                                            <h3 className="text-sm font-semibold text-gray-900">File Dokumen</h3>
                                            <p className="mt-1 text-xs text-gray-500">
                                                Unggah file PDF atau dokumen lain yang akan menjadi sumber preview dan download publik.
                                            </p>
                                        </div>

                                        <div className="mt-4 grid gap-4">
                                            <div className="w-full max-w-md">
                                                {preview ? (
                                                    <div className="relative flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
                                                        <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-[#EFA00B]">
                                                            <FileText className="size-6" />
                                                        </div>
                                                        <div className="min-w-0 flex-1">
                                                            <p className="truncate text-sm font-medium text-slate-900">
                                                                {selectedFileName ?? 'Dokumen tersimpan'}
                                                            </p>
                                                            {selectedFileSize && (
                                                                <p className="text-xs text-slate-500">{formatFileSize(selectedFileSize)} • PDF</p>
                                                            )}
                                                            <a
                                                                href={preview}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-xs font-medium text-[#EFA00B] hover:underline"
                                                            >
                                                                Lihat pratinjau
                                                            </a>
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={handleRemoveFile}
                                                            className="shrink-0 rounded-full p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-600 cursor-pointer"
                                                        >
                                                            <X className="size-4" />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div className="relative flex h-32 w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 transition-colors group hover:border-orange-400">
                                                        <div className="p-4 text-center text-gray-400">
                                                            <FileText className="mx-auto mb-2 h-8 w-8 opacity-50" />
                                                            <span className="text-xs">Upload Dokumen (PDF max 2MB)</span>
                                                        </div>
                                                        <Input
                                                            type="file"
                                                            name="doc"
                                                            accept=".pdf"
                                                            onChange={handleFileChange}
                                                            className="absolute inset-0 h-full cursor-pointer opacity-0"
                                                        />
                                                    </div>
                                                )}
                                                {errors.path && <p className="mt-1.5 text-sm text-red-500">{errors.path}</p>}
                                            </div>

                                            <div className="rounded-2xl border border-gray-200 bg-white px-4 py-3 text-xs text-gray-600 shadow-sm">
                                                <div className="font-semibold text-gray-900">Catatan file</div>
                                                <div className="mt-1 leading-5">
                                                    File baru opsional saat edit. Jika tidak diubah, file lama tetap digunakan.
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:items-center sm:justify-end">
                                <Link href={route('admin.law-products.index')}>
                                    <Button type="button" variant="outline" className="h-11 border-gray-200 px-5 text-gray-700 hover:bg-gray-50">
                                        Batal
                                    </Button>
                                </Link>
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="h-11 bg-orange-600 px-5 text-white shadow-sm hover:bg-orange-700"
                                >
                                    {processing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                    {isEdit ? 'Simpan Perubahan' : 'Simpan Dokumen'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* File Preview */}
                <div className="space-y-6">
                    <Card className="border-gray-100 bg-white shadow-sm">
                        <CardContent className="p-5">
                            <div className="flex items-center gap-3">
                                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-50 text-[#EFA00B]">
                                    <FileText className="h-5 w-5" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-900">Ringkasan Dokumen</h3>
                                    <p className="text-xs text-gray-500">Pratinjau data yang sedang diisi.</p>
                                </div>
                            </div>

                            <div className="mt-5 space-y-3 rounded-2xl border border-gray-100 bg-gray-50/80 p-4">
                                <div>
                                    <p className="text-[11px] uppercase tracking-[0.18em] text-gray-500">Judul</p>
                                    <p className="mt-1 text-sm font-semibold text-gray-900">{data.title || 'Judul dokumen akan tampil di sini'}</p>
                                </div>
                                <div>
                                    <p className="text-[11px] uppercase tracking-[0.18em] text-gray-500">Kategori</p>
                                    <p className="mt-1 text-sm text-gray-700">{selectedCategory?.name || 'Belum dipilih'}</p>
                                </div>
                                <div>
                                    <p className="text-[11px] uppercase tracking-[0.18em] text-gray-500">Status</p>
                                    <p className="mt-1 text-sm text-gray-700">{activeStatus.label}</p>
                                </div>
                                <div>
                                    <p className="text-[11px] uppercase tracking-[0.18em] text-gray-500">Tanggal Penetapan</p>
                                    <p className="mt-1 text-sm text-gray-700">{formatReadableDate(data.establish)}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {isEdit && (
                        <Card className="border-gray-100 bg-white shadow-sm">
                            <CardContent className="p-5">
                                <h3 className="text-sm font-semibold text-gray-900">File Saat Ini</h3>
                                <p className="mt-2 text-sm text-gray-500">
                                    File lama tetap dipakai jika Anda tidak memilih file baru.
                                </p>
                                <div className="flex flex-col mt-4 rounded-2xl border border-gray-100 bg-gray-50 p-4 text-sm text-gray-700">
                                    {lawProduct?.title ? lawProduct.title + '.pdf' : 'Belum ada file tersimpan.'}
                                    <a
                                        href={route('laws.open', lawProduct.slug)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs font-medium text-[#EFA00B] hover:underline"
                                    >
                                        Lihat pratinjau
                                    </a>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
