import { useLocation, useNavigate } from "react-router-dom";

import { BookingDetailCard } from "../components/HistoryDetail/BookingDetailCard";
import { BackButton } from "../components/BackButton";

export function HistoryDetailPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div
        className="
          min-h-screen
          flex items-center justify-center
          bg-gradient-to-br
          from-slate-950
          via-slate-900
          to-slate-950
          text-white
        "
      >
        <div
          className="
            rounded-3xl
            border border-white/10
            bg-white/5
            backdrop-blur-2xl
            px-8 py-6
            text-center
          "
        >
          <h1 className="text-2xl font-bold mb-2">
            Data Tidak Ditemukan
          </h1>

          <p className="text-white/60">
            Detail booking tidak tersedia.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="
        min-h-screen
        relative overflow-hidden
        bg-gradient-to-br
        from-slate-950
        via-slate-900
        to-slate-950
        py-10 md:py-14
      "
    >
      {/* Background Glow */}
      <div
        className="
          absolute top-0 left-0
          w-80 h-80
          bg-blue-500/10
          rounded-full
          blur-3xl
        "
      />

      <div
        className="
          absolute bottom-0 right-0
          w-80 h-80
          bg-cyan-400/10
          rounded-full
          blur-3xl
        "
      />

      {/* Content */}
      <div
        className="
          relative z-10
          w-full
          max-w-7xl
          mx-auto
          px-4 md:px-6 lg:px-8
        "
      >
        {/* Back Button */}
        <div className="mb-6">
          <BackButton onClick={() => navigate(-1)} />
        </div>

        {/* Detail Card */}
        <BookingDetailCard booking={state} />
      </div>
    </div>
  );
}