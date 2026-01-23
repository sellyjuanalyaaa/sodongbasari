import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2, BarChart3 } from 'lucide-react';
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
import { Badge } from '@/components/ui/badge';

interface HomeStatistic {
    id: number;
    title: string;
    subtitle: string | null;
    type: string;
    order: number;
    is_active: boolean;
}

interface Props {
    statistics: HomeStatistic[];
}

export default function Index({ statistics }: Props) {
    const handleDelete = (id: number) => {
        router.delete(route('admin.home-statistics.destroy', id), {
            preserveScroll: true,
        });
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'budget': return 'bg-blue-100 text-blue-800';
            case 'landmark': return 'bg-purple-100 text-purple-800';
            case 'count': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <AdminLayout title="Kelola Statistik Beranda">
            <Head title="Kelola Statistik Beranda" />

            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Kelola Statistik Beranda</h1>
                    <p className="text-gray-500 mt-1">Atur data statistik yang tampil di slider halaman depan.</p>
                </div>
                <Link href={route('admin.home-statistics.create')}>
                    <Button className="bg-orange-600 hover:bg-orange-700 text-white shadow-sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Tambah Statistik
                    </Button>
                </Link>
            </div>

            <div className="rounded-lg border border-gray-100 bg-white shadow-sm overflow-hidden">
                {statistics.length === 0 ? (
                    <div className="text-center py-12">
                        <BarChart3 className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                        <p className="text-gray-500">Belum ada data statistik.</p>
                        <Link href={route('admin.home-statistics.create')}>
                            <Button className="mt-4 bg-orange-600 hover:bg-orange-700">
                                <Plus className="h-4 w-4 mr-2" />
                                Tambah Data Pertama
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Urutan
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Judul
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Tipe
                                </th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {statistics.map((stat) => (
                                <tr key={stat.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {stat.order}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex flex-col">
                                            <span className="font-medium text-gray-900">{stat.title}</span>
                                            {stat.subtitle && (
                                                <span className="text-xs text-gray-500">{stat.subtitle}</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(stat.type)}`}>
                                            {stat.type.charAt(0).toUpperCase() + stat.type.slice(1)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <Badge variant={stat.is_active ? "default" : "secondary"} className={stat.is_active ? "bg-green-100 text-green-800 hover:bg-green-100" : "bg-gray-100 text-gray-800 hover:bg-gray-100"}>
                                            {stat.is_active ? 'Aktif' : 'Non-Aktif'}
                                        </Badge>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link href={route('admin.home-statistics.edit', stat.id)}>
                                                <Button variant="outline" size="sm" className="border-gray-200">
                                                    <Pencil className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button variant="outline" size="sm" className="border-red-200 text-red-600 hover:text-red-700 hover:bg-red-50">
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent className="bg-white">
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Hapus Statistik?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Apakah Anda yakin ingin menghapus statistik "{stat.title}"? Tindakan ini tidak dapat dibatalkan.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Batal</AlertDialogCancel>
                                                        <AlertDialogAction onClick={() => handleDelete(stat.id)} className="bg-red-600 text-white">
                                                            Hapus
                                                        </AlertDialogAction>
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
