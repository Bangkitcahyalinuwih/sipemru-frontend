import React from "react";
import { 
  Building2, 
  MapPin, 
  Info, 
  Layers, 
  Users, 
  Tag, 
  Hash,
  Briefcase
} from "lucide-react";

export function RoomInfo({ room }) {
  const formatFacilities = (facilities) => {
    if (!facilities) return "-";
    if (Array.isArray(facilities)) {
      // Mapping jika array berisi objek atau string langsung
      return facilities.map(f => typeof f === "object" ? f?.name : f).join(", ");
    }
    return facilities;
  };

  return (
    <div className="space-y-6">
      
      {/* DESKRIPSI RUANGAN */}
      <div>
        <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
          <span className="w-1 h-5 bg-indigo-500 rounded-full"></span>
          Deskripsi Ruangan
        </h3>
        <p className="text-slate-300 text-sm leading-relaxed bg-slate-800/30 p-4 rounded-xl border border-slate-700/30">
          {room?.description || "Tidak ada deskripsi mengenai ruangan ini."}
        </p>
      </div>

      {/* GRID INFORMASI DETAIL */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <span className="w-1 h-5 bg-indigo-500 rounded-full"></span>
          Detail Spesifikasi
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Tipe Ruangan */}
          <div className="px-4 py-3.5 rounded-xl bg-slate-800/40 border border-slate-700/50">
            <div className="flex items-center gap-2 mb-1">
              <Tag className="w-4 h-4 text-indigo-400" />
              <span className="text-xs text-slate-400 font-medium">Tipe Kategori</span>
            </div>
            <p className="text-white font-bold text-sm capitalize">{room?.type || "-"}</p>
          </div>

          {/* Kapasitas */}
          <div className="px-4 py-3.5 rounded-xl bg-slate-800/40 border border-slate-700/50">
            <div className="flex items-center gap-2 mb-1">
              <Users className="w-4 h-4 text-indigo-400" />
              <span className="text-xs text-slate-400 font-medium">Kapasitas Maksimal</span>
            </div>
            <p className="text-white font-bold text-sm">{room?.capacity ? `${room.capacity} Orang` : "-"}</p>
          </div>

          {/* Posisi Lantai */}
          <div className="px-4 py-3.5 rounded-xl bg-slate-800/40 border border-slate-700/50">
            <div className="flex items-center gap-2 mb-1">
              <Layers className="w-4 h-4 text-indigo-400" />
              <span className="text-xs text-slate-400 font-medium">Posisi Lantai</span>
            </div>
            <p className="text-white font-bold text-sm">{room?.floor ? `Lantai ${room.floor}` : "-"}</p>
          </div>

          {/* Status Keaktifan */}
          <div className="px-4 py-3.5 rounded-xl bg-slate-800/40 border border-slate-700/50">
            <div className="flex items-center gap-2 mb-1">
              <Info className="w-4 h-4 text-indigo-400" />
              <span className="text-xs text-slate-400 font-medium">Status Operasional</span>
            </div>
            <p className={`text-sm font-bold ${room?.is_active ? "text-green-400" : "text-red-400"}`}>
              {room?.is_active ? "Tersedia / Aktif" : "Tidak Aktif"}
            </p>
          </div>

          {/* Fasilitas */}
          <div className="px-4 py-3.5 rounded-xl bg-slate-800/40 border border-slate-700/50 sm:col-span-2">
            <div className="flex items-center gap-2 mb-1">
              <Briefcase className="w-4 h-4 text-indigo-400" />
              <span className="text-xs text-slate-400 font-medium">Daftar Fasilitas</span>
            </div>
            <p className="text-slate-200 text-sm leading-relaxed">{formatFacilities(room?.facilities)}</p>
          </div>

          {/* Alamat Gedung */}
          {room?.address && (
            <div className="px-4 py-3.5 rounded-xl bg-slate-800/40 border border-slate-700/50 sm:col-span-2">
              <div className="flex items-center gap-2 mb-1">
                <MapPin className="w-4 h-4 text-indigo-400" />
                <span className="text-xs text-slate-400 font-medium">Alamat Lengkap</span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">{room.address}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}