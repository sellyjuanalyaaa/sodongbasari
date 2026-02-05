import React from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Pencil, Trash2, Users, Settings } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

interface ElectoralRoll {
    id: number;
    year: number;
    male_voters: number;
    female_voters: number;
    total_voters: number;
    election_type: string;
}

interface Props {
    electoralRolls: ElectoralRoll[];
}

export default function Index({ electoralRolls }: Props) {
    const handleDelete = (id: number) => {
        router.delete(route('admin.electoral-rolls.destroy', id), {
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout title="Daftar Pemilih Tetap">
            <Head title="Daftar Pemilih Tetap - Admin" />

            <div className="mb-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Daftar Pemilih Tetap</h1>
                        <p className="text-gray-500 mt-1">Kelola data pemilih tetap per tahun dan jenis pemilu</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link href={route('admin.election-types.index')}>
                            <Button variant="outline" className="border-orange-600 text-orange-600 hover:bg-orange-50">
                                <Settings className="mr-2 h-4 w-4" />
                                Kelola Jenis Pemilu
                            </Button>
                        </Link>
                        <Link href={route('admin.electoral-rolls.create')}>
                            <Button className="bg-orange-600 hover:bg-orange-700">
                                <Plus className="mr-2 h-4 w-4" />
                                Tambah Data DPT
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            <Card className="border-gray-100 shadow-sm">
                <CardHeader className="bg-gray-50 border-b border-gray-100">
                    <CardTitle className="text-lg font-semibold flex items-center gap-2">
                        <Users className="h-5 w-5 text-orange-600" />
                        Data Pemilih Tetap
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    {electoralRolls.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">
                            <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                            <p className="text-sm">Belum ada data pemilih tetap.</p>
                            <Link href={route('admin.electoral-rolls.create')}>
                                <Button variant="outline" className="mt-4">
                                    <Plus className="mr-2 h-4 w-4" />
                                    Tambah Data Pertama
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-gray-50">
                                        <TableHead className="font-semibold text-gray-700">Tahun</TableHead>
                                        <TableHead className="font-semibold text-gray-700">Jenis Pemilu</TableHead>
                                        <TableHead className="font-semibold text-gray-700 text-right">Laki-Laki</TableHead>
                                        <TableHead className="font-semibold text-gray-700 text-right">Perempuan</TableHead>
                                        <TableHead className="font-semibold text-gray-700 text-right">Total</TableHead>
                                        <TableHead className="font-semibold text-gray-700 text-center">Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {electoralRolls.map((roll) => (
                                        <TableRow key={roll.id} className="hover:bg-gray-50">
                                            <TableCell className="font-medium">{roll.year}</TableCell>
                                            <TableCell>
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                                                    {roll.election_type}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-right">{roll.male_voters.toLocaleString('id-ID')}</TableCell>
                                            <TableCell className="text-right">{roll.female_voters.toLocaleString('id-ID')}</TableCell>
                                            <TableCell className="text-right font-semibold">{roll.total_voters.toLocaleString('id-ID')}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center justify-center gap-2">
                                                    <Link href={route('admin.electoral-rolls.edit', roll.id)}>
                                                        <Button variant="ghost" size="sm" className="hover:bg-blue-50 hover:text-blue-600">
                                                            <Pencil className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                    <AlertDialog>
                                                        <AlertDialogTrigger asChild>
                                                            <Button variant="ghost" size="sm" className="hover:bg-red-50 hover:text-red-600">
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>Hapus Data DPT?</AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    Apakah Anda yakin ingin menghapus data pemilih tetap tahun {roll.year} - {roll.election_type}?
                                                                    Tindakan ini tidak dapat dibatalkan.
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>Batal</AlertDialogCancel>
                                                                <AlertDialogAction
                                                                    onClick={() => handleDelete(roll.id)}
                                                                    className="bg-red-600 hover:bg-red-700"
                                                                >
                                                                    Hapus
                                                                </AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </CardContent>
            </Card>
        </AdminLayout>
    );
}
