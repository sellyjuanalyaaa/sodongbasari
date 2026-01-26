
import React from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import { Head, usePage, router } from '@inertiajs/react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShieldAlert, ShieldCheck, User as UserIcon } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Swal, { SweetAlertResult } from 'sweetalert2';

interface User {
    id: number;
    name: string;
    email: string;
    role: 'super_admin' | 'admin' | 'user';
    created_at: string;
}

interface Props {
    users: User[];
}

export default function UsersIndex({ users }: Props) {
    const { auth } = usePage().props as any;
    const currentUser = auth.user;

    const handleRoleChange = (user: User, newRole: 'admin' | 'user') => {
        const actionText = newRole === 'admin' ? 'Jadikan Admin' : 'Hapus Akses Admin';

        Swal.fire({
            title: `Konfirmasi ${actionText}`,
            text: `Apakah Anda yakin ingin mengubah role user ini?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, Lanjutkan',
            cancelButtonText: 'Batal'
        }).then((result: SweetAlertResult) => {
            if (result.isConfirmed) {
                router.patch(route('admin.users.update-role', user.id), {
                    role: newRole
                }, {
                    preserveScroll: true,
                    onSuccess: () => {
                        Swal.fire(
                            'Berhasil!',
                            'Role user berhasil diperbaharui.',
                            'success'
                        );
                    },
                    onError: () => {
                        Swal.fire(
                            'Gagal!',
                            'Terjadi kesalahan saat memperbaharui role.',
                            'error'
                        );
                    }
                });
            }
        });
    };

    return (
        <AdminLayout title="Manajemen User">
            <Head title="Manajemen User" />

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Manajemen User</h1>
                <p className="text-gray-500 mt-1">Kelola role dan akses user (Khusus Super Admin).</p>
            </div>

            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nama</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Terdaftar</TableHead>
                                <TableHead className="text-right">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-2">
                                            <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                                                <UserIcon className="h-4 w-4 text-gray-500" />
                                            </div>
                                            {user.name}
                                            {user.id === currentUser.id && <span className="text-xs text-gray-400">(Anda)</span>}
                                        </div>
                                    </TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        {user.role === 'super_admin' ? (
                                            <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200 border-none">Super Admin</Badge>
                                        ) : user.role === 'admin' ? (
                                            <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-none">Admin</Badge>
                                        ) : (
                                            <Badge variant="outline" className="text-gray-600">User</Badge>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {new Date(user.created_at).toLocaleDateString('id-ID', {
                                            day: 'numeric', month: 'short', year: 'numeric'
                                        })}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {user.role !== 'super_admin' && (
                                            <div className="flex justify-end gap-2">
                                                {user.role === 'user' ? (
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        className="text-blue-600 border-blue-200 hover:bg-blue-50"
                                                        onClick={() => handleRoleChange(user, 'admin')}
                                                    >
                                                        <ShieldCheck className="h-4 w-4 mr-1" />
                                                        Up Role
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        className="text-red-600 border-red-200 hover:bg-red-50"
                                                        onClick={() => handleRoleChange(user, 'user')}
                                                    >
                                                        <ShieldAlert className="h-4 w-4 mr-1" />
                                                        Down Role
                                                    </Button>
                                                )}
                                            </div>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </AdminLayout>
    );
}
