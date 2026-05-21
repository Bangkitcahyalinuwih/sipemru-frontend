import { Routes, Route, Outlet, Navigate } from "react-router-dom";

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
import ProfilePages from "../features/app/Home/Pages/ProfilePages";

function ProtectedRoute({ children }) {
  const user = getCurrentUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function LayoutWrapper() {
  return (
    <div
      className="
        relative
        min-h-screen
        text-white
        overflow-x-hidden
        bg-[#0B0B12]
      "
    >
      <div className="fixed inset-0 -z-50 overflow-hidden">
        <div className="absolute top-[-150px] left-[5%] w-[450px] h-[450px] rounded-full bg-purple-600/15 blur-3xl" />

        <div className="absolute bottom-[-100px] right-[5%] w-[500px] h-[500px] rounded-full bg-pink-600/10 blur-3xl" />

        <div className="absolute top-[40%] left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-indigo-600/10 blur-3xl" />

        <div
          className="
            absolute inset-0
            bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)]
            bg-[size:70px_70px]
            opacity-20
          "
        />
      </div>

      <div className="relative z-10">
        <Navbar />

        <main className="relative">
          <Outlet />
        </main>

        <footer className="relative overflow-hidden border-t border-white/10 bg-[#070014]">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[-120px] left-[10%] h-[400px] w-[400px] rounded-full bg-purple-600/15 blur-3xl" />

            <div className="absolute bottom-[-180px] right-[5%] h-[500px] w-[500px] rounded-full bg-pink-600/10 blur-3xl" />

            <div className="absolute left-1/2 top-[20%] h-[450px] w-[450px] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl" />

            <div
              className="
        absolute inset-0 opacity-[0.03]
        bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)]
        bg-[size:70px_70px]
      "
            />
          </div>

          <div className="relative z-10 mx-auto max-w-7xl px-6 py-14 lg:px-8">
            <div className="grid gap-10 md:grid-cols-3">
              <div>
                <h2
                  className="
            bg-gradient-to-r
            from-white
            via-purple-200
            to-pink-300
            bg-clip-text
            text-3xl
            font-bold
            text-transparent
          "
                >
                  Simaru
                </h2>

                <p className="mt-4 max-w-sm text-sm leading-relaxed text-gray-400">
                  Sistem manajemen ruangan modern untuk peminjaman, pengelolaan,
                  dan monitoring ruangan kampus.
                </p>
              </div>

              <div>
                <h3 className="mb-5 font-semibold text-white">Menu</h3>

                <ul className="space-y-3 text-sm text-gray-400">
                  {["Beranda", "Ruangan", "Riwayat", "Booking"].map((item) => (
                    <li
                      key={item}
                      className="cursor-pointer transition hover:text-purple-300"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-5 font-semibold text-white">Kontak</h3>

                <ul className="space-y-3 text-sm text-gray-400">
                  <li>support@simaru.app</li>
                  <li>+62 812-0000-0000</li>
                  <li>Madiun, Indonesia</li>
                </ul>
              </div>
            </div>

            <div
              className="
        mt-12 flex flex-col items-center justify-between
        gap-4 border-t border-white/10 pt-6
        text-xs text-gray-500 md:flex-row
      "
            >
              <p>© {new Date().getFullYear()} Simaru. All rights reserved.</p>

              <div className="flex gap-6 text-gray-400">
                {["Privacy", "Terms", "Support"].map((item) => (
                  <span
                    key={item}
                    className="cursor-pointer transition hover:text-purple-300"
                  >
                    {item}
                  </span>
                ))}
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
      <Route path="/profile" element={<ProfilePages />} />

      <Route path="/login" element={<LoginPage />} />

      <Route path="/register" element={<RegisterPage />} />

      <Route element={<LayoutWrapper />}>
        <Route path="/" element={<Home />} />

        <Route path="/roomlist" element={<RoomListPages />} />

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
