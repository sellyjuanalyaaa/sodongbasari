import React from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Pencil, Trash2, Image as ImageIcon } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function Index({ statistics }: { statistics: any[] }) {
    const handleDelete = (id: number) => {
        router.delete(route('admin.statistics.destroy', id));
    };

    return (
        <AdminLayout title="Statistik Desa">
            <Head title="Statistik Desa" />
            
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Statistik Desa</h1>
                    <p className="text-gray-500 mt-1">Kelola data statistik dan infografis anggaran desa.</p>
                </div>
                <Link href={route('admin.statistics.create')}>
                    <Button className="bg-orange-600 hover:bg-orange-700 text-white shadow-sm">
                        <Plus className="mr-2 h-4 w-4" /> Tambah Data
                    </Button>
                </Link>
            </div>

            <div className="rounded-lg border border-gray-100 bg-white shadow-sm overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-gray-50 border-b border-gray-100">
                            <TableHead className="w-[100px] text-gray-500">Tahun</TableHead>
                            <TableHead className="text-gray-500">Infografis</TableHead>
                            <TableHead className="text-center text-gray-500">Total Penduduk</TableHead>
                            <TableHead className="text-center text-gray-500">Laki-laki</TableHead>
                            <TableHead className="text-center text-gray-500">Perempuan</TableHead>
                            <TableHead className="text-center text-gray-500">Total KK</TableHead>
                            <TableHead className="text-right text-gray-500">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {statistics.map((item: any) => (
                            <TableRow key={item.id} className="hover:bg-gray-50 border-b border-gray-100">
                                <TableCell className="font-bold text-gray-700">{item.year}</TableCell>
                                <TableCell>
                                    {item.infographic_image ? (
                                        <div className="flex items-center gap-2 text-emerald-600">
                                            <ImageIcon className="h-4 w-4" />
                                            <span className="text-xs">Ada</span>
                                        </div>
                                    ) : (
                                        <span className="text-xs text-gray-400">Tidak ada</span>
                                    )}
                                </TableCell>
                                <TableCell className="text-center font-semibold text-gray-900">
                                    {item.total_population.toLocaleString()}
                                </TableCell>
                                <TableCell className="text-center text-gray-600">{item.male_population.toLocaleString()}</TableCell>
                                <TableCell className="text-center text-gray-600">{item.female_population.toLocaleString()}</TableCell>
                                <TableCell className="text-center text-gray-600">{item.total_families.toLocaleString()}</TableCell>
                                <TableCell className="text-right space-x-2">
                                    <Link href={route('admin.statistics.edit', item.id)}>
                                        <Button variant="outline" size="sm"><Pencil className="h-4 w-4" /></Button>
                                    </Link>

                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="destructive" size="sm"><Trash2 className="h-4 w-4" /></Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Hapus data tahun {item.year}?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Data statistik untuk tahun ini akan dihapus permanen.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Batal</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => handleDelete(item.id)} className="bg-red-600">
                                                    Hapus
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </TableCell>
                            </TableRow>
                        ))}
                        {statistics.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={7} className="h-24 text-center">Belum ada data statistik.</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </AdminLayout>
    );
}
