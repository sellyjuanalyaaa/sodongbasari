// @ts-nocheck
import React, { useState } from 'react';
import PublicLayout from '@/layouts/PublicLayout';
import { Head, useForm } from '@inertiajs/react';
import SectionTitle from '@/components/SectionTitle';
import {
    FileText,
    MapPin,
    Briefcase,
    HeartHandshake,
    Shield,
    UserPlus,
    UserMinus,
    FileDigit,
    ArrowRight,
    CheckCircle2
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Service Definitions
const services = [
    {
        id: 'sku',
        title: 'Surat Keterangan Usaha',
        description: 'Untuk keperluan izin usaha, KUR, atau administrasi bisnis.',
        icon: Briefcase,
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
        fields: [
            { name: 'businessName', label: 'Nama Usaha', type: 'text', placeholder: 'Contoh: Warung Sejahtera' },
            { name: 'businessType', label: 'Jenis Usaha', type: 'text', placeholder: 'Contoh: Kuliner / Kelontong' },
            { name: 'businessAddress', label: 'Alamat Usaha', type: 'text', placeholder: 'Alamat lengkap tempat usaha' },
            { name: 'establishedYear', label: 'Tahun Berdiri', type: 'number', placeholder: 'Contoh: 2020' },
        ]
    },
    {
        id: 'domisili',
        title: 'Surat Keterangan Domisili',
        description: 'Bukti tempat tinggal sementara atau pindah.',
        icon: MapPin,
        color: 'text-emerald-600',
        bgColor: 'bg-emerald-50',
        fields: [
            { name: 'originAddress', label: 'Alamat Asal (Sesuai KTP)', type: 'text', placeholder: 'Alamat lengkap sesuai KTP' },
            { name: 'domicileAddress', label: 'Alamat Domisili Sekarang', type: 'text', placeholder: 'Alamat tempat tinggal di desa ini' },
            { name: 'reason', label: 'Keperluan', type: 'text', placeholder: 'Contoh: Bekerja, Mengontrak' },
        ]
    },
    {
        id: 'sktm',
        title: 'Surat Keterangan Tidak Mampu',
        description: 'Untuk beasiswa, jaminan kesehatan, atau bantuan sosial.',
        icon: HeartHandshake,
        color: 'text-rose-600',
        bgColor: 'bg-rose-50',
        fields: [
            { name: 'monthlyIncome', label: 'Penghasilan Rata-rata (Rp)', type: 'number', placeholder: 'Contoh: 500000' },
            { name: 'dependents', label: 'Jumlah Tanggungan', type: 'number', placeholder: 'Jumlah anak/istri' },
            { name: 'specificPurpose', label: 'Tujuan Penggunaan', type: 'text', placeholder: 'Contoh: Daftar BPJS PBI, KIP Kuliah' },
        ]
    },
    {
        id: 'skck',
        title: 'Pengantar SKCK',
        description: 'Surat pengantar untuk pembuatan SKCK di Polsek/Polres.',
        icon: Shield,
        color: 'text-purple-600',
        bgColor: 'bg-purple-50',
        fields: [
            { name: 'skckPurpose', label: 'Keperluan Pembuatan SKCK', type: 'text', placeholder: 'Contoh: Melamar Pekerjaan, Daftar PNS' },
        ]
    },
    {
        id: 'kelahiran',
        title: 'Keterangan Kelahiran',
        description: 'Pengantar untuk pembuatan Akta Kelahiran.',
        icon: UserPlus,
        color: 'text-cyan-600',
        bgColor: 'bg-cyan-50',
        fields: [
            { name: 'childName', label: 'Nama Anak', type: 'text', placeholder: 'Nama lengkap anak' },
            { name: 'birthDate', label: 'Tanggal Lahir', type: 'date', placeholder: '' },
            { name: 'birthPlace', label: 'Tempat Lahir', type: 'text', placeholder: 'Contoh: RSUD Pemalang' },
            { name: 'fatherName', label: 'Nama Ayah', type: 'text', placeholder: 'Nama lengkap ayah' },
            { name: 'motherName', label: 'Nama Ibu', type: 'text', placeholder: 'Nama lengkap ibu' },
        ]
    },
    {
        id: 'kematian',
        title: 'Keterangan Kematian',
        description: 'Pengantar untuk pembuatan Akta Kematian.',
        icon: UserMinus,
        color: 'text-slate-600',
        bgColor: 'bg-slate-100',
        fields: [
            { name: 'deceasedName', label: 'Nama Almarhum/ah', type: 'text', placeholder: 'Nama lengkap' },
            { name: 'deathDate', label: 'Tanggal Meninggal', type: 'date', placeholder: '' },
            { name: 'deathPlace', label: 'Tempat Meninggal', type: 'text', placeholder: 'Rumah Sakit / Rumah' },
            { name: 'deathReason', label: 'Penyebab Kematian', type: 'text', placeholder: 'Sakit / Tua / Kecelakaan' },
        ]
    },
];

export default function Services({ villageInfo }) {
    const [selectedService, setSelectedService] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Form state (simplified for frontend demo)
    const [formData, setFormData] = useState({
        fullName: '',
        nik: '',
        phone: '',
        details: {}
    });

    const handleServiceClick = (service) => {
        setSelectedService(service);
        setIsSubmitted(false);
        setFormData({
            fullName: '',
            nik: '',
            phone: '',
            details: {}
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleDetailChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            details: {
                ...prev.details,
                [name]: value
            }
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate backend submission
        setTimeout(() => {
            setIsSubmitted(true);
        }, 1000);
    };

    return (
        <PublicLayout villageInfo={villageInfo}>
            <Head title="Layanan Desa" />

            <div className="bg-slate-50 min-h-screen py-16 lg:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <SectionTitle
                        title="Layanan Mandiri"
                        subtitle="Urus Surat Keterangan Tanpa Antri"
                    />

                    <p className="max-w-2xl mx-auto text-center text-slate-600 mb-12 -mt-4">
                        Pilih jenis layanan yang Anda butuhkan, isi formulirnya secara online,
                        dan kami akan memproses permintaan dokumen Anda secepatnya.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.map((service) => (
                            <div
                                key={service.id}
                                onClick={() => handleServiceClick(service)}
                                className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:bg-[#FAFAFA] hover:border-[#EFA00B]/30 transition-all duration-300 cursor-pointer group"
                            >
                                <div className={`w-14 h-14 ${service.bgColor} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    <service.icon className={`w-7 h-7 ${service.color}`} />
                                </div>

                                <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-[#EFA00B] transition-colors">{service.title}</h3>
                                <p className="text-slate-500 mb-6 text-sm leading-relaxed">{service.description}</p>

                                <div className="flex items-center text-[#EFA00B] font-semibold text-sm group-hover:translate-x-2 transition-transform">
                                    Ajukan Sekarang <ArrowRight className="w-4 h-4 ml-2" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Application Modal */}
            <Dialog open={!!selectedService} onOpenChange={(open) => !open && setSelectedService(null)}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-2xl flex items-center gap-3">
                            {selectedService && (
                                <div className={`p-2 rounded-lg ${selectedService.bgColor}`}>
                                    <selectedService.icon className={`w-6 h-6 ${selectedService.color}`} />
                                </div>
                            )}
                            {isSubmitted ? 'Pengajuan Berhasil' : `Formulir ${selectedService?.title}`}
                        </DialogTitle>
                        <DialogDescription>
                            {isSubmitted
                                ? 'Permintaan Anda telah kami terima dan sedang diproses.'
                                : 'Lengkapi data di bawah ini dengan benar untuk memproses surat Anda.'}
                        </DialogDescription>
                    </DialogHeader>

                    {selectedService && !isSubmitted && (
                        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                            {/* Personal Information */}
                            <div className="space-y-4 border-b border-slate-100 pb-6">
                                <h4 className="font-semibold text-slate-800 flex items-center">
                                    <FileDigit className="w-4 h-4 mr-2" /> Data Pemohon
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="nik">NIK (Nomor Induk Kependudukan)</Label>
                                        <Input
                                            id="nik"
                                            name="nik"
                                            placeholder="16 digit NIK"
                                            required
                                            minLength={16}
                                            maxLength={16}
                                            value={formData.nik}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="fullName">Nama Lengkap</Label>
                                        <Input
                                            id="fullName"
                                            name="fullName"
                                            placeholder="Sesuai KTP"
                                            required
                                            value={formData.fullName}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <Label htmlFor="phone">Nomor HP / WhatsApp (Aktif)</Label>
                                        <Input
                                            id="phone"
                                            name="phone"
                                            type="tel"
                                            placeholder="08xxxxxxxxxx"
                                            required
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                        />
                                        <p className="text-[11px] text-slate-500">Notifikasi status surat akan dikirim melalui WhatsApp.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Specific Information */}
                            <div className="space-y-4">
                                <h4 className="font-semibold text-slate-800 flex items-center">
                                    <FileText className="w-4 h-4 mr-2" /> Detail {selectedService.title}
                                </h4>
                                <div className="grid grid-cols-1 gap-4">
                                    {selectedService.fields.map((field) => (
                                        <div key={field.name} className="space-y-2">
                                            <Label htmlFor={field.name}>{field.label}</Label>
                                            <Input
                                                id={field.name}
                                                name={field.name}
                                                type={field.type}
                                                placeholder={field.placeholder}
                                                required
                                                onChange={handleDetailChange}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <DialogFooter className="pt-4">
                                <Button type="button" variant="outline" onClick={() => setSelectedService(null)}>
                                    Batal
                                </Button>
                                <Button type="submit" className="bg-[#EFA00B] hover:bg-[#D48C00] text-white">
                                    Kirim Pengajuan
                                </Button>
                            </DialogFooter>
                        </form>
                    )}

                    {isSubmitted && (
                        <div className="py-8 text-center space-y-4">
                            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto animate-in zoom-in duration-300">
                                <CheckCircle2 className="w-10 h-10" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800">Terima Kasih!</h3>
                            <p className="text-slate-600 max-w-sm mx-auto">
                                Permintaan surat <strong>{selectedService.title}</strong> telah terkirim.
                                Silakan tunggu konfirmasi melalui WhatsApp atau datang ke kantor desa dengan membawa dokumen pendukung.
                            </p>
                            <Button className="mt-6 bg-slate-900 text-white hover:bg-slate-800" onClick={() => setSelectedService(null)}>
                                Tutup / Kembali ke Menu
                            </Button>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </PublicLayout>
    );
}
