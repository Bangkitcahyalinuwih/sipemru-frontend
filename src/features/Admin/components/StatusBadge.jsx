export default function StatusBadge({ status, className = "" }) {
  const statusStyles = {
    Tersedia: "bg-emerald-500 text-emerald-950 border border-emerald-500",
    "Sedang Dipakai": "bg-red-600 text-white border border-red-500",
    Selesai: "bg-red-700 text-white border border-red-600",
    Terjadwal: "bg-cyan-500 text-cyan-950 border border-cyan-500",
    "Menunggu Konfirmasi": "bg-amber-500 text-slate-950 border border-amber-500",
    Berlangsung: "bg-blue-600 text-white border border-blue-500",
  };

  const badgeClass = statusStyles[status] || "bg-slate-500 text-white border border-slate-500";

  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${badgeClass} ${className}`}>
      {status}
    </span>
  );
}
