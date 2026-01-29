import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Eye, Target, User, Image, MessageSquare } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

interface VillageInfo {
    id: number;
    vision: string | null;
    mission: string | null;
    head_of_village_name: string | null;
    head_of_village_photo: string | null;
    welcome_message: string | null;
}

interface Props {
    villageInfo: VillageInfo;
}

export default function Edit({ villageInfo }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        vision: villageInfo?.vision || '',
        mission: villageInfo?.mission || '',
        head_of_village_name: villageInfo?.head_of_village_name || '',
        welcome_message: villageInfo?.welcome_message || '',
        head_of_village_photo: null as File | null,
    });

    const [photoPreview, setPhotoPreview] = useState<string | null>(villageInfo?.head_of_village_photo || null);

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/admin/village-info', {
            forceFormData: true,
        });
    };

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('head_of_village_photo', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <AdminLayout>
            <Head title="Edit Informasi Desa" />

            <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
                <div className="p-6 border-b border-slate-200">
                    <div>
                        <h2 className="text-xl font-semibold text-slate-900">Informasi Desa</h2>
                        <p className="text-sm text-slate-500 mt-1">Kelola sambutan kepala desa, visi, misi, dan identitas desa</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-8">
                    {/* Head of Village Section */}
                    <div className="bg-gradient-to-br from-emerald-50 to-white p-6 rounded-xl border border-emerald-200">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center text-white shadow-md">
                                <User className="w-5 h-5" />
                            </div>
                            <div>
                                <Label className="text-lg font-semibold text-slate-900">Kepala Desa</Label>
                                <p className="text-xs text-slate-500 mt-0.5">Informasi kepala desa yang akan ditampilkan di beranda</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {/* Name */}
                            <div>
                                <Label htmlFor="head_of_village_name" className="text-sm font-medium text-slate-700">Nama Kepala Desa</Label>
                                <Input
                                    id="head_of_village_name"
                                    value={data.head_of_village_name}
                                    onChange={(e) => setData('head_of_village_name', e.target.value)}
                                    className={`${errors.head_of_village_name ? 'border-red-500' : 'border-emerald-200'} bg-white mt-1.5`}
                                    placeholder="Contoh: SUWARNO, S.H"
                                />
                                {errors.head_of_village_name && <p className="text-sm text-red-600 mt-1">{errors.head_of_village_name}</p>}
                            </div>

                            {/* Photo */}
                            <div>
                                <Label htmlFor="head_of_village_photo" className="text-sm font-medium text-slate-700 flex items-center gap-2">
                                    <Image className="w-4 h-4" />
                                    Foto Kepala Desa
                                </Label>
                                <div className="mt-2 flex items-start gap-4">
                                    {photoPreview && (
                                        <div className="w-32 h-32">
                                            <img src={photoPreview} alt="Preview" className="w-full h-full object-contain" />
                                        </div>
                                    )}
                                    <div className="flex-1">
                                        <Input
                                            id="head_of_village_photo"
                                            type="file"
                                            accept="image/*"
                                            onChange={handlePhotoChange}
                                            className="bg-white border-emerald-200"
                                        />
                                        <p className="text-xs text-slate-500 mt-1">💡 Upload foto dengan format JPG/PNG. Jika kosong, akan menggunakan foto default.</p>
                                    </div>
                                </div>
                                {errors.head_of_village_photo && <p className="text-sm text-red-600 mt-1">{errors.head_of_village_photo}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Welcome Message Section */}
                    <div className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-xl border border-purple-200">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center text-white shadow-md">
                                <MessageSquare className="w-5 h-5" />
                            </div>
                            <div>
                                <Label htmlFor="welcome_message" className="text-lg font-semibold text-slate-900">Pesan Sambutan</Label>
                                <p className="text-xs text-slate-500 mt-0.5">Pesan sambutan dari kepala desa yang ditampilkan di beranda</p>
                            </div>
                        </div>
                        <Textarea
                            id="welcome_message"
                            value={data.welcome_message}
                            onChange={(e) => setData('welcome_message', e.target.value)}
                            className={`${errors.welcome_message ? 'border-red-500' : 'border-purple-200'} min-h-[100px] bg-white`}
                            placeholder="Selamat datang di Website Resmi Desa Sodong Basari..."
                        />
                        {errors.welcome_message && <p className="text-sm text-red-600 mt-2">{errors.welcome_message}</p>}
                    </div>
                    {/* Visi Section */}
                    <div className="bg-gradient-to-br from-orange-50 to-white p-6 rounded-xl border border-orange-200">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-[#EFA00B] rounded-lg flex items-center justify-center text-white shadow-md">
                                <Eye className="w-5 h-5" />
                            </div>
                            <div>
                                <Label htmlFor="vision" className="text-lg font-semibold text-slate-900">Visi Desa</Label>
                                <p className="text-xs text-slate-500 mt-0.5">Pernyataan cita-cita atau tujuan jangka panjang desa</p>
                            </div>
                        </div>
                        <Textarea
                            id="vision"
                            value={data.vision}
                            onChange={(e) => setData('vision', e.target.value)}
                            className={`${errors.vision ? 'border-red-500' : 'border-orange-200'} min-h-[120px] bg-white`}
                            placeholder="Contoh: Terwujudnya Desa Sodong Basari yang Maju, Sejahtera, dan Berbudaya pada Tahun 2030"
                        />
                        {errors.vision && <p className="text-sm text-red-600 mt-2">{errors.vision}</p>}
                        <p className="text-xs text-slate-500 mt-2">💡 Visi harus jelas, menginspirasi, dan mudah dipahami</p>
                    </div>

                    {/* Misi Section */}
                    <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl border border-blue-200">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white shadow-md">
                                <Target className="w-5 h-5" />
                            </div>
                            <div>
                                <Label htmlFor="mission" className="text-lg font-semibold text-slate-900">Misi Desa</Label>
                                <p className="text-xs text-slate-500 mt-0.5">Langkah-langkah strategis untuk mencapai visi (pisahkan dengan enter untuk setiap misi)</p>
                            </div>
                        </div>
                        <Textarea
                            id="mission"
                            value={data.mission}
                            onChange={(e) => setData('mission', e.target.value)}
                            className={`${errors.mission ? 'border-red-500' : 'border-blue-200'} min-h-[200px] bg-white font-mono text-sm`}
                            placeholder="Contoh:&#10;Meningkatkan kualitas pendidikan dan kesehatan masyarakat&#10;Mengembangkan infrastruktur desa yang berkelanjutan&#10;Memberdayakan ekonomi masyarakat melalui UMKM&#10;Melestarikan nilai-nilai budaya dan kearifan lokal&#10;Meningkatkan tata kelola pemerintahan yang transparan"
                        />
                        {errors.mission && <p className="text-sm text-red-600 mt-2">{errors.mission}</p>}
                        <p className="text-xs text-slate-500 mt-2">💡 Setiap baris akan ditampilkan sebagai poin misi terpisah dengan penomoran otomatis</p>
                    </div>

                    {/* Preview Info */}
                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                        <div className="flex items-start gap-3">
                            <svg className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div className="text-sm text-slate-600">
                                <p className="font-medium text-slate-900 mb-1">Info Tampilan</p>
                                <p>• <span className="font-medium">Info Kepala Desa</span> & Pesan Sambutan ditampilkan di <span className="font-medium">Beranda</span></p>
                                <p className="mt-1">• <span className="font-medium">Visi & Misi</span> ditampilkan di halaman <span className="font-medium">Tentang Desa</span></p>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-6 border-t border-slate-200">
                        <Button
                            type="submit"
                            disabled={processing}
                            className="bg-orange-500 hover:bg-orange-600 text-white px-8"
                        >
                            {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                        </Button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
