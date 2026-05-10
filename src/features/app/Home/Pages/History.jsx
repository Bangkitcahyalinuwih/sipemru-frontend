import { motion } from "framer-motion";

import {
  Calendar,
  Clock,
  MapPin,
  Loader2,
  XCircle,
  CheckCircle2,
  Eye,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import { toast } from "sonner";

import { useNavigate } from "react-router-dom";

import { BookingStatusBadge } from "../components/History/BookingStatusBadge";
import { getBookings } from "../../../Admin/Booking/service/BookingService";



export function History() {
  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(true);

  const [bookingHistory, setBookingHistory] =
    useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);

      await new Promise((resolve) =>
        setTimeout(resolve, 800)
      );

      const data = await getBookings();


      const filtered = data.filter(
        (item) => item.user_id === 1
      );

      setBookingHistory(filtered);
    } catch (error) {
      console.error(error);

      toast.error(
        "Gagal memuat riwayat booking"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = (id) => {
    const updated = bookingHistory.map(
      (item) =>
        item.id === id
          ? {
              ...item,
              status: "cancelled",
            }
          : item
    );

    setBookingHistory(updated);

    toast.success(
      "Peminjaman berhasil dibatalkan"
    );
  };

  const handleDetail = (booking) => {
    navigate(`/history/${booking.id}`, {
      state: booking,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">

      <div className="max-w-7xl mx-auto px-4">

        {/* HEADER */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900">
            Riwayat Peminjaman
          </h1>

          <p className="text-gray-600 mt-1">
            Lihat semua riwayat peminjaman
            ruangan Anda
          </p>
        </motion.div>

        {/* LOADING */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">

            <Loader2
              size={40}
              className="animate-spin text-blue-600"
            />

            <p className="text-gray-500">
              Memuat data booking...
            </p>
          </div>
        ) : bookingHistory.length === 0 ? (

          /* EMPTY */
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 py-20 text-center">

            <Calendar className="mx-auto w-12 h-12 text-gray-300 mb-4" />

            <h3 className="text-lg font-semibold text-gray-700">
              Belum Ada Booking
            </h3>

            <p className="text-gray-500 text-sm mt-1">
              Riwayat booking akan muncul
              di sini
            </p>
          </div>
        ) : (

          /* LIST */
          <div className="space-y-5">
            {bookingHistory.map(
              (booking, index) => (
                <motion.div
                  key={booking.id}
                  initial={{
                    opacity: 0,
                    x: -20,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    delay: index * 0.1,
                  }}
                >
                  <div
                    className="
                      bg-white
                      rounded-2xl
                      shadow-sm
                      border
                      border-gray-100
                      hover:shadow-lg
                      transition-all
                      p-6
                    "
                  >

                    <div className="flex flex-col lg:flex-row lg:justify-between gap-5">

                      {/* LEFT */}
                      <div className="flex-1">

                        {/* TOP */}
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">

                          <div>
                            <h3 className="text-xl font-bold text-gray-900">
                              {booking.room_name}
                            </h3>

                            <div className="flex items-center text-sm text-gray-600 mt-1">
                              <MapPin className="w-4 h-4 mr-1 text-blue-500" />

                              {booking.organization ||
                                "Tidak ada organisasi"}
                            </div>
                          </div>

                          {/* STATUS */}
                          <BookingStatusBadge
                            status={
                              booking.status
                            }
                          />
                        </div>

                        {/* DATE & TIME */}
                        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600 mt-5">

                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2 text-blue-500" />

                            {new Date(
                              booking.booking_date
                            ).toLocaleDateString(
                              "id-ID",
                              {
                                weekday:
                                  "long",
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              }
                            )}
                          </div>

                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2 text-blue-500" />

                            {
                              booking.start_time
                            }{" "}
                            -
                            {" "}
                            {
                              booking.end_time
                            }
                          </div>
                        </div>

                        {/* PURPOSE */}
                        <div className="mt-4">
                          <p className="text-sm text-gray-500 mb-1">
                            Keperluan
                          </p>

                          <p className="text-sm text-gray-700">
                            {
                              booking.purpose
                            }
                          </p>
                        </div>

                        {/* STATUS INFO */}
                        <div className="mt-5 pt-5 border-t border-gray-100">

                          {booking.status ===
                            "approved" && (
                            <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
                              <CheckCircle2 size={18} />

                              Booking telah
                              disetujui admin
                            </div>
                          )}

                          {booking.status ===
                            "pending" && (
                            <div className="flex items-center gap-2 text-yellow-600 text-sm font-medium">
                              <Loader2
                                size={18}
                                className="animate-spin"
                              />

                              Menunggu
                              persetujuan
                              admin
                            </div>
                          )}

                          {(booking.status ===
                            "rejected" ||
                            booking.status ===
                              "cancelled") && (
                            <div className="flex items-center gap-2 text-red-600 text-sm font-medium">
                              <XCircle size={18} />

                              Booking tidak
                              dapat digunakan
                            </div>
                          )}
                        </div>
                      </div>

                      {/* ACTION */}
                      <div className="flex lg:flex-col gap-3">

                        <button
                          onClick={() =>
                            handleDetail(
                              booking
                            )
                          }
                          className="
                            px-4
                            py-2.5
                            rounded-xl
                            border
                            border-blue-200
                            text-blue-600
                            hover:bg-blue-50
                            transition
                            text-sm
                            font-medium
                            flex
                            items-center
                            justify-center
                            gap-2
                            cursor-pointer
                          "
                        >
                          <Eye size={16} />

                          Detail
                        </button>

                        {booking.status ===
                          "pending" && (
                          <button
                            onClick={() =>
                              handleCancel(
                                booking.id
                              )
                            }
                            className="
                              px-4
                              py-2.5
                              rounded-xl
                              border
                              border-red-200
                              text-red-600
                              hover:bg-red-50
                              transition
                              text-sm
                              font-medium
                              cursor-pointer
                            "
                          >
                            Batalkan
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
} 