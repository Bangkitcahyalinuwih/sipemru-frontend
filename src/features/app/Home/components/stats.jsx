import { motion } from "framer-motion";
import { Building2, CheckCircle2, Clock } from 'lucide-react';

const stats = [
  {
    icon: Building2,
    value: '48',
    label: 'Total Ruangan',
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-600'
  },
  {
    icon: CheckCircle2,
    value: '32',
    label: 'Ruangan Tersedia',
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-50',
    iconColor: 'text-green-600'
  },
  {
    icon: Clock,
    value: '16',
    label: 'Sedang Digunakan',
    color: 'from-orange-500 to-orange-600',
    bgColor: 'bg-orange-50',
    iconColor: 'text-orange-600'
  }
];

export function Stats() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="transition-all duration-200"
            >
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl p-6 border-0">
                <div className="flex items-center space-x-4">
                  <div className={`${stat.bgColor} p-4 rounded-xl`}>
                    <Icon className={`h-8 w-8 ${stat.iconColor}`} />
                  </div>
                  <div>
                    <div className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                      {stat.value}
                    </div>
                    <div className="text-gray-600 mt-1">
                      {stat.label}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
