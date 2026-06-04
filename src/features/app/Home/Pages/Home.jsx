import { motion } from "framer-motion";

import {
  useEffect,
  useState,
} from "react";

import { Hero } from "../components/hero";
import { Stats } from "../components/stats";
import { RoomList } from "../components/roomList";
import { CardPeminjaman } from "../components/CardPeminjaman";

import { getRuangan } from "../../../Admin/Ruangan/service/ruanganService";

const pageVariant = {
  hidden: { opacity: 0 },

  show: {
    opacity: 1,

    transition: {
      duration: 0.6,
      when: "beforeChildren",
      staggerChildren: 0.12,
    },
  },
};

const sectionVariant = {
  hidden: {
    opacity: 0,
    y: 40,
  },

  show: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

export function Home() {
  const [rooms, setRooms] =
    useState([]);

 useEffect(() => {
  const fetchRooms = async () => {
    try {
      const data = await getRuangan();

      setRooms((data || []).slice(0, 4)); // 👈 BATASI 4 SAJA
    } catch (error) {
      console.error("Error fetch ruangan:", error);
      setRooms([]);
    }
  };

  fetchRooms();
}, []);

  return (
    <motion.div
      variants={pageVariant}
      initial="hidden"
      animate="show"
      className="
        relative
        overflow-hidden
        bg-[#070014]
        text-white
      "
    >
      {/* GLOBAL BACKGROUND */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">

        {/* Blob 1 */}
        <div
          className="
            absolute
            top-[-180px]
            left-[5%]
            w-[600px]
            h-[600px]
            rounded-full
            bg-purple-600/20
            blur-3xl
          "
        />

        {/* Blob 2 */}
        <div
          className="
            absolute
            top-[35%]
            right-[-150px]
            w-[600px]
            h-[600px]
            rounded-full
            bg-pink-600/10
            blur-3xl
          "
        />

        {/* Blob 3 */}
        <div
          className="
            absolute
            bottom-[-200px]
            left-1/3
            w-[700px]
            h-[700px]
            rounded-full
            bg-indigo-600/10
            blur-3xl
          "
        />

        {/* Grid */}
        <div
          className="
            absolute inset-0
            opacity-[0.03]
            bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)]
            bg-[size:70px_70px]
          "
        />
      </div>

      {/* HERO */}
      <motion.section
        variants={sectionVariant}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="relative z-10"
      >
        <Hero />
      </motion.section>

      {/* STATS */}
      <motion.section
        variants={sectionVariant}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="
          relative
          z-10
          pt-8
          pb-16
          px-4
        "
      >
        <Stats />
      </motion.section>

      {/* ROOM LIST */}
      <motion.section
        variants={sectionVariant}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="
          relative
          z-10
          px-6
          lg:px-10
          pt-6
          pb-20
        "
      >
        <RoomList rooms={rooms} />
      </motion.section>

      {/* CARD PEMINJAMAN */}
      <motion.section
        variants={sectionVariant}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="
          relative
          z-10
          pt-10
          pb-20
        "
      >
        <CardPeminjaman />
      </motion.section>
    </motion.div>
  );
}