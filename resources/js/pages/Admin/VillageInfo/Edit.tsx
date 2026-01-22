import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Eye, Target } from 'lucide-react';
import { FormEventHandler } from 'react';

interface VillageInfo {
    id: number;
    vision: string | null;
    mission: string | null;
}

interface Props {
    villageInfo: VillageInfo;
}

export default function Edit({ villageInfo }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        vision: villageInfo?.vision || '',
        mission: villageInfo?.mission || '',
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/admin/village-info');
    };

    return (
        <AdminLayout>
            <Head title="Edit Visi & Misi Desa" />

            <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
                <div className="p-6 border-b border-slate-200">
                    <div>
                        <h2 className="text-xl font-semibold text-slate-900">Visi & Misi Desa</h2>
                        <p className="text-sm text-slate-500 mt-1">Kelola visi dan misi desa yang akan ditampilkan di halaman Tentang Desa</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-8">
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
                                <p>Visi & Misi akan ditampilkan di halaman <span className="font-medium">Tentang Desa</span> dengan desain yang menarik.</p>
                                <p className="mt-1">Jika kedua field kosong, section Visi & Misi tidak akan ditampilkan di halaman public.</p>
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
