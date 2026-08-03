import React from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Pencil, Trash2, Tag } from "lucide-react";
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
import { formatDate } from 'date-fns';
import { getIcon } from '@/lib/icons';

export default function Index({ lawProduct }: { lawProduct: any }) {

    const handleDelete = (id: number) => {
        router.delete(route('admin.law-products.destroy', id));
    };

    return (
        <AdminLayout title="Produk Hukum">
            <Head title="Produk Hukum" />
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Produk Hukum</h1>
                    <p className="text-gray-500 mt-1">Kelola dokumen resmi landasan hukum pengelolaan desa.</p>
                </div>
                <div className="flex gap-2">
                    <Link href={route('admin.law-product-categories.index')}>
                        <Button variant="outline" className="bg-white border-green-300 text-green-700 hover:bg-green-50 hover:border-green-400 hover:text-green-800">
                            <Tag className="mr-2 h-4 w-4" /> Kelola Kategori
                        </Button>
                    </Link>
                    <Link href={route('admin.law-products.create')}>
                        <Button className="bg-orange-600 hover:bg-orange-700 text-white shadow-sm">
                            <Plus className="mr-2 h-4 w-4" /> Tambah Dokumen
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="rounded-lg border border-gray-100 bg-white shadow-sm overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-gray-50 border-b border-gray-100">
                            <TableHead className="px-6 py-3 text-sm font-medium text-gray-500">Nama Dokumen</TableHead>
                            <TableHead className="px-6 py-3 text-sm font-medium text-gray-500">Kategori</TableHead>
                            <TableHead className="px-6 py-3 text-sm font-medium text-gray-500">Tanggal Penetapan</TableHead>
                            <TableHead className="px-6 py-3 text-sm font-medium text-gray-500">Downloads</TableHead>
                            <TableHead className="px-6 py-3 text-sm font-medium text-gray-500">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {lawProduct.total > 0 ? (
                            lawProduct.data.map((item: any) => {
                                const Icon = getIcon(item.category.icon);
                                return (
                                    <TableRow key={item.id} className="hover:bg-gray-50 border-b border-gray-100">
                                        <TableCell className="px-6 py-4 whitespace-nowrap">{item.title}</TableCell>
                                        <TableCell className="px-6 py-4 whitespace-nowrap">
                                            {item.category ? (
                                                <div className='flex items-center gap-1.5 rounded-md border px-2 py-1 shadow-sm'
                                                    style={{
                                                        backgroundColor: `${item.category.color}20`,
                                                        borderColor: `${item.category.color}70`,
                                                        color: `${item.category.color}`,
                                                    }}
                                                >
                                                    {Icon && <Icon className="size-3" />}
                                                    <h4 className="text-[10px] font-semibold uppercase tracking-[0.14em]">{item.category.name}</h4>
                                                </div>
                                            ) : (
                                                <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-gray-100 text-gray-700 border-gray-200">
                                                    Tidak Ada Kategori
                                                </span>
                                            )}
                                        </TableCell>
                                        <TableCell className="px-6 py-4 whitespace-nowrap">{formatDate(item.establish, 'd-MM-y')}</TableCell>
                                        <TableCell className="px-6 py-4 whitespace-nowrap">{item.downloads}</TableCell>
                                        <TableCell className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex gap-2">
                                                <Link href={route('admin.law-products.edit', item.id)}>
                                                    <Button variant="outline" size="sm" className="border-gray-200">
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button variant="outline" size="sm" className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-600">
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Hapus dokumen ini?</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                Tindakan ini akan menghapus data dokumen produk hukum secara permanen.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel className='cursor-pointer'>Batal</AlertDialogCancel>
                                                            <AlertDialogAction onClick={() => handleDelete(item.id)} className="bg-red-600 cursor-pointer">
                                                                Hapus
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} className="h-24 text-center">Belum ada dokumen.</TableCell>
                            </TableRow>
                        )} 
                    </TableBody>
                </Table>
            </div>
        </AdminLayout>
    );
}