import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

import { BackButton } from "../components/BackButton";
import { RoomDetailCard } from "../components/roomDetaiil";

/* ================= ANIMATION ================= */

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
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export function RoomDetailPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div
        className="
          min-h-screen flex items-center justify-center
          bg-[#070014] text-white
        "
      >
        Room tidak ditemukan
      </div>
    );
  }

  return (
    <motion.div
      variants={pageVariant}
      initial="hidden"
      animate="show"
      className="
        relative min-h-screen
        text-white overflow-x-hidden
      "
    >
      {/* ================= GLOBAL BACKGROUND ================= */}
      <div className="fixed inset-0 -z-10 pointer-events-none">

        {/* PURPLE GLOW */}
        <div
          className="
            absolute top-[-120px] left-[5%]
            w-[500px] h-[500px]
            bg-purple-600/20
            blur-3xl rounded-full
          "
        />

        {/* PINK GLOW */}
        <div
          className="
            absolute bottom-[-200px] right-[10%]
            w-[600px] h-[600px]
            bg-pink-600/10
            blur-3xl rounded-full
          "
        />

        {/* DARK BASE */}
        <div className="absolute inset-0 bg-[#070014]" />
      </div>

      {/* ================= CONTENT ================= */}
      <motion.div
        variants={sectionVariant}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="relative z-10 py-10"
      >
        <div className="max-w-5xl mx-auto px-4">

          <BackButton onClick={() => navigate(-1)} />

          <RoomDetailCard
            room={state}
            onBooking={() =>
              navigate("/booking", {
                state: {
                  roomName: state.name,
                  roomId: state.id,
                },
              })
            }
          />
        </div>
      </motion.div>
    </motion.div>
  );
}