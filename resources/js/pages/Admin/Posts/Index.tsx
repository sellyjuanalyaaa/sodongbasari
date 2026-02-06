
import React from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, Eye, Folder, Heart } from "lucide-react";
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

export default function PostIndex({ posts }: { posts: any }) {

    const handleDelete = (id: number) => {
        router.delete(route('admin.posts.destroy', id));
    };

    return (
        <AdminLayout title="Berita & Artikel">
            <Head title="Kelola Berita" />

            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Berita & Artikel</h1>
                    <p className="text-gray-500 mt-1">Kelola semua berita yang ditampilkan di website desa.</p>
                </div>
                <div className="flex gap-2">
                    <Button asChild variant="outline" className="bg-white border-green-300 text-green-700 hover:bg-green-50 hover:border-green-400 hover:text-green-800">
                        <Link href={route('admin.categories.index')}>
                            <Folder className="mr-2 h-4 w-4" /> Kelola Kategori
                        </Link>
                    </Button>
                    <Button asChild className="bg-orange-600 hover:bg-orange-700 text-white shadow-sm">
                        <Link href={route('admin.posts.create')}>
                            <Plus className="mr-2 h-4 w-4" /> Tambah Berita
                        </Link>
                    </Button>
                </div>
            </div>

            <div className="rounded-lg border border-gray-100 bg-white shadow-sm overflow-hidden">
                <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                        <thead className="[&_tr]:border-b">
                            <tr className="border-b transition-colors hover:bg-gray-50 data-[state=selected]:bg-gray-100">
                                <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Thumbnail</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Judul</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Kategori</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Dibuat Oleh</th>
                                <th className="h-12 px-4 text-center align-middle font-medium text-gray-500">View</th>
                                <th className="h-12 px-4 text-center align-middle font-medium text-gray-500">Like</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Tanggal</th>
                                <th className="h-12 px-4 text-right align-middle font-medium text-gray-500">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                            {posts.data.map((post: any) => (
                                <tr key={post.id} className="border-b transition-colors hover:bg-gray-50">
                                    <td className="p-4 align-middle">
                                        <img src={post.image_path} alt="" className="h-10 w-16 object-cover rounded-md bg-gray-100" />
                                    </td>
                                    <td className="p-4 align-middle font-medium text-gray-700">{post.title}</td>
                                    <td className="p-4 align-middle">
                                        {post.category ? (
                                            <span 
                                                className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold"
                                                style={{ 
                                                    backgroundColor: `${post.category.color}20`,
                                                    color: post.category.color,
                                                    border: `1px solid ${post.category.color}40`
                                                }}
                                            >
                                                {post.category.name}
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-gray-100 text-gray-700 border-gray-200">
                                                Tidak Ada Kategori
                                            </span>
                                        )}
                                    </td>
                                    <td className="p-4 align-middle">
                                        <span className="text-sm text-gray-700">
                                            {post.creator?.name || 'Admin'}
                                        </span>
                                    </td>
                                    <td className="p-4 align-middle text-center">
                                        <div className="flex items-center justify-center gap-1 text-gray-600">
                                            <Eye className="h-3.5 w-3.5" />
                                            <span className="text-sm">{post.view_count || 0}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 align-middle text-center">
                                        <div className="flex items-center justify-center gap-1 text-red-500">
                                            <Heart className="h-3.5 w-3.5 fill-current" />
                                            <span className="text-sm font-medium">{post.likes_count || 0}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 align-middle text-gray-700">
                                        {new Date(post.published_at).toLocaleDateString('id-ID', { 
                                            day: 'numeric', 
                                            month: 'short', 
                                            year: 'numeric',
                                            timeZone: 'Asia/Jakarta'
                                        })}
                                    </td>
                                    <td className="p-4 align-middle text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="icon" asChild>
                                                <Link href={route('admin.posts.edit', post.id)}>
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
                                                            Tindakan ini tidak dapat dibatalkan. Data berita akan dihapus permanen.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Batal</AlertDialogCancel>
                                                        <AlertDialogAction onClick={() => handleDelete(post.id)} className="bg-red-600 hover:bg-red-700">
                                                            Hapus
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {posts.data.length === 0 && (
                                <tr>
                                    <td colSpan={8} className="p-4 text-center text-muted-foreground">Belum ada data berita.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination Implementation could go here */}
        </AdminLayout>
    );
}
