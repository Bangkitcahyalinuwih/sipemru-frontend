import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  Hash,
  Activity,
  DoorOpen
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
  // 🌟 Ambil data dengan fallback jika properti dari API tertukar/kosong
  const id = booking?.id;
  const organization = booking?.organization || "Instansi/Organisasi";
  const booking_date = booking?.booking_date;
  const start_time = booking?.start_time;
  const end_time = booking?.end_time;
  const purpose = booking?.purpose;
  const status = booking?.status;

  // 🔍 ANALISIS COCOK DATA: 
  // Jika booking.room_name kosong, kita pakai data dari booking.room?.name 
  // atau pakai booking.room jika bentuknya string.
  const room_name = booking?.room_name || booking?.room?.name || booking?.room || "Nama Ruangan Tidak Ditemukan";

  const formatDate = (date) => {
    if (!date) return "-";
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

  // 💡 Pemetaan Tema Neon & Laser Berdasarkan Status Booking
  const getStatusTheme = (bookingStatus) => {
    switch (bookingStatus?.toLowerCase()) {
      case "approved":
      case "success":
      case "disetujui": // Tambahkan variasi bahasa Indonesia jika status dari backend pakai bahasa
        return {
          glow: "from-emerald-500/15 via-transparent to-teal-500/10",
          border: "hover:border-emerald-500/30 border-emerald-500/10",
          laserColor: "#10b981",
          iconBg: "bg-emerald-500/10 border-emerald-500/20",
          iconText: "text-emerald-400",
          shimmer: "bg-emerald-400/5"
        };
      case "pending":
      case "waiting":
        return {
          glow: "from-amber-500/15 via-transparent to-orange-500/10",
          border: "hover:border-amber-500/30 border-amber-500/10",
          laserColor: "#f59e0b",
          iconBg: "bg-amber-500/10 border-amber-500/20",
          iconText: "text-amber-400",
          shimmer: "bg-amber-400/5"
        };
      case "cancelled":
      case "rejected":
        return {
          glow: "from-rose-500/15 via-transparent to-red-500/10",
          border: "hover:border-rose-500/30 border-rose-500/10",
          laserColor: "#f43f5e",
          iconBg: "bg-rose-500/10 border-rose-500/20",
          iconText: "text-rose-400",
          shimmer: "bg-rose-400/5"
        };
      default:
        return {
          glow: "from-purple-500/15 via-transparent to-indigo-500/10",
          border: "hover:border-purple-400/30 border-white/10",
          laserColor: "#a855f7",
          iconBg: "bg-purple-500/10 border-purple-500/20",
          iconText: "text-purple-400",
          shimmer: "bg-purple-400/5"
        };
    }
  };

  const theme = getStatusTheme(status);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.25 }}
    >
      <style>{`
        @keyframes animate-laser {
          0%, 100% { clip-path: inset(0 0 95% 0); }
          25% { clip-path: inset(0 0 0 95%); }
          50% { clip-path: inset(95% 0 0 0); }
          75% { clip-path: inset(0 95% 0 0); }
        }
        .laser-border::before {
          content: '';
          position: absolute;
          inset: 0;
          border: 2px solid ${theme.laserColor};
          border-radius: 28px;
          pointer-events: none;
          animation: animate-laser 6s linear infinite;
          filter: drop-shadow(0 0 8px ${theme.laserColor});
          z-index: 20;
        }
      `}</style>

      <div
        className={`
          laser-border
          relative
          overflow-hidden
          rounded-[28px]
          border
          bg-white/[0.02]
          p-6
          shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)]
          backdrop-blur-2xl
          transition-all
          duration-500
          ${theme.border}
          hover:bg-white/[0.04]
          hover:shadow-[0_30px_60px_-10px_rgba(0,0,0,0.9)]
        `}
      >
        <div
          className={`
            absolute inset-0
            bg-gradient-to-br
            ${theme.glow}
            opacity-100
            transition-all
            duration-500
            pointer-events-none
          `}
        />

        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex-1">
            
            {/* TOP BAR: ID & STATUS */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-white/50 mb-3">
                  <Hash className="h-3.5 w-3.5 text-purple-400" />
                  <span>BKG-{String(id || 0).padStart(5, '0')}</span>
                </div>
                
                {/* SEKSI UTAMA: NAMA RUANGAN */}
                <div className="flex items-start gap-3.5">
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border ${theme.iconBg} shadow-inner`}>
                    <DoorOpen className={`h-6 w-6 ${theme.iconText}`} />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-black tracking-widest text-purple-400/90 block mb-0.5">
                      Ruangan Yang Di-booking
                    </span>
                    <h3 className="text-2xl font-medium tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)] leading-tight">
                      {room_name}
                    </h3>
                  </div>
                </div>

                {/* Tempat Instansi / Detail Tambahan */}
                <div className="mt-3.5 flex items-center text-sm font-medium text-gray-300 pl-1">
                  <MapPin className="mr-2 h-4 w-4 text-purple-400 shrink-0" />
                  {organization}
                </div>
              </div>

              <div className="self-start sm:self-auto pt-1">
                <BookingStatusBadge status={status} />
              </div>
            </div>

            {/* METADATA GRID */}
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="flex items-center gap-3.5 rounded-2xl border border-white/5 bg-white/[0.02] p-3.5 backdrop-blur-md transition-all duration-300 hover:bg-white/[0.04]">
                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${theme.iconBg}`}>
                  <Calendar className={`h-5 w-5 ${theme.iconText}`} />
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                    Tanggal Pemakaian
                  </p>
                  <p className="text-sm font-semibold text-white mt-0.5">
                    {formatDate(booking_date)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3.5 rounded-2xl border border-white/5 bg-white/[0.02] p-3.5 backdrop-blur-md transition-all duration-300 hover:bg-white/[0.04]">
                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${theme.iconBg}`}>
                  <Clock className={`h-5 w-5 ${theme.iconText}`} />
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                    Sesi Jam Pemakaian
                  </p>
                  <p className="text-sm font-bold text-white mt-0.5 tracking-wide">
                    {start_time} - {end_time}
                  </p>
                </div>
              </div>
            </div>

            {/* KEPERLUAN BOX */}
            <div className="mt-5 rounded-2xl border border-white/[0.06] bg-black/40 p-4 backdrop-blur-md">
              <div className="flex items-center gap-2 mb-2 text-[11px] font-bold uppercase tracking-wider text-gray-400">
                <Activity className={`h-3.5 w-3.5 ${theme.iconText}`} />
                <span>Agenda / Keperluan</span>
              </div>
              <p className="text-sm leading-relaxed text-gray-200 font-medium">
                {purpose || "-"}
              </p>
            </div>

            {/* LIVE STATUS INFO BOX */}
            <div className={`mt-5 rounded-2xl border border-white/5 p-3.5 ${theme.shimmer} backdrop-blur-sm`}>
              <HistoryStatusInfo status={status} />
            </div>
          </div>

          {/* ACTIONS */}
          <div className="lg:mt-1 pt-2 lg:pt-0 border-t border-white/5 lg:border-none">
            <HistoryActions
              booking={booking}
              cancelLoading={cancelLoading}
              onDetail={onDetail}
              onCancel={onCancel}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}