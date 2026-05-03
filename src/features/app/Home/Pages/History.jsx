import { motion } from "framer-motion";
import { Calendar, Clock, MapPin } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { BookingStatusBadge } from "../components/History/BookingStatusBadge";

/* ================= DUMMY DATA ================= */


  const bookingHistory = [
  {
    id: 1,
    room: "Ruang A-201",
    building: "Gedung A",
    date: "2026-05-05",
    startTime: "09:00",
    endTime: "11:00",
    purpose: "Kuliah Umum",
    status: "approved",

    // QR untuk di-scan admin
    qr_url: "http://localhost:8000/api/qr/verify/uuid-111",
    is_used: false,
    expires_at: "2026-05-05T11:00:00",
  },
  {
    id: 2,
    room: "Lab Komputer B-301",
    building: "Gedung B",
    date: "2026-05-08",
    startTime: "13:00",
    endTime: "15:00",
    purpose: "Praktikum Pemrograman",
    status: "pending",

    // belum ada QR
    qr_url: null,
    is_used: false,
  },
  {
    id: 3,
    room: "Ruang Meeting C-101",
    building: "Gedung C",
    date: "2026-04-28",
    startTime: "10:00",
    endTime: "12:00",
    purpose: "Rapat Organisasi",
    status: "rejected",

    // ditolak → tidak ada QR
    qr_url: null,
    is_used: false,
  },
];

/* ================= COMPONENT ================= */

export function History() {
  const navigate = useNavigate();

  const handleCancel = (id) => {
    toast.success("Peminjaman berhasil dibatalkan");
  };

  const handleDetail = (booking) => {
    navigate(`/history/${booking.id}`, { state: booking });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900">
            Riwayat Peminjaman
          </h1>
          <p className="text-gray-600">
            Lihat semua riwayat peminjaman ruangan Anda
          </p>
        </motion.div>

        {/* LIST */}
        <div className="space-y-4">
          {bookingHistory.map((booking, index) => (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-6">

                <div className="flex flex-col md:flex-row md:justify-between gap-4">

                  {/* LEFT */}
                  <div className="flex-1">
                    <div className="flex justify-between mb-2">

                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {booking.room}
                        </h3>

                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="w-4 h-4 mr-1 text-blue-500" />
                          {booking.building}
                        </div>
                      </div>

                      {/* STATUS */}
                      <BookingStatusBadge status={booking.status} />

                    </div>

                    {/* DATE & TIME */}
                    <div className="grid md:grid-cols-2 gap-3 text-sm text-gray-600">

                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                        {new Date(booking.date).toLocaleDateString(
                          "id-ID",
                          {
                            weekday: "long",
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          }
                        )}
                      </div>

                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2 text-blue-500" />
                        {booking.startTime} - {booking.endTime}
                      </div>

                    </div>

                    {/* PURPOSE */}
                    <p className="mt-3 text-sm text-gray-600">
                      <span className="font-medium">Keperluan:</span>{" "}
                      {booking.purpose}
                    </p>
                  </div>

                  {/* ACTION */}
                  <div className="flex md:flex-col gap-2">

                    <button
                      onClick={() => handleDetail(booking)}
                      className="px-4 py-2 border border-blue-200 text-blue-600 hover:bg-blue-50 rounded-lg text-sm cursor-pointer"
                    >
                      Detail
                    </button>

                    {booking.status === "pending" && (
                      <button
                        onClick={() => handleCancel(booking.id)}
                        className="px-4 py-2 border border-red-200 text-red-600 hover:bg-red-50 rounded-lg text-sm cursor-pointer"
                      >
                        Batalkan
                      </button>
                    )}

                  </div>

                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* EMPTY STATE */}
        {bookingHistory.length === 0 && (
          <div className="text-center py-16">
            <Calendar className="mx-auto w-10 h-10 text-gray-400 mb-3" />
            <p className="text-gray-500">Belum ada riwayat</p>
          </div>
        )}
      </div>
    </div>
  );
}