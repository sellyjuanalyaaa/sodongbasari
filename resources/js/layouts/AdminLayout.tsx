
import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import {
    LayoutDashboard,
    FileText,
    Mountain,
    Building2,
    Users,
    Receipt,
    Image as ImageIcon,
    LogOut,
    Menu,
    BarChart3,
    Tag,
    History,
    Target,
    Bell
} from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarProvider,
    SidebarTrigger,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

import { BreadcrumbItem } from '@/types';

interface AdminLayoutProps {
    children: React.ReactNode;
    title?: string;
    breadcrumbs?: BreadcrumbItem[];
}

export default function AdminLayout({ children, title, breadcrumbs }: AdminLayoutProps) {
    const { auth } = usePage().props as any;
    const user = auth.user;

    const navGroups = [
        {
            label: "Utama",
            items: [
                { label: "Dashboard", routeName: "admin.dashboard", icon: LayoutDashboard },
                {
                    label: "Notifikasi",
                    routeName: "admin.notifications.index",
                    active: "admin.notifications.*",
                    icon: Bell,
                    badge: (usePage().props as any).unreadNotificationsCount
                },
                { label: "Pengaturan Slider", routeName: "admin.hero.edit", active: "admin.hero.*", icon: ImageIcon },
                ...(user.role === 'super_admin' ? [
                    { label: "Manajemen User", routeName: "admin.users.index", active: "admin.users.*", icon: Users }
                ] : [])
            ]
        },
        {
            label: "Konten & Informasi",
            items: [
                { label: "Berita & Artikel", routeName: "admin.posts.index", active: "admin.posts.*", icon: FileText },
                { label: "Informasi Desa", routeName: "admin.village-info.edit", active: "admin.village-info.*", icon: Target },
            ]
        },
        {
            label: "Data Desa",
            items: [
                { label: "Potensi Desa", routeName: "admin.potentials.index", active: "admin.potentials.*", icon: Mountain },
                { label: "Lembaga Desa", routeName: "admin.institutions.index", active: "admin.institutions.*", icon: Building2 },
                { label: "Perangkat Desa", routeName: "admin.officials.index", active: "admin.officials.*", icon: Users },
                { label: "Riwayat Kepala Desa", routeName: "admin.former-village-heads.index", active: "admin.former-village-heads.*", icon: History },
                { label: "Data Penduduk", routeName: "admin.demographics.index", active: "admin.demographics.*", icon: Users },
                { label: "Daftar Pemilih Tetap", routeName: "admin.electoral-rolls.index", active: "admin.electoral-rolls.*", icon: Users },
                { label: "Anggaran Desa", routeName: "admin.budgets.index", active: "admin.budgets.*", icon: Receipt },
            ]
        },
        {
            label: "Statistik",
            items: [
                { label: "Statistik Desa", routeName: "admin.statistics.index", active: "admin.statistics.*", icon: BarChart3 },
                { label: "Statistik Beranda", routeName: "admin.home-statistics.index", active: "admin.home-statistics.*", icon: BarChart3 },
            ]
        }
    ];

    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full bg-[#FCFCFC] light" data-theme="light">
                <Sidebar collapsible="icon" className="border-r border-gray-100 bg-white text-gray-700 shadow-[2px_0_20px_-10px_rgba(0,0,0,0.05)]">
                    <SidebarHeader className="border-b border-transparent bg-white p-5">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-600 text-white font-bold shadow-lg shadow-orange-600/20 overflow-hidden">
                                <img src="/images/logo-kabupaten-pemalang.png" alt="Logo Kabupaten Pemalang" className="w-full h-full object-contain p-1" />
                            </div>
                            <div className="flex flex-col overflow-hidden group-data-[collapsible=icon]:hidden h-10 justify-center">
                                <span className="font-bold text-lg text-gray-900 leading-tight">
                                    SodongBasari
                                </span>
                                <span className="text-[10px] uppercase tracking-wider text-gray-400 font-medium">Dashboard</span>
                            </div>
                        </div>
                    </SidebarHeader>

                    <SidebarContent className="bg-white px-3 py-4">
                        {navGroups.map((group, index) => (
                            <SidebarGroup key={index} className="mb-2">
                                <SidebarGroupLabel className="text-gray-400 font-semibold px-2 py-2 text-[10px] uppercase tracking-widest">
                                    {group.label}
                                </SidebarGroupLabel>
                                <SidebarGroupContent>
                                    <SidebarMenu className="gap-1">
                                        {group.items.map((item) => {
                                            const isActive = route().current(item.active || item.routeName);
                                            return (
                                                <SidebarMenuItem key={item.routeName}>
                                                    <SidebarMenuButton
                                                        asChild
                                                        isActive={isActive}
                                                        tooltip={item.label}
                                                        className={`h-10 rounded-lg transition-all duration-200 font-medium px-3 group relative ${isActive
                                                            ? '!bg-orange-50 !text-orange-600'
                                                            : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                                                            }`}
                                                    >
                                                        <Link href={route(item.routeName)} className="flex items-center gap-3">
                                                            <item.icon className={`h-4.5 w-4.5 ${isActive ? "text-orange-600" : "text-gray-400 group-hover:text-gray-600 transition-colors"}`} />
                                                            <span className="text-sm">{item.label}</span>
                                                            {isActive && (
                                                                <div className="absolute right-2 top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-orange-600"></div>
                                                            )}
                                                            {/* Render badge if available */}
                                                            {item.badge !== undefined && item.badge > 0 && (
                                                                <span className="ml-auto bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                                                                    {item.badge}
                                                                </span>
                                                            )}
                                                        </Link>
                                                    </SidebarMenuButton>
                                                </SidebarMenuItem>
                                            );
                                        })}
                                    </SidebarMenu>
                                </SidebarGroupContent>
                            </SidebarGroup>
                        ))}
                    </SidebarContent>

                    <SidebarFooter className="border-t border-gray-50 bg-white p-4">
                        <div className="rounded-2xl bg-gradient-to-br from-orange-50 to-white border border-orange-100 p-4 mb-4 group-data-[collapsible=icon]:hidden">
                            <div className="flex items-center gap-2.5 mb-2">
                                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse ring-2 ring-emerald-100"></div>
                                <span className="text-xs font-semibold text-orange-800">System Online</span>
                            </div>
                            <p className="text-[10px] text-gray-500 leading-relaxed">Website berjalan dengan normal. Versi 1.0.0</p>
                        </div>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <SidebarMenuButton size="lg" className="hover:bg-gray-50 data-[state=open]:bg-gray-50 border border-transparent hover:border-gray-100 rounded-xl p-1.5 h-auto transition-all">
                                            <Avatar className="h-9 w-9 rounded-lg bg-orange-50 ring-2 ring-white shadow-sm">
                                                <AvatarImage src={user.profile_photo_url} alt={user.name} />
                                                <AvatarFallback className="rounded-lg bg-orange-100 text-orange-600 font-bold">A</AvatarFallback>
                                            </Avatar>
                                            <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden ml-3">
                                                <span className="truncate font-semibold text-gray-900">{user.name}</span>
                                                <span className="truncate text-xs text-gray-500">Administrator</span>
                                            </div>
                                        </SidebarMenuButton>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-2xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white p-1.5" side="bottom" align="end" sideOffset={8}>
                                        <DropdownMenuItem className="focus:bg-orange-50 focus:text-orange-600 rounded-xl cursor-pointer p-2.5 transition-colors" asChild>
                                            <Link href={route('profile.edit')} className="flex w-full items-center gap-2.5 font-medium text-sm text-gray-700">
                                                <Users className="h-4 w-4" />
                                                Profile Settings
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="focus:bg-red-50 focus:text-red-600 rounded-xl cursor-pointer p-2.5 transition-colors">
                                            <Link href={route('logout')} method="post" as="button" className="flex w-full items-center gap-2.5 text-red-600 font-medium text-sm">
                                                <LogOut className="h-4 w-4" />
                                                Log out
                                            </Link>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarFooter>
                </Sidebar>

                <main className="flex-1 flex flex-col min-h-screen bg-[#FCFCFC] w-full">
                    <header className="sticky top-0 z-10 flex h-20 shrink-0 items-center gap-2 bg-white/80 backdrop-blur-md px-6 border-b border-gray-100/50">
                        <SidebarTrigger className="-ml-2 text-gray-400 hover:text-orange-600 transition-colors" />
                        <div className="h-6 w-px bg-gray-200 mx-2"></div>
                        <div className="flex items-center gap-2 text-sm">
                            {breadcrumbs && breadcrumbs.length > 0 ? (
                                breadcrumbs.map((crumb, index) => (
                                    <React.Fragment key={index}>
                                        <span className={`font-medium ${index === breadcrumbs.length - 1 ? 'text-gray-900 font-semibold' : 'text-gray-400'}`}>
                                            {crumb.title}
                                        </span>
                                        {index < breadcrumbs.length - 1 && <span className="text-gray-300">/</span>}
                                    </React.Fragment>
                                ))
                            ) : (
                                <>
                                    <span className="text-gray-400 font-medium">Pages</span>
                                    <span className="text-gray-300">/</span>
                                    <span className="text-gray-900 font-semibold">{title || 'Dashboard'}</span>
                                </>
                            )}
                        </div>
                        <div className="flex-1"></div>
                        <div className="flex items-center gap-3">
                            <Link href={route('admin.notifications.index')}>
                                <div className="h-9 w-9 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-orange-600 hover:border-orange-100 cursor-pointer transition shadow-sm relative">
                                    <span className="sr-only">Notifications</span>
                                    <Bell className="h-[18px] w-[18px]" />
                                    {(usePage().props as any).unreadNotificationsCount > 0 && (
                                        <div className="absolute top-0 right-0 h-2.5 w-2.5 rounded-full bg-red-500 border border-white"></div>
                                    )}
                                </div>
                            </Link>
                        </div>
                    </header>
                    <div className="p-6 md:p-8 w-full max-w-7xl mx-auto space-y-8">
                        {children}
                    </div>
                </main>
            </div>
        </SidebarProvider>
    );
}
