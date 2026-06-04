import React from "react";
import { RoomInfo } from "./RoomInfo";
import RoomCalendar from "./RoomCalendar";

export function RoomDetailCard({ room, onBooking }) {
  const campusName = typeof room?.campus === "object" ? room?.campus?.name : room?.campus;

  const getRoomImage = (item) => {
    if (!item) return "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200";
    if (item.photo_url) return item.photo_url;
    if (item.foto) {
      if (item.foto.startsWith('http')) return item.foto;
      return `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/storage/${item.foto}`;
    }
    return "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200";
  };

  return (
    <div className="bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden shadow-2xl">
      <div className="relative h-80 overflow-hidden group bg-slate-950">
        <img
          src={getRoomImage(room)}
          alt={room?.name || "Foto Ruangan"}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
        {campusName && (
          <div className="absolute top-6 right-6 z-10">
            <span className="px-4 py-2 rounded-full text-xs font-bold bg-indigo-600/90 text-white backdrop-blur-sm shadow-lg border border-indigo-500/30">
              {campusName}
            </span>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
          <h2 className="text-3xl font-bold text-white drop-shadow-md">
            {room?.name || "Nama Ruangan Tidak Tersedia"}
          </h2>
          {room?.code && (
            <p className="text-xs font-mono text-indigo-300 mt-1 drop-shadow">
              ID Ruangan: {room.code}
            </p>
          )}
        </div>
      </div>

      <div className="p-6 sm:p-8 space-y-8">
        <RoomInfo room={room} />
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="w-1 h-5 bg-indigo-500 rounded-full"></span>
            Jadwal Penggunaan
          </h3>
          <div className="rounded-xl overflow-hidden border border-slate-700/40 bg-slate-900/30 p-2 sm:p-4">
            <RoomCalendar room={room} />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800/60">
          <button
            onClick={onBooking}
            className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all duration-200 shadow-xl active:scale-[0.995]"
          >
            Booking Ruangan Sekarang
          </button>

          <p className="text-center text-slate-400 text-xs mt-3">
            Pastikan jadwal tidak bentrok dengan melihat kalender di atas.
          </p>
        </div>

      </div>
    </div>
  );
}