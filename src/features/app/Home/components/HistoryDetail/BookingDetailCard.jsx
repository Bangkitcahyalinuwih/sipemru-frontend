import { motion } from "framer-motion";
import {
  CalendarDays,
  Clock3,
  Building2,
  User2,
  Mail,
  Phone,
  Sparkles,
  Users,
  ShieldAlert,
  FileText,
  BadgeCheck,
  Hash,
  Layers3,
} from "lucide-react";

import { BookingStatusBadge } from "./BookingStatusBadge";
import { BookingQR } from "./BookingQr";

export function BookingDetailCard({ booking }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.4,
      }}
      className="
        relative overflow-hidden
        rounded-[32px]
        border border-white/10
        bg-white/5
        backdrop-blur-2xl
        shadow-[0_10px_40px_rgba(0,0,0,0.35)]
      "
    >
      {/* Background */}
      <div
        className="
          absolute inset-0
          bg-gradient-to-br
          from-blue-500/10
          via-transparent
          to-cyan-400/10
          pointer-events-none
        "
      />

      {/* Glow */}
      <div
        className="
          absolute -top-24 -right-24
          w-80 h-80
          bg-blue-500/10
          rounded-full
          blur-3xl
        "
      />

      <div
        className="
          absolute -bottom-24 -left-24
          w-80 h-80
          bg-cyan-400/10
          rounded-full
          blur-3xl
        "
      />

      {/* Header */}
      <div
        className="
          relative z-10
          p-6 md:p-8
          border-b border-white/10
        "
      >
        <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-6">
          <div className="space-y-4">
            <div
              className="
                inline-flex items-center gap-2
                px-4 py-2
                rounded-full
                border border-white/10
                bg-white/5
                backdrop-blur-xl
                text-cyan-300
                text-sm
                font-medium
              "
            >
              <Sparkles size={15} />
              Detail Booking
            </div>

            <div>
              <h1
                className="
                  text-3xl md:text-4xl
                  font-bold
                  text-white
                  leading-tight
                "
              >
                {booking?.purpose || "Tanpa Judul"}
              </h1>

              <p className="text-white/60 mt-3">
                Informasi lengkap peminjaman ruangan
              </p>
            </div>
          </div>

          <BookingStatusBadge
            status={booking?.status}
          />
        </div>
      </div>

      {/* Content */}
      <div
        className="
          relative z-10
          p-6 md:p-8
          grid grid-cols-1 xl:grid-cols-[1.1fr_0.9fr]
          gap-8
        "
      >
        {/* LEFT */}
        <div className="space-y-5">
          {/* Booking Info */}
          <div className="grid md:grid-cols-2 gap-5">
            <InfoCard
              icon={<Hash size={18} />}
              label="ID Booking"
              value={`#${booking?.id || "-"}`}
            />

            <InfoCard
              icon={<BadgeCheck size={18} />}
              label="Status"
              value={booking?.status}
            />
          </div>

          <InfoCard
            icon={<Building2 size={18} />}
            label="Ruangan"
            value={booking?.room_name}
          />

          <div className="grid md:grid-cols-2 gap-5">
            <InfoCard
              icon={<CalendarDays size={18} />}
              label="Tanggal Booking"
              value={booking?.booking_date}
            />

            <InfoCard
              icon={<Clock3 size={18} />}
              label="Jam Booking"
              value={`${booking?.start_time || "-"} - ${
                booking?.end_time || "-"
              }`}
            />
          </div>

          {/* User Info */}
          <div className="grid md:grid-cols-2 gap-5">
            <InfoCard
              icon={<User2 size={18} />}
              label="Nama Peminjam"
              value={booking?.user_name}
            />

            <InfoCard
              icon={<Phone size={18} />}
              label="Nomor HP"
              value={booking?.phone}
            />
          </div>

          <InfoCard
            icon={<Mail size={18} />}
            label="Email"
            value={booking?.email}
          />

          {/* Organization */}
          <div className="grid md:grid-cols-2 gap-5">
            <InfoCard
              icon={<Building2 size={18} />}
              label="Organisasi"
              value={booking?.organization}
            />

            <InfoCard
              icon={<Users size={18} />}
              label="Jumlah Peserta"
              value={
                booking?.jumlah_peserta
                  ? `${booking.jumlah_peserta} Orang`
                  : "-"
              }
            />
          </div>

          {/* Jenis */}
          <div className="grid md:grid-cols-2 gap-5">
            <InfoCard
              icon={<Layers3 size={18} />}
              label="Jenis Peminjaman"
              value={
                booking?.jenis_peminjaman
              }
            />

            <InfoCard
              icon={<CalendarDays size={18} />}
              label="Dibuat Pada"
              value={
                booking?.created_at
                  ? new Date(
                      booking.created_at
                    ).toLocaleString("id-ID")
                  : "-"
              }
            />
          </div>

          {/* Purpose */}
          <InfoCard
            icon={<FileText size={18} />}
            label="Tujuan Kegiatan"
            value={booking?.purpose}
          />

          {/* Admin Notes */}
          {booking?.admin_notes && (
            <motion.div
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="
                rounded-3xl
                border border-red-500/20
                bg-red-500/10
                backdrop-blur-xl
                p-5
              "
            >
              <div className="flex items-center gap-2 mb-3">
                <ShieldAlert
                  size={18}
                  className="text-red-300"
                />

                <p className="text-sm font-semibold text-red-300">
                  Catatan Admin
                </p>
              </div>

              <p className="text-sm text-red-100/80 leading-relaxed">
                {booking.admin_notes}
              </p>
            </motion.div>
          )}
        </div>

        {/* RIGHT */}
        <div className="flex">
          <div
            className="
              w-full
              rounded-[28px]
              border border-white/10
              bg-white/5
              backdrop-blur-2xl
              p-6
              flex flex-col items-center justify-center
            "
          >
            <BookingQR booking={booking} />

            <div className="mt-5 text-center">
              <p className="text-white font-semibold">
                QR Booking Verification
              </p>

              <p className="text-sm text-white/50 mt-1">
                Tunjukkan QR ini kepada admin
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function InfoCard({
  icon,
  label,
  value,
}) {
  return (
    <motion.div
      whileHover={{
        y: -2,
      }}
      transition={{
        duration: 0.2,
      }}
      className="
        flex items-start gap-4
        rounded-3xl
        border border-white/10
        bg-white/5
        backdrop-blur-xl
        p-4
      "
    >
      {/* Icon */}
      <div
        className="
          w-12 h-12
          rounded-2xl
          border border-white/10
          bg-gradient-to-br
          from-blue-500/20
          to-cyan-400/20
          text-cyan-300
          flex items-center justify-center
          shrink-0
        "
      >
        {icon}
      </div>

      {/* Text */}
      <div className="min-w-0 flex-1">
        <p className="text-sm text-white/50 mb-1">
          {label}
        </p>

        <p
          className="
            text-white
            font-semibold
            break-words
            leading-relaxed
          "
        >
          {value || "-"}
        </p>
      </div>
    </motion.div>
  );
}