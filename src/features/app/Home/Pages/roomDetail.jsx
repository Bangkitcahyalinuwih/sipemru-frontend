import { memo, useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BackButton } from "../components/BackButton";
import { RoomDetailCard } from "../components/roomDetaiil";

const CONTAINER_CLASSES =
  "relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950";

const CONTENT_CLASSES =
  "relative z-10 px-6 py-8 md:px-10";

const ERROR_CONTAINER_CLASSES =
  "min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950";

const ERROR_CARD_CLASSES =
  "max-w-md rounded-3xl border border-white/10 bg-white/10 p-8 text-center shadow-2xl";

const BUTTON_CLASSES =
  "rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-500";

const RoomNotFound = memo(({ onBack }) => (
  <div className={ERROR_CONTAINER_CLASSES}>
    <div className={ERROR_CARD_CLASSES}>
      <div className="mb-4 text-5xl">🔍</div>

      <h2 className="mb-2 text-2xl font-bold text-white">
        Room Tidak Ditemukan
      </h2>

      <p className="mb-6 text-slate-300">
        Data ruangan tidak tersedia
      </p>

      <button
        type="button"
        onClick={onBack}
        className={BUTTON_CLASSES}
      >
        Kembali
      </button>
    </div>
  </div>
));

RoomNotFound.displayName = "RoomNotFound";

const BackgroundBlobs = memo(() => (
  <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
    <div className="absolute -left-20 -top-20 h-[250px] w-[250px] rounded-full bg-purple-500/20 blur-2xl" />

    <div className="absolute bottom-0 right-0 h-[280px] w-[280px] rounded-full bg-pink-500/20 blur-2xl" />
  </div>
));

BackgroundBlobs.displayName = "BackgroundBlobs";

export function RoomDetailPage() {
  const { state } = useLocation();

  const navigate = useNavigate();

  const [allContentLoaded, setAllContentLoaded] =
    useState(false);

  const handleGoBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handleBooking = useCallback(() => {
    navigate("/booking", {
      state: {
        roomName: state.name,
        roomId: state.id,
      },
    });
  }, [navigate, state?.id, state?.name]);

  useEffect(() => {
    if (!state) return;

    const preloadImages = async () => {
      await new Promise((resolve) => {
        requestAnimationFrame(() => {
          requestAnimationFrame(resolve);
        });
      });

      if (state.images?.length) {
        await Promise.all(
          state.images.map(
            (src) =>
              new Promise((resolve) => {
                const img = new Image();

                img.onload = resolve;
                img.onerror = resolve;
                img.src = src;
              }),
          ),
        );
      }

      setAllContentLoaded(true);
    };

    preloadImages();
  }, [state]);

  if (!state) {
    return (
      <RoomNotFound
        onBack={handleGoBack}
      />
    );
  }

  return (
    <div
      className={CONTAINER_CLASSES}
      data-prerendered={
        allContentLoaded
      }
    >
      <BackgroundBlobs />

      <div className={CONTENT_CLASSES}>
        <div className="mb-6">
          <BackButton
            onClick={handleGoBack}
          />
        </div>

        <RoomDetailCard
          room={state}
          onBooking={
            handleBooking
          }
          loading="eager"
        />
      </div>
    </div>
  );
}