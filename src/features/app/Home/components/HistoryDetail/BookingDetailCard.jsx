import { BookingInfo } from "./BookingInfo";
import { BookingQR } from "./BookingQr";
import { BookingStatusBadge } from "./BookingStatusBadge";


export function BookingDetailCard({ booking }) {
  return (
    <div className="bg-white rounded-2xl shadow p-6 space-y-4">

      <h1 className="text-2xl font-bold">
        {booking.purpose || "Tanpa Judul"}
      </h1>

      <BookingStatusBadge status={booking.status} />

      <BookingInfo booking={booking} />

      {booking.admin_notes && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
          {booking.admin_notes}
        </div>
      )}

      <BookingQR booking={booking} />

    </div>
  );
}