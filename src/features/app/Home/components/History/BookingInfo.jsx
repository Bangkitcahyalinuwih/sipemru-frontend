export function BookingInfo({ booking }) {
  const date = booking.booking_date || booking.date;
  const start = booking.start_time || booking.startTime;
  const end = booking.end_time || booking.endTime;

  const room =
    booking.room?.name || booking.room;

  const building =
    booking.room?.building?.name || booking.building;

  return (
    <div className="text-gray-600 text-sm space-y-1">
      <p>
        Tanggal:{" "}
        {date
          ? new Date(date).toLocaleDateString("id-ID", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })
          : "-"}
      </p>

      <p>
        Waktu: {start || "-"} - {end || "-"}
      </p>

      <p>Ruangan: {room || "-"}</p>
      <p>Gedung: {building || "-"}</p>
    </div>
  );
}
