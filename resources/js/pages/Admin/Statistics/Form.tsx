import React, { useState } from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Upload, X } from "lucide-react";

interface StatisticFormData {
    year: string;
    infographic_image: File | null;
    infographic_image_right: File | null;
    total_population: string;
    male_population: string;
    female_population: string;
    total_families: string;
    total_rt: string;
    total_rw: string;
    total_dusun: string;
    tidak_sekolah: string;
    sd_sederajat: string;
    smp_sederajat: string;
    sma_sederajat: string;
    diploma: string;
    sarjana: string;
    petani: string;
    pedagang: string;
    pns: string;
    wiraswasta: string;
    lainnya: string;
    islam: string;
    kristen: string;
    katolik: string;
    hindu: string;
    budha: string;
    // Tempat Ibadah
    masjid: string;
    mushola: string;
    gereja: string;
    pura: string;
    vihara: string;
    // Fasilitas Kesehatan
    puskesmas: string;
    posyandu: string;
    klinik: string;
    // Fasilitas Olahraga
    lapangan_sepakbola: string;
    lapangan_voli: string;
    lapangan_badminton: string;
    gor: string;
    // Wisata
    pantai: string;
    taman: string;
    cagar_budaya: string;
    wisata_alam: string;
    // Migrasi Penduduk
    penduduk_datang: string;
    penduduk_keluar: string;
}

interface Props {
    statistic?: any;
}

export default function Form({ statistic }: Props) {
    const [formData, setFormData] = useState<StatisticFormData>({
        year: statistic?.year || '',
        infographic_image: null,
        infographic_image_right: null,
        total_population: statistic?.total_population || '',
        male_population: statistic?.male_population || '',
        female_population: statistic?.female_population || '',
        total_families: statistic?.total_families || '',
        total_rt: statistic?.total_rt || '',
        total_rw: statistic?.total_rw || '',
        total_dusun: statistic?.total_dusun || '',
        tidak_sekolah: statistic?.tidak_sekolah || '',
        sd_sederajat: statistic?.sd_sederajat || '',
        smp_sederajat: statistic?.smp_sederajat || '',
        sma_sederajat: statistic?.sma_sederajat || '',
        diploma: statistic?.diploma || '',
        sarjana: statistic?.sarjana || '',
        petani: statistic?.petani || '',
        pedagang: statistic?.pedagang || '',
        pns: statistic?.pns || '',
        wiraswasta: statistic?.wiraswasta || '',
        lainnya: statistic?.lainnya || '',
        islam: statistic?.islam || '',
        kristen: statistic?.kristen || '',
        katolik: statistic?.katolik || '',
        hindu: statistic?.hindu || '',
        budha: statistic?.budha || '',
        // Tempat Ibadah
        masjid: statistic?.masjid || '',
        mushola: statistic?.mushola || '',
        gereja: statistic?.gereja || '',
        pura: statistic?.pura || '',
        vihara: statistic?.vihara || '',
        // Fasilitas Kesehatan
        puskesmas: statistic?.puskesmas || '',
        posyandu: statistic?.posyandu || '',
        klinik: statistic?.klinik || '',
        // Fasilitas Olahraga
        lapangan_sepakbola: statistic?.lapangan_sepakbola || '',
        lapangan_voli: statistic?.lapangan_voli || '',
        lapangan_badminton: statistic?.lapangan_badminton || '',
        gor: statistic?.gor || '',
        // Wisata
        pantai: statistic?.pantai || '',
        taman: statistic?.taman || '',
        cagar_budaya: statistic?.cagar_budaya || '',
        wisata_alam: statistic?.wisata_alam || '',
        // Migrasi Penduduk
        penduduk_datang: statistic?.penduduk_datang || '',
        penduduk_keluar: statistic?.penduduk_keluar || '',
    });

    const [imagePreview, setImagePreview] = useState<string | null>(
        statistic?.infographic_image || null
    );

    const [imagePreviewRight, setImagePreviewRight] = useState<string | null>(
        statistic?.infographic_image_right || null
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, files } = e.target;

        if (type === 'file' && files && files[0]) {
            const file = files[0];
            setFormData(prev => ({ ...prev, [name]: file }));
            
            if (name === 'infographic_image') {
                setImagePreview(URL.createObjectURL(file));
            } else if (name === 'infographic_image_right') {
                setImagePreviewRight(URL.createObjectURL(file));
            }
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const removeImage = () => {
        setFormData(prev => ({ ...prev, infographic_image: null }));
        setImagePreview(null);
    };

    const removeImageRight = () => {
        setFormData(prev => ({ ...prev, infographic_image_right: null }));
        setImagePreviewRight(null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const submitData = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (value !== null && value !== '') {
                submitData.append(key, value as string | Blob);
            }
        });

        if (statistic) {
            submitData.append('_method', 'PUT');
            router.post(route('admin.statistics.update', statistic.id), submitData);
        } else {
            router.post(route('admin.statistics.store'), submitData);
        }
    };

    return (
        <AdminLayout title={statistic ? 'Edit Statistik' : 'Tambah Statistik'}>
            <Head title={statistic ? 'Edit Statistik' : 'Tambah Statistik'} />

            <div className="mb-8">
                <Link href={route('admin.statistics.index')}>
                    <Button variant="outline" size="sm" className="mb-4">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Kembali
                    </Button>
                </Link>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                    {statistic ? 'Edit Statistik Desa' : 'Tambah Statistik Desa'}
                </h1>
                <p className="text-gray-500 mt-1">
                    {statistic ? 'Perbarui data statistik desa.' : 'Masukkan data statistik desa baru.'}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Informasi Umum */}
                <div className="rounded-lg border border-gray-100 bg-white shadow-sm p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Informasi Umum</h2>
                    <div className="grid grid-cols-1 gap-6">
                        <div>
                            <Label htmlFor="year" className="text-gray-900 font-semibold">Tahun *</Label>
                            <Input
                                id="year"
                                name="year"
                                type="number"
                                required
                                value={formData.year}
                                onChange={handleChange}
                                placeholder="2026"
                                className="mt-1"
                            />
                        </div>

                        <div>
                            <Label htmlFor="infographic_image" className="text-gray-900 font-semibold">Infografis Anggaran (Kiri)</Label>
                            <div className="mt-1">
                                {imagePreview ? (
                                    <div className="relative border border-gray-200 rounded-lg p-4">
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="sm"
                                            className="absolute top-2 right-2"
                                            onClick={removeImage}
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                        <img src={imagePreview} alt="Preview" className="max-h-96 mx-auto rounded" />
                                    </div>
                                ) : (
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                        <div className="mt-2">
                                            <Label htmlFor="infographic_image" className="cursor-pointer text-orange-600 hover:text-orange-700">
                                                Upload gambar
                                            </Label>
                                            <Input
                                                id="infographic_image"
                                                name="infographic_image"
                                                type="file"
                                                accept="image/*"
                                                onChange={handleChange}
                                                className="hidden"
                                            />
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">PNG, JPG maksimal 5MB</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="infographic_image_right" className="text-gray-900 font-semibold">Infografis Anggaran (Kanan)</Label>
                            <div className="mt-1">
                                {imagePreviewRight ? (
                                    <div className="relative border border-gray-200 rounded-lg p-4">
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="sm"
                                            className="absolute top-2 right-2"
                                            onClick={removeImageRight}
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                        <img src={imagePreviewRight} alt="Preview" className="max-h-96 mx-auto rounded" />
                                    </div>
                                ) : (
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                        <div className="mt-2">
                                            <Label htmlFor="infographic_image_right" className="cursor-pointer text-orange-600 hover:text-orange-700">
                                                Upload gambar
                                            </Label>
                                            <Input
                                                id="infographic_image_right"
                                                name="infographic_image_right"
                                                type="file"
                                                accept="image/*"
                                                onChange={handleChange}
                                                className="hidden"
                                            />
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">PNG, JPG maksimal 5MB</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Data Penduduk */}
                <div className="rounded-lg border border-gray-100 bg-white shadow-sm p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Data Penduduk</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <Label htmlFor="total_population" className="text-gray-900 font-semibold">Total Penduduk *</Label>
                            <Input id="total_population" name="total_population" type="number" required value={formData.total_population} onChange={handleChange} className="mt-1" />
                        </div>
                        <div>
                            <Label htmlFor="total_families" className="text-gray-900 font-semibold">Total Kepala Keluarga *</Label>
                            <Input id="total_families" name="total_families" type="number" required value={formData.total_families} onChange={handleChange} className="mt-1" />
                        </div>
                        <div>
                            <Label htmlFor="male_population" className="text-gray-900 font-semibold">Penduduk Laki-laki *</Label>
                            <Input id="male_population" name="male_population" type="number" required value={formData.male_population} onChange={handleChange} className="mt-1" />
                        </div>
                        <div>
                            <Label htmlFor="female_population" className="text-gray-900 font-semibold">Penduduk Perempuan *</Label>
                            <Input id="female_population" name="female_population" type="number" required value={formData.female_population} onChange={handleChange} className="mt-1" />
                        </div>
                        <div>
                            <Label htmlFor="total_rt" className="text-gray-900 font-semibold">Total RT *</Label>
                            <Input id="total_rt" name="total_rt" type="number" required value={formData.total_rt} onChange={handleChange} className="mt-1" />
                        </div>
                        <div>
                            <Label htmlFor="total_rw" className="text-gray-900 font-semibold">Total RW *</Label>
                            <Input id="total_rw" name="total_rw" type="number" required value={formData.total_rw} onChange={handleChange} className="mt-1" />
                        </div>
                        <div>
                            <Label htmlFor="total_dusun" className="text-gray-900 font-semibold">Total Dusun *</Label>
                            <Input id="total_dusun" name="total_dusun" type="number" required value={formData.total_dusun} onChange={handleChange} className="mt-1" />
                        </div>
                    </div>
                </div>

                {/* Pendidikan */}
                <div className="rounded-lg border border-gray-100 bg-white shadow-sm p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Data Pendidikan</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <Label htmlFor="tidak_sekolah" className="text-gray-900 font-semibold">Tidak Sekolah *</Label>
                            <Input id="tidak_sekolah" name="tidak_sekolah" type="number" required value={formData.tidak_sekolah} onChange={handleChange} className="mt-1" />
                        </div>
                        <div>
                            <Label htmlFor="sd_sederajat" className="text-gray-900 font-semibold">SD/Sederajat *</Label>
                            <Input id="sd_sederajat" name="sd_sederajat" type="number" required value={formData.sd_sederajat} onChange={handleChange} className="mt-1" />
                        </div>
                        <div>
                            <Label htmlFor="smp_sederajat" className="text-gray-900 font-semibold">SMP/Sederajat *</Label>
                            <Input id="smp_sederajat" name="smp_sederajat" type="number" required value={formData.smp_sederajat} onChange={handleChange} className="mt-1" />
                        </div>
                        <div>
                            <Label htmlFor="sma_sederajat" className="text-gray-900 font-semibold">SMA/Sederajat *</Label>
                            <Input id="sma_sederajat" name="sma_sederajat" type="number" required value={formData.sma_sederajat} onChange={handleChange} className="mt-1" />
                        </div>
                        <div>
                            <Label htmlFor="diploma" className="text-gray-900 font-semibold">Diploma *</Label>
                            <Input id="diploma" name="diploma" type="number" required value={formData.diploma} onChange={handleChange} className="mt-1" />
                        </div>
                        <div>
                            <Label htmlFor="sarjana" className="text-gray-900 font-semibold">Sarjana *</Label>
                            <Input id="sarjana" name="sarjana" type="number" required value={formData.sarjana} onChange={handleChange} className="mt-1" />
                        </div>
                    </div>
                </div>

                {/* Pekerjaan */}
                <div className="rounded-lg border border-gray-100 bg-white shadow-sm p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Data Pekerjaan</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <Label htmlFor="petani" className="text-gray-900 font-semibold">Petani *</Label>
                            <Input id="petani" name="petani" type="number" required value={formData.petani} onChange={handleChange} className="mt-1" />
                        </div>
                        <div>
                            <Label htmlFor="pedagang" className="text-gray-900 font-semibold">Pedagang *</Label>
                            <Input id="pedagang" name="pedagang" type="number" required value={formData.pedagang} onChange={handleChange} className="mt-1" />
                        </div>
                        <div>
                            <Label htmlFor="pns" className="text-gray-900 font-semibold">PNS *</Label>
                            <Input id="pns" name="pns" type="number" required value={formData.pns} onChange={handleChange} className="mt-1" />
                        </div>
                        <div>
                            <Label htmlFor="wiraswasta" className="text-gray-900 font-semibold">Wiraswasta *</Label>
                            <Input id="wiraswasta" name="wiraswasta" type="number" required value={formData.wiraswasta} onChange={handleChange} className="mt-1" />
                        </div>
                        <div>
                            <Label htmlFor="lainnya" className="text-gray-900 font-semibold">Lainnya *</Label>
                            <Input id="lainnya" name="lainnya" type="number" required value={formData.lainnya} onChange={handleChange} className="mt-1" />
                        </div>
                    </div>
                </div>

                {/* Agama */}
                <div className="rounded-lg border border-gray-100 bg-white shadow-sm p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Data Agama</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <Label htmlFor="islam" className="text-gray-900 font-semibold">Islam *</Label>
                            <Input id="islam" name="islam" type="number" required value={formData.islam} onChange={handleChange} className="mt-1" />
                        </div>
                        <div>
                            <Label htmlFor="kristen" className="text-gray-900 font-semibold">Kristen *</Label>
                            <Input id="kristen" name="kristen" type="number" required value={formData.kristen} onChange={handleChange} className="mt-1" />
                        </div>
                        <div>
                            <Label htmlFor="katolik" className="text-gray-900 font-semibold">Katolik *</Label>
                            <Input id="katolik" name="katolik" type="number" required value={formData.katolik} onChange={handleChange} className="mt-1" />
                        </div>
                        <div>
                            <Label htmlFor="hindu" className="text-gray-900 font-semibold">Hindu *</Label>
                            <Input id="hindu" name="hindu" type="number" required value={formData.hindu} onChange={handleChange} className="mt-1" />
                        </div>
                        <div>
                            <Label htmlFor="budha" className="text-gray-900 font-semibold">Budha *</Label>
                            <Input id="budha" name="budha" type="number" required value={formData.budha} onChange={handleChange} className="mt-1" />
                        </div>
                    </div>
                </div>

                {/* Tempat Ibadah */}
                <div className="rounded-lg border border-gray-100 bg-white shadow-sm p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Tempat Ibadah</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <Label htmlFor="masjid" className="text-gray-900 font-semibold">Masjid *</Label>
                            <Input id="masjid" name="masjid" type="number" required value={formData.masjid} onChange={handleChange} className="mt-1" />
                        </div>
                        <div>
                            <Label htmlFor="mushola" className="text-gray-900 font-semibold">Mushola *</Label>
                            <Input id="mushola" name="mushola" type="number" required value={formData.mushola} onChange={handleChange} className="mt-1" />
                        </div>
                        <div>
                            <Label htmlFor="gereja" className="text-gray-900 font-semibold">Gereja *</Label>
                            <Input id="gereja" name="gereja" type="number" required value={formData.gereja} onChange={handleChange} className="mt-1" />
                        </div>
                        <div>
                            <Label htmlFor="pura" className="text-gray-900 font-semibold">Pura *</Label>
                            <Input id="pura" name="pura" type="number" required value={formData.pura} onChange={handleChange} className="mt-1" />
                        </div>
                        <div>
                            <Label htmlFor="vihara" className="text-gray-900 font-semibold">Vihara *</Label>
                            <Input id="vihara" name="vihara" type="number" required value={formData.vihara} onChange={handleChange} className="mt-1" />
                        </div>
                    </div>
                </div>

                {/* Fasilitas Kesehatan */}
                <div className="rounded-lg border border-gray-100 bg-white shadow-sm p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Fasilitas Kesehatan</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <Label htmlFor="puskesmas" className="text-gray-900 font-semibold">Puskesmas *</Label>
                            <Input id="puskesmas" name="puskesmas" type="number" required value={formData.puskesmas} onChange={handleChange} className="mt-1" />
                        </div>
                        <div>
                            <Label htmlFor="posyandu" className="text-gray-900 font-semibold">Posyandu *</Label>
                            <Input id="posyandu" name="posyandu" type="number" required value={formData.posyandu} onChange={handleChange} className="mt-1" />
                        </div>
                        <div>
                            <Label htmlFor="klinik" className="text-gray-900 font-semibold">Klinik *</Label>
                            <Input id="klinik" name="klinik" type="number" required value={formData.klinik} onChange={handleChange} className="mt-1" />
                        </div>
                    </div>
                </div>

                {/* Fasilitas Olahraga */}
                <div className="rounded-lg border border-gray-100 bg-white shadow-sm p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Fasilitas Olahraga</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <Label htmlFor="lapangan_sepakbola" className="text-gray-900 font-semibold">Lapangan Sepakbola *</Label>
                            <Input id="lapangan_sepakbola" name="lapangan_sepakbola" type="number" required value={formData.lapangan_sepakbola} onChange={handleChange} className="mt-1" />
                        </div>
                        <div>
                            <Label htmlFor="lapangan_voli" className="text-gray-900 font-semibold">Lapangan Voli *</Label>
                            <Input id="lapangan_voli" name="lapangan_voli" type="number" required value={formData.lapangan_voli} onChange={handleChange} className="mt-1" />
                        </div>
                        <div>
                            <Label htmlFor="lapangan_badminton" className="text-gray-900 font-semibold">Lapangan Badminton *</Label>
                            <Input id="lapangan_badminton" name="lapangan_badminton" type="number" required value={formData.lapangan_badminton} onChange={handleChange} className="mt-1" />
                        </div>
                        <div>
                            <Label htmlFor="gor" className="text-gray-900 font-semibold">GOR (Gedung Olahraga) *</Label>
                            <Input id="gor" name="gor" type="number" required value={formData.gor} onChange={handleChange} className="mt-1" />
                        </div>
                    </div>
                </div>

                {/* Wisata */}
                <div className="rounded-lg border border-gray-100 bg-white shadow-sm p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Fasilitas Wisata</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <Label htmlFor="pantai" className="text-gray-900 font-semibold">Pantai *</Label>
                            <Input id="pantai" name="pantai" type="number" required value={formData.pantai} onChange={handleChange} className="mt-1" />
                        </div>
                        <div>
                            <Label htmlFor="taman" className="text-gray-900 font-semibold">Taman *</Label>
                            <Input id="taman" name="taman" type="number" required value={formData.taman} onChange={handleChange} className="mt-1" />
                        </div>
                        <div>
                            <Label htmlFor="cagar_budaya" className="text-gray-900 font-semibold">Cagar Budaya *</Label>
                            <Input id="cagar_budaya" name="cagar_budaya" type="number" required value={formData.cagar_budaya} onChange={handleChange} className="mt-1" />
                        </div>
                        <div>
                            <Label htmlFor="wisata_alam" className="text-gray-900 font-semibold">Wisata Alam *</Label>
                            <Input id="wisata_alam" name="wisata_alam" type="number" required value={formData.wisata_alam} onChange={handleChange} className="mt-1" />
                        </div>
                    </div>
                </div>

                {/* Migrasi Penduduk */}
                <div className="rounded-lg border border-gray-100 bg-white shadow-sm p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Data Migrasi Penduduk</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <Label htmlFor="penduduk_datang" className="text-gray-900 font-semibold">Penduduk Datang *</Label>
                            <Input id="penduduk_datang" name="penduduk_datang" type="number" required value={formData.penduduk_datang} onChange={handleChange} className="mt-1" />
                        </div>
                        <div>
                            <Label htmlFor="penduduk_keluar" className="text-gray-900 font-semibold">Penduduk Keluar *</Label>
                            <Input id="penduduk_keluar" name="penduduk_keluar" type="number" required value={formData.penduduk_keluar} onChange={handleChange} className="mt-1" />
                        </div>
                    </div>
                </div>

                {/* Submit */}
                <div className="flex justify-end gap-3">
                    <Link href={route('admin.statistics.index')}>
                        <Button type="button" variant="outline">Batal</Button>
                    </Link>
                    <Button type="submit" className="bg-orange-600 hover:bg-orange-700">
                        {statistic ? 'Perbarui' : 'Simpan'}
                    </Button>
                </div>
            </form>
        </AdminLayout>
    );
}
