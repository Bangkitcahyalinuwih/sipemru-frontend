import { useState } from "react";
import { Outlet, useLocation, useNavigate, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "../features/Admin/components/Sidebar";
import Header from "../features/Admin/components/Header";
import Dashboard from "../features/dashboard/pages/DashboardPage";

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const getActiveMenu = () => {
    const path = location.pathname;
    if (path.includes("users")) return "users";
    if (path.includes("daftar-ruangan")) return "daftar-ruangan";
    if (path.includes("peminjaman")) return "peminjaman";
    if (path.includes("riwayat-peminjaman")) return "riwayat-peminjaman";
    if (path.includes("ruangan")) return "ruangan";
    if (path.includes("gedung")) return "gedung";
    return "dashboard";
  };

  const active = getActiveMenu();

  const handleNavClick = (menu) => {
    const routes = {
      dashboard: "/admin/dashboard",
      users: "/admin/users",
      "daftar-ruangan": "/admin/daftar-ruangan",
      peminjaman: "/admin/peminjaman",
      "riwayat-peminjaman": "/admin/riwayat-peminjaman",
      ruangan: "/admin/ruangan",
      gedung: "/admin/gedung",
    };
    navigate(routes[menu] || "/admin/dashboard");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* SIDEBAR */}
      <div className={`${collapsed ? "w-16" : "w-56"} bg-slate-900 text-white transition-all duration-300 shrink-0`}>
        <Sidebar collapsed={collapsed} active={active} onNavClick={handleNavClick} />
      </div>

      {/* MAIN AREA */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header collapsed={collapsed} setCollapsed={setCollapsed} active={active} />

        {/* ✅ ROUTES DI SINI */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="bg-white rounded-2xl shadow-sm border min-h-full">
            <Routes>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="users" element={<div className="p-8"><h1>Users Page</h1></div>} />
              <Route path="daftar-ruangan" element={<div className="p-8"><h1>Daftar Ruangan</h1></div>} />
              <Route path="peminjaman" element={<div className="p-8"><h1>Peminjaman</h1></div>} />
              <Route path="riwayat-peminjaman" element={<div className="p-8"><h1>Riwayat Peminjaman</h1></div>} />
              <Route path="ruangan" element={<div className="p-8"><h1>Kelola Ruangan</h1></div>} />
              <Route path="gedung" element={<div className="p-8"><h1>Kelola Gedung</h1></div>} />
              <Route path="*" element={<Navigate to="dashboard" replace />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}