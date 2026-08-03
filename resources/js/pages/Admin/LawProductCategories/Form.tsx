import React from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { icons } from '@/lib/icons';
import InputError from '@/components/input-error';

interface Category {
    id: number;
    name: string;
    description: string | null;
    icon: string;
    color: string;
}

interface Props {
    category?: Category;
}

export default function Form({ category }: Props) {
    const isEdit = !!category;

    const { data, setData, post, put, processing, errors } = useForm({
        name: category?.name || '',
        description: category?.description || '',
        icon: category?.icon || 'ScrollText',
        color: category?.color || 'from-amber-500 to-orange-500',
    });

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (isEdit) {
            put(route('admin.law-product-categories.update', category.id));
            return;
        }

        post(route('admin.law-product-categories.store'));
    };

    const SelectedIcon = icons[data.icon as keyof typeof icons];

    return (
        <AdminLayout title={isEdit ? 'Edit Kategori Produk Hukum' : 'Tambah Kategori Produk Hukum'}>
            <Head title={isEdit ? 'Edit Kategori Produk Hukum' : 'Tambah Kategori Produk Hukum'} />

            <div className="mb-8 flex items-center gap-4">
                <Link href={route('admin.law-product-categories.index')}>
                    <Button variant="outline" size="icon" className="border-gray-200 bg-white hover:bg-gray-50">
                        <ArrowLeft className="h-4 w-4 text-gray-600" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                        {isEdit ? 'Edit Kategori Produk Hukum' : 'Tambah Kategori Produk Hukum'}
                    </h1>
                    <p className="mt-1 text-gray-500">
                        {isEdit ? `Perbarui kategori: ${category.name}` : 'Tambahkan kategori yang akan dipakai pada dokumen produk hukum.'}
                    </p>
                </div>
            </div>

            <div className="grid gap-6 xl:grid-cols-[1.6fr_0.9fr]">
                <Card className="border-gray-100 bg-white shadow-sm">
                    <CardContent className="p-0">
                        <form onSubmit={handleSubmit} className="space-y-6 p-6">
                            <div className="grid gap-5 lg:grid-cols-2">
                                <div className="space-y-2 lg:col-span-2">
                                    <Label htmlFor="name" className="text-sm font-semibold text-gray-900">
                                        Nama Kategori
                                    </Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Contoh: Peraturan Desa"
                                        className="border-gray-200 focus:border-orange-500 focus:ring-orange-200"
                                    />
                                    <InputError message={errors.name} />
                                </div>

                                <div className="space-y-2 lg:col-span-2">
                                    <Label htmlFor="description" className="text-sm font-semibold text-gray-900">
                                        Deskripsi Kategori
                                    </Label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        className="min-h-40 border-gray-200 focus:border-orange-500 focus:ring-orange-200"
                                        placeholder="Jelaskan penggunaan kategori ini pada produk hukum desa..."
                                    />
                                    <InputError message={errors.description} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="icon" className="text-sm font-semibold text-gray-900">
                                        Ikon Kategori
                                    </Label>
                                    <Select value={data.icon} onValueChange={(value) => setData('icon', value)}>
                                        <SelectTrigger className="h-11 border-gray-200 bg-white focus:ring-orange-200 cursor-pointer">
                                            <SelectValue placeholder="Pilih ikon">
                                                {data.icon && icons[data.icon] && (
                                                    <span className="flex items-center gap-2">
                                                        {React.createElement(icons[data.icon], { className: 'h-4 w-4 text-gray-700' })}
                                                        <span className="font-medium text-gray-900">{data.icon}</span>
                                                    </span>
                                                )}
                                            </SelectValue>
                                        </SelectTrigger>
                                        <SelectContent className="bg-white">
                                            <div className="grid grid-cols-6 gap-1 p-1">
                                                {Object.entries(icons).map(([name, Icon]) => (
                                                    <SelectItem
                                                        key={name}
                                                        value={name}
                                                        className="flex size-9 items-center justify-center rounded-md p-0 [&>span:first-child]:hidden cursor-pointer data-[state=checked]:bg-orange-50 data-[state=checked]:text-[#EFA00B]"
                                                    >
                                                        <Icon className="h-4 w-4" />
                                                        <span className="sr-only">{name}</span>
                                                    </SelectItem>
                                                ))}
                                            </div>
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.icon} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="color" className="text-sm font-semibold text-gray-900">
                                        Warna Badge
                                    </Label>
                                    <div className="flex items-center gap-4">
                                        <Input
                                            id="color"
                                            type="color"
                                            value={data.color}
                                            onChange={(e) => setData('color', e.target.value)}
                                            className="w-24 h-10 cursor-pointer"
                                        />
                                        <Input
                                            type="text"
                                            value={data.color}
                                            onChange={(e) => setData('color', e.target.value)}
                                            placeholder="#EFA00B"
                                            className="font-mono text-sm flex-1"
                                            maxLength={7}
                                        />
                                    </div>
                                    <InputError message={errors.color} />
                                </div>
                            </div>

                            <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:items-center sm:justify-end">
                                <Link href={route('admin.law-product-categories.index')}>
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
                                    {isEdit ? 'Simpan Perubahan' : 'Simpan Kategori'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Right Preview */}
                <div className="space-y-6">
                    <Card className="border-gray-100 bg-white shadow-sm">
                        <CardContent className="p-5">
                            <h3 className="text-sm font-semibold text-gray-900">Preview Kategori</h3>
                            <p className="mt-1 text-xs text-gray-500">Tampilan kategori saat dipakai pada produk hukum.</p>

                            <div className='flex items-center gap-1.5 mt-4 rounded-md border px-2 py-1 shadow-sm'
                                style={{
                                    backgroundColor: `${data.color}20`,
                                    borderColor: `${data.color}70`,
                                    color: `${data.color}`,
                                }}
                            >
                                {SelectedIcon && (
                                    <SelectedIcon className="h-3 w-3" />
                                )}
                                <h4 className="text-[10px] font-semibold uppercase tracking-[0.14em]">{data.name || 'Nama Kategori'}</h4>
                            </div>

                            <div className="mt-4 space-y-3 rounded-2xl border border-gray-100 bg-gray-50/80 p-4">
                                <div>
                                    <p className="text-[11px] uppercase tracking-[0.18em] text-gray-500">Nama</p>
                                    <p className="mt-1 text-sm font-semibold text-gray-900">{data.name || '-'}</p>
                                </div>
                                <div>
                                    <p className="text-[11px] uppercase tracking-[0.18em] text-gray-500">Deskripsi</p>
                                    <p className="mt-1 text-sm leading-6 text-gray-700">{data.description || 'Belum ada deskripsi kategori.'}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AdminLayout>
    );
}
