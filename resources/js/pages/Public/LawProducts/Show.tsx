import { AccentImage3, CloudAccent } from "@/components/ImageAccents";
import { DotsPattern, OrangeAccentBottom, OrangeAccentTop } from "@/components/SvgDecorations";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PublicLayout from "@/layouts/PublicLayout";
import { getIcon } from "@/lib/icons";
import { Head, Link } from "@inertiajs/react";
import { formatDate } from "date-fns";
import { id } from 'date-fns/locale';
import { ArrowLeft, ArrowRight, Download, FileText, FileWarning, TypeIcon } from "lucide-react";

export default function LawShow({ villageInfo, lawProduct, related }: { villageInfo: any; lawProduct: any; related: any }) {
	const Icon = getIcon(lawProduct.category.icon)

	return (
		<PublicLayout villageInfo={villageInfo}>
			<Head title={lawProduct.title} />

			<div className="relative min-h-screen overflow-hidden bg-white pb-20 pt-32">
				<OrangeAccentBottom className="right-0 top-0 rotate-180 opacity-100" />
				<OrangeAccentTop className="bottom-0 left-0 opacity-60" />
				<DotsPattern className="left-10 top-20 opacity-20" />
				<AccentImage3 className="bottom-[-5%] left-[-5%] w-150 -rotate-12 opacity-10" />
				<AccentImage3 className="right-[-10%] top-[36%] w-125 rotate-12 opacity-5" />
				<CloudAccent className="left-[8%] top-[18%] h-38.75 w-38.75 rotate-30 opacity-17" />

				<div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
					<Link
						href={route('laws')}
						className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-[#EFA00B]"
					>
						<ArrowLeft className="size-4" />
						Kembali ke daftar produk hukum
					</Link>

					<div className="mt-5 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
						<div className="flex flex-wrap items-center gap-2">
							<div className="flex gap-1.5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] rounded-md border"
								style={{
									backgroundColor: `${lawProduct.category.color}20`,
									borderColor: `${lawProduct.category.color}70`,
									color: `${lawProduct.category.color}`,
								}}
							>
								{Icon && <Icon className="size-3.5" /> }
								{lawProduct.category.name}
							</div>
							{lawProduct.status === 'active' ? (
								<Badge className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wide border-emerald-200 bg-emerald-50 text-emerald-700">Berlaku</Badge>
							) : lawProduct.status === 'edited' ? (
								<Badge className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wide border-amber-200 bg-amber-50 text-amber-700">Diubah</Badge>
							) : (
								<Badge className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wide border-slate-200 bg-slate-100 text-slate-600">Dicabut</Badge>
							)}
						</div>

						<h1 className="mt-4 text-2xl font-semibold leading-tight text-slate-900 sm:text-3xl">
							{lawProduct.title}
						</h1>

						{/* Upper Card Description */}
						<div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
							<Card className="border-slate-200 shadow-none">
								<CardContent className="p-3">
									<p className="text-[11px] uppercase tracking-wide text-slate-500">
										Penetapan
									</p>
									<p className="mt-1 text-sm font-semibold text-slate-900">
										{formatDate(lawProduct.establish, 'dd MMMM, yyyy', { locale: id })}
									</p>
								</CardContent>
							</Card>
							<Card className="border-slate-200 shadow-none">
								<CardContent className="p-3">
									<p className="text-[11px] uppercase tracking-wide text-slate-500">
										Format
									</p>
									<p className="mt-1 text-sm font-semibold text-slate-900">
										{lawProduct.extension}
									</p>
								</CardContent>
							</Card>
							<Card className="border-slate-200 shadow-none">
								<CardContent className="p-3">
									<p className="text-[11px] uppercase tracking-wide text-slate-500">
										Ukuran
									</p>
									<p className="mt-1 text-sm font-semibold text-slate-900">
										{lawProduct.file_size}
									</p>
								</CardContent>
							</Card>
							<Card className="border-slate-200 shadow-none">
								<CardContent className="p-3">
									<p className="text-[11px] uppercase tracking-wide text-slate-500">
										Unduhan
									</p>
									<p className="mt-1 text-sm font-semibold text-slate-900">
										{lawProduct.downloads.toLocaleString('id-ID')}
									</p>
								</CardContent>
							</Card>
						</div>

						<div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
							{lawProduct.fileUrl ? (
								<a href={route('laws.download', lawProduct.slug)} rel="noreferrer" className="inline-flex">
									<Button className="h-11 rounded-xl bg-[#EFA00B] text-white hover:bg-[#D48C00] cursor-pointer">
										<Download className="size-4" />
										Unduh Dokumen
									</Button>
								</a>
							) : (
								<Button disabled className="h-11 rounded-xl bg-slate-300 text-white">
									<FileWarning className="size-4" />
									File belum tersedia
								</Button>
							)}
							<p className="text-xs text-slate-500">
								Dipublikasikan {formatDate(lawProduct.created_at, 'dd MMMM, yyyy', { locale: id })} • Diperbarui {formatDate(lawProduct.updated_at, 'dd MMMM, yyyy', { locale: id })}
							</p>
						</div>
					</div>

					<div className="mt-6 grid gap-6 lg:grid-cols-[1.65fr_1fr]">

						{/* File Preview */}
						<section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
							<h2 className="mb-4 text-lg font-semibold text-slate-900">Preview Dokumen</h2>

							{!lawProduct.fileUrl && (
								<div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-12 text-center">
									<FileText className="mx-auto size-10 text-slate-300" />
									<p className="mt-3 text-sm text-slate-600">Preview belum tersedia karena file dokumen belum diunggah.</p>
								</div>
							)}

							{lawProduct.fileUrl && (
								<iframe
									title={`Preview ${lawProduct.title}`}
									src={lawProduct.fileUrl}
									className="h-[70vh] w-full rounded-2xl border border-slate-200"
								/>
							)}

							{!lawProduct.fileUrl && (
								<div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-12 text-center">
									<FileText className="mx-auto size-10 text-slate-300" />
									<p className="mt-3 text-sm text-slate-600">
										Format file tidak mendukung preview langsung. Gunakan tombol download untuk membuka dokumen.
									</p>
								</div>
							)}
						</section>

						<aside className="space-y-6">
							<section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
								<h2 className="text-lg font-semibold text-slate-900">Deskripsi Dokumen</h2>
								<p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-700">
									{lawProduct.description || lawProduct.summary}
								</p>
							</section>

							<section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
								<h2 className="text-lg font-semibold text-slate-900">Dokumen Terkait</h2>
								<div className="mt-4 space-y-3">
									{related.length > 0 ? related.map((item: any) => (
										<Link
											key={item.id}
											href={route('laws.show', item.slug)}
											className="block rounded-xl border border-slate-200 p-3 transition-colors hover:border-orange-200"
										>
											<p className="line-clamp-2 text-sm font-semibold text-slate-900">{item.title}</p>
											<p className="mt-1 text-xs text-slate-500">{item.description}</p>
										</Link>
									)) : (
										<p className="text-sm text-slate-500">Belum ada dokumen terkait.</p>
									)}
								</div>
								<Link href={route('laws')} className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-[#EFA00B] hover:text-[#D48C00]">
									Lihat semua dokumen
									<ArrowRight className="size-4" />
								</Link>
							</section>
						</aside>
					</div>
				</div>
			</div>
		</PublicLayout>
	)
}