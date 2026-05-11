import { usePage } from '@inertiajs/react';
import PublicLayoutModern from '@/layouts/PublicLayoutModern';
import { ArrowRight, MapPin, Users, Zap, Award } from 'lucide-react';

export default function ExamplePage() {
    const { villageInfo } = usePage().props as any;

    return (
        <PublicLayoutModern villageInfo={villageInfo}>
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-slate-50 to-slate-100 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center space-y-6">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
                            Selamat Datang di
                            <span className="block text-[#EFA00B]">Desa Sodong Basari</span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                            Jelajahi potensi dan keindahan desa kami melalui platform digital yang modern dan mudah diakses.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                            <button className="group inline-flex items-center justify-center gap-2 bg-[#EFA00B] text-white px-8 py-3 rounded-lg font-semibold transition-all hover:bg-[#D48C00] hover:shadow-lg">
                                Jelajahi Sekarang
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button className="inline-flex items-center justify-center gap-2 bg-white text-[#EFA00B] px-8 py-3 rounded-lg font-semibold border-2 border-[#EFA00B] transition-all hover:bg-orange-50">
                                Pelajari Lebih Lanjut
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                            Mengapa Memilih Kami?
                        </h2>
                        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                            Kami menyediakan layanan digital terbaik untuk desa Anda.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Feature Card 1 */}
                        <div className="group bg-white border border-slate-200 rounded-xl p-8 hover:border-[#EFA00B] hover:shadow-lg transition-all duration-300">
                            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#EFA00B] transition-colors">
                                <MapPin className="w-6 h-6 text-[#EFA00B] group-hover:text-white" />
                            </div>
                            <h3 className="text-lg font-semibold text-slate-900 mb-2">Lokasi Strategis</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                Terletak di lokasi yang strategis dengan akses mudah dari berbagai arah.
                            </p>
                        </div>

                        {/* Feature Card 2 */}
                        <div className="group bg-white border border-slate-200 rounded-xl p-8 hover:border-[#EFA00B] hover:shadow-lg transition-all duration-300">
                            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#EFA00B] transition-colors">
                                <Users className="w-6 h-6 text-[#EFA00B] group-hover:text-white" />
                            </div>
                            <h3 className="text-lg font-semibold text-slate-900 mb-2">Komunitas Aktif</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                Masyarakat yang aktif dan saling mendukung untuk pembangunan bersama.
                            </p>
                        </div>

                        {/* Feature Card 3 */}
                        <div className="group bg-white border border-slate-200 rounded-xl p-8 hover:border-[#EFA00B] hover:shadow-lg transition-all duration-300">
                            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#EFA00B] transition-colors">
                                <Zap className="w-6 h-6 text-[#EFA00B] group-hover:text-white" />
                            </div>
                            <h3 className="text-lg font-semibold text-slate-900 mb-2">Inovasi Terdepan</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                Menggunakan teknologi terkini untuk memberikan pelayanan terbaik.
                            </p>
                        </div>

                        {/* Feature Card 4 */}
                        <div className="group bg-white border border-slate-200 rounded-xl p-8 hover:border-[#EFA00B] hover:shadow-lg transition-all duration-300">
                            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#EFA00B] transition-colors">
                                <Award className="w-6 h-6 text-[#EFA00B] group-hover:text-white" />
                            </div>
                            <h3 className="text-lg font-semibold text-slate-900 mb-2">Berbagai Prestasi</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                Telah meraih berbagai penghargaan dan pengakuan dari berbagai lembaga.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gradient-to-r from-[#EFA00B] to-[#D48C00] py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center space-y-6">
                        <h2 className="text-3xl md:text-4xl font-bold text-white">
                            Siap untuk Berkembang?
                        </h2>
                        <p className="text-orange-50 text-lg max-w-2xl mx-auto">
                            Bergabunglah dengan kami dan jadilah bagian dari transformasi digital desa.
                        </p>
                        <div className="pt-4">
                            <button className="inline-flex items-center gap-2 bg-white text-[#EFA00B] px-8 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors">
                                Mulai Sekarang
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="bg-slate-900 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        <div>
                            <div className="text-5xl font-bold text-[#EFA00B] mb-2">5000+</div>
                            <p className="text-slate-300">Masyarakat Terlayani</p>
                        </div>
                        <div>
                            <div className="text-5xl font-bold text-[#EFA00B] mb-2">100+</div>
                            <p className="text-slate-300">Proyek Selesai</p>
                        </div>
                        <div>
                            <div className="text-5xl font-bold text-[#EFA00B] mb-2">50+</div>
                            <p className="text-slate-300">Penghargaan Diraih</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonial Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                            Apa Kata Mereka?
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Testimonial 1 */}
                        <div className="bg-slate-50 rounded-xl p-8 border border-slate-200 hover:border-[#EFA00B] transition-all">
                            <div className="flex gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} className="text-[#EFA00B]">★</span>
                                ))}
                            </div>
                            <p className="text-slate-600 mb-4 leading-relaxed">
                                "Website ini sangat membantu saya untuk mendapatkan informasi tentang desa dengan cepat dan mudah."
                            </p>
                            <div className="font-semibold text-slate-900">Bapak Warto</div>
                            <p className="text-slate-500 text-sm">Ketua RT Desa Sodong Basari</p>
                        </div>

                        {/* Testimonial 2 */}
                        <div className="bg-slate-50 rounded-xl p-8 border border-slate-200 hover:border-[#EFA00B] transition-all">
                            <div className="flex gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} className="text-[#EFA00B]">★</span>
                                ))}
                            </div>
                            <p className="text-slate-600 mb-4 leading-relaxed">
                                "Sangat terkesan dengan tampilan yang modern dan informasi yang lengkap. Terima kasih!"
                            </p>
                            <div className="font-semibold text-slate-900">Ibu Siti</div>
                            <p className="text-slate-500 text-sm">Pengusaha UMKM Lokal</p>
                        </div>

                        {/* Testimonial 3 */}
                        <div className="bg-slate-50 rounded-xl p-8 border border-slate-200 hover:border-[#EFA00B] transition-all">
                            <div className="flex gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} className="text-[#EFA00B]">★</span>
                                ))}
                            </div>
                            <p className="text-slate-600 mb-4 leading-relaxed">
                                "Aplikasi ini membuat saya lebih mudah mengakses layanan desa kapan saja dan dimana saja."
                            </p>
                            <div className="font-semibold text-slate-900">Andi Wijaya</div>
                            <p className="text-slate-500 text-sm">Pelajar Desa Sodong Basari</p>
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayoutModern>
    );
}
