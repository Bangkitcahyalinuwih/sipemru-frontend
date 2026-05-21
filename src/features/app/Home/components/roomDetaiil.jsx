import RoomCalendar from "./RoomCalender";
import { RoomInfo } from "./RoomInfo";

export function RoomDetailCard({ room, onBooking }) {
  return (
    <div className="bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden shadow-2xl">
      <div className="relative h-80 overflow-hidden group">
        <img
          src={
            room.foto ||
            "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200"
          }
          alt={room.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
        <div className="absolute top-6 right-6 z-10">
          <span className="px-4 py-2 rounded-full text-xs font-bold bg-indigo-500 text-white shadow-lg shadow-indigo-500/30 backdrop-blur-sm">
            {room.type}
          </span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
          <h2 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
            {room.name}
          </h2>
        </div>
      </div>

      <div className="p-8 space-y-8">
        <RoomInfo room={room} />
        <div>
          <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <span className="w-1 h-5 bg-indigo-500 rounded-full"></span>
            Deskripsi
          </h3>
          <p className="text-slate-300 leading-relaxed">
            {room.description || "Tidak ada deskripsi ruangan tersedia."}
          </p>
        </div>
        
        <div>
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-1 h-5 bg-indigo-500 rounded-full"></span>
            Fasilitas
          </h3>
          
          {room.facilities?.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {room.facilities.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-800/60 border border-slate-700/50 hover:border-indigo-500/50 transition-colors group"
                >
                  <div className="w-2 h-2 rounded-full bg-indigo-400 group-hover:bg-indigo-300 transition-colors"></div>
                  <span className="text-sm text-slate-200 font-medium">
                    {item}
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

        <div>
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span className="w-1 h-5 bg-indigo-500 rounded-full"></span>
            Jadwal Penggunaan
          </h3>
          <RoomCalendar room={room} />
        </div>

        <div className="pt-4">
          <button
            onClick={onBooking}
            className="
              w-full py-4 rounded-xl
              text-base font-bold
              bg-gradient-to-r from-indigo-600 to-purple-600
              hover:from-indigo-500 hover:to-purple-500
              active:scale-[0.98]
              transition-all duration-200
              shadow-xl shadow-indigo-500/25
              hover:shadow-2xl hover:shadow-indigo-500/40
              text-white
              relative overflow-hidden
              group
            "
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
                />
              </svg>
              Booking Ruangan Sekarang
            </span>

            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          </button>
          
          <p className="text-center text-slate-400 text-xs mt-3">
            Pastikan jadwal Anda tidak bentrok dengan penggunaan lain
          </p>
        </div>
      </div>
    </div>
  );
}