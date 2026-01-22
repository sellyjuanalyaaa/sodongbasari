
import React from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Pencil, Trash2, MapPin, Tag } from "lucide-react";
import { router } from '@inertiajs/react';
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

export default function Index({ potentials }: { potentials: any }) {
    const handleDelete = (id: number) => {
        router.delete(route('admin.potentials.destroy', id));
    };

    return (
        <AdminLayout title="Potensi Desa">
            <Head title="Potensi Desa" />
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Potensi Desa</h1>
                    <p className="text-gray-500 mt-1">Kelola data potensi wisata, UMKM, dan sumber daya desa.</p>
                </div>
                <div className="flex gap-2">
                    <Link href={route('admin.potential-categories.index')}>
                        <Button variant="outline" className="bg-white border-green-300 text-green-700 hover:bg-green-50 hover:border-green-400 hover:text-green-800">
                            <Tag className="mr-2 h-4 w-4" /> Kelola Kategori
                        </Button>
                    </Link>
                    <Link href={route('admin.potentials.create')}>
                        <Button className="bg-orange-600 hover:bg-orange-700 text-white shadow-sm">
                            <Plus className="mr-2 h-4 w-4" /> Tambah Potensi
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="rounded-lg border border-gray-100 bg-white shadow-sm overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-gray-50 border-b border-gray-100">
                            <TableHead className="w-[100px] text-gray-500">Gambar</TableHead>
                            <TableHead className="text-gray-500">Nama Potensi</TableHead>
                            <TableHead className="text-gray-500">Kategori</TableHead>
                            <TableHead className="text-right text-gray-500">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {potentials.data.map((item: any) => (
                            <TableRow key={item.id} className="hover:bg-gray-50 border-b border-gray-100">
                                <TableCell>
                                    {item.image_path ? (
                                        <img src={item.image_path} alt={item.name} className="h-12 w-16 object-cover rounded bg-gray-100" />
                                    ) : (
                                        <div className="h-12 w-16 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-400">No Img</div>
                                    )}
                                </TableCell>
                                <TableCell className="font-medium text-gray-700">
                                    {item.name}
                                    <div className="text-xs text-gray-500 truncate max-w-[200px]">{item.description}</div>
                                </TableCell>
                                <TableCell>
                                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${item.category === 'Wisata Alam' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                        item.category === 'UMKM' || item.category === 'UMKM / Produk Lokal' ? 'bg-orange-50 text-orange-700 border-orange-100' :
                                            item.category === 'Pertanian' || item.category === 'Pertanian & Perkebunan' ? 'bg-yellow-50 text-yellow-700 border-yellow-100' :
                                                item.category === 'Seni Budaya' || item.category === 'Seni & Budaya' ? 'bg-purple-50 text-purple-700 border-purple-100' :
                                                    'bg-gray-100 text-gray-700 border-gray-200'
                                        }`}>
                                        {item.category}
                                    </span>
                                </TableCell>
                                <TableCell className="text-right space-x-2">
                                    <Link href={route('admin.potentials.edit', item.id)}>
                                        <Button variant="outline" size="sm" className="hover:bg-gray-100"><Pencil className="h-4 w-4 text-gray-600" /></Button>
                                    </Link>

                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="destructive" size="sm"><Trash2 className="h-4 w-4" /></Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Hapus data ini?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Tindakan ini tidak dapat dibatalkan. Data potensi akan dihapus permanen.
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
                    </TableBody>
                </Table>
            </div>
            {/* Pagination could be added here */}
        </AdminLayout>
    );
}
