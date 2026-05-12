import { motion } from "framer-motion";

import {
  Building2,
  Users,
  Layers3,
  ShieldCheck,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

const Badge = ({ type }) => {
  const color =
    type === "lab"
      ? "bg-blue-500/20 text-blue-300 border-blue-400/30"
      : type === "auditorium"
      ? "bg-purple-500/20 text-purple-300 border-purple-400/30"
      : "bg-green-500/20 text-green-300 border-green-400/30";

  return (
    <span
      className={`
        px-3 py-1
        text-xs font-semibold
        rounded-full
        backdrop-blur-md
        border
        capitalize
        ${color}
      `}
    >
      {type}
    </span>
  );
};

export function RoomList({
  rooms = [],
}) {
  const navigate = useNavigate();

  return (
    <div
      className="
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
            stiffness: 200,
          }}
          className="
            relative
            rounded-3xl
            overflow-hidden
            bg-white/5
            backdrop-blur-2xl
            border border-white/10
            shadow-xl shadow-black/20
          "
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-60" />

          <div className="h-48 overflow-hidden">
            <img
              src={
                room?.foto ||
                "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800"
              }
              alt={room?.name}
              className="
                w-full h-full object-cover
                hover:scale-110
                transition duration-500
              "
            />
          </div>

          <div className="p-5 relative z-10">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-semibold text-lg capitalize">
                  {room?.name}
                </h3>

                <p className="text-xs text-gray-400 mt-1 uppercase tracking-wide">
                  Kode: {room?.code}
                </p>
              </div>

              <Badge type={room?.type} />
            </div>

            <div className="mt-4 space-y-2 text-sm text-gray-300">
              <p className="flex items-center gap-2 capitalize">
                <Users size={15} />
                {room?.capacity} Orang
              </p>

              <p className="flex items-center gap-2 capitalize">
                <Layers3 size={15} />
                Lantai {room?.floor}
              </p>

              <p className="flex items-center gap-2 capitalize">
                <ShieldCheck size={15} />
                Approval: {room?.approval_type}
              </p>

              <p className="flex items-center gap-2 capitalize">
                <Building2 size={15} />
                {room?.type}
              </p>
            </div>

            <p className="text-sm text-gray-400 mt-4 line-clamp-2 capitalize">
              {room?.description}
            </p>

            <div className="flex flex-wrap gap-2 mt-4">
              {room?.facilities?.map(
                (item, index) => (
                  <span
                    key={index}
                    className="
                      px-2 py-1
                      text-xs
                      rounded-lg
                      bg-white/10
                      border border-white/10
                      text-gray-300
                      capitalize
                    "
                  >
                    {item}
                  </span>
                )
              )}
            </div>

            <button
              onClick={() =>
                navigate(
                  `/room/${room.id}`,
                  {
                    state: room,
                  }
                )
              }
              className="
                w-full mt-5 py-2.5
                rounded-xl
                text-sm font-medium
                bg-gradient-to-r
                from-indigo-500
                to-purple-600
                hover:from-indigo-600
                hover:to-purple-700
                transition
                shadow-lg shadow-purple-500/20
              "
            >
              Lihat Detail
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}