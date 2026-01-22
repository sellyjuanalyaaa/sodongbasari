
export default function PotentialGrid({ potentials, categoryColors }: { potentials: any, categoryColors?: Record<string, string> }) {
    if (!potentials || potentials.length === 0) return <div className="text-center text-slate-500">Belum ada data potensi.</div>;

    const getCategoryColor = (category: string) => {
        // Ambil warna dari database, fallback ke orange
        return categoryColors?.[category] || 'from-orange-500 to-amber-500';
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {potentials.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-sm border border-slate-100 overflow-hidden hover:shadow-lg transition group">
                    <div className="h-56 bg-slate-200 relative overflow-hidden">
                        <img
                            src={item.image_path || `https://placehold.co/600x400?text=${item.name}`}
                            alt={item.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-4 right-4">
                            <div className={`bg-gradient-to-r ${getCategoryColor(item.category)} px-3 py-1.5 rounded-lg text-xs font-medium text-white uppercase tracking-wide shadow-lg`}>
                                {item.category}
                            </div>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                            <h3 className="text-white text-lg font-bold">{item.name}</h3>
                        </div>
                    </div>
                    <div className="p-6">
                        <p className="text-slate-600 text-sm mb-4 line-clamp-3">{item.description}</p>
                        <div className="flex items-center text-sm text-slate-500">
                            <span className="mr-2">📍</span> {item.location || 'Lokasi tidak tersedia'}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
