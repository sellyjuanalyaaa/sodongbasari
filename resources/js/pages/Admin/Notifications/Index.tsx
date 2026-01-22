import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/layouts/AdminLayout';
import { Button } from '@/components/ui/button';
import { Bell, CheckCheck, Trash2, ExternalLink } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { id as idLocale } from 'date-fns/locale';

interface Notification {
    id: number;
    title: string;
    message: string;
    type: string;
    action_text: string | null;
    action_url: string | null;
    data: Record<string, any> | null;
    is_read: boolean;
    created_at: string;
}

interface Props {
    notifications: {
        data: Notification[];
        current_page: number;
        last_page: number;
    };
    unreadCount: number;
}

export default function Index({ notifications, unreadCount }: Props) {
    const handleMarkAsRead = (id: number) => {
        router.post(`/admin/notifications/${id}/mark-as-read`, {}, {
            preserveScroll: true,
        });
    };

    const handleMarkAllAsRead = () => {
        router.post('/admin/notifications/mark-all-read', {}, {
            preserveScroll: true,
        });
    };

    const handleDelete = (id: number) => {
        if (confirm('Hapus notifikasi ini?')) {
            router.delete(`/admin/notifications/${id}`, {
                preserveScroll: true,
            });
        }
    };

    const getTypeColor = (type: string) => {
        const colors = {
            success: 'bg-green-100 text-green-800 border-green-200',
            info: 'bg-blue-100 text-blue-800 border-blue-200',
            warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
            danger: 'bg-red-100 text-red-800 border-red-200',
        };
        return colors[type as keyof typeof colors] || colors.info;
    };

    const getTypeIcon = (type: string) => {
        const icons = {
            success: '✅',
            info: 'ℹ️',
            warning: '⚠️',
            danger: '❌',
        };
        return icons[type as keyof typeof icons] || icons.info;
    };

    return (
        <AdminLayout>
            <Head title="Notifikasi" />

            <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
                <div className="p-6 border-b border-slate-200">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
                                <Bell className="h-5 w-5" />
                                Notifikasi
                                {unreadCount > 0 && (
                                    <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                                        {unreadCount}
                                    </span>
                                )}
                            </h2>
                            <p className="text-sm text-slate-500 mt-1">Lihat semua notifikasi sistem</p>
                        </div>
                        {unreadCount > 0 && (
                            <Button
                                onClick={handleMarkAllAsRead}
                                variant="outline"
                                className="text-blue-600 border-blue-300 hover:bg-blue-50"
                            >
                                <CheckCheck className="h-4 w-4 mr-2" />
                                Tandai Semua Dibaca
                            </Button>
                        )}
                    </div>
                </div>

                <div className="divide-y divide-slate-100">
                    {notifications.data.length === 0 ? (
                        <div className="text-center py-16">
                            <Bell className="h-16 w-16 mx-auto text-slate-200 mb-4" />
                            <p className="text-slate-500">Belum ada notifikasi</p>
                        </div>
                    ) : (
                        notifications.data.map((notification) => (
                            <div
                                key={notification.id}
                                className={`p-6 hover:bg-slate-50 transition-colors ${
                                    !notification.is_read ? 'bg-orange-50/50' : ''
                                }`}
                            >
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0">
                                        <div
                                            className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${getTypeColor(
                                                notification.type
                                            )}`}
                                        >
                                            {getTypeIcon(notification.type)}
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-slate-900 mb-1">
                                                    {notification.title}
                                                    {!notification.is_read && (
                                                        <span className="ml-2 inline-block w-2 h-2 bg-orange-500 rounded-full"></span>
                                                    )}
                                                </h3>
                                                <p className="text-sm text-slate-600 mb-2">{notification.message}</p>
                                                {notification.data && Object.keys(notification.data).length > 0 && (
                                                    <div className="bg-slate-50 p-3 rounded-lg text-xs mt-2">
                                                        {Object.entries(notification.data).map(([key, value]) => (
                                                            <div key={key} className="flex gap-2 mb-1 last:mb-0">
                                                                <span className="font-medium text-slate-700">
                                                                    {key.replace(/_/g, ' ')}:
                                                                </span>
                                                                <span className="text-slate-600">{String(value)}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                                <p className="text-xs text-slate-400 mt-2">
                                                    {formatDistanceToNow(new Date(notification.created_at), {
                                                        addSuffix: true,
                                                        locale: idLocale,
                                                    })}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {notification.action_url && (
                                                    <Link href={notification.action_url}>
                                                        <Button size="sm" variant="ghost" className="text-blue-600 hover:bg-blue-50">
                                                            <ExternalLink className="h-4 w-4 mr-1" />
                                                            {notification.action_text || 'Lihat'}
                                                        </Button>
                                                    </Link>
                                                )}
                                                {!notification.is_read && (
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        onClick={() => handleMarkAsRead(notification.id)}
                                                        className="text-green-600 hover:bg-green-50"
                                                    >
                                                        <CheckCheck className="h-4 w-4" />
                                                    </Button>
                                                )}
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={() => handleDelete(notification.id)}
                                                    className="text-red-600 hover:bg-red-50"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {notifications.last_page > 1 && (
                    <div className="p-6 border-t border-slate-200 flex justify-center gap-2">
                        {Array.from({ length: notifications.last_page }, (_, i) => i + 1).map((page) => (
                            <Link
                                key={page}
                                href={`/admin/notifications?page=${page}`}
                                className={`px-3 py-1 rounded ${
                                    page === notifications.current_page
                                        ? 'bg-orange-500 text-white'
                                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                }`}
                            >
                                {page}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
