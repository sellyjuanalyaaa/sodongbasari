import AdminLayout from '@/layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from "@/components/ui/button";
import {
    Plus,
    Pencil,
    Trash2,
    ArrowLeft,
} from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getIcon } from '@/lib/icons';

interface Category {
    id: number;
    name: string;
    description: string | null;
    icon: string;
    color: string;
}

interface Props {
    categories: Category[];
}

export default function Index({ categories }: Props) {
    const handleDelete = (id: number) => {
        router.delete(route('admin.law-product-categories.destroy', id));
    };

    return (
        <AdminLayout title="Kategori Produk Hukum">
            <Head title="Kategori Produk Hukum" />

            <div className='mb-6'>
                <Link href={route('admin.law-products.index')}>
                    <Button variant="ghost" className="mb-4">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Kembali
                    </Button>
                </Link>
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Kategori Produk Hukum</h1>
                        <p className="text-gray-500 mt-1">Kelola kategori untuk produk hukum desa</p>
                    </div>
                    <Link href={route('admin.law-product-categories.create')}>
                        <Button className="bg-linear-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-md">
                            <Plus className="mr-2 h-4 w-4" /> Tambah Kategori
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="px-6 py-3 text-sm font-medium text-gray-500">Nama Kategori</TableHead>
                            <TableHead className="px-6 py-3 text-sm font-medium text-gray-500">Deskripsi</TableHead>
                            <TableHead className="px-6 py-3 text-sm font-medium text-gray-500">Badge</TableHead>
                            <TableHead className="px-6 py-3 text-sm font-medium text-gray-500">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {categories.length > 0 ? (
                            categories.map((category) => {
                                const Icon = getIcon(category.icon);
                                return (
                                    <TableRow key={category.id} className="hover:bg-gray-50 transition-colors">
                                        <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{category.name}</TableCell>
                                        <TableCell className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{category.description}</div>
                                        </TableCell>
                                        <TableCell className="px-6 py-4 whitespace-nowrap">
                                            <div className='flex items-center gap-1.5 rounded-md border px-2 py-1 shadow-sm'
                                                style={{
                                                    backgroundColor: `${category.color}20`,
                                                    borderColor: `${category.color}70`,
                                                    color: `${category.color}`,
                                                }}
                                            >
                                                {Icon && <Icon className="size-3" />}
                                                <h4 className="text-[10px] font-semibold uppercase tracking-[0.14em]">{category.name || 'Nama Kategori'}</h4>
                                            </div>
                                        </TableCell>
                                        <TableCell className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex gap-2 justify-end">
                                                <Link href={route('admin.law-product-categories.edit', category.id)}>
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
                                                    <AlertDialogContent className="bg-white">
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle className="text-gray-900">Hapus Kategori?</AlertDialogTitle>
                                                            <AlertDialogDescription className="text-gray-600">
                                                                Apakah Anda yakin ingin menghapus kategori "{category.name}"? Tindakan ini tidak dapat dibatalkan.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel className="bg-white hover:bg-gray-50 cursor-pointer">Batal</AlertDialogCancel>
                                                            <AlertDialogAction onClick={() => handleDelete(category.id)} className="bg-red-600 hover:bg-red-700 text-white cursor-pointer">
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
                                <TableCell colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                    Belum ada kategori. Klik tombol "Tambah Kategori" untuk membuat kategori baru.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </AdminLayout>
    );
}