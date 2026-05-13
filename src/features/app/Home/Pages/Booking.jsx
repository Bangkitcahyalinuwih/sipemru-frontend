import { useLocation } from "react-router-dom";
import { BookingForm } from "../components/BookingForm";
import { motion } from "framer-motion";

export function Booking() {
  const location = useLocation();
  const roomName = location.state?.roomName || "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="min-h-screen w-full bg-gradient-to-br from-[#050816] via-[#0b1026] to-[#0a0f2c]"
    >
      <div className="px-4">
        <BookingForm roomName={roomName} />
      </div>
    </motion.div>
  );
}