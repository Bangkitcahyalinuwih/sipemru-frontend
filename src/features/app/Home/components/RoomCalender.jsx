import { Calendar } from "lucide-react";

export function RoomCalendar() {
  return (
    <div className="border rounded-xl p-4">
      <h3 className="font-semibold mb-2 flex items-center gap-2">
        <Calendar size={16} />
        Kalender Ketersediaan
      </h3>

      <div className="text-sm text-gray-500">
        (Nanti bisa pakai FullCalendar / custom grid)
      </div>
    </div>
  );
}