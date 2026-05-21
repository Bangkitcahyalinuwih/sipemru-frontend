import { motion } from "framer-motion";

import {
  CalendarCheck,
  Zap,
  History,
  ShieldCheck,
} from "lucide-react";

const features = [
  {
    icon: CalendarCheck,
    title: "Booking Online",
    description:
      "Proses reservasi instan dari mana saja, kapan saja tanpa birokrasi rumit.",
    color: "from-indigo-500/20 to-purple-500/5",
    iconBg: "bg-indigo-500/10",
    iconColor: "text-indigo-300",
    border: "border-indigo-500/20",
  },
  {
    icon: Zap,
    title: "Jadwal Real-Time",
    description:
      "Pantau ketersediaan ruangan secara langsung dengan akurasi detik.",
    color: "from-purple-500/20 to-pink-500/5",
    iconBg: "bg-purple-500/10",
    iconColor: "text-purple-300",
    border: "border-purple-500/20",
  },
  {
    icon: History,
    title: "Riwayat",
    description:
      "Lacak seluruh aktivitas peminjaman terdahulu dalam satu dashboard terpadu.",
    color: "from-pink-500/20 to-indigo-500/5",
    iconBg: "bg-pink-500/10",
    iconColor: "text-pink-300",
    border: "border-pink-500/20",
  },
  {
    icon: ShieldCheck,
    title: "Approval Cepat",
    description:
      "Sistem verifikasi otomatis untuk efisiensi manajemen admin yang optimal.",
    color: "from-cyan-500/20 to-indigo-500/5",
    iconBg: "bg-cyan-500/10",
    iconColor: "text-cyan-300",
    border: "border-cyan-500/20",
  },
];

export function Stats() {
  return (
  <section className="relative z-20 px-4 -mt-10">
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

      <div className="relative max-w-7xl mx-auto px-6 py-20">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white py-15">
            Fitur Unggulan{" "}

            <span className="bg-gradient-to-r from-purple-300 via-pink-300 to-indigo-300 bg-clip-text text-transparent">
              SiPemRu
            </span>
          </h2>

          <p className="mt-5 text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Efisiensikan alur kerja organisasi Anda dengan tools manajemen
            ruangan modern dan terintegrasi.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                }}
                viewport={{ once: true }}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-[30px]
                  border border-white/10
                  bg-white/[0.03]
                  backdrop-blur-2xl
                  p-8
                  min-h-[250px]
                "
              >
                <div
                  className={`
                    absolute inset-0 opacity-0
                    transition duration-700
                    group-hover:opacity-100
                    bg-gradient-to-br ${feature.color}
                  `}
                />

                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.05] to-transparent" />

                <div className="relative z-10" >
                  <div
                    className={`
                      mb-6
                      flex h-16 w-16 items-center justify-center
                      rounded-2xl
                      border ${feature.border}
                      ${feature.iconBg}
                    `}
                  >
                    <Icon
                      className={`w-7 h-7 ${feature.iconColor}`}
                    />
                  </div>

                  <h3 className="text-2xl font-semibold text-white mb-4">
                    {feature.title}
                  </h3>

                  <p className="text-gray-400 leading-relaxed text-sm">
                    {feature.description}
                  </p>
                </div>

                <div className="absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-white/[0.03] blur-3xl" />

                <div className="pointer-events-none absolute inset-0 rounded-[30px] border border-white/5" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}