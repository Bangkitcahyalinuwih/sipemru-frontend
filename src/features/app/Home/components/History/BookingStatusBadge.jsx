import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";

export function BookingStatusBadge({ status }) {
  const base =
    "px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 w-fit";

  const config = {
    approved: {
      label: "Disetujui",
      style: "bg-green-100 text-green-700",
      icon: CheckCircle2,
    },
    pending: {
      label: "Pending",
      style: "bg-yellow-100 text-yellow-700",
      icon: AlertCircle,
    },
    rejected: {
      label: "Ditolak",
      style: "bg-red-100 text-red-700",
      icon: XCircle,
    },
  };

  const current = config[status] || {
    label: "Unknown",
    style: "bg-gray-100 text-gray-700",
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