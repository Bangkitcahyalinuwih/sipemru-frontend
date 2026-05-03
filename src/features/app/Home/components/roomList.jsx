import { motion } from "framer-motion";
import { Building2, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

/* ================= DATA RUANGAN ================= */

const rooms = [
  {
    id: 1,
    name: "Ruang A-211",
    building: "Gedung A",
    capacity: 40,
    status: "available",
    description:
      "Ruang kelas modern dengan fasilitas lengkap seperti proyektor, AC, dan kursi ergonomis untuk kegiatan pembelajaran dan seminar kecil.",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
  },
  {
    id: 2,
    name: "Lab Komputer B-301",
    building: "Gedung B",
    capacity: 30,
    status: "available",
    description:
      "Laboratorium komputer dengan spesifikasi tinggi, cocok untuk praktikum pemrograman, jaringan, dan desain grafis.",
    image:
      "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=600&fit=crop",
  },
  {
    id: 3,
    name: "Ruang Meeting C-101",
    building: "Gedung C",
    capacity: 15,
    status: "full",
    description:
      "Ruang meeting kecil untuk diskusi tim, dilengkapi smart TV, whiteboard, dan suasana yang tenang untuk brainstorming.",
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop",
  },
  {
    id: 4,
    name: "Ruang Seminar D-401",
    building: "Gedung D",
    capacity: 80,
    status: "available",
    description:
      "Ruang seminar besar untuk acara kampus, seminar nasional, dan workshop dengan kapasitas besar serta sound system lengkap.",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop",
  },
  {
    id: 5,
    name: "Ruang Diskusi E-102",
    building: "Gedung E",
    capacity: 20,
    status: "available",
    description:
      "Ruang diskusi santai untuk kerja kelompok, presentasi kecil, dan kolaborasi antar mahasiswa.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
  },
  {
    id: 6,
    name: "Lab Multimedia F-205",
    building: "Gedung F",
    capacity: 25,
    status: "full",
    description:
      "Laboratorium multimedia untuk editing video, desain, animasi, dan produksi konten digital dengan perangkat profesional.",
    image:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop",
  },
];

/* ================= ANIMATION ================= */

const containerVariant = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariant = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
    },
  },
  hover: {
    y: -8,
    scale: 1.03,
  },
};

const imageVariant = {
  hover: {
    scale: 1.1,
  },
};

/* ================= UI COMPONENT ================= */

const Badge = ({ status }) => (
  <span
    className={`px-3 py-1 text-xs font-semibold rounded-full
    ${
      status === "available"
        ? "bg-green-500 text-white"
        : "bg-red-500 text-white"
    }`}
  >
    {status === "available" ? "Tersedia" : "Penuh"}
  </span>
);

/* ================= MAIN COMPONENT ================= */

export function   RoomList() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  /* debounce */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  /* filter */
  const filteredRooms = rooms.filter((room) =>
    room.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
    room.building.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  /* match helper */
  const isMatch = (room) =>
    room.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
    room.building.toLowerCase().includes(debouncedSearch.toLowerCase());

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 relative">
      <h2 className="text-3xl font-bold mb-6">Ruangan Tersedia</h2>

      {/* SEARCH */}
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <motion.input
          type="text"
          placeholder="Cari ruangan"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          whileFocus={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className={`w-full md:w-1/2 px-4 py-2 border rounded-xl outline-none transition-all duration-300
            ${
              isFocused
                ? "border-indigo-500 shadow-lg shadow-indigo-200 bg-white"
                : "border-gray-300 bg-white/70"
            }
          `}
        />
      </motion.div>

      {/* GRID */}
      <motion.div
        variants={containerVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="m-2.5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7"
      >
        {filteredRooms.map((room) => (
          <motion.div
            key={room.id}
            variants={cardVariant}
            whileHover="hover"
            className={` relative cursor-pointer transition-all duration-300
              ${isMatch(room) ? "scale-[1.03]" : "scale-100 opacity-90"}
            `}
            animate={{
              opacity: isMatch(room) ? 1 : 0.6,
            }}
          >
            {/* CARD */}
            <div
              className={`relative z-10  bg-white/80 backdrop-blur-md rounded-2xl shadow-sm border overflow-hidden transition-all duration-300
                ${
                  isMatch(room)
                    ? "border-indigo-black shadow-lg shadow-indigo-200"
                    : "border-gray-100"
                }
              `}
            >
              {/* IMAGE */}
              <div className="overflow-hidden">
                <motion.img
                  variants={imageVariant}
                  src={room.image}
                  alt={room.name}
                  className="h-48 w-full object-cover pointer-events-none select-none"
                />
              </div>

              {/* CONTENT */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900">{room.name}</h3>

                <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                  <Building2 size={14} />
                  {room.building}
                </p>

                <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                  <Users size={14} />
                  {room.capacity} Orang
                </p>

                <div className="mt-3 mb-4">
                  <Badge status={room.status} />
                </div>

<motion.button
  whileTap={{ scale: 0.95 }}
  onClick={() => navigate(`/room/${room.id}`, { state: room })}
  style={{ cursor: "pointer" }}
  className="w-full py-2.5 rounded-xl text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700"
>
  Lihat Detail
</motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}