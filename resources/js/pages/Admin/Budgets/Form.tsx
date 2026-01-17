
import React from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Loader2 } from "lucide-react";

export default function BudgetForm({ budget }: { budget?: any }) {
    const isEdit = !!budget;

    const { data, setData, post, put, processing, errors } = useForm({
        year: budget?.year || new Date().getFullYear(),
        type: budget?.type || 'Pendapatan',
        amount: budget?.amount || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEdit) {
            put(route('admin.budgets.update', budget.id));
        } else {
            post(route('admin.budgets.store'));
        }
    };

    return (
        <AdminLayout title={isEdit ? "Edit Anggaran" : "Tambah Anggaran"}>
            <Head title={isEdit ? "Edit Anggaran" : "Tambah Anggaran"} />

            <div className="flex items-center gap-4 mb-8">
                <Button variant="outline" size="icon" asChild className="border-gray-200 hover:bg-gray-100">
                    <Link href={route('admin.budgets.index')}>
                        <ArrowLeft className="h-4 w-4 text-gray-600" />
                    </Link>
                </Button>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">{isEdit ? "Edit Anggaran" : "Tambah Anggaran Baru"}</h1>
                    <p className="text-gray-500 mt-1">Kelola data transparansi keuangan APBDes.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="max-w-2xl">
                <Card className="bg-white border-gray-100 shadow-sm">
                    <CardContent className="p-6 space-y-6">

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="year" className="text-gray-900 font-semibold">Tahun Anggaran</Label>
                                <Input
                                    id="year"
                                    type="number"
                                    min="2000"
                                    max="2100"
                                    value={data.year}
                                    onChange={e => setData('year', parseInt(e.target.value))}
                                    required
                                    className="border-gray-200 focus:border-orange-500 focus:ring-orange-200"
                                />
                                {errors.year && <p className="text-sm text-red-500">{errors.year}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="type" className="text-gray-900 font-semibold">Kategori</Label>
                                <Select
                                    value={data.type}
                                    onValueChange={(val) => setData('type', val)}
                                >
                                    <SelectTrigger className="border-gray-200 focus:ring-orange-200">
                                        <SelectValue placeholder="Pilih Kategori" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white border-gray-100">
                                        <SelectItem value="Pendapatan">Pendapatan</SelectItem>
                                        <SelectItem value="Belanja">Belanja</SelectItem>
                                        <SelectItem value="Pembiayaan">Pembiayaan</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.type && <p className="text-sm text-red-500">{errors.type}</p>}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="amount" className="text-gray-900 font-semibold">Nominal (Rp)</Label>
                            <div className="relative">
                                <span className="absolute left-3 top-2.5 text-gray-500">Rp</span>
                                <Input
                                    id="amount"
                                    type="number"
                                    value={data.amount}
                                    onChange={e => setData('amount', e.target.value)}
                                    className="pl-10 border-gray-200 focus:border-orange-500 focus:ring-orange-200"
                                    placeholder="0"
                                    required
                                />
                            </div>
                            <p className="text-xs text-gray-500">Masukkan angka nominal tanpa titik/koma.</p>
                            {errors.amount && <p className="text-sm text-red-500">{errors.amount}</p>}
                        </div>

                        <div className="flex justify-end pt-4">
                            <Button type="submit" disabled={processing} className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white">
                                {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {isEdit ? 'Simpan' : 'Tambah Data'}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </AdminLayout>
    );
}
