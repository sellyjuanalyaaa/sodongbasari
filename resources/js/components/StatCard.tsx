// @ts-nocheck
export default function StatCard({ label, value, icon }) {
    return (
        <div className="bg-white p-8 rounded-2xl shadow-[0_5px_25px_-5px_rgba(0,0,0,0.05)] border border-slate-100 flex items-center space-x-5 hover:shadow-[0_10px_30px_-5px_rgba(239,160,11,0.15)] hover:-translate-y-1 transition-all duration-300 group">
            <div className="p-4 bg-[#FFF8E6] text-[#EFA00B] rounded-2xl group-hover:bg-[#EFA00B] group-hover:text-white transition-colors duration-300">
                {icon}
            </div>
            <div>
                <p className="text-sm text-slate-500 font-medium uppercase tracking-wide">{label}</p>
                <p className="text-2xl font-bold text-slate-900">{value}</p>
            </div>
        </div>
    );
}
