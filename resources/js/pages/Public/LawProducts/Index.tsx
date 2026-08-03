import { AccentImage3, CloudAccent } from "@/components/ImageAccents";
import { DotsPattern, OrangeAccentBottom, OrangeAccentTop } from "@/components/SvgDecorations";
import { Card, CardContent } from "@/components/ui/card";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import PublicLayout from "@/layouts/PublicLayout";
import { Input } from "@headlessui/react";
import { Button } from '@/components/ui/button';
import { Badge } from "@/components/ui/badge";
import { Head, Link, router } from "@inertiajs/react";
import { CalendarDays, ChevronLeft, ChevronRight, Download, FileCheck2, FileText, Filter, RefreshCw, Search, SlidersHorizontal } from "lucide-react";
import { formatDate } from "date-fns";
import { id } from 'date-fns/locale';
import { getIcon } from "@/lib/icons";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function LawProducts({ villageInfo, lawProducts, category, stats, filters, years }: { villageInfo: any; lawProducts: any; category: any; stats: any, filters: any, years: [] }) {
    const [values, setValues] = useState(filters);
    const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

    function applyFilter(data: Partial<typeof values>) {
        router.get(
            route("laws"),
            {
                ...values,
                ...data,
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            }
        );
    }

    const resetFilter = () => {
        setValues("");
        router.get(
            route("laws"),
            {},
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            }
        );
    }

    const activeFilterCount = Object.values(filters).filter(
        (value) => value !== "" && value !== null && value !== undefined
    ).length;

    function goToPage(page: number) {
        router.get(
            route("laws"),
            {
                ...values,
                page,
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            }
        );
    }

    function getPageNumbers(current: number, last: number) {
        const pages: (number | 'ellipsis')[] = [];
        const delta = 1;

        for (let i = 1; i <= last; i++) {
            if (
                i === 1 ||
                i === last ||
                (i >= current - delta && i <= current + delta)
            ) {
                pages.push(i);
            } else if (pages[pages.length - 1] !== 'ellipsis') {
                pages.push('ellipsis');
            }
        }

        return pages;
    }

    return (
        <PublicLayout villageInfo={villageInfo}>
            <Head title="Produk Hukum Desa" />

            <div className="relative min-h-screen overflow-hidden bg-white pt-32 pb-20">
                <OrangeAccentBottom className="right-0 top-0 opacity-100 rotate-180" />
                <OrangeAccentTop className="left-0 bottom-0 opacity-60" />
                <DotsPattern className="left-10 top-20 opacity-20" />
                <AccentImage3 className="left-[-5%] bottom-[-5%] w-150 opacity-10 -rotate-12" />
                <AccentImage3 className="right-[-10%] top-[36%] w-125 opacity-5 rotate-12" />
                <CloudAccent className="top-[18%] left-[8%] w-38.75 h-38.75 opacity-17 rotate-30" />
                <CloudAccent className="bottom-[52%] right-[12%] w-36.25 h-36.25 opacity-18 -rotate-20" />
                <CloudAccent className="top-[58%] right-[28%] w-40 h-40 opacity-16 rotate-25" />
                <CloudAccent className="bottom-[10%] left-[50%] w-35 h-35 opacity-19 -rotate-35" />

                <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
                    <div className="text-center mb-12 sm:mb-16">
                        <div className="inline-block px-3 sm:px-4 py-1.5 bg-orange-50 border border-orange-200 rounded-full mb-4">
                            <span className="inline-flex gap-2 text-[#EFA00B] text-xs font-medium uppercase tracking-wide">
                                <FileCheck2 className="size-3.5" />
                                Arsip Resmi Desa
                            </span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-slate-900 mb-3 tracking-tight">Produk Hukum Desa</h2>
                        <p className="mx-auto max-w-2xl text-slate-500 text-xs sm:text-sm font-light">
                            Pusat arsip resmi untuk mencari, membaca, dan mengunduh produk hukum desa secara cepat, tertib, dan mudah dipahami masyarakat.
                        </p>
                    </div>

                    {/* Summary Card Section */}
                    <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        <Card className="border-slate-200/80 shadow-sm">
                            <CardContent className="flex items-center gap-4 p-5">
                                <div className="flex size-12 items-center justify-center rounded-2xl bg-orange-50 text-[#EFA00B]">
                                    <FileText className="size-6" />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                                        Total Dokumen
                                    </p>
                                    <p className="mt-1 text-3xl font-semibold tracking-tight text-slate-900">
                                        {lawProducts.total}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="border-slate-200/80 shadow-sm">
                            <CardContent className="flex items-center gap-4 p-5">
                                <div className="flex size-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                                    <CalendarDays className="size-6" />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                                        Dokumen Tahun Ini
                                    </p>
                                    <p className="mt-1 text-3xl font-semibold tracking-tight text-slate-900">
                                        {stats.docThisYear}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="border-slate-200/80 shadow-sm">
                            <CardContent className="flex items-center gap-4 p-5">
                                <div className="flex size-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                                    <SlidersHorizontal className="size-6" />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                                        Jumlah Kategori
                                    </p>
                                    <p className="mt-1 text-3xl font-semibold tracking-tight text-slate-900">
                                        {stats.totalCat}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="border-slate-200/80 shadow-sm">
                            <CardContent className="flex items-center gap-4 p-5">
                                <div className="flex size-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-600">
                                    <RefreshCw className="size-6" />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                                        Terakhir Diperbarui
                                    </p>
                                    <p className="mt-1 text-sm font-semibold text-slate-900">
                                        {formatDate(stats.lastUpdate, 'dd MMMM, yyyy', { locale: id })}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </section>

                    {/* Filter & Search Section */}
                    <section className="mt-8 rounded-4xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">

                        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#EFA00B]">Filter Dokumen</p>
                                <h2 className="mt-1 text-xl font-semibold tracking-tight text-slate-900">Saring arsip tanpa kehilangan konteks</h2>
                                <p className="mt-2 text-sm text-slate-600">6 dari {lawProducts.total} dokumen ditampilkan.</p>
                            </div>
                            <div className="mt-8">
                                <div className="relative">
                                    <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-400" />
                                    <Input
                                        value={values.search ?? ""}
                                        onChange={(e) => {
                                            const search = e.target.value;
                                            setValues({ ...values, search });
                                            applyFilter({ search });
                                        }}
                                        placeholder="Cari nomor peraturan, judul, atau kata kunci..."
                                        className="h-14 w-full rounded-2xl border-slate-200 bg-white/95 pl-12 pr-4 text-base shadow-sm focus-visible:border-orange-500"
                                    />
                                </div>
                            </div>

                            {/* Mobile Filter Button */}
                            <div className="flex items-center gap-3 lg:hidden">
                                <Button type="button" variant="outline" onClick={() => setMobileFilterOpen(true)} className="h-11 rounded-xl border-slate-200 text-slate-700">
                                    <Filter className="size-4" />
                                    Filter
                                    {activeFilterCount > 0 &&
                                        <span className="ml-1 rounded-full bg-[#EFA00B] px-2 py-0.5 text-[11px] font-semibold text-white">
                                            {activeFilterCount}
                                        </span>
                                    }
                                </Button>
                                <Button type="button" variant="ghost" onClick={resetFilter} className="h-11 rounded-xl text-slate-600">Reset</Button>
                            </div>
                        </div>

                        <div className="mt-5 hidden lg:block">
                            <div className="grid gap-4 grid-cols-1 lg:grid-cols-4 xl:grid-cols-5">

                                {/* Category Filter */}
                                <Select
                                    value={values.category ?? ""}
                                    onValueChange={(category) => {
                                        setValues({
                                            ...values,
                                            category,
                                        });
                                        applyFilter({
                                            category,
                                        });
                                    }}
                                >
                                    <SelectTrigger className="h-11 rounded-xl border-slate-200 bg-white text-slate-900 shadow-sm focus:ring-orange-500/20 cursor-pointer">
                                        <SelectValue placeholder="Pilih Kategori"></SelectValue>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="" className="cursor-pointer">Semua</SelectItem>
                                        {category.map((category: any) => (
                                            <SelectItem
                                                key={category.id}
                                                value={category.id.toString()}
                                                className="cursor-pointer"
                                            >
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                {/* Year Filter */}
                                <Select
                                    value={values.years?.toString() ?? ""}
                                    onValueChange={(years) => {
                                        setValues({
                                            ...values,
                                            years,
                                        })
                                        applyFilter({
                                            years,
                                        });
                                    }}
                                >
                                    <SelectTrigger className="h-11 rounded-xl border-slate-200 bg-white text-slate-900 shadow-sm focus:ring-orange-500/20 cursor-pointer">
                                        <SelectValue placeholder="Pilih Tahun Penetapan"></SelectValue>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="" className="cursor-pointer">Semua</SelectItem>
                                        {years.map((year: number) => (
                                            <SelectItem
                                                key={year}
                                                value={year.toString()}
                                                className="cursor-pointer"
                                            >
                                                {year}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                {/* Status Filter */}
                                <Select
                                    value={values.status ?? ""}
                                    onValueChange={(status) => {
                                        setValues({
                                            ...values,
                                            status,
                                        })
                                        applyFilter({
                                            status,
                                        });
                                    }}
                                >
                                    <SelectTrigger className="h-11 rounded-xl border-slate-200 bg-white text-slate-900 shadow-sm focus:ring-orange-500/20 cursor-pointer">
                                        <SelectValue placeholder="Pilih Status"></SelectValue>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="" className="cursor-pointer">Semua</SelectItem>
                                        <SelectItem key="active" value="active" className="cursor-pointer">Berlaku</SelectItem>
                                        <SelectItem key="edited" value="edited" className="cursor-pointer">Diubah</SelectItem>
                                        <SelectItem key="revoked" value="revoked" className="cursor-pointer">Dicabut</SelectItem>
                                    </SelectContent>
                                </Select>

                                {/* Sorting */}
                                <Select
                                    value={values.sorting ?? ""}
                                    onValueChange={(sorting) => {
                                        setValues({
                                            ...values,
                                            sorting,
                                        })
                                        applyFilter({
                                            sorting,
                                        });
                                    }}
                                >
                                    <SelectTrigger className="h-11 rounded-xl border-slate-200 bg-white text-slate-900 shadow-sm focus:ring-orange-500/20 cursor-pointer">
                                        <SelectValue placeholder="Urutkan Dokumen"></SelectValue>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem key="popular" value="popular" className="cursor-pointer">Terpopuler</SelectItem>
                                        <SelectItem key="oldest" value="oldest" className="cursor-pointer">Terlama</SelectItem>
                                        <SelectItem key="a-z" value="a-z" className="cursor-pointer">A-Z</SelectItem>
                                        <SelectItem key="z-a" value="z-a" className="cursor-pointer">Z-A</SelectItem>
                                    </SelectContent>
                                </Select>

                                {/* Reset Filter */}
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={resetFilter}
                                    className="h-11 w-full rounded-xl border-slate-200 text-slate-700 hover:border-orange-200 hover:bg-orange-50 hover:text-[#EFA00B]"
                                >
                                    <RefreshCw className="size-4" />
                                    Reset Filter
                                </Button>

                            </div>
                        </div>
                    </section>

                    {/* Document Card */}
                    <section className="mt-8 space-y-4">
                        {lawProducts && lawProducts.total > 0 ? (
                            lawProducts.data.map((item: any) => {
                                const Icon = getIcon(item.category.icon)
                                return (
                                    <Card className="p-2 group overflow-hidden border-slate-200/80 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-md">
                                        <CardContent className="p-3 sm:p-4">
                                            <div className="gap-2 sm:flex-row sm:items-center sm:gap-4">

                                                {/* Upper: badges + title + meta */}
                                                <div className="min-w-0 flex-1 space-y-1">
                                                    <div className="flex flex-wrap items-center gap-1.5">
                                                        <div className='flex items-center gap-1.5 rounded-md border px-2 py-1 shadow-sm'
                                                            style={{
                                                                backgroundColor: `${item.category.color}20`,
                                                                borderColor: `${item.category.color}70`,
                                                                color: `${item.category.color}`,
                                                            }}
                                                        >
                                                            {Icon && <Icon className="size-3" />}
                                                            <h4 className="text-[10px] font-semibold uppercase tracking-[0.14em]">{item.category.name}</h4>
                                                        </div>
                                                        {item.status === 'active' ? (
                                                            <Badge className="border-emerald-200 bg-emerald-50 text-emerald-700">Berlaku</Badge>
                                                        ) : item.status === 'edited' ? (
                                                            <Badge className="border-amber-200 bg-amber-50 text-amber-700">Diubah</Badge>
                                                        ) : (
                                                            <Badge className="border-slate-200 bg-slate-100 text-slate-600">Dicabut</Badge>
                                                        )}
                                                    </div>

                                                    <h3 className="truncate text-sm font-semibold leading-snug text-slate-900 transition-colors group-hover:text-[#EFA00B] sm:text-[15px]">
                                                        {item.title}
                                                    </h3>
                                                    <p className="line-clamp-1 text-sm leading-relaxed text-slate-600">
                                                        {item.description}
                                                    </p>
                                                </div>

                                                {/* Lower: action */}
                                                <div className="flex shrink-0 items-center justify-between border-t border-slate-100 pt-2 sm:border-t-0 sm:pt-0">
                                                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-500">
                                                        <span className="inline-flex items-center gap-1">
                                                            <CalendarDays className="size-3 text-slate-400" />
                                                            {formatDate(item.establish, 'dd MMMM, yyyy', { locale: id })}
                                                        </span>
                                                        <span className="hidden text-slate-300 sm:inline">•</span>
                                                        <span>{item.extension} • {item.file_size}</span>
                                                        <span className="hidden text-slate-300 sm:inline">•</span>
                                                        <span className="inline-flex items-center gap-1">
                                                            <Download className="size-3 text-slate-400" />
                                                            {item.downloads.toLocaleString('id-ID')}
                                                        </span>
                                                    </div>

                                                    <div className="flex gap-3">
                                                        <Link href={route('laws.show', item.slug)}>
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                className="h-8 border-slate-200 px-2.5 text-xs text-slate-700 hover:border-orange-200 hover:bg-orange-50 hover:text-[#EFA00B]"
                                                            >
                                                                Lihat Detail
                                                            </Button>
                                                        </Link>
                                                        <a href={route('laws.download', item.slug)}>
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                className="h-8 bg-[#EFA00B] px-2.5 text-xs text-white hover:bg-[#D48C00] hover:text-white"
                                                            >
                                                                Unduh
                                                                <Download className="size-3.5" />
                                                            </Button>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                )
                            })
                        ) : (
                            <Card className="border-slate-200/80 shadow-sm">
                                <CardContent className="py-16 text-center sm:py-20">
                                    <div className="mx-auto flex size-20 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-300"><FileText className="size-9" /></div>
                                    <h3 className="mt-6 text-xl font-semibold text-slate-900">Dokumen tidak ditemukan.</h3>
                                    <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-600">Coba ubah kata kunci atau filter pencarian.</p>
                                    <Button type="button" variant="outline" className="mt-6 h-11 rounded-xl border-slate-200 text-slate-700 hover:border-orange-200 hover:bg-orange-50 hover:text-[#EFA00B]">
                                        Reset Filter
                                    </Button>
                                </CardContent>
                            </Card>
                        )}
                    </section>
                </div>

                {/* Pagination */}
                {lawProducts && lawProducts.total > 0 && lawProducts.last_page > 1 && (
                    <section className="mt-8 flex flex-col gap-4 rounded-4xl border border-slate-200 bg-white px-4 py-4 shadow-sm sm:px-6 lg:flex-row lg:items-center lg:justify-between">
                        <p className="text-sm text-slate-600">
                            Menampilkan {lawProducts.from}-{lawProducts.to} dari {lawProducts.total} dokumen.
                        </p>
                        <div className="flex items-center justify-center gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => goToPage(lawProducts.current_page - 1)}
                                disabled={lawProducts.current_page === 1}
                                className="rounded-xl border-slate-200"
                            >
                                <ChevronLeft className="size-4" />
                                Prev
                            </Button>

                            <div className="flex items-center gap-2">
                                {getPageNumbers(lawProducts.current_page, lawProducts.last_page).map((page, index) =>
                                    page === 'ellipsis' ? (
                                        <span key={`ellipsis-${index}`} className="px-1 text-sm text-slate-400">
                                            ...
                                        </span>
                                    ) : (
                                        <Button
                                            key={page}
                                            type="button"
                                            variant={page === lawProducts.current_page ? 'default' : 'outline'}
                                            size="sm"
                                            onClick={() => goToPage(page)}
                                            className={
                                                page === lawProducts.current_page
                                                    ? 'min-w-10 rounded-xl bg-[#EFA00B] px-3 text-white hover:bg-[#D48C00]'
                                                    : 'min-w-10 rounded-xl border-slate-200 px-3 text-slate-700'
                                            }
                                        >
                                            {page}
                                        </Button>
                                    )
                                )}
                            </div>

                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => goToPage(lawProducts.current_page + 1)}
                                disabled={lawProducts.current_page === lawProducts.last_page}
                                className="rounded-xl border-slate-200"
                            >
                                Next
                                <ChevronRight className="size-4" />
                            </Button>
                        </div>
                    </section>
                )}

                {/* Mobile Filter Sheet */}
                <Sheet open={mobileFilterOpen} onOpenChange={setMobileFilterOpen}>
                    <SheetContent side="bottom" className="h-[86vh] rounded-t-4xl border-slate-200 px-4 pb-4 pt-6 sm:px-6">
                        <SheetHeader className="space-y-2 px-0">
                            <SheetTitle className="text-left text-xl font-semibold text-slate-900">Filter Produk Hukum</SheetTitle>
                            <SheetDescription className="text-left text-sm text-slate-600">Gunakan filter untuk mempersempit arsip dokumen pada perangkat mobile.</SheetDescription>
                        </SheetHeader>
                        <div className="flex flex-col mt-6 overflow-y-auto pr-1 gap-3">

                            {/* Category Filter */}
                            <Select
                                value={values.category ?? ""}
                                onValueChange={(category) => {
                                    setValues({
                                        ...values,
                                        category,
                                    });
                                    applyFilter({
                                        category,
                                    });
                                }}
                            >
                                <SelectTrigger className="h-11 rounded-xl border-slate-200 bg-white text-slate-900 shadow-sm focus:ring-orange-500/20 cursor-pointer">
                                    <SelectValue placeholder="Pilih Kategori"></SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="" className="cursor-pointer">Semua</SelectItem>
                                    {category.map((category: any) => (
                                        <SelectItem
                                            key={category.id}
                                            value={category.id.toString()}
                                            className="cursor-pointer"
                                        >
                                            {category.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            {/* Year Filter */}
                            <Select
                                value={values.years?.toString() ?? ""}
                                onValueChange={(years) => {
                                    setValues({
                                        ...values,
                                        years,
                                    })
                                    applyFilter({
                                        years,
                                    });
                                }}
                            >
                                <SelectTrigger className="h-11 rounded-xl border-slate-200 bg-white text-slate-900 shadow-sm focus:ring-orange-500/20 cursor-pointer">
                                    <SelectValue placeholder="Pilih Tahun Penetapan"></SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="" className="cursor-pointer">Semua</SelectItem>
                                    {years.map((year: number) => (
                                        <SelectItem
                                            key={year}
                                            value={year.toString()}
                                            className="cursor-pointer"
                                        >
                                            {year}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            {/* Status Filter */}
                            <Select
                                value={values.status ?? ""}
                                onValueChange={(status) => {
                                    setValues({
                                        ...values,
                                        status,
                                    })
                                    applyFilter({
                                        status,
                                    });
                                }}
                            >
                                <SelectTrigger className="h-11 rounded-xl border-slate-200 bg-white text-slate-900 shadow-sm focus:ring-orange-500/20 cursor-pointer">
                                    <SelectValue placeholder="Pilih Status"></SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="" className="cursor-pointer">Semua</SelectItem>
                                    <SelectItem key="active" value="active" className="cursor-pointer">Berlaku</SelectItem>
                                    <SelectItem key="edited" value="edited" className="cursor-pointer">Diubah</SelectItem>
                                    <SelectItem key="revoked" value="revoked" className="cursor-pointer">Dicabut</SelectItem>
                                </SelectContent>
                            </Select>

                        </div>
                        <SheetFooter className="mt-6 flex-row gap-3 px-0">
                            <Button type="button" variant="outline" onClick={resetFilter} className="h-11 flex-1 rounded-xl border-slate-200 text-slate-700">Reset Filter</Button>
                        </SheetFooter>
                    </SheetContent>
                </Sheet>
            </div>
        </PublicLayout>
    )
}