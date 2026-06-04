import { motion } from "framer-motion";
import {
  Building2,
  Users,
  Layers3,
  ShieldCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Badge = ({ type }) => {
  const color =
    type === "lab"
      ? "bg-indigo-500/10 text-indigo-300 border-indigo-400/20"
      : type === "auditorium"
      ? "bg-purple-500/10 text-purple-300 border-purple-400/20"
      : "bg-emerald-500/10 text-emerald-300 border-emerald-400/20";

  return (
    <span
      className={`px-3 py-1 text-xs font-semibold rounded-full backdrop-blur-xl border capitalize ${color}`}
    >
      {type}
    </span>
  );
};

export function RoomList({ rooms = [] }) {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden -mt-24 py-10">
      {/* background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-150px] left-[5%] w-[450px] h-[450px] rounded-full bg-purple-600/15 blur-3xl" />
        <div className="absolute bottom-[-100px] right-[5%] w-[500px] h-[500px] rounded-full bg-pink-600/10 blur-3xl" />
        <div className="absolute top-[40%] left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-indigo-600/10 blur-3xl" />
      </div>

      <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {rooms.map((room) => (
          <motion.div
            key={room.id}
            whileHover={{ y: -10, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 220 }}
            className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.03] backdrop-blur-2xl min-h-[520px] shadow-2xl"
          >
            {/* image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={
                    room?.foto
                      ? room.foto.startsWith("http")
                        ? room.foto
                        : `http://localhost:8000/storage/${room.foto}`
                      : "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800"
                  }
                  alt={room?.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition"
                />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

              <div className="absolute top-4 right-4">
                <Badge type={room?.type} />
              </div>
            </div>

            {/* content */}
            <div className="relative p-6 text-white">
              <h3 className="text-xl font-semibold capitalize">
                {room?.name}
              </h3>

              <p className="text-xs text-gray-400 uppercase tracking-[0.2em] mt-1">
                KODE • {room?.code}
              </p>

              <div className="mt-5 space-y-3 text-sm text-gray-300">
                <div className="flex items-center gap-3">
                  <Users size={16} />
                  <span>{room?.capacity || 0} Orang</span>
                </div>

                <div className="flex items-center gap-3">
                  <Layers3 size={16} />
                  <span>Lantai {room?.floor || "-"}</span>
                </div>

                {/* 🔥 FIX OBJECT BUILDING ERROR */}
                <div className="flex items-center gap-3">
                  <ShieldCheck size={16} />
<span className="capitalize">
  Gedung: {room?.building?.name || "Gedung Utama"}
</span>
                </div>

                <div className="flex items-center gap-3">
                  <Building2 size={16} />
                  <span>{room?.type}</span>
                </div>
              </div>

              <p className="text-sm text-gray-400 mt-5 line-clamp-2">
                {room?.description || "-"}
              </p>

              {/* 🔥 FIX FACILITIES SAFE */}
              <div className="flex flex-wrap gap-2 mt-5">
                {Array.isArray(room?.facilities) &&
                  room.facilities.map((item, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 text-xs rounded-xl border border-white/10 bg-white/[0.03]"
                    >
                      {item}
                    </span>
                  ))}
              </div>

              <button
                onClick={() =>
                  navigate(`/room/${room.id}`, { state: room })
                }
                className="w-full mt-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold"
              >
                Lihat Detail
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}