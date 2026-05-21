import { motion } from "framer-motion";

import { Building2, Users, Layers3, ShieldCheck } from "lucide-react";

import { useNavigate } from "react-router-dom";

const Badge = ({ type }) => {
  const color =
    type === "lab"
      ? "bg-indigo-500/10 text-indigo-300 border-indigo-400/20"
      : type === "auditorium"
        ? "bg-purple-500/10 text-purple-300 border-purple-400/20"
        : "bg-emerald-500/10 text-emerald-300 border-emerald-400/20";

  return (
    <span
      className={`
        px-3 py-1
        text-xs font-semibold
        rounded-full
        backdrop-blur-xl
        border
        capitalize
        ${color}
      `}
    >
      {type}
    </span>
  );
};

export function RoomList({ rooms = [] }) {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden -mt-24 py-10">
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

      <div
        className="
          relative
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
          gap-8
        "
      >
        {rooms.map((room) => (
          <motion.div
            key={room.id}
            whileHover={{
              y: -10,
              scale: 1.02,
            }}
            transition={{
              type: "spring",
              stiffness: 220,
            }}
            className="
              group
              relative
              overflow-hidden
              rounded-[32px]
              border border-white/10
              bg-white/[0.03]
              backdrop-blur-2xl
              min-h-[520px]
              shadow-2xl shadow-black/20
            "
          >
            <div
              className="
                absolute inset-0 opacity-0
                transition duration-700
                group-hover:opacity-100
                bg-gradient-to-br
                from-purple-500/10
                via-indigo-500/5
                to-pink-500/10
              "
            />

            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.05] to-transparent" />

            <div className="relative h-52 overflow-hidden">
              <img
                src={
                  room?.foto ||
                  "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800"
                }
                alt={room?.name}
                className="
                  w-full h-full object-cover
                  transition duration-700
                  group-hover:scale-110
                "
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B12]/80 via-transparent to-transparent" />

              <div className="absolute top-4 right-4">
                <Badge type={room?.type} />
              </div>
            </div>

            <div className="relative z-10 p-6">
              <div>
                <h3 className="text-xl font-semibold text-white capitalize">
                  {room?.name}
                </h3>

                <p className="text-xs text-gray-500 mt-1 uppercase tracking-[0.2em]">
                  KODE • {room?.code}
                </p>
              </div>

              <div className="mt-5 space-y-3 text-sm text-gray-300">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center">
                    <Users size={16} className="text-purple-300" />
                  </div>

                  <span className="capitalize">{room?.capacity} Orang</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center">
                    <Layers3 size={16} className="text-indigo-300" />
                  </div>

                  <span className="capitalize">Lantai {room?.floor}</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center">
                    <ShieldCheck size={16} className="text-pink-300" />
                  </div>

                  <span className="capitalize">
                    Gedung: {room?.building || "Gedung Utama"}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center">
                    <Building2 size={16} className="text-cyan-300" />
                  </div>

                  <span className="capitalize">{room?.type}</span>
                </div>
              </div>

              <p className="text-sm text-gray-400 mt-5 leading-relaxed line-clamp-2 capitalize">
                {room?.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-5">
                {room?.facilities?.map((item, index) => (
                  <span
                    key={index}
                    className="
                        px-3 py-1.5
                        text-xs
                        rounded-xl
                        border border-white/10
                        bg-white/[0.03]
                        text-gray-300
                        backdrop-blur-xl
                        capitalize
                      "
                  >
                    {item}
                  </span>
                ))}
              </div>

              <button
                onClick={() =>
                  navigate(`/room/${room.id}`, {
                    state: room,
                  })
                }
                className="
                  group/btn
                  relative
                  overflow-hidden
                  w-full mt-6 py-3
                  rounded-2xl
                  text-sm font-semibold
                  text-white
                  border border-purple-500/20
                  bg-gradient-to-r
                  from-purple-600
                  to-indigo-600
                  shadow-lg shadow-purple-500/20
                  transition-all duration-300
                  hover:scale-[1.02]
                "
              >
                <span className="relative z-10">Lihat Detail</span>

                <div
                  className="
                    absolute inset-0 opacity-0
                    transition duration-500
                    group-hover/btn:opacity-100
                    bg-gradient-to-r
                    from-pink-500/20
                    to-indigo-500/20
                  "
                />
              </button>
            </div>

            <div className="absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-white/[0.03] blur-3xl" />

            <div className="pointer-events-none absolute inset-0 rounded-[32px] border border-white/5" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
