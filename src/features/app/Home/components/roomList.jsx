import { motion } from "framer-motion";
import { Building2, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

/* ================= DATA ================= */

const rooms = [
  {
    id: 1,
    name: "Ruang A-211",
    building: "Gedung A",
    capacity: 40,
    status: "available",
    description:
      "Ruang kelas modern dengan fasilitas lengkap seperti proyektor, AC, dan kursi ergonomis.",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
  },
  {
    id: 2,
    name: "Lab Komputer B-301",
    building: "Gedung B",
    capacity: 30,
    status: "available",
    image:
      "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=600&fit=crop",
  },
  {
    id: 3,
    name: "Ruang Meeting C-101",
    building: "Gedung C",
    capacity: 15,
    status: "full",
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop",
  },
];

const Badge = ({ status }) => (
  <span
    className={`px-3 py-1 text-xs font-semibold rounded-full backdrop-blur-md border
    ${
      status === "available"
        ? "bg-green-500/20 text-green-300 border-green-400/30"
        : "bg-red-500/20 text-red-300 border-red-400/30"
    }`}
  >
    {status === "available" ? "Tersedia" : "Penuh"}
  </span>
);

export function RoomList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filtered = rooms.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.building.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative w-full bg-transparent text-white">
      <div className="max-w-7xl mx-auto px-4 py-20">

        {/* HEADER */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold">Ruangan Tersedia</h2>
          <p className="text-gray-400 text-sm mt-1">
            Pilih ruangan sesuai kebutuhan kamu
          </p>
        </div>

        {/* SEARCH GLASS */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Cari ruangan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full md:w-1/2 px-5 py-3 rounded-2xl
              bg-white/10 backdrop-blur-xl
              border border-white/20
              text-white placeholder-gray-400
              outline-none
              focus:ring-2 focus:ring-purple-500/50
              transition
            "
          />
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {filtered.map((room) => (
            <motion.div
              key={room.id}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="
                relative rounded-3xl overflow-hidden
                bg-white/5 backdrop-blur-2xl
                border border-white/10
                shadow-xl shadow-black/20
              "
            >
              {/* glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-60" />

              {/* IMAGE */}
              <div className="h-48 overflow-hidden">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover hover:scale-110 transition duration-500"
                />
              </div>

              {/* CONTENT */}
              <div className="p-5 relative z-10">

                <h3 className="font-semibold text-lg">{room.name}</h3>

                <p className="text-sm text-gray-400 flex items-center gap-1 mt-1">
                  <Building2 size={14} />
                  {room.building}
                </p>

                <p className="text-sm text-gray-400 flex items-center gap-1 mt-1">
                  <Users size={14} />
                  {room.capacity} Orang
                </p>

                <div className="mt-3 mb-4">
                  <Badge status={room.status} />
                </div>

                <button
                  onClick={() =>
                    navigate(`/room/${room.id}`, { state: room })
                  }
                  className="
                    w-full py-2.5 rounded-xl text-sm font-medium
                    bg-gradient-to-r from-indigo-500 to-purple-600
                    hover:from-indigo-600 hover:to-purple-700
                    transition
                    shadow-lg shadow-purple-500/20
                  "
                >
                  Lihat Detail
                </button>
              </div>
            </motion.div>
          ))}

        </div>
      </div>
    </div>
  );
}