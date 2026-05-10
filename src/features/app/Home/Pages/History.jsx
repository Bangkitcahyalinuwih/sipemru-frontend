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

import { useRealtimeBookings } from "../hook/useRealtimeBookings";

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

  useRealtimeBookings({
    currentUser,
    setBookingHistory,
  });

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
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-10">
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500/10 rounded-full blur-2xl" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-400/10 rounded-full blur-2xl" />
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="mb-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 shadow-md">
          <HistoryHeader />
        </div>
        {loading ? (
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl shadow-md">
            <HistoryLoading />
          </div>
        ) : bookingHistory.length === 0 ? (
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl shadow-md">
            <HistoryEmpty />
          </div>
        ) : (
          <div className="space-y-4">

            {bookingHistory.map((booking, index) => (
              <div
                key={booking.id}
                className="
                  bg-white/5
                  backdrop-blur-sm
                  border border-white/10
                  rounded-2xl
                  shadow-md
                  hover:bg-white/10
                  transition-colors
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