import {
  Loader2,
  XCircle,
  CheckCircle2,
} from "lucide-react";

const STATUS = {
  APPROVED: "approved",
  PENDING: "pending",
  REJECTED: "rejected",
  CANCELLED: "cancelled",
};

export function HistoryStatusInfo({
  status,
}) {
  if (
    status ===
    STATUS.APPROVED
  ) {
    return (
      <div className="mt-5 pt-5 border-t border-gray-100">

        <div className="flex items-center gap-2 text-green-600 text-sm font-medium">

          <CheckCircle2 size={18} />

          Booking telah
          disetujui admin
        </div>
      </div>
    );
  }

  if (
    status ===
    STATUS.PENDING
  ) {
    return (
      <div className="mt-5 pt-5 border-t border-gray-100">

        <div className="flex items-center gap-2 text-yellow-600 text-sm font-medium">

          <Loader2
            size={18}
            className="animate-spin"
          />

          Menunggu
          persetujuan admin
        </div>
      </div>
    );
  }

  if (
    status ===
    STATUS.CANCELLED
  ) {
    return (
      <div className="mt-5 pt-5 border-t border-gray-100">

        <div className="flex items-center gap-2 text-red-600 text-sm font-medium">

          <XCircle size={18} />

          Booking telah
          dibatalkan
        </div>
      </div>
    );
  }

  return (
    <div className="mt-5 pt-5 border-t border-gray-100">

      <div className="flex items-center gap-2 text-red-600 text-sm font-medium">

        <XCircle size={18} />

        Booking ditolak
        admin
      </div>
    </div>
  );
}