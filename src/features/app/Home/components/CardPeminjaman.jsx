import { CalendarCheck, Mail, UserCheck } from "lucide-react";
import { motion } from "framer-motion";

export const CardPeminjaman = () => {
  const steps = [
    {
      id: 1,
      title: "Lihat Jadwal & Pilih Tempat",
      desc: "Cek ketersediaan ruangan/tempat/kendaraan sesuai jadwal kosong",
      icon: <CalendarCheck size={30} />,
      color: "from-blue-500 to-indigo-500",
      badge: "bg-blue-500",
    },
    {
      id: 2,
      title: "Kirim Surat Permohonan",
      desc: "Ajukan Peminjaman Dengan Cara Mengisi Form Sesuai Ruang Yang Ingin Dipakai",
      icon: <Mail size={30} />,
      color: "from-green-500 to-emerald-500",
      badge: "bg-green-500",
    },
    {
      id: 3,
      title: "Admin Proses & Jadwalkan",
      desc: "Admin akan memproses dan menjadwalkan sesuai ketersediaan",
      icon: <UserCheck size={30} />,
      color: "from-yellow-500 to-orange-500",
      badge: "bg-yellow-500",
    },
  ];

  // ✅ Animation langsung di sini
  const containerVariant = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.25,
      },
    },
  };

  const cardVariant = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-semibold text-slate-900">
          Alur Peminjaman Reservasi
        </h2>
        <p className="mt-3 text-gray-500">
          Ikuti 3 langkah mudah untuk melakukan reservasi ruangan
        </p>
      </div>

      {/* Cards */}
      <motion.div
        variants={containerVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid md:grid-cols-3 gap-10 mt-14"
      >
        {steps.map((step) => (
          <motion.div
            key={step.id}
            variants={cardVariant}
            whileHover={{ scale: 1.05 }}
            className="relative bg-white rounded-3xl shadow-sm hover:shadow-xl p-10 text-center transition-all duration-300"
          >
            {/* Badge */}
            <div
              className={`absolute top-6 left-6 w-10 h-10 rounded-full text-white flex items-center justify-center text-sm font-semibold ${step.badge}`}
            >
              {step.id}
            </div>

            {/* Icon */}
            <motion.div
              whileHover={{ rotate: 10 }}
              className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center text-white bg-gradient-to-br ${step.color} shadow-md`}
            >
              {step.icon}
            </motion.div>

            {/* Title */}
            <h3 className="mt-6 text-lg md:text-xl font-semibold text-slate-800 leading-snug">
              {step.title}
            </h3>

            {/* Desc */}
            <p className="mt-3 text-gray-500 text-sm leading-relaxed max-w-xs mx-auto">
              {step.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};