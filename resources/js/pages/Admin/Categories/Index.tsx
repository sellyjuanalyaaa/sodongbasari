import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2, Tag } from 'lucide-react';
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
} from '@/components/ui/alert-dialog';

interface Category {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    color: string;
    posts_count: number;
}

interface Props {
    categories: Category[];
}

export default function Index({ categories }: Props) {
    const handleDelete = (id: number) => {
        router.delete(route('admin.categories.destroy', id), {
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout title="Kelola Kategori">
            <Head title="Kelola Kategori" />

            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Kelola Kategori</h1>
                    <p className="text-gray-500 mt-1">Atur kategori untuk berita dan artikel.</p>
                </div>
                <Link href={route('admin.categories.create')}>
                    <Button className="bg-orange-600 hover:bg-orange-700 text-white shadow-sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Tambah Kategori
                    </Button>
                </Link>
            </div>

            <div className="rounded-lg border border-gray-100 bg-white shadow-sm overflow-hidden">{categories.length === 0 ? (
                    <div className="text-center py-12">
                        <Tag className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                        <p className="text-gray-500">Belum ada kategori.</p>
                        <Link href={route('admin.categories.create')}>
                            <Button className="mt-4 bg-orange-600 hover:bg-orange-700">
                                <Plus className="h-4 w-4 mr-2" />
                                Tambah Kategori Pertama
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Kategori
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Slug
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Deskripsi
                                </th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Jumlah Berita
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {categories.map((category) => (
                                <tr key={category.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-3">
                                            <div 
                                                className="w-4 h-4 rounded-full flex-shrink-0" 
                                                style={{ backgroundColor: category.color }}
                                            />
                                            <span className="font-medium text-gray-900">{category.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="text-sm text-gray-500 font-mono">{category.slug}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-gray-600 line-clamp-2">
                                            {category.description || '-'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                            {category.posts_count} berita
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link href={route('admin.categories.edit', category.id)}>
                                                <Button variant="outline" size="sm" className="border-gray-200">
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button 
                                                        variant="outline" 
                                                        size="sm"
                                                        className="border-red-200 text-red-600 hover:text-red-700 hover:bg-red-50"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent className="bg-white">
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle className="text-gray-900">Hapus Kategori?</AlertDialogTitle>
                                                        <AlertDialogDescription className="text-gray-600">
                                                            Apakah Anda yakin ingin menghapus kategori "{category.name}"?
                                                            {category.posts_count > 0 && (
                                                                <span className="block mt-2 text-red-600 font-semibold">
                                                                    Kategori ini memiliki {category.posts_count} berita dan tidak dapat dihapus.
                                                                </span>
                                                            )}
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel className="bg-white hover:bg-gray-50">Batal</AlertDialogCancel>
                                                        {category.posts_count === 0 && (
                                                            <AlertDialogAction
                                                                onClick={() => handleDelete(category.id)}
                                                                className="bg-red-600 hover:bg-red-700 text-white"
                                                            >
                                                                Hapus
                                                            </AlertDialogAction>
                                                        )}
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </AdminLayout>
    );
}
