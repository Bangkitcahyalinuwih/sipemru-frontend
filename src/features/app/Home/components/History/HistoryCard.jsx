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
    return new Date(date).toLocaleDateString(
      "id-ID",
      {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      },
    );
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 12,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay: index * 0.04,
        duration: 0.25,
      }}
    >
      <div
        className="
          relative
          overflow-hidden
          rounded-[30px]
          border border-white/10
          bg-black/30
          p-6
          shadow-[0_20px_60px_rgba(0,0,0,0.45)]
          backdrop-blur-2xl
          transition-all
          duration-300
          hover:border-purple-400/20
          hover:bg-black/35
        "
      >
        <div
          className="
            absolute inset-0
            bg-gradient-to-br
            from-purple-500/10
            via-transparent
            to-indigo-500/10
          "
        />

        <div
          className="
            absolute inset-0
            bg-gradient-to-b
            from-white/[0.03]
            to-transparent
          "
        />

        <div
          className="
            absolute
            -top-20
            -left-20
            h-44
            w-44
            rounded-full
            bg-indigo-500/10
            blur-3xl
          "
        />

        <div
          className="
            absolute
            -bottom-20
            -right-20
            h-44
            w-44
            rounded-full
            bg-purple-500/15
            blur-3xl
          "
        />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex-1">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="text-xl font-semibold text-white">
                  {booking.room_name}
                </h3>

                <div className="mt-2 flex items-center text-sm text-gray-400">
                  <MapPin className="mr-2 h-4 w-4 text-purple-400" />
                  {booking.organization}
                </div>
              </div>

              <BookingStatusBadge
                status={booking.status}
              />
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-2">
              <div
                className="
                  flex items-center gap-3
                  rounded-2xl
                  border border-white/10
                  bg-white/[0.03]
                  px-4 py-3
                  backdrop-blur-xl
                "
              >
                <div
                  className="
                    flex h-10 w-10
                    items-center justify-center
                    rounded-xl
                    border border-white/10
                    bg-white/[0.04]
                  "
                >
                  <Calendar className="h-4 w-4 text-purple-400" />
                </div>

                <div>
                  <p className="text-[11px] text-gray-500">
                    Tanggal
                  </p>

                  <p className="text-sm text-gray-100">
                    {formatDate(
                      booking.booking_date,
                    )}
                  </p>
                </div>
              </div>

              <div
                className="
                  flex items-center gap-3
                  rounded-2xl
                  border border-white/10
                  bg-white/[0.03]
                  px-4 py-3
                  backdrop-blur-xl
                "
              >
                <div
                  className="
                    flex h-10 w-10
                    items-center justify-center
                    rounded-xl
                    border border-white/10
                    bg-white/[0.04]
                  "
                >
                  <Clock className="h-4 w-4 text-purple-400" />
                </div>

                <div>
                  <p className="text-[11px] text-gray-500">
                    Waktu
                  </p>

                  <p className="text-sm text-gray-100">
                    {booking.start_time} -{" "}
                    {booking.end_time}
                  </p>
                </div>
              </div>
            </div>

            <div
              className="
                mt-5
                rounded-2xl
                border border-white/10
                bg-black/20
                p-4
                backdrop-blur-xl
              "
            >
              <p className="mb-2 text-[11px] uppercase tracking-wide text-gray-500">
                Keperluan
              </p>

              <p className="text-sm leading-relaxed text-gray-200">
                {booking.purpose}
              </p>
            </div>

            <div className="mt-5">
              <HistoryStatusInfo
                status={booking.status}
              />
            </div>
          </div>

          <HistoryActions
            booking={booking}
            cancelLoading={
              cancelLoading
            }
            onDetail={onDetail}
            onCancel={onCancel}
          />
        </div>
      </div>
    </motion.div>
  );
}