import { RoomInfo } from "./RoomInfo";
import RoomCalendar from "./RoomCalendar";

export function RoomDetailCard({ room, onBooking }) {
  // Ambil nama kampus dengan aman jika sewaktu-waktu backend mengirim 'campus' sebagai objek atau string
  const campusName = typeof room?.campus === "object" ? room?.campus?.name : room?.campus;

  return (
    <div className="bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden shadow-2xl">

      {/* HEADER IMAGE */}
      <div className="relative h-80 overflow-hidden group">
        <img
          src={
            room?.foto ||
            "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200"
          }
          alt={room?.name || "Foto Ruangan"}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

        {/* BADGE: Diganti ke Kampus karena properti 'type' tidak ada di data kamu */}
        {campusName && (
          <div className="absolute top-6 right-6 z-10">
            <span className="px-4 py-2 rounded-full text-xs font-bold bg-indigo-500 text-white shadow-lg">
              {campusName}
            </span>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
          <h2 className="text-3xl font-bold text-white">
            {room?.name || "Nama Ruangan Tidak Tersedia"}
          </h2>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-8 space-y-8">

        {/* INFO */}
        <RoomInfo room={room} />

        {/* DESKRIPSI */}
        <div>
          <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <span className="w-1 h-5 bg-indigo-500 rounded-full"></span>
            Deskripsi
          </h3>
          <p className="text-slate-300 leading-relaxed">
            {room?.description || "Tidak ada deskripsi ruangan tersedia."}
          </p>
        </div>

        {/* FASILITAS */}
        <div>
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-1 h-5 bg-indigo-500 rounded-full"></span>
            Fasilitas
          </h3>

          {room?.facilities && Array.isArray(room.facilities) && room.facilities.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {room.facilities.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-800/60 border border-slate-700/50 hover:border-indigo-500/50 transition"
                >
                  <div className="w-2 h-2 rounded-full bg-indigo-400"></div>
                  <span className="text-sm text-slate-200 font-medium">
                    {/* Memastikan 'item' berupa string, bukan objek */}
                    {typeof item === "object" ? item?.name : item}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="px-4 py-8 rounded-xl bg-slate-800/40 border border-dashed border-slate-700/50 text-center">
              <p className="text-slate-400 text-sm">
                Belum ada informasi fasilitas
              </p>
            </div>
          )}
        </div>

        {/* JADWAL */}
        <div>
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-1 h-5 bg-indigo-500 rounded-full"></span>
            Jadwal Penggunaan
          </h3>

          <RoomCalendar room={room} />
        </div>

        {/* BUTTON BOOKING */}
        <div className="pt-4">
          <button
            onClick={onBooking}
            className="
              w-full py-4 rounded-xl
              font-bold text-white
              bg-gradient-to-r from-indigo-600 to-purple-600
              hover:from-indigo-500 hover:to-purple-500
              transition-all duration-200
              shadow-xl
            "
          >
            Booking Ruangan Sekarang
          </button>

          <p className="text-center text-slate-400 text-xs mt-3">
            Pastikan jadwal tidak bentrok
          </p>
        </div>

      </div>
    </div>
  );
}