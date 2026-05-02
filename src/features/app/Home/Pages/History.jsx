import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

const bookingHistory = [
  {
    id: 1,
    room: 'Ruang A-201',
    building: 'Gedung A',
    date: '2026-05-05',
    startTime: '09:00',
    endTime: '11:00',
    purpose: 'Kuliah Umum',
    status: 'approved'
  },
  {
    id: 2,
    room: 'Lab Komputer B-301',
    building: 'Gedung B',
    date: '2026-05-08',
    startTime: '13:00',
    endTime: '15:00',
    purpose: 'Praktikum Pemrograman',
    status: 'pending'
  },
  {
    id: 3,
    room: 'Ruang Meeting C-101',
    building: 'Gedung C',
    date: '2026-04-28',
    startTime: '10:00',
    endTime: '12:00',
    purpose: 'Rapat Organisasi',
    status: 'rejected'
  },
  {
    id: 4,
    room: 'Auditorium D-001',
    building: 'Gedung D',
    date: '2026-05-12',
    startTime: '08:00',
    endTime: '12:00',
    purpose: 'Seminar Nasional',
    status: 'approved'
  },
  {
    id: 5,
    room: 'Ruang Seminar A-301',
    building: 'Gedung A',
    date: '2026-05-03',
    startTime: '14:00',
    endTime: '16:00',
    purpose: 'Workshop',
    status: 'pending'
  }
];

const getStatusConfig = (status) => {
  switch (status) {
    case 'approved':
      return {
        label: 'Disetujui',
        color: 'bg-green-100 text-green-700 border-green-200',
        icon: CheckCircle2,
        iconColor: 'text-green-600'
      };
    case 'pending':
      return {
        label: 'Pending',
        color: 'bg-yellow-100 text-yellow-700 border-yellow-200',
        icon: AlertCircle,
        iconColor: 'text-yellow-600'
      };
    case 'rejected':
      return {
        label: 'Ditolak',
        color: 'bg-red-100 text-red-700 border-red-200',
        icon: XCircle,
        iconColor: 'text-red-600'
      };
    default:
      return {
        label: 'Unknown',
        color: 'bg-gray-100 text-gray-700 border-gray-200',
        icon: AlertCircle,
        iconColor: 'text-gray-600'
      };
  }
};

export function History() {
  const handleCancel = (id) => {
    toast.success('Peminjaman berhasil dibatalkan');
  };

  const handleDetail = (id) => {
    toast.info('Detail peminjaman akan ditampilkan');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Riwayat Peminjaman</h1>
            <p className="text-gray-600">Lihat semua riwayat peminjaman ruangan Anda</p>
          </div>

          <div className="space-y-4">
            {bookingHistory.map((booking, index) => {
              const statusConfig = getStatusConfig(booking.status);
              const StatusIcon = statusConfig.icon;

              return (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div className="border-0 shadow-md hover:shadow-lg transition-all duration-200 rounded-xl overflow-hidden bg-white">
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="text-xl font-bold text-gray-900 mb-1">{booking.room}</h3>
                              <div className="flex items-center text-gray-600 text-sm">
                                <MapPin className="h-4 w-4 mr-1 text-blue-500" />
                                {booking.building}
                              </div>
                            </div>
                            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border ${statusConfig.color}`}>
                              <StatusIcon className={`h-3 w-3 ${statusConfig.iconColor}`} />
                              {statusConfig.label}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                            <div className="flex items-center text-gray-600">
                              <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                              <span>{new Date(booking.date).toLocaleDateString('id-ID', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <Clock className="h-4 w-4 mr-2 text-blue-500" />
                              <span>{booking.startTime} - {booking.endTime}</span>
                            </div>
                          </div>

                          <div className="mt-3">
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">Keperluan:</span> {booking.purpose}
                            </p>
                          </div>
                        </div>

                        <div className="flex md:flex-col gap-2">
                          <button
                            className="flex-1 md:flex-none px-4 py-2 border border-blue-200 text-blue-600 hover:bg-blue-50 rounded-lg text-sm font-medium cursor-pointer transition-colors"
                            onClick={() => handleDetail(booking.id)}
                          >
                            Detail
                          </button>
                          {booking.status === 'pending' && (
                            <button
                              className="flex-1 md:flex-none px-4 py-2 border border-red-200 text-red-600 hover:bg-red-50 rounded-lg text-sm font-medium cursor-pointer transition-colors"
                              onClick={() => handleCancel(booking.id)}
                            >
                              Batalkan
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {bookingHistory.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <Calendar className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada riwayat</h3>
              <p className="text-gray-600">Anda belum memiliki riwayat peminjaman ruangan</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
