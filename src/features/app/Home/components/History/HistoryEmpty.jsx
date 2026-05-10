import { Calendar } from "lucide-react";

export function HistoryEmpty() {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 py-20 text-center">

      <Calendar className="mx-auto w-12 h-12 text-gray-300 mb-4" />

      <h3 className="text-lg font-semibold text-gray-700">
        Belum Ada Booking
      </h3>

      <p className="text-gray-500 text-sm mt-1">
        Riwayat booking akan
        muncul di sini
      </p>
    </div>
  );
}