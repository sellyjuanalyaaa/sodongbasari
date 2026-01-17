
import React from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, ArrowLeft, Users } from "lucide-react";

interface DemographicFormProps {
    demographic?: any;
}

export default function Form({ demographic }: DemographicFormProps) {
    const isEdit = !!demographic;
    const { data, setData, post, put, processing, errors } = useForm({
        year: demographic?.year || new Date().getFullYear(),
        total_male: demographic?.total_male || 0,
        total_female: demographic?.total_female || 0,
        total_families: demographic?.total_families || 0,
        mutation_in: demographic?.mutation_in || 0,
        mutation_out: demographic?.mutation_out || 0,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEdit) {
            put(route('admin.demographics.update', demographic.id));
        } else {
            post(route('admin.demographics.store'));
        }
    };

    return (
        <AdminLayout title={isEdit ? "Edit Demografi" : "Input Demografi"}>
            <Head title={isEdit ? "Edit Demografi" : "Input Demografi"} />

            <div className="flex items-center gap-4 mb-8">
                <Link href={route('admin.demographics.index')}>
                    <Button variant="outline" size="icon" className="border-gray-200 hover:bg-gray-100">
                        <ArrowLeft className="h-4 w-4 text-gray-600" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{isEdit ? "Edit Data Kependudukan" : "Input Data Kependudukan"}</h1>
                    <p className="text-gray-500 mt-1">{isEdit ? `Perbarui data tahun ${demographic.year}` : "Isi form untuk menambah data demografi baru."}</p>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card className="md:col-span-1 bg-white border-gray-100 shadow-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-gray-800">
                            <Users className="h-5 w-5 text-gray-500" /> Data Utama
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="year" className="text-gray-900 font-semibold">Tahun Data</Label>
                                <Input
                                    id="year"
                                    type="number"
                                    min="2000"
                                    max="2030"
                                    value={data.year}
                                    onChange={e => setData('year', parseInt(e.target.value))}
                                    required
                                    className="border-gray-200 focus:border-orange-500 focus:ring-orange-200"
                                />
                                {errors.year && <p className="text-sm text-red-500">{errors.year}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="total_male" className="text-gray-900 font-semibold">Laki-laki (Jiwa)</Label>
                                    <Input
                                        id="total_male"
                                        type="number"
                                        min="0"
                                        value={data.total_male}
                                        onChange={e => setData('total_male', parseInt(e.target.value))}
                                        required
                                        className="border-gray-200 focus:ring-orange-200"
                                    />
                                    {errors.total_male && <p className="text-sm text-red-500">{errors.total_male}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="total_female" className="text-gray-900 font-semibold">Perempuan (Jiwa)</Label>
                                    <Input
                                        id="total_female"
                                        type="number"
                                        min="0"
                                        value={data.total_female}
                                        onChange={e => setData('total_female', parseInt(e.target.value))}
                                        required
                                        className="border-gray-200 focus:ring-orange-200"
                                    />
                                    {errors.total_female && <p className="text-sm text-red-500">{errors.total_female}</p>}
                                </div>
                            </div>

                            <div className="p-4 bg-gray-50 rounded-lg flex justify-between items-center border border-gray-100">
                                <span className="text-sm font-medium text-gray-600">Total Penduduk:</span>
                                <span className="text-xl font-bold text-orange-600">{(data.total_male + data.total_female).toLocaleString()} Jiwa</span>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="total_families" className="text-gray-700">Jumlah Kepala Keluarga (KK)</Label>
                                <Input
                                    id="total_families"
                                    type="number"
                                    min="0"
                                    value={data.total_families}
                                    onChange={e => setData('total_families', parseInt(e.target.value))}
                                    required
                                    className="border-gray-200 focus:ring-orange-200"
                                />
                                {errors.total_families && <p className="text-sm text-red-500">{errors.total_families}</p>}
                            </div>

                            <div className="border-t border-gray-100 pt-4 mt-4">
                                <h4 className="text-sm font-semibold mb-3 text-gray-700">Mutasi Penduduk (Opsional)</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="mutation_in" className="text-gray-600">Masuk</Label>
                                        <Input
                                            id="mutation_in"
                                            type="number"
                                            min="0"
                                            value={data.mutation_in}
                                            onChange={e => setData('mutation_in', parseInt(e.target.value))}
                                            className="border-gray-200 focus:ring-orange-200"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="mutation_out" className="text-gray-600">Keluar/Pindah</Label>
                                        <Input
                                            id="mutation_out"
                                            type="number"
                                            min="0"
                                            value={data.mutation_out}
                                            onChange={e => setData('mutation_out', parseInt(e.target.value))}
                                            className="border-gray-200 focus:ring-orange-200"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end gap-4 pt-6">
                                <Link href={route('admin.demographics.index')}>
                                    <Button variant="outline" type="button" className="border-gray-200">Batal</Button>
                                </Link>
                                <Button type="submit" disabled={processing} className="bg-orange-600 hover:bg-orange-700 text-white w-full">
                                    {processing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                    {isEdit ? 'Update Data' : 'Simpan Data'}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Info Card */}
                <Card className="h-fit bg-white border-gray-100 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base text-gray-800">Informasi Penginputan</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-gray-500 space-y-4">
                        <p>
                            Pastikan data yang diinput sesuai dengan data rekapitulasi desa akhir tahun bersangkutan.
                        </p>
                        <ul className="list-disc pl-4 space-y-1">
                            <li>Data <strong>Tahun</strong> harus unik (tidak boleh ada 2 data untuk tahun yang sama).</li>
                            <li>Total Penduduk dihitung otomatis dari Laki-laki + Perempuan.</li>
                            <li>Data Mutasi bersifat opsional untuk catatan.</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
