import { Loader2 } from "lucide-react";

export function HistoryLoading() {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4">

      <Loader2
        size={40}
        className="animate-spin text-blue-600"
      />

      <p className="text-gray-500">
        Memuat data booking...
      </p>
    </div>
  );
}