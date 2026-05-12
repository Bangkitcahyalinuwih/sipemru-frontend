import {
  QrCode,
  Download,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export function BookingQR({ booking }) {
  if (!booking?.qr_code) {
    return (
      <div
        className="
          relative overflow-hidden
          rounded-[32px]
          border border-white/20
          bg-white/10
          backdrop-blur-2xl
          p-10
          text-center
          shadow-[0_8px_32px_rgba(31,38,135,0.12)]
        "
      >
        {/* Glow */}
        <div
          className="
            absolute inset-0
            bg-gradient-to-br
            from-white/10
            via-transparent
            to-blue-500/10
            pointer-events-none
          "
        />

        <div
          className="
            relative z-10
            flex flex-col items-center
          "
        >
          <div
            className="
              w-24 h-24
              rounded-3xl
              bg-white/10
              border border-white/20
              backdrop-blur-xl
              flex items-center justify-center
              mb-6
            "
          >
            <QrCode
              size={42}
              className="text-white/70"
            />
          </div>

          <h3 className="text-2xl font-bold text-white">
            QR Belum Tersedia
          </h3>

          <p className="text-white/60 mt-3 max-w-xs leading-relaxed">
            QR booking akan muncul setelah admin
            menyetujui peminjaman ruangan.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="
        relative overflow-hidden
        rounded-[36px]
        border border-white/20
        bg-white/10
        backdrop-blur-3xl
        shadow-[0_8px_32px_rgba(31,38,135,0.15)]
        p-8
      "
    >
      {/* Background Glow */}
      <div
        className="
          absolute inset-0
          bg-gradient-to-br
          from-cyan-400/10
          via-transparent
          to-indigo-500/10
          pointer-events-none
        "
      />

      {/* Blur Orbs */}
      <div
        className="
          absolute -top-20 -right-20
          w-52 h-52
          bg-cyan-400/20
          rounded-full
          blur-3xl
        "
      />

      <div
        className="
          absolute -bottom-24 -left-24
          w-60 h-60
          bg-indigo-500/20
          rounded-full
          blur-3xl
        "
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div
            className="
              inline-flex items-center gap-2
              px-4 py-2
              rounded-full
              border border-white/20
              bg-white/10
              backdrop-blur-xl
              text-white
              text-sm
              font-medium
              mb-5
            "
          >
            <ShieldCheck size={16} />
            QR Booking Active
          </div>

          <h2
            className="
              text-3xl
              font-bold
              text-white
              tracking-tight
            "
          >
            Scan QR Code
          </h2>

          <p className="text-white/60 mt-3 text-sm">
            Tunjukkan QR kepada admin ruangan
          </p>
        </div>

        {/* QR Container */}
        <div className="flex justify-center">
          <div
            className="
              relative
              rounded-[32px]
              border border-white/20
              bg-white/15
              backdrop-blur-2xl
              p-6
              shadow-[0_8px_32px_rgba(255,255,255,0.08)]
            "
          >
            {/* Sparkle */}
            <div
              className="
                absolute top-4 right-4
                w-9 h-9
                rounded-full
                bg-white/20
                flex items-center justify-center
              "
            >
              <Sparkles
                size={16}
                className="text-white"
              />
            </div>

            {/* QR */}
            <div
              className="
                rounded-3xl
                overflow-hidden
                bg-white
                p-4
              "
            >
              <img
                src={booking.qr_code}
                alt="QR Booking"
                className="
                  w-64 h-64
                  object-contain
                "
              />
            </div>
          </div>
        </div>

        {/* Booking Code */}
        <div className="mt-8 text-center">
          <p className="text-white/50 text-sm">
            Booking ID
          </p>

          <h3
            className="
              text-2xl
              font-bold
              text-white
              tracking-[0.3em]
              mt-2
            "
          >
            #{booking.id}
          </h3>
        </div>

        {/* Download */}
        <div className="mt-8 flex justify-center">
          <a
            href={booking.qr_code}
            download
            className="
              inline-flex items-center gap-3
              px-6 py-3.5
              rounded-2xl
              border border-white/20
              bg-white/10
              backdrop-blur-xl
              text-white
              font-medium
              hover:bg-white/20
              transition-all duration-300
              hover:scale-105
            "
          >
            <Download size={18} />
            Download QR
          </a>
        </div>

        {/* Footer Note */}
        <div
          className="
            mt-8
            rounded-2xl
            border border-white/10
            bg-white/5
            backdrop-blur-xl
            p-4
            text-center
          "
        >
          <p className="text-sm text-white/60 leading-relaxed">
            QR ini bersifat unik dan hanya berlaku
            untuk satu booking ruangan.
          </p>
        </div>
      </div>
    </div>
  );
}