import {
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";

import { Navbar } from "../features/app/Home/components/Header";

import { Home } from "../features/app/Home/Pages/Home";
import { History } from "../features/app/Home/Pages/History";
import { Booking } from "../features/app/Home/Pages/Booking";
import RoomListPages from "../features/app/Home/Pages/RoomList";
import { RoomDetailPage } from "../features/app/Home/Pages/roomDetail";
import { HistoryDetailPage } from "../features/app/Home/Pages/HistoryDetailPages";




import RegisterPage from "../features/app/auth/pages/RegisterPages";
import LoginPage from "../features/app/auth/pages/LoginPages";
import { getCurrentUser } from "../features/Admin/Users/service/UserService";


function ProtectedRoute({
  children,
}) {
  const user = getCurrentUser();

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  return children;
}

/* ================= LAYOUT ================= */

function LayoutWrapper() {
  return (
    <div
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-gradient-to-br
        from-slate-950
        via-indigo-950
        to-slate-950
        text-white
        flex flex-col
      "
    >
      {/* Background */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div
          className="
            absolute top-[-120px] left-[5%]
            h-[500px] w-[500px]
            rounded-full
            bg-purple-500/20
            blur-3xl
            animate-pulse
          "
        />

        <div
          className="
            absolute top-[20%] right-[5%]
            h-[500px] w-[500px]
            rounded-full
            bg-pink-500/10
            blur-3xl
            animate-pulse
            delay-1000
          "
        />

        <div
          className="
            absolute left-1/2 top-1/2
            h-[700px] w-[700px]
            -translate-x-1/2 -translate-y-1/2
            rounded-full
            bg-indigo-500/10
            blur-3xl
            animate-pulse
            delay-500
          "
        />

        <div
          className="
            absolute bottom-[-200px] left-1/3
            h-[500px] w-[500px]
            rounded-full
            bg-purple-700/10
            blur-3xl
            animate-pulse
            delay-2000
          "
        />

        <div
          className="
            absolute inset-0
            opacity-[0.03]
            bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)]
            bg-[size:70px_70px]
          "
        />
      </div>

      {/* Navbar */}
      <Navbar />

      {/* Content */}
      <div
        className="
          flex-1
          overflow-y-auto
          overflow-x-hidden
        "
      >
        <main
          className="
            relative z-10
            flex flex-col
            min-h-full
          "
        >
          <Outlet />
        </main>

        {/* Footer */}
        <footer
          className="
            relative
            border-t border-white/10
            bg-black/20
            backdrop-blur-2xl
          "
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
            <div className="grid md:grid-cols-3 gap-10">
              <div>
                <h2
                  className="
                    text-2xl
                    font-bold
                    bg-gradient-to-r
                    from-white
                    to-purple-300
                    bg-clip-text
                    text-transparent
                  "
                >
                  Simaru
                </h2>

                <p className="text-sm text-gray-400 mt-3 leading-relaxed">
                  Sistem Manajemen Ruangan untuk
                  peminjaman, pengelolaan, dan
                  monitoring ruangan secara modern.
                </p>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-4">
                  Menu
                </h3>

                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="hover:text-white transition cursor-pointer">
                    Beranda
                  </li>

                  <li className="hover:text-white transition cursor-pointer">
                    Ruangan
                  </li>

                  <li className="hover:text-white transition cursor-pointer">
                    Riwayat
                  </li>

                  <li className="hover:text-white transition cursor-pointer">
                    Booking
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-4">
                  Kontak
                </h3>

                <ul className="space-y-2 text-sm text-gray-400">
                  <li>Email: support@simaru.app</li>

                  <li>
                    Telp: +62 812-0000-0000
                  </li>

                  <li>
                    Madiun, Indonesia
                  </li>
                </ul>
              </div>
            </div>

            <div
              className="
                mt-10 pt-6
                border-t border-white/10
                flex flex-col md:flex-row
                items-center justify-between
                gap-4
              "
            >
              <p className="text-xs text-gray-500">
                ©{" "}
                {new Date().getFullYear()}{" "}
                Simaru.
                All rights reserved.
              </p>

              <div className="flex gap-6 text-xs text-gray-400">
                <span className="hover:text-white cursor-pointer">
                  Privacy
                </span>

                <span className="hover:text-white cursor-pointer">
                  Terms
                </span>

                <span className="hover:text-white cursor-pointer">
                  Support
                </span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}


export function UserLayout() {
  return (
    <Routes>

      <Route
        path="/login"
        element={<LoginPage />}
      />

      <Route
        path="/register"
        element={<RegisterPage />}
      />


      <Route element={<LayoutWrapper />}>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/roomlist"
          element={<RoomListPages />}
        />

        <Route
          path="/booking"
          element={
            <ProtectedRoute>
              <Booking />
            </ProtectedRoute>
          }
        />

        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          }
        />

        <Route
          path="/room/:id"
          element={
            <ProtectedRoute>
              <RoomDetailPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/history/:id"
          element={
            <ProtectedRoute>
              <HistoryDetailPage />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}