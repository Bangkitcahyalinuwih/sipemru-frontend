import { motion } from "framer-motion";
import { Building2, CheckCircle2, Clock, ArrowRight } from "lucide-react";
import { useState } from "react";

const stats = [
  {
    icon: Building2,
    value: "48",
    label: "Total Ruangan",
    description: "Seluruh ruangan yang tersedia",
    color: "from-blue-500 to-blue-600",
    glowColor: "from-blue-500/20 to-blue-600/20",
    bgColor: "bg-blue-500/10",
    iconColor: "text-blue-400",
    borderColor: "border-blue-500/20",
  },
  {
    icon: CheckCircle2,
    value: "32",
    label: "Ruangan Tersedia",
    description: "Siap digunakan saat ini",
    color: "from-green-500 to-green-600",
    glowColor: "from-green-500/20 to-green-600/20",
    bgColor: "bg-green-500/10",
    iconColor: "text-green-400",
    borderColor: "border-green-500/20",
  },
  {
    icon: Clock,
    value: "16",
    label: "Sedang Digunakan",
    description: "Dalam pemakaian aktif",
    color: "from-orange-500 to-orange-600",
    glowColor: "from-orange-500/20 to-orange-600/20",
    bgColor: "bg-orange-500/10",
    iconColor: "text-orange-400",
    borderColor: "border-orange-500/20",
  },
];

export function Stats() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section className="relative -mt-20 z-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const isHovered = hoveredIndex === index;

            return (
              <motion.div
                key={stat.label}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 100,
                }}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                }}
                className="group relative cursor-pointer"
              >
                <motion.div
                  className={`absolute -inset-1 rounded-3xl blur-2xl bg-gradient-to-r ${stat.glowColor}`}
                  animate={{
                    opacity: isHovered ? 0.6 : 0,
                  }}
                />

                <div
                  className={`
                    relative overflow-hidden rounded-3xl
                    border ${stat.borderColor}
                    bg-gradient-to-br from-white/10 to-white/5
                    backdrop-blur-2xl
                  `}
                >
                  <div className="p-7 lg:p-8 flex items-center gap-5 lg:gap-6">

                    <div className={`relative flex h-16 w-16 items-center justify-center rounded-2xl ${stat.bgColor}`}>
                      <Icon className={`h-8 w-8 ${stat.iconColor}`} />
                    </div>
                    <div className="flex-1">
                      <h3
                        className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                      >
                        {stat.value}
                        <span className="ml-1">+</span>
                      </h3>

                      <p className="text-gray-300 font-medium">
                        {stat.label}
                      </p>

                      <motion.p
                        className="text-xs text-gray-500 mt-2"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{
                          opacity: isHovered ? 1 : 0,
                          height: isHovered ? "auto" : 0,
                        }}
                      >
                        {stat.description}
                      </motion.p>
                    </div>

                    {/* Arrow */}
                    <motion.div
                      animate={{
                        opacity: isHovered ? 1 : 0,
                        x: isHovered ? 0 : -10,
                      }}
                    >
                      <ArrowRight className="text-white/40 w-5 h-5" />
                    </motion.div>

                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}