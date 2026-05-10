import { motion } from "framer-motion";

export function HistoryHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="mb-8"
    >
      <h1 className="text-3xl font-bold text-white">
        Riwayat Peminjaman
      </h1>

      <p className="text-sm text-gray-400 mt-2">
        Lihat semua riwayat peminjaman ruangan Anda
      </p>
    </motion.div>
  );
}