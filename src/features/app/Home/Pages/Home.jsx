import { motion } from "framer-motion";

import { Hero } from "../components/hero";
import { Stats } from "../components/stats";
import { RoomList } from "../components/roomList";
import { CardPeminjaman } from "../components/CardPeminjaman";


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

const sectionVariant = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export function Home() {
  return (
    <motion.div
      variants={pageVariant}
      initial="hidden"
      animate="show"
      className="relative min-h-screen text-white overflow-x-hidden bg-[#070014] pb-20"
    >
      {/* ================= GLOBAL BACKGROUND ================= */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-[-120px] left-[5%] w-[500px] h-[500px] bg-purple-600/20 blur-3xl rounded-full" />
        <div className="absolute bottom-[-200px] right-[10%] w-[600px] h-[600px] bg-pink-600/10 blur-3xl rounded-full" />
      </div>

      {/* ================= HERO ================= */}
      <motion.div
        variants={sectionVariant}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="relative z-10"
      >
        <Hero />
      </motion.div>

      {/* ================= STATS ================= */}
      <motion.div
        variants={sectionVariant}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="relative z-10 mt-28"
      >
        <Stats />
      </motion.div>

      {/* ================= ROOM LIST ================= */}
      <motion.div
        variants={sectionVariant}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="relative z-10"
      >
        <RoomList />
      </motion.div>

      {/* ================= BOOKING ================= */}
      <motion.div
        variants={sectionVariant}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="relative z-10"
      >
        <CardPeminjaman />
      </motion.div>
    </motion.div>
  );
}