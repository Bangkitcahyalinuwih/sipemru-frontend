import { lazy, Suspense } from "react";

import {
  LazyMotion,
  domAnimation,
  m,
} from "framer-motion";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import { BackButton } from "../components/BackButton";

/*
  =========================
  LAZY LOAD COMPONENT
  =========================
*/

const RoomDetailCard = lazy(() =>
  import("../components/roomDetaiil").then(
    (module) => ({
      default: module.RoomDetailCard,
    }),
  ),
);

/*
  =========================
  ANIMATION
  =========================
*/

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 20,
  },

  show: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.4,
    },
  },
};

export function RoomDetailPage() {
  const { state } = useLocation();

  const navigate = useNavigate();

  /*
    =========================
    ROOM NOT FOUND
    =========================
  */

  if (!state) {
    return (
      <div
        className="
          min-h-screen
          flex items-center
          justify-center
          bg-gradient-to-br
          from-slate-950
          via-indigo-950
          to-slate-950
        "
      >
        <div
          className="
            p-8
            rounded-3xl
            bg-white/10
            border border-white/10
            shadow-2xl
            text-center
            max-w-md
          "
        >
          <div className="text-5xl mb-4">
            🔍
          </div>

          <h2
            className="
              text-2xl
              font-bold
              text-white
              mb-2
            "
          >
            Room Tidak Ditemukan
          </h2>

          <p
            className="
              text-slate-300
              mb-6
            "
          >
            Data ruangan tidak tersedia
          </p>

          <button
            onClick={() =>
              navigate(-1)
            }
            className="
              px-6 py-3
              rounded-xl
              bg-indigo-600
              hover:bg-indigo-500
              transition
              text-white
              font-semibold
            "
          >
            Kembali
          </button>
        </div>
      </div>
    );
  }

  return (
    <LazyMotion
      features={domAnimation}
    >
      <div
        className="
          relative
          min-h-screen
          overflow-hidden
          bg-gradient-to-br
          from-slate-950
          via-indigo-950
          to-slate-950
        "
      >
        {/* ======================
            BACKGROUND GLOW
        ====================== */}

        <div
          className="
            absolute inset-0
            -z-10
            overflow-hidden
            pointer-events-none
          "
        >
          <div
            className="
              absolute
              -top-20
              -left-20
              w-[250px]
              h-[250px]
              bg-purple-500/20
              blur-2xl
              rounded-full
            "
          />

          <div
            className="
              absolute
              bottom-0
              right-0
              w-[280px]
              h-[280px]
              bg-pink-500/20
              blur-2xl
              rounded-full
            "
          />
        </div>

        {/* ======================
            CONTENT
        ====================== */}

        <div
          className="
            relative z-10
            px-6 md:px-10
            py-8
          "
        >
          {/* BACK BUTTON */}

          <m.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mb-6"
          >
            <BackButton
              onClick={() =>
                navigate(-1)
              }
            />
          </m.div>

          {/* ROOM DETAIL */}

          <m.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{
              delay: 0.1,
            }}
          >
            <Suspense
              fallback={
                <div
                  className="
                    flex items-center
                    justify-center
                    min-h-[300px]
                  "
                >
                  <div
                    className="
                      px-6 py-4
                      rounded-2xl
                      bg-white/10
                      border border-white/10
                      text-white
                      backdrop-blur-sm
                    "
                  >
                    Loading room detail...
                  </div>
                </div>
              }
            >
              <RoomDetailCard
                room={state}
                onBooking={() =>
                  navigate(
                    "/booking",
                    {
                      state: {
                        roomName:
                          state.name,

                        roomId:
                          state.id,
                      },
                    },
                  )
                }
              />
            </Suspense>
          </m.div>
        </div>
      </div>
    </LazyMotion>
  );
}