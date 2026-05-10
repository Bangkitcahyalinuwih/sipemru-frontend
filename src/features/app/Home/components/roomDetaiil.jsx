import { RoomCalendar } from "./RoomCalender";
import { RoomInfo } from "./RoomInfo";

export function RoomDetailCard({
  room,
  onBooking,
}) {
  return (
    <div
      className="
        bg-white/5 backdrop-blur-2xl
        border border-white/10
        rounded-3xl overflow-hidden
        shadow-2xl shadow-black/30
        text-white
      "
    >
      <div className="relative h-72 overflow-hidden">

        <div className="absolute inset-0 bg-black/20 z-10" />

        <img
          src={
            room.foto ||
            "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200"
          }
          alt={room.name}
          className="
            w-full h-full object-cover
            hover:scale-105
            transition duration-700
          "
        />
        <div className="absolute top-5 right-5 z-20">
          <span
            className="
              px-3 py-1 rounded-full
              text-xs font-semibold
              bg-indigo-500/20
              border border-indigo-400/20
              backdrop-blur-md
              text-indigo-200
            "
          >
            {room.type}
          </span>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <RoomInfo room={room} />
        <div>
          <h3 className="text-sm font-semibold text-gray-300 mb-2">
            Deskripsi
          </h3>

          <p className="text-sm text-gray-400 leading-relaxed">
            {room.description ||
              "Tidak ada deskripsi ruangan"}
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-300 mb-3">
            Fasilitas
          </h3>

          <div className="flex flex-wrap gap-2">
            {room.facilities?.length > 0 ? (
              room.facilities.map((item, index) => (
                <span
                  key={index}
                  className="
                    px-3 py-1.5 rounded-xl
                    text-xs
                    bg-white/10
                    border border-white/10
                    text-gray-300
                  "
                >
                  {item}
                </span>
              ))
            ) : (
              <span className="text-sm text-gray-500">
                Tidak ada fasilitas
              </span>
            )}
          </div>
        </div>
        <RoomCalendar room={room} />

        <button
          onClick={onBooking}
          className="
            w-full py-3 rounded-2xl
            text-sm font-medium
            bg-gradient-to-r
            from-indigo-500 to-purple-600
            hover:from-indigo-600
            hover:to-purple-700
            transition
            shadow-lg shadow-purple-500/20
            cursor-pointer
          "
        >
          Booking Ruangan
        </button>
      </div>
    </div>
  );
}