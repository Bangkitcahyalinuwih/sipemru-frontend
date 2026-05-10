import { motion } from "framer-motion";

export function HistoryHeader() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="mb-8"
    >
      <h1 className="text-3xl font-bold text-gray-900">
        Riwayat Peminjaman
      </h1>

      <p className="text-gray-600 mt-1">
        Lihat semua riwayat
        peminjaman ruangan
        Anda
      </p>
    </motion.div>
  );
}