import { motion } from "framer-motion";

import {
  Calendar,
  Clock,
  MapPin,
} from "lucide-react";

import { HistoryActions } from "./HistoryActions";
import { BookingStatusBadge } from "../HistoryDetail/BookingStatusBadge";
import { HistoryStatusInfo } from "./HistoryStatusInfo";

export function HistoryCard({
  booking,
  index,
  cancelLoading,
  onDetail,
  onCancel,
}) {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.04,
        duration: 0.2,
      }}
    >
      <div
        className="
          relative
          rounded-2xl
          p-6
          bg-gray-900/80
          backdrop-blur-sm
          border border-gray-700/40
          shadow-lg shadow-black/40
          text-gray-100
          overflow-hidden
          transform-gpu
          transition-all
        "
      >
        {/* subtle glow (soft, not distracting) */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none" />

        <div className="relative flex flex-col lg:flex-row lg:justify-between gap-5">

          <div className="flex-1">

            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">

              <div>
                <h3 className="text-xl font-semibold text-white">
                  {booking.room_name}
                </h3>

                <div className="flex items-center text-sm text-gray-400 mt-1">
                  <MapPin className="w-4 h-4 mr-1 text-blue-400" />
                  {booking.organization}
                </div>
              </div>

              <BookingStatusBadge status={booking.status} />
            </div>

            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-300 mt-5">

              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-blue-400" />
                {formatDate(booking.booking_date)}
              </div>

              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2 text-blue-400" />
                {booking.start_time} - {booking.end_time}
              </div>

            </div>

            <div className="mt-4">
              <p className="text-xs text-gray-500 mb-1">
                Keperluan
              </p>
              <p className="text-sm text-gray-200">
                {booking.purpose}
              </p>
            </div>

            <HistoryStatusInfo status={booking.status} />
          </div>

          <HistoryActions
            booking={booking}
            cancelLoading={cancelLoading}
            onDetail={onDetail}
            onCancel={onCancel}
          />
        </div>
      </div>
    </motion.div>
  );
}