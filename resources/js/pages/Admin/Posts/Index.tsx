
import React from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, Eye } from "lucide-react";
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
                <Button asChild className="bg-orange-600 hover:bg-orange-700 text-white shadow-sm">
                    <Link href={route('admin.posts.create')}>
                        <Plus className="mr-2 h-4 w-4" /> Tambah Berita
                    </Link>
                </Button>
            </div>

            <div className="rounded-lg border border-gray-100 bg-white shadow-sm overflow-hidden">
                <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                        <thead className="[&_tr]:border-b">
                            <tr className="border-b transition-colors hover:bg-gray-50 data-[state=selected]:bg-gray-100">
                                <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Thumbnail</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Judul</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Kategori</th>
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
                                        <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${post.category === 'Berita Desa' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                                            post.category === 'Pengumuman' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                                                post.category === 'Kegiatan' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                                    post.category === 'Artikel' ? 'bg-purple-50 text-purple-700 border-purple-100' :
                                                        'bg-gray-100 text-gray-700 border-gray-200'
                                            }`}>
                                            {post.category}
                                        </span>
                                    </td>
                                    <td className="p-4 align-middle text-gray-700">{new Date(post.published_at).toLocaleDateString()}</td>
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
                                    <td colSpan={5} className="p-4 text-center text-muted-foreground">Belum ada data berita.</td>
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
