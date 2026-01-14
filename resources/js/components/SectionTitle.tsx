// @ts-nocheck
export default function SectionTitle({ title, subtitle }) {
    return (
        <div className="text-center mb-12">
            <span className="text-[#EFA00B] font-bold tracking-widest uppercase text-sm mb-2 block">{subtitle}</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-800 mt-2 tracking-tight">{title}</h2>
            <div className="w-24 h-1.5 bg-[#EFA00B] mx-auto mt-5 rounded-full"></div>
        </div>
    );
}
