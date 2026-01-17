
import React from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Pencil, Trash2, Users } from "lucide-react";
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

export default function Index({ institutions }: { institutions: any }) {
    const handleDelete = (id: number) => {
        router.delete(route('admin.institutions.destroy', id));
    };

    return (
        <AdminLayout title="Lembaga Desa">
            <Head title="Lembaga Desa" />
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Lembaga Desa</h1>
                    <p className="text-gray-500 mt-1">Kelola informasi lembaga dan organisasi desa.</p>
                </div>
                <Link href={route('admin.institutions.create')}>
                    <Button className="bg-orange-600 hover:bg-orange-700 text-white shadow-sm">
                        <Plus className="mr-2 h-4 w-4" /> Tambah Lembaga
                    </Button>
                </Link>
            </div>

            <div className="rounded-lg border border-gray-100 bg-white shadow-sm overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-gray-50 border-b border-gray-100">
                            <TableHead className="w-[80px] text-gray-500">Logo</TableHead>
                            <TableHead className="text-gray-500">Nama Lembaga</TableHead>
                            <TableHead className="text-gray-500">Deskripsi Singkat</TableHead>
                            <TableHead className="text-center text-gray-500">Anggota</TableHead>
                            <TableHead className="text-right text-gray-500">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {institutions.map((item: any) => (
                            <TableRow key={item.id} className="hover:bg-gray-50 border-b border-gray-100">
                                <TableCell>
                                    {item.logo_path ? (
                                        <img src={item.logo_path} alt={item.name} className="h-10 w-10 object-contain" />
                                    ) : (
                                        <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center text-xs text-gray-400">?</div>
                                    )}
                                </TableCell>
                                <TableCell className="font-semibold text-gray-700">{item.name}</TableCell>
                                <TableCell className="max-w-md truncate text-gray-500">{item.description}</TableCell>
                                <TableCell className="text-center">
                                    <Link href={route('admin.institutions.members.index', item.id)}>
                                        <Button variant="outline" size="sm">
                                            <Users className="h-4 w-4 mr-2" />
                                            {item.members_count || 0} orang
                                        </Button>
                                    </Link>
                                </TableCell>
                                <TableCell className="text-right space-x-2">
                                    <Link href={route('admin.institutions.edit', item.id)}>
                                        <Button variant="outline" size="sm"><Pencil className="h-4 w-4" /></Button>
                                    </Link>

                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="destructive" size="sm"><Trash2 className="h-4 w-4" /></Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Hapus lembaga ini?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Tindakan ini akan menghapus data lembaga permanen.
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
                        {institutions.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={4} className="h-24 text-center">Belum ada data lembaga.</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </AdminLayout>
    );
}
