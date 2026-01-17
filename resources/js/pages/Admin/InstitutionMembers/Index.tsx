
import React from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Pencil, Trash2, ArrowLeft, Users } from "lucide-react";
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

interface Member {
    id: number;
    name: string;
    position: string;
    photo: string | null;
    order: number;
    is_active: boolean;
}

interface Institution {
    id: number;
    name: string;
    abbreviation: string | null;
    description: string;
}

interface Props {
    institution: Institution;
    members: Member[];
}

export default function Index({ institution, members }: Props) {
    const handleDelete = (memberId: number) => {
        router.delete(route('admin.institutions.members.destroy', [institution.id, memberId]));
    };

    return (
        <AdminLayout title={`Anggota ${institution.name}`}>
            <Head title={`Anggota ${institution.name}`} />
            
            <div className="mb-6">
                <Link href={route('admin.institutions.index')}>
                    <Button variant="ghost" size="sm">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Lembaga
                    </Button>
                </Link>
            </div>

            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{institution.name}</h1>
                    <p className="text-gray-500 mt-1">Kelola anggota lembaga {institution.name}.</p>
                </div>
                <Link href={route('admin.institutions.members.create', institution.id)}>
                    <Button className="bg-orange-600 hover:bg-orange-700 text-white shadow-sm">
                        <Plus className="mr-2 h-4 w-4" /> Tambah Anggota
                    </Button>
                </Link>
            </div>

            <div className="rounded-lg border border-gray-100 bg-white shadow-sm overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-gray-50 border-b border-gray-100">
                            <TableHead className="w-[80px] text-gray-500">Foto</TableHead>
                            <TableHead className="text-gray-500">Nama</TableHead>
                            <TableHead className="text-gray-500">Jabatan</TableHead>
                            <TableHead className="text-center text-gray-500">Urutan</TableHead>
                            <TableHead className="text-center text-gray-500">Status</TableHead>
                            <TableHead className="text-right text-gray-500">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {members.map((member) => (
                            <TableRow key={member.id} className="hover:bg-gray-50 border-b border-gray-100">
                                <TableCell>
                                    {member.photo ? (
                                        <img 
                                            src={member.photo} 
                                            alt={member.name}
                                            className="h-12 w-12 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="h-12 w-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                                            <Users className="h-6 w-6 text-white" />
                                        </div>
                                    )}
                                </TableCell>
                                <TableCell className="font-semibold text-gray-700">{member.name}</TableCell>
                                <TableCell className="text-gray-500">{member.position}</TableCell>
                                <TableCell className="text-center">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                        {member.order}
                                    </span>
                                </TableCell>
                                <TableCell className="text-center">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                        member.is_active 
                                            ? 'bg-green-100 text-green-800' 
                                            : 'bg-gray-100 text-gray-800'
                                    }`}>
                                        {member.is_active ? 'Aktif' : 'Tidak Aktif'}
                                    </span>
                                </TableCell>
                                <TableCell className="text-right space-x-2">
                                    <Link href={route('admin.institutions.members.edit', [institution.id, member.id])}>
                                        <Button variant="outline" size="sm"><Pencil className="h-4 w-4" /></Button>
                                    </Link>

                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="destructive" size="sm"><Trash2 className="h-4 w-4" /></Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Hapus anggota ini?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Tindakan ini akan menghapus data anggota permanen.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Batal</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => handleDelete(member.id)} className="bg-red-600">
                                                    Hapus
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </TableCell>
                            </TableRow>
                        ))}
                        {members.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} className="h-24 text-center">
                                    <Users className="h-12 w-12 mx-auto text-gray-300 mb-2" />
                                    <p className="text-gray-500">Belum ada anggota. Klik "Tambah Anggota" untuk menambahkan.</p>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </AdminLayout>
    );
}
