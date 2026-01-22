
import React from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, Link as LinkIcon } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";

export default function SliderIndex({ sliders }: { sliders: any[] }) {

    const handleDelete = (id: number) => {
        router.delete(route('admin.sliders.destroy', id));
    };

    return (
        <AdminLayout title="Slider">
            <Head title="Kelola Slider" />

            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Slider</h1>
                    <p className="text-gray-500 mt-1">Kelola slider yang ditampilkan di halaman utama website desa.</p>
                </div>
                <Button asChild className="bg-orange-600 hover:bg-orange-700 text-white shadow-sm">
                    <Link href={route('admin.sliders.create')}>
                        <Plus className="mr-2 h-4 w-4" /> Tambah Slider
                    </Link>
                </Button>
            </div>

            <div className="rounded-lg border border-gray-100 bg-white shadow-sm overflow-hidden">
                <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                        <thead className="[&_tr]:border-b">
                            <tr className="border-b transition-colors hover:bg-gray-50 data-[state=selected]:bg-gray-100">
                                <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Gambar</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Judul</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Link</th>
                                <th className="h-12 px-4 text-center align-middle font-medium text-gray-500">Urutan</th>
                                <th className="h-12 px-4 text-center align-middle font-medium text-gray-500">Status</th>
                                <th className="h-12 px-4 text-right align-middle font-medium text-gray-500">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                            {sliders.map((slider: any) => (
                                <tr key={slider.id} className="border-b transition-colors hover:bg-gray-50">
                                    <td className="p-4 align-middle">
                                        <img 
                                            src={slider.image_path} 
                                            alt={slider.title} 
                                            className="h-12 w-20 object-cover rounded-md bg-gray-100" 
                                        />
                                    </td>
                                    <td className="p-4 align-middle font-medium text-gray-700">{slider.title}</td>
                                    <td className="p-4 align-middle">
                                        {slider.link ? (
                                            <a 
                                                href={slider.link} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1 text-orange-600 hover:text-orange-700 hover:underline text-sm"
                                            >
                                                <LinkIcon className="h-3 w-3" />
                                                <span className="max-w-xs truncate">{slider.link}</span>
                                            </a>
                                        ) : (
                                            <span className="text-sm text-gray-400">-</span>
                                        )}
                                    </td>
                                    <td className="p-4 align-middle text-center">
                                        <span className="inline-flex items-center justify-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-700">
                                            {slider.order}
                                        </span>
                                    </td>
                                    <td className="p-4 align-middle text-center">
                                        {slider.is_active ? (
                                            <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-green-200">
                                                Aktif
                                            </Badge>
                                        ) : (
                                            <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                                                Tidak Aktif
                                            </Badge>
                                        )}
                                    </td>
                                    <td className="p-4 align-middle text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="icon" asChild>
                                                <Link href={route('admin.sliders.edit', slider.id)}>
                                                    <Pencil className="h-4 w-4" />
                                                    <span className="sr-only">Edit</span>
                                                </Link>
                                            </Button>

                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Apakah anda yakin?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Tindakan ini tidak dapat dibatalkan. Slider akan dihapus permanen.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Batal</AlertDialogCancel>
                                                        <AlertDialogAction onClick={() => handleDelete(slider.id)} className="bg-red-600 hover:bg-red-700">
                                                            Hapus
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {sliders.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="p-4 text-center text-muted-foreground">Belum ada data slider.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}
