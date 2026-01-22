import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2, Users } from 'lucide-react';
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

interface FormerVillageHead {
    id: number;
    name: string;
    photo: string | null;
    start_year: number;
    end_year: number;
    achievement: string | null;
    order: number;
}

interface Props {
    formerHeads: FormerVillageHead[];
}

export default function Index({ formerHeads }: Props) {
    const handleDelete = (id: number) => {
        router.delete(`/admin/former-village-heads/${id}`, {
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout>
            <Head title="Riwayat Kepala Desa" />

            <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
                <div className="p-6 border-b border-slate-200">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-xl font-semibold text-slate-900">Riwayat Kepala Desa</h2>
                            <p className="text-sm text-slate-500 mt-1">Kelola data mantan kepala desa</p>
                        </div>
                        <Link href="/admin/former-village-heads/create">
                            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                                <Plus className="h-4 w-4 mr-2" />
                                Tambah Data
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="p-6">
                    {formerHeads.length === 0 ? (
                        <div className="text-center py-16">
                            <Users className="h-16 w-16 mx-auto text-slate-200 mb-4" />
                            <p className="text-slate-500">Belum ada data riwayat kepala desa</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-slate-200">
                                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-700">Foto</th>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-700">Nama</th>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-700">Periode</th>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-700">Prestasi</th>
                                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-700">Urutan</th>
                                        <th className="text-center py-3 px-4 text-sm font-medium text-slate-700">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {formerHeads.map((head) => (
                                        <tr key={head.id} className="border-b border-slate-100 hover:bg-slate-50">
                                            <td className="py-3 px-4">
                                                {head.photo ? (
                                                    <img
                                                        src={`/storage/${head.photo}`}
                                                        alt={head.name}
                                                        className="w-12 h-12 rounded-full object-cover border border-slate-200"
                                                    />
                                                ) : (
                                                    <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center">
                                                        <Users className="h-6 w-6 text-slate-400" />
                                                    </div>
                                                )}
                                            </td>
                                            <td className="py-3 px-4">
                                                <div className="font-medium text-slate-900">{head.name}</div>
                                            </td>
                                            <td className="py-3 px-4">
                                                <span className="text-sm text-slate-600">{head.start_year} - {head.end_year}</span>
                                            </td>
                                            <td className="py-3 px-4">
                                                <div className="text-sm text-slate-600 max-w-md line-clamp-2">
                                                    {head.achievement || '-'}
                                                </div>
                                            </td>
                                            <td className="py-3 px-4">
                                                <span className="text-sm text-slate-600">{head.order}</span>
                                            </td>
                                            <td className="py-3 px-4">
                                                <div className="flex items-center justify-center gap-2">
                                                    <Link href={`/admin/former-village-heads/${head.id}/edit`}>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                                        >
                                                            <Pencil className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                    <AlertDialog>
                                                        <AlertDialogTrigger asChild>
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent className="bg-white">
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>Hapus Data?</AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    Apakah Anda yakin ingin menghapus data {head.name}? Tindakan ini tidak dapat dibatalkan.
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel className="bg-white hover:bg-slate-50">Batal</AlertDialogCancel>
                                                                <AlertDialogAction
                                                                    onClick={() => handleDelete(head.id)}
                                                                    className="bg-red-600 hover:bg-red-700 text-white"
                                                                >
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
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
