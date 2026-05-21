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
      staggerChildren: 0.08,
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
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export function RoomListPages() {
  const [rooms, setRooms] =
    useState([]);

  const [search, setSearch] =
    useState("");

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
    <motion.section
      variants={pageVariant}
      initial="hidden"
      animate="show"
      className="
        relative
        overflow-hidden
        text-white
        pt-28
        pb-20
      "
    >
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">

        <div
          className="
            absolute
            top-[-200px]
            left-[5%]
            w-[550px]
            h-[550px]
            rounded-full
            bg-purple-600/15
            blur-3xl
          "
        />

        <div
          className="
            absolute
            bottom-[-250px]
            right-[5%]
            w-[650px]
            h-[650px]
            rounded-full
            bg-pink-600/10
            blur-3xl
          "
        />

        <div
          className="
            absolute
            top-[30%]
            left-1/2
            -translate-x-1/2
            w-[500px]
            h-[500px]
            rounded-full
            bg-indigo-600/10
            blur-3xl
          "
        />

        <div
          className="
            absolute inset-0
            opacity-[0.03]
            bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)]
            bg-[size:70px_70px]
          "
        />
      </div>

      <div
        className="
          relative z-10
          max-w-7xl
          mx-auto
          px-4
          sm:px-6
          lg:px-8
        "
      >
        {/* HEADER */}
        <motion.div
          variants={sectionVariant}
          className="mb-14"
        >
          <div
            className="
              inline-flex
              items-center
              gap-2
              px-4 py-2
              rounded-full
              border border-white/10
              bg-white/[0.03]
              backdrop-blur-xl
              text-sm
              text-purple-300
              mb-6
            "
          >
            Smart Room Booking
          </div>

          <h1
            className="
              text-4xl
              md:text-5xl
              lg:text-6xl
              font-bold
              tracking-tight
              leading-tight
            "
          >
            <span className="text-white">
              Daftar
            </span>

            <span
              className="
                block
                bg-gradient-to-r
                from-purple-300
                via-pink-300
                to-indigo-300
                bg-clip-text
                text-transparent
              "
            >
              Ruangan Kampus
            </span>
          </h1>

          <p
            className="
              mt-5
              text-gray-400
              text-sm
              md:text-base
              leading-relaxed
              max-w-2xl
            "
          >
            Temukan ruangan terbaik untuk
            seminar, praktikum, rapat,
            workshop, dan berbagai kegiatan
            kampus lainnya dengan sistem
            reservasi modern dan real-time.
          </p>
        </motion.div>

        {/* SEARCH */}
        <motion.div
          variants={sectionVariant}
          className="mb-14"
        >
          <div
            className="
              relative
              w-full
              md:w-[450px]
              py-0.5
              -mt-20
              mb-28
            "
          >
            <input
              type="text"
              placeholder="Cari ruangan..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="
                w-full
                px-5 py-4
                rounded-2xl
                border border-white/10
                bg-white/[0.03]
                backdrop-blur-2xl
                text-white
                placeholder:text-gray-500
                outline-none
                transition-all
                focus:border-purple-500/30
                focus:ring-2
                focus:ring-purple-500/10
                mt-8
                
              "
            />

            <div
              className="
                absolute inset-0
                rounded-2xl
                pointer-events-none
                border border-white/5
              "
            />
          </div>
        </motion.div>

        {/* CONTENT */}
        {loading ? (
          <motion.div
            variants={sectionVariant}
            className="
              h-[320px]
              rounded-[32px]
              border border-white/10
              bg-white/[0.03]
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
              h-[320px]
              rounded-[32px]
              border border-white/10
              bg-white/[0.03]
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
      </div>
    </motion.section>
  );
}

export default RoomListPages;