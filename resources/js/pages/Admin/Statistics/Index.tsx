import React, { useState } from 'react';
import AdminLayout from '@/layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Pencil, Trash2, Image as ImageIcon, Eye } from "lucide-react";
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
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

export default function Index({ statistics }: { statistics: any[] }) {
    const [viewData, setViewData] = useState<any | null>(null);

    const handleDelete = (id: number) => {
        router.delete(route('admin.statistics.destroy', id));
    };

    return (
        <AdminLayout title="Statistik Desa">
            <Head title="Statistik Desa" />

            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Statistik Desa</h1>
                    <p className="text-gray-500 mt-1">Kelola data statistik dan infografis anggaran desa.</p>
                </div>
                <Link href={route('admin.statistics.create')}>
                    <Button className="bg-orange-600 hover:bg-orange-700 text-white shadow-sm">
                        <Plus className="mr-2 h-4 w-4" /> Tambah Data
                    </Button>
                </Link>
            </div>

            <div className="rounded-lg border border-gray-100 bg-white shadow-sm overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-gray-50 border-b border-gray-100">
                            <TableHead className="w-[100px] text-gray-500">Tahun</TableHead>
                            <TableHead className="text-gray-500">Infografis</TableHead>
                            <TableHead className="text-center text-gray-500">Total Penduduk</TableHead>
                            <TableHead className="text-center text-gray-500">Laki-laki</TableHead>
                            <TableHead className="text-center text-gray-500">Perempuan</TableHead>
                            <TableHead className="text-center text-gray-500">Total KK</TableHead>
                            <TableHead className="text-right text-gray-500">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {statistics.map((item: any) => (
                            <TableRow key={item.id} className="hover:bg-gray-50 border-b border-gray-100">
                                <TableCell className="font-bold text-gray-700">{item.year}</TableCell>
                                <TableCell>
                                    {item.infographic_image ? (
                                        <div className="flex items-center gap-2 text-emerald-600">
                                            <ImageIcon className="h-4 w-4" />
                                            <span className="text-xs">Ada</span>
                                        </div>
                                    ) : (
                                        <span className="text-xs text-gray-400">Tidak ada</span>
                                    )}
                                </TableCell>
                                <TableCell className="text-center font-semibold text-gray-900">
                                    {item.total_population.toLocaleString()}
                                </TableCell>
                                <TableCell className="text-center text-gray-600">{item.male_population.toLocaleString()}</TableCell>
                                <TableCell className="text-center text-gray-600">{item.female_population.toLocaleString()}</TableCell>
                                <TableCell className="text-center text-gray-600">{item.total_families.toLocaleString()}</TableCell>
                                <TableCell className="text-right space-x-2">
                                    <Button variant="outline" size="sm" onClick={() => setViewData(item)}>
                                        <Eye className="h-4 w-4" />
                                    </Button>
                                    <Link href={route('admin.statistics.edit', item.id)}>
                                        <Button variant="outline" size="sm"><Pencil className="h-4 w-4" /></Button>
                                    </Link>

                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="destructive" size="sm"><Trash2 className="h-4 w-4" /></Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Hapus data tahun {item.year}?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Data statistik untuk tahun ini akan dihapus permanen.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Batal</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => handleDelete(item.id)} className="bg-red-600">
                                                    Hapus
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </TableCell>
                            </TableRow>
                        ))}
                        {statistics.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={7} className="h-24 text-center">Belum ada data statistik.</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Detail Dialog */}
            <Dialog open={!!viewData} onOpenChange={(open) => !open && setViewData(null)}>
                <DialogContent className="sm:max-w-[95vw] w-[95vw] max-h-[95vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Detail Statistik Tahun {viewData?.year}</DialogTitle>
                        <DialogDescription>
                            Data statistik lengkap desa tahun {viewData?.year}
                        </DialogDescription>
                    </DialogHeader>

                    {viewData && (
                        <div className="space-y-6">
                            {/* Infografis */}
                            {(viewData.infographic_image || viewData.infographic_image_right) && (
                                <div className="grid grid-cols-2 gap-4">
                                    {viewData.infographic_image && (
                                        <div>
                                            <h4 className="font-medium mb-2">Infografis Kiri</h4>
                                            <img src={viewData.infographic_image} alt="Infografis Kiri" className="w-full rounded border" />
                                        </div>
                                    )}
                                    {viewData.infographic_image_right && (
                                        <div>
                                            <h4 className="font-medium mb-2">Infografis Kanan</h4>
                                            <img src={viewData.infographic_image_right} alt="Infografis Kanan" className="w-full rounded border" />
                                        </div>
                                    )}
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                                {/* Penduduk */}
                                <div className="bg-slate-50 p-4 rounded-lg">
                                    <h3 className="font-semibold text-orange-600 mb-3 border-b border-slate-200 pb-2">Penduduk</h3>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between"><span>Total Penduduk:</span> <span className="font-medium">{viewData.total_population}</span></div>
                                        <div className="flex justify-between"><span>KK:</span> <span className="font-medium">{viewData.total_families}</span></div>
                                        <div className="flex justify-between"><span>Laki-laki:</span> <span className="font-medium">{viewData.male_population}</span></div>
                                        <div className="flex justify-between"><span>Perempuan:</span> <span className="font-medium">{viewData.female_population}</span></div>
                                        <div className="border-t border-slate-200 my-2 pt-2"></div>
                                        <div className="flex justify-between"><span>RT:</span> <span className="font-medium">{viewData.total_rt}</span></div>
                                        <div className="flex justify-between"><span>RW:</span> <span className="font-medium">{viewData.total_rw}</span></div>
                                        <div className="flex justify-between"><span>Dusun:</span> <span className="font-medium">{viewData.total_dusun}</span></div>
                                    </div>
                                </div>

                                {/* Pendidikan */}
                                <div className="bg-slate-50 p-4 rounded-lg">
                                    <h3 className="font-semibold text-orange-600 mb-3 border-b border-slate-200 pb-2">Pendidikan</h3>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between"><span>Tidak Sekolah:</span> <span className="font-medium">{viewData.tidak_sekolah}</span></div>
                                        <div className="flex justify-between"><span>SD:</span> <span className="font-medium">{viewData.sd_sederajat}</span></div>
                                        <div className="flex justify-between"><span>SMP:</span> <span className="font-medium">{viewData.smp_sederajat}</span></div>
                                        <div className="flex justify-between"><span>SMA:</span> <span className="font-medium">{viewData.sma_sederajat}</span></div>
                                        <div className="flex justify-between"><span>Diploma:</span> <span className="font-medium">{viewData.diploma}</span></div>
                                        <div className="flex justify-between"><span>Sarjana:</span> <span className="font-medium">{viewData.sarjana}</span></div>
                                    </div>
                                </div>

                                {/* Pekerjaan */}
                                <div className="bg-slate-50 p-4 rounded-lg">
                                    <h3 className="font-semibold text-orange-600 mb-3 border-b border-slate-200 pb-2">Pekerjaan</h3>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between"><span>Petani:</span> <span className="font-medium">{viewData.petani}</span></div>
                                        <div className="flex justify-between"><span>Pedagang:</span> <span className="font-medium">{viewData.pedagang}</span></div>
                                        <div className="flex justify-between"><span>PNS:</span> <span className="font-medium">{viewData.pns}</span></div>
                                        <div className="flex justify-between"><span>Wiraswasta:</span> <span className="font-medium">{viewData.wiraswasta}</span></div>
                                        <div className="flex justify-between"><span>Lainnya:</span> <span className="font-medium">{viewData.lainnya}</span></div>
                                    </div>
                                </div>

                                {/* Agama */}
                                <div className="bg-slate-50 p-4 rounded-lg">
                                    <h3 className="font-semibold text-orange-600 mb-3 border-b border-slate-200 pb-2">Agama</h3>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between"><span>Islam:</span> <span className="font-medium">{viewData.islam}</span></div>
                                        <div className="flex justify-between"><span>Kristen:</span> <span className="font-medium">{viewData.kristen}</span></div>
                                        <div className="flex justify-between"><span>Katolik:</span> <span className="font-medium">{viewData.katolik}</span></div>
                                        <div className="flex justify-between"><span>Hindu:</span> <span className="font-medium">{viewData.hindu}</span></div>
                                        <div className="flex justify-between"><span>Budha:</span> <span className="font-medium">{viewData.budha}</span></div>
                                    </div>
                                </div>

                                {/* Tempat Ibadah */}
                                <div className="bg-slate-50 p-4 rounded-lg">
                                    <h3 className="font-semibold text-orange-600 mb-3 border-b border-slate-200 pb-2">Tempat Ibadah</h3>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between"><span>Masjid:</span> <span className="font-medium">{viewData.masjid}</span></div>
                                        <div className="flex justify-between"><span>Mushola:</span> <span className="font-medium">{viewData.mushola}</span></div>
                                        <div className="flex justify-between"><span>Gereja:</span> <span className="font-medium">{viewData.gereja}</span></div>
                                        <div className="flex justify-between"><span>Pura:</span> <span className="font-medium">{viewData.pura}</span></div>
                                        <div className="flex justify-between"><span>Vihara:</span> <span className="font-medium">{viewData.vihara}</span></div>
                                    </div>
                                </div>

                                {/* Fasilitas Kesehatan */}
                                <div className="bg-slate-50 p-4 rounded-lg">
                                    <h3 className="font-semibold text-orange-600 mb-3 border-b border-slate-200 pb-2">Fasilitas Kesehatan</h3>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between"><span>Puskesmas:</span> <span className="font-medium">{viewData.puskesmas}</span></div>
                                        <div className="flex justify-between"><span>Posyandu:</span> <span className="font-medium">{viewData.posyandu}</span></div>
                                        <div className="flex justify-between"><span>Klinik:</span> <span className="font-medium">{viewData.klinik}</span></div>
                                    </div>
                                </div>

                                {/* Fasilitas Olahraga */}
                                <div className="bg-slate-50 p-4 rounded-lg">
                                    <h3 className="font-semibold text-orange-600 mb-3 border-b border-slate-200 pb-2">Fasilitas Olahraga</h3>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between"><span>Sepakbola:</span> <span className="font-medium">{viewData.lapangan_sepakbola}</span></div>
                                        <div className="flex justify-between"><span>Voli:</span> <span className="font-medium">{viewData.lapangan_voli}</span></div>
                                        <div className="flex justify-between"><span>Badminton:</span> <span className="font-medium">{viewData.lapangan_badminton}</span></div>
                                        <div className="flex justify-between"><span>GOR:</span> <span className="font-medium">{viewData.gor}</span></div>
                                    </div>
                                </div>

                                {/* Wisata */}
                                <div className="bg-slate-50 p-4 rounded-lg">
                                    <h3 className="font-semibold text-orange-600 mb-3 border-b border-slate-200 pb-2">Fasilitas Wisata</h3>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between"><span>Pantai:</span> <span className="font-medium">{viewData.pantai}</span></div>
                                        <div className="flex justify-between"><span>Taman:</span> <span className="font-medium">{viewData.taman}</span></div>
                                        <div className="flex justify-between"><span>Cagar Budaya:</span> <span className="font-medium">{viewData.cagar_budaya}</span></div>
                                        <div className="flex justify-between"><span>Wisata Alam:</span> <span className="font-medium">{viewData.wisata_alam}</span></div>
                                    </div>
                                </div>

                                {/* Migrasi / Dinamika */}
                                <div className="bg-slate-50 p-4 rounded-lg">
                                    <h3 className="font-semibold text-orange-600 mb-3 border-b border-slate-200 pb-2">Migrasi & Dinamika</h3>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between"><span>Penduduk Datang:</span> <span className="font-medium">{viewData.penduduk_datang}</span></div>
                                        <div className="flex justify-between"><span>Penduduk Keluar:</span> <span className="font-medium">{viewData.penduduk_keluar}</span></div>
                                        <div className="flex justify-between"><span>Kelahiran:</span> <span className="font-medium">{viewData.kelahiran}</span></div>
                                        <div className="flex justify-between"><span>Kematian:</span> <span className="font-medium">{viewData.kematian}</span></div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </AdminLayout>
    );
}
