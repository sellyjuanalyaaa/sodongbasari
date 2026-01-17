
import React from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2 } from "lucide-react";
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

export default function BudgetIndex({ budgets }: { budgets: any[] }) {

    const handleDelete = (id: number) => {
        router.delete(route('admin.budgets.destroy', id));
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);
    }

    return (
        <AdminLayout title="Kelola Anggaran">
            <Head title="Kelola Anggaran" />

            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Anggaran Desa</h1>
                    <p className="text-gray-500 mt-1">Kelola data anggaran dan transparansi keuangan APBDes.</p>
                </div>
                <Button asChild className="bg-orange-600 hover:bg-orange-700 text-white shadow-sm">
                    <Link href={route('admin.budgets.create')}>
                        <Plus className="mr-2 h-4 w-4" /> Tambah Data
                    </Link>
                </Button>
            </div>

            <div className="rounded-lg border border-gray-100 bg-white shadow-sm overflow-hidden">
                <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                        <thead className="[&_tr]:border-b">
                            <tr className="border-b transition-colors hover:bg-gray-50 data-[state=selected]:bg-gray-100">
                                <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Tahun</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Kategori</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-gray-500">Nominal (Rp)</th>
                                <th className="h-12 px-4 text-right align-middle font-medium text-gray-500">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                            {budgets.map((budget: any) => (
                                <tr key={budget.id} className="border-b transition-colors hover:bg-gray-50">
                                    <td className="p-4 align-middle font-medium text-gray-700">{budget.year}</td>
                                    <td className="p-4 align-middle">
                                        <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent ${budget.type === 'Pendapatan' ? 'bg-green-100 text-green-700' :
                                            budget.type === 'Belanja' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                                            }`}>
                                            {budget.type}
                                        </span>
                                    </td>
                                    <td className="p-4 align-middle font-mono text-gray-700">{formatCurrency(budget.amount)}</td>
                                    <td className="p-4 align-middle text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="icon" asChild>
                                                <Link href={route('admin.budgets.edit', budget.id)}>
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
                                                        <AlertDialogTitle>Hapus data?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Data anggaran ini akan dihapus permanen.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Batal</AlertDialogCancel>
                                                        <AlertDialogAction onClick={() => handleDelete(budget.id)} className="bg-red-600 hover:bg-red-700">
                                                            Hapus
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {budgets.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="p-4 text-center text-muted-foreground">Belum ada data anggaran.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}
