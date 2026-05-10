import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { RoomList } from "../components/roomList";
import { getRuangan } from "../../../Admin/Ruangan/service/ruanganService";

const pageVariant = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: 0.6,
      when: "beforeChildren",
      staggerChildren: 0.15,
    },
  },
};

export function RoomListPages() {
  const [rooms, setRooms] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getRuangan();
        setRooms(data || []);
      } catch (error) {
        console.error(error);
        setRooms([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredRooms = rooms.filter((r) => {
    const keyword = search.toLowerCase();

    return (
      (r?.name || "").toLowerCase().includes(keyword) ||
      (r?.code || "").toLowerCase().includes(keyword) ||
      (r?.type || "").toLowerCase().includes(keyword)
    );
  });

  return (
    <motion.div
      variants={pageVariant}
      initial="hidden"
      animate="show"
      className="relative min-h-screen text-white overflow-x-hidden"
    >
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-[-120px] left-[5%] w-[500px] h-[500px] bg-purple-600/20 blur-3xl rounded-full" />
        <div className="absolute bottom-[-200px] right-[10%] w-[600px] h-[600px] bg-pink-600/10 blur-3xl rounded-full" />
        <div className="absolute inset-0 bg-[#070014]" />
      </div>
      <motion.div
        variants={sectionVariant}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="relative z-10 max-w-7xl mx-auto px-4 py-20"
      >
        <div className="mb-10">
          <h1 className="text-3xl font-bold">Daftar Ruangan</h1>
          <p className="text-gray-400 text-sm mt-1">
            Pilih ruangan sesuai kebutuhan kegiatan
          </p>
        </div>
        <input
          type="text"
          placeholder="Cari ruangan..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full md:w-1/2 px-5 py-3 mb-10
            rounded-2xl bg-white/10 text-white
            border border-white/20 outline-none
            focus:ring-2 focus:ring-purple-500/40
          "
        />
        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : (
          <RoomList rooms={filteredRooms} />
        )}
      </motion.div>
    </motion.div>
  );
}

export default RoomListPages;