import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { RoomList } from "../components/roomList";

import { getRuangan } from "../../../Admin/Ruangan/service/ruanganService";

const pageVariant = {
  hidden: {
    opacity: 0,
  },

  show: {
    opacity: 1,

    transition: {
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const sectionVariant = {
  hidden: {
    opacity: 0,
    y: 30,
  },

  show: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.5,
    },
  },
};

export function RoomListPages() {
  const [rooms, setRooms] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);

        const data =
          await getRuangan();

        setRooms(data || []);
      } catch (error) {
        console.error(
          "Error fetch ruangan:",
          error
        );

        setRooms([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const filteredRooms = rooms.filter(
    (room) => {
      const keyword =
        search.toLowerCase();

      return (
        (room?.name || "")
          .toLowerCase()
          .includes(keyword) ||
        (room?.code || "")
          .toLowerCase()
          .includes(keyword) ||
        (room?.type || "")
          .toLowerCase()
          .includes(keyword)
      );
    }
  );

  return (
    <motion.div
      variants={pageVariant}
      initial="hidden"
      animate="show"
      className="
        relative
        min-h-screen
        overflow-x-hidden
        bg-[#070014]
        text-white
      "
    >
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div
          className="
            absolute
            top-[-150px]
            left-[5%]
            w-[500px]
            h-[500px]
            rounded-full
            bg-purple-600/20
            blur-3xl
          "
        />

        <div
          className="
            absolute
            bottom-[-200px]
            right-[10%]
            w-[600px]
            h-[600px]
            rounded-full
            bg-pink-600/10
            blur-3xl
          "
        />

        <div
          className="
            absolute
            top-[30%]
            left-[45%]
            w-[400px]
            h-[400px]
            rounded-full
            bg-cyan-500/10
            blur-3xl
          "
        />
      </div>

      <motion.div
        variants={sectionVariant}
        className="
          relative z-10
          max-w-7xl
          mx-auto
          px-4
          py-20
        "
      >
        <div className="mb-10">
          <div
            className="
              inline-flex
              items-center
              gap-2
              px-4 py-2
              rounded-full
              border border-white/10
              bg-white/5
              backdrop-blur-xl
              text-sm
              text-purple-300
              mb-5
            "
          >
            Smart Room Booking
          </div>

          <h1
            className="
              text-4xl
              md:text-5xl
              font-bold
              tracking-tight
            "
          >
            Daftar Ruangan
          </h1>

          <p
            className="
              text-gray-400
              text-sm
              md:text-base
              mt-3
              max-w-2xl
            "
          >
            Pilih ruangan sesuai
            kebutuhan kegiatan,
            seminar, workshop,
            praktikum, dan acara
            kampus lainnya.
          </p>
        </div>

        <motion.div
          variants={sectionVariant}
          className="mb-10"
        >
          <input
            type="text"
            placeholder="Cari ruangan berdasarkan nama, kode, atau tipe..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="
              w-full
              md:w-[420px]
              px-5 py-3.5
              rounded-2xl
              border border-white/10
              bg-white/5
              backdrop-blur-2xl
              text-white
              placeholder:text-gray-500
              outline-none
              transition-all
              focus:border-purple-500/40
              focus:ring-2
              focus:ring-purple-500/20
            "
          />
        </motion.div>

        {loading ? (
          <motion.div
            variants={sectionVariant}
            className="
              h-[300px]
              rounded-3xl
              border border-white/10
              bg-white/5
              backdrop-blur-2xl
              flex items-center justify-center
            "
          >
            <p className="text-gray-400">
              Loading ruangan...
            </p>
          </motion.div>
        ) : filteredRooms.length ===
          0 ? (
          <motion.div
            variants={sectionVariant}
            className="
              h-[300px]
              rounded-3xl
              border border-white/10
              bg-white/5
              backdrop-blur-2xl
              flex items-center justify-center
            "
          >
            <p className="text-gray-400">
              Ruangan tidak ditemukan
            </p>
          </motion.div>
        ) : (
          <motion.div
            variants={sectionVariant}
          >
            <RoomList
              rooms={filteredRooms}
            />
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default RoomListPages;