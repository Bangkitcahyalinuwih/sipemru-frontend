import { Users, Building2, MapPin, Info } from "lucide-react";

export function RoomInfo({ room }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
        <span className="w-1 h-5 bg-indigo-500 rounded-full"></span>
        Informasi Ruangan
      </h3>

      {/* Deskripsi Ruangan (Jika ada) */}
      {room?.description && (
        <div className="px-4 py-4 rounded-xl bg-slate-800/60 border border-slate-700/50 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <TypographyIcon className="w-4 h-4 text-indigo-400" /> {/* Menggunakan Info icon untuk deskripsi */}
            <Info className="w-4 h-4 text-indigo-400" />
            <span className="text-sm text-slate-400 font-medium">Deskripsi</span>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed">{room.description}</p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        {/* Nama Kampus */}
        {room?.campus && typeof room.campus !== 'object' && (
          <div className="px-4 py-4 rounded-xl bg-slate-800/60 border border-slate-700/50 hover:border-indigo-500/50 transition">
            <div className="flex items-center gap-2 mb-2">
              <Building2 className="w-4 h-4 text-indigo-400" />
              <span className="text-sm text-slate-400 font-medium">Kampus</span>
            </div>
            <p className="text-white font-bold text-base truncate">{room.campus}</p>
          </div>
        )}

        {/* Total Lantai */}
        {room?.floors && (
          <div className="px-4 py-4 rounded-xl bg-slate-800/60 border border-slate-700/50 hover:border-indigo-500/50 transition">
            <div className="flex items-center gap-2 mb-2">
              <Building2 className="w-4 h-4 text-indigo-400" />
              <span className="text-sm text-slate-400 font-medium">Total Lantai</span>
            </div>
            <p className="text-white font-bold text-lg">{room.floors}</p>
          </div>
        )}

        {/* Alamat / Lokasi */}
        {room?.address && (
          <div className="px-4 py-4 rounded-xl bg-slate-800/60 border border-slate-700/50 hover:border-indigo-500/50 transition col-span-2">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-indigo-400" />
              <span className="text-sm text-slate-400 font-medium">Alamat</span>
            </div>
            <p className="text-white text-sm">{room.address}</p>
          </div>
        )}
      </div>
    </div>
  );
}