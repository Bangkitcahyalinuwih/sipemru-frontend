import {
  useEffect,
  useState,
  useCallback,
} from "react";

import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

import {
  getBookings,
  cancelBooking,
} from "../../../Admin/Booking/service/BookingService";

import { HistoryHeader } from "../components/History/HistoryHeader";
import { HistoryLoading } from "../components/History/HistoryLoading";
import { HistoryEmpty } from "../components/History/HistoryEmpty";
import { HistoryCard } from "../components/History/HistoryCard";

export function History() {
  const navigate = useNavigate();

  const [currentUser] = useState(() => {
    return (
      JSON.parse(localStorage.getItem("user")) || {
        id: 1,
      }
    );
  });

  const [loading, setLoading] = useState(true);
  const [bookingHistory, setBookingHistory] = useState([]);
  const [cancelLoading, setCancelLoading] = useState(null);

  const fetchBookings = useCallback(async () => {
    try {
      setLoading(true);

      const data = await getBookings();

      const filtered = data.filter(
        (item) => item.user_id === currentUser.id
      );

      setBookingHistory(filtered);
    } catch (error) {
      console.error(error);
      toast.error("Gagal memuat riwayat booking");
    } finally {
      setLoading(false);
    }
  }, [currentUser.id]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  // ✅ Pemanggilan useRealtimeBookings sudah dihapus dari sini

  const handleCancel = async (id) => {
    try {
      setCancelLoading(id);

      const success = await cancelBooking(id);

      if (!success) {
        toast.error("Gagal membatalkan booking");
        return;
      }

      setBookingHistory((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, status: "cancelled" }
            : item
        )
      );

      toast.success("Booking berhasil dibatalkan");
    } catch (error) {
      console.error(error);
      toast.error("Terjadi kesalahan");
    } finally {
      setCancelLoading(null);
    }
  };

  const handleDetail = (booking) => {
    navigate(`/history/${booking.id}`, {
      state: booking,
    });
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0B0B12] py-10">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-[-150px] left-[5%] h-[450px] w-[450px] rounded-full bg-purple-600/15 blur-3xl" />
        <div className="absolute bottom-[-100px] right-[5%] h-[500px] w-[500px] rounded-full bg-pink-600/10 blur-3xl" />
        <div className="absolute left-1/2 top-[40%] h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-indigo-600/10 blur-3xl" />
        <div
          className="
            absolute inset-0 opacity-20
            bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)]
            bg-[size:70px_70px]
          "
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div
          className="
            mb-6
            rounded-2xl
            border border-white/10
            bg-white/[0.03]
            p-5
            shadow-xl
            backdrop-blur-2xl
          "
        >
          <HistoryHeader />
        </div>

        {loading ? (
          <div
            className="
              rounded-2xl
              border border-white/10
              bg-white/[0.03]
              shadow-xl
              backdrop-blur-2xl
            "
          >
            <HistoryLoading />
          </div>
        ) : bookingHistory.length === 0 ? (
          <div
            className="
              rounded-2xl
              border border-white/10
              bg-white/[0.03]
              shadow-xl
              backdrop-blur-2xl
            "
          >
            <HistoryEmpty />
          </div>
        ) : (
          <div className="space-y-4">
            {bookingHistory.map((booking, index) => (
              <div
                key={booking.id}
                className="
                  rounded-2xl
                  border border-white/10
                  bg-white/[0.03]
                  shadow-xl
                  backdrop-blur-2xl
                  transition-all
                  duration-300
                  hover:bg-white/[0.05]
                "
              >
                <HistoryCard
                  booking={booking}
                  index={index}
                  cancelLoading={cancelLoading}
                  onDetail={handleDetail}
                  onCancel={handleCancel}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}