import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft } from 'lucide-react';
import InputError from '@/components/input-error';

interface Category {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    color: string;
}

interface Props {
    category: Category | null;
}

export default function Form({ category }: Props) {
    const isEdit = !!category;
    
    const { data, setData, post, put, processing, errors } = useForm({
        name: category?.name || '',
        slug: category?.slug || '',
        description: category?.description || '',
        color: category?.color || '#EFA00B',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEdit) {
            put(route('admin.categories.update', category.id));
        } else {
            post(route('admin.categories.store'));
        }
    };

    return (
        <AdminLayout title={isEdit ? 'Edit Kategori' : 'Tambah Kategori'}>
            <Head title={isEdit ? 'Edit Kategori' : 'Tambah Kategori'} />

            <div className="p-6">
                <div className="max-w-3xl mx-auto">
                    <div className="mb-8">
                        <Link href={route('admin.categories.index')}>
                            <Button variant="ghost" className="mb-4">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Kembali
                            </Button>
                        </Link>
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                            {isEdit ? 'Edit Kategori' : 'Tambah Kategori Baru'}
                        </h1>
                        <p className="text-gray-500 mt-1">
                            {isEdit ? 'Perbarui informasi kategori.' : 'Isi form untuk membuat kategori baru.'}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border p-6 space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-gray-900 font-semibold">
                                Nama Kategori <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Masukkan nama kategori..."
                                className="w-full"
                            />
                            <InputError message={errors.name} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="slug" className="text-gray-900 font-semibold">
                                Slug <span className="text-sm text-gray-500 font-normal">(opsional, otomatis dari nama)</span>
                            </Label>
                            <Input
                                id="slug"
                                value={data.slug}
                                onChange={(e) => setData('slug', e.target.value)}
                                placeholder="slug-kategori"
                                className="w-full font-mono text-sm"
                            />
                            <InputError message={errors.slug} />
                            <p className="text-xs text-gray-500">
                                URL-friendly identifier. Biarkan kosong untuk generate otomatis.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="color" className="text-gray-900 font-semibold">
                                Warna Kategori
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
                            <p className="text-xs text-gray-500">
                                Warna akan digunakan sebagai badge kategori di berita.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description" className="text-gray-900 font-semibold">
                                Deskripsi
                            </Label>
                            <Textarea
                                id="description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                rows={4}
                                placeholder="Deskripsi singkat tentang kategori ini..."
                                className="w-full"
                            />
                            <InputError message={errors.description} />
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t">
                            <Link href={route('admin.categories.index')}>
                                <Button type="button" variant="outline">
                                    Batal
                                </Button>
                            </Link>
                            <Button 
                                type="submit" 
                                disabled={processing}
                                className="bg-orange-600 hover:bg-orange-700"
                            >
                                {processing ? 'Menyimpan...' : (isEdit ? 'Perbarui' : 'Simpan')}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
