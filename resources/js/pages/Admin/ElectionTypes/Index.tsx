import React from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Pencil, Trash2, Tag, ArrowLeft } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

interface ElectionType {
    id: number;
    name: string;
    description: string | null;
    order: number;
}

interface Props {
    electionTypes: ElectionType[];
}

export default function Index({ electionTypes }: Props) {
    const handleDelete = (id: number) => {
        router.delete(route('admin.election-types.destroy', id), {
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout title="Jenis Pemilu">
            <Head title="Jenis Pemilu - Admin" />

            <div className="mb-6">
                <Link href={route('admin.electoral-rolls.index')}>
                    <Button variant="ghost" className="mb-4">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Kembali ke DPT
                    </Button>
                </Link>
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Kelola Jenis Pemilu</h1>
                        <p className="text-gray-500 mt-1">Kelola kategori jenis pemilu untuk data DPT</p>
                    </div>
                    <Link href={route('admin.election-types.create')}>
                        <Button className="bg-orange-600 hover:bg-orange-700">
                            <Plus className="mr-2 h-4 w-4" />
                            Tambah Jenis Pemilu
                        </Button>
                    </Link>
                </div>
            </div>

            <Card className="border-gray-100 shadow-sm">
                <CardHeader className="bg-gray-50 border-b border-gray-100">
                    <CardTitle className="text-lg font-semibold flex items-center gap-2">
                        <Tag className="h-5 w-5 text-orange-600" />
                        Daftar Jenis Pemilu
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    {electionTypes.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">
                            <Tag className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                            <p className="text-sm">Belum ada jenis pemilu.</p>
                            <Link href={route('admin.election-types.create')}>
                                <Button variant="outline" className="mt-4">
                                    <Plus className="mr-2 h-4 w-4" />
                                    Tambah Jenis Pemilu Pertama
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-gray-50">
                                        <TableHead className="font-semibold text-gray-700 w-16">Urutan</TableHead>
                                        <TableHead className="font-semibold text-gray-700">Nama</TableHead>
                                        <TableHead className="font-semibold text-gray-700">Deskripsi</TableHead>
                                        <TableHead className="font-semibold text-gray-700 text-center w-32">Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {electionTypes.map((type) => (
                                        <TableRow key={type.id} className="hover:bg-gray-50">
                                            <TableCell className="text-center font-medium text-gray-500">{type.order}</TableCell>
                                            <TableCell className="font-semibold">{type.name}</TableCell>
                                            <TableCell className="text-gray-600">{type.description || '-'}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center justify-center gap-2">
                                                    <Link href={route('admin.election-types.edit', type.id)}>
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
                                                                <AlertDialogTitle>Hapus Jenis Pemilu?</AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    Apakah Anda yakin ingin menghapus jenis pemilu "{type.name}"?
                                                                    Jika jenis pemilu ini masih digunakan pada data DPT, maka tidak dapat dihapus.
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>Batal</AlertDialogCancel>
                                                                <AlertDialogAction
                                                                    onClick={() => handleDelete(type.id)}
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
