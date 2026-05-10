import {
  CalendarCheck,
  Mail,
  UserCheck,
  ArrowRight,
} from "lucide-react";

import { motion } from "framer-motion";

export const CardPeminjaman = () => {
  const steps = [
    {
      id: 1,
      title: "Lihat Jadwal & Pilih Tempat",
      desc: "Cek ketersediaan ruangan, tempat, atau kendaraan sesuai jadwal yang tersedia secara real-time.",
      icon: <CalendarCheck size={30} />,
      badge: "bg-indigo-500",
      iconBg: "bg-indigo-500/10",
      iconColor: "text-indigo-400",
      glow: "from-indigo-500/20 to-purple-500/5",
      line: "from-indigo-500/40",
    },
    {
      id: 2,
      title: "Kirim Surat Permohonan",
      desc: "Ajukan peminjaman dengan mengisi formulir sesuai ruangan yang ingin digunakan.",
      icon: <Mail size={30} />,
      badge: "bg-green-500",
      iconBg: "bg-green-500/10",
      iconColor: "text-green-400",
      glow: "from-green-500/20 to-emerald-500/5",
      line: "from-green-500/40",
    },
    {
      id: 3,
      title: "Admin Proses & Jadwalkan",
      desc: "Admin akan memproses pengajuan dan menjadwalkan penggunaan sesuai ketersediaan.",
      icon: <UserCheck size={30} />,
      badge: "bg-orange-500",
      iconBg: "bg-orange-500/10",
      iconColor: "text-orange-400",
      glow: "from-orange-500/20 to-yellow-500/5",
      line: "from-orange-500/40",
    },
  ];

  const containerVariant = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.18,
      },
    },
  };

  const cardVariant = {
    hidden: {
      opacity: 0,
      y: 40,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative overflow-hidden py-32">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-150px] left-[5%] w-[450px] h-[450px] rounded-full bg-purple-600/15 blur-3xl" />
        <div className="absolute bottom-[-100px] right-[5%] w-[500px] h-[500px] rounded-full bg-pink-600/10 blur-3xl" />
        <div className="absolute top-[40%] left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-indigo-600/10 blur-3xl" />
        <div
          className="
            absolute inset-0
            bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)]
            bg-[size:70px_70px]
            opacity-20
          "
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/20 bg-white/[0.03] backdrop-blur-xl mb-6">
            <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />

            <span className="text-sm text-purple-300 font-medium">
              Proses Reservasi
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold leading-tight">

            <span className="text-white">
              Alur Peminjaman
            </span>

            <br />

            <span className="bg-gradient-to-r from-purple-300 via-pink-300 to-indigo-300 bg-clip-text text-transparent">
              Reservasi Ruangan
            </span>
          </h2>

          <p className="mt-6 text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Ikuti langkah sederhana berikut untuk melakukan reservasi ruangan
            dengan cepat, efisien, dan terjadwal secara otomatis.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative grid gap-8 lg:grid-cols-3"
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              variants={cardVariant}
              whileHover={{
                y: -10,
                scale: 1.02,
              }}
              transition={{
                type: "spring",
                stiffness: 220,
              }}
              className="
                group relative overflow-hidden
                rounded-[32px]
                border border-white/10
                bg-white/[0.03]
                backdrop-blur-2xl
                min-h-[360px]
                p-10
              "
            >

              <div
                className={`
                  absolute inset-0 opacity-0
                  transition duration-700
                  group-hover:opacity-100
                  bg-gradient-to-br ${step.glow}
                `}
              />

              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.05] to-transparent" />
              {index !== steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-8 z-20">

                  <div
                    className={`
                      h-[2px] w-16 bg-gradient-to-r
                      ${step.line} to-transparent
                    `}
                  />

                  <ArrowRight className="absolute -right-1 -top-[9px] w-4 h-4 text-white/40" />
                </div>
              )}

              <div
                className={`
                  absolute top-6 left-1/2 -translate-x-1/2
                  flex h-10 w-10 items-center justify-center
                  rounded-full text-sm font-bold text-white
                  shadow-lg ${step.badge}
                `}
              >
                {step.id}
              </div>

              <div className="relative flex flex-col items-center text-center pt-12">
                <div
                  className={`
                    mb-8 flex h-24 w-24 items-center justify-center
                    rounded-[28px]
                    border border-white/10
                    ${step.iconBg}
                    ${step.iconColor}
                  `}
                >
                  {step.icon}
                </div>

                <h3 className="text-2xl font-semibold text-white leading-snug mb-5">
                  {step.title}
                </h3>

                <p className="text-gray-400 leading-relaxed text-base">
                  {step.desc}
                </p>
              </div>
              <div className="absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-white/[0.03] blur-3xl" />
              <div className="pointer-events-none absolute inset-0 rounded-[32px] border border-white/5" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};