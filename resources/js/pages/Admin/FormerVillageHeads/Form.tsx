import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft } from 'lucide-react';
import { FormEventHandler, useRef, useState } from 'react';

interface FormerVillageHead {
    id: number;
    name: string;
    photo: string | null;
    start_year: number;
    end_year: number;
    achievement: string | null;
    order: number;
}

interface Props {
    formerHead?: FormerVillageHead;
}

export default function Form({ formerHead }: Props) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(
        formerHead?.photo ? `/storage/${formerHead.photo}` : null
    );

    const { data, setData, post, processing, errors } = useForm({
        name: formerHead?.name || '',
        start_year: formerHead?.start_year || new Date().getFullYear(),
        end_year: formerHead?.end_year || new Date().getFullYear(),
        achievement: formerHead?.achievement || '',
        photo: null as File | null,
        order: formerHead?.order || 0,
        _method: formerHead ? 'PUT' : 'POST',
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('photo', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        const url = formerHead
            ? `/admin/former-village-heads/${formerHead.id}`
            : '/admin/former-village-heads';
        post(url);
    };

    return (
        <AdminLayout>
            <Head title={formerHead ? 'Edit Riwayat Kepala Desa' : 'Tambah Riwayat Kepala Desa'} />

            <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
                <div className="p-6 border-b border-slate-200">
                    <div className="flex items-center gap-3">
                        <Link href="/admin/former-village-heads">
                            <Button variant="ghost" size="sm">
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                        </Link>
                        <div>
                            <h2 className="text-xl font-semibold text-slate-900">
                                {formerHead ? 'Edit Riwayat Kepala Desa' : 'Tambah Riwayat Kepala Desa'}
                            </h2>
                            <p className="text-sm text-slate-500 mt-1">
                                {formerHead ? 'Perbarui data mantan kepala desa' : 'Tambahkan data mantan kepala desa'}
                            </p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="name">Nama Lengkap *</Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className={errors.name ? 'border-red-500' : ''}
                                placeholder="Masukkan nama lengkap"
                            />
                            {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="order">Urutan</Label>
                            <Input
                                id="order"
                                type="number"
                                value={data.order}
                                onChange={(e) => setData('order', parseInt(e.target.value) || 0)}
                                className={errors.order ? 'border-red-500' : ''}
                                placeholder="0"
                            />
                            {errors.order && <p className="text-sm text-red-600">{errors.order}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="start_year">Tahun Mulai *</Label>
                            <Input
                                id="start_year"
                                type="number"
                                value={data.start_year}
                                onChange={(e) => setData('start_year', parseInt(e.target.value) || new Date().getFullYear())}
                                className={errors.start_year ? 'border-red-500' : ''}
                                min="1900"
                                max={new Date().getFullYear()}
                            />
                            {errors.start_year && <p className="text-sm text-red-600">{errors.start_year}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="end_year">Tahun Selesai *</Label>
                            <Input
                                id="end_year"
                                type="number"
                                value={data.end_year}
                                onChange={(e) => setData('end_year', parseInt(e.target.value) || new Date().getFullYear())}
                                className={errors.end_year ? 'border-red-500' : ''}
                                min="1900"
                                max={new Date().getFullYear()}
                            />
                            {errors.end_year && <p className="text-sm text-red-600">{errors.end_year}</p>}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="achievement">Prestasi / Pencapaian</Label>
                        <Textarea
                            id="achievement"
                            value={data.achievement}
                            onChange={(e) => setData('achievement', e.target.value)}
                            className={errors.achievement ? 'border-red-500' : ''}
                            placeholder="Deskripsikan prestasi atau pencapaian selama menjabat"
                            rows={4}
                        />
                        {errors.achievement && <p className="text-sm text-red-600">{errors.achievement}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="photo">Foto</Label>
                        <div className="flex items-start gap-4">
                            {preview && (
                                <div className="flex-shrink-0">
                                    <img
                                        src={preview}
                                        alt="Preview"
                                        className="w-24 h-24 rounded-full object-cover border-2 border-slate-200"
                                    />
                                </div>
                            )}
                            <div className="flex-1">
                                <Input
                                    ref={fileInputRef}
                                    id="photo"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className={errors.photo ? 'border-red-500' : ''}
                                />
                                {errors.photo && <p className="text-sm text-red-600 mt-1">{errors.photo}</p>}
                                <p className="text-sm text-slate-500 mt-1">Format: JPG, PNG (Max: 2MB)</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-6 border-t border-slate-200">
                        <Link href="/admin/former-village-heads">
                            <Button type="button" variant="outline">
                                Batal
                            </Button>
                        </Link>
                        <Button
                            type="submit"
                            disabled={processing}
                            className="bg-orange-500 hover:bg-orange-600 text-white"
                        >
                            {processing ? 'Menyimpan...' : 'Simpan'}
                        </Button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
