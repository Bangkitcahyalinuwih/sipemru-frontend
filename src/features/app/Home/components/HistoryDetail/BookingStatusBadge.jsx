import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";

export function BookingStatusBadge({ status }) {
  const base =
    "px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit backdrop-blur-md border";

  const config = {
    approved: {
      label: "Disetujui",
      style:
        "bg-green-500/10 text-green-300 border-green-400/30 shadow-[0_0_10px_rgba(34,197,94,0.15)]",
      icon: CheckCircle2,
    },
    pending: {
      label: "Pending",
      style:
        "bg-yellow-500/10 text-yellow-300 border-yellow-400/30 shadow-[0_0_10px_rgba(234,179,8,0.15)]",
      icon: AlertCircle,
    },
    rejected: {
      label: "Ditolak",
      style:
        "bg-red-500/10 text-red-300 border-red-400/30 shadow-[0_0_10px_rgba(239,68,68,0.15)]",
      icon: XCircle,
    },
  };

  const current = config[status] || {
    label: "Dibatalkan",
    style:
      "bg-gray-500/10 text-gray-300 border-gray-400/30 shadow-[0_0_10px_rgba(156,163,175,0.1)]",
    icon: AlertCircle,
  };

  const Icon = current.icon;

  return (
    <span className={`${base} ${current.style}`}>
      <Icon size={14} />
      {current.label}
    </span>
  );
}