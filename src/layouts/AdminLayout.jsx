import { useState } from "react";
import { Outlet, useLocation, useNavigate, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "../features/Admin/components/Sidebar";
import Header from "../features/Admin/components/Header";
import Dashboard from "../features/dashboard/pages/DashboardPage";
import UsersPage from "../features/Admin/Users/pages/UsersPage";
import RuanganPage from "../features/Admin/Ruangan/pages/RuanganPage";

export const AdminLayout = () => {
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
      <aside className={`${collapsed ? "w-16" : "w-56"} bg-slate-900 text-white transition-all duration-300`}>
        <Sidebar collapsed={collapsed} active={active} onNavClick={handleNavClick} />
      </aside>
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header collapsed={collapsed} setCollapsed={setCollapsed} active={active} />
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="daftar-ruangan" element={<div className="p-6"><RuanganPage /></div>} />
            <Route path="peminjaman" element={<div className="p-6"><h1>Peminjaman</h1></div>} />
            <Route path="riwayat-peminjaman" element={<div className="p-6"><h1>Riwayat Peminjaman</h1></div>} />
            <Route path="ruangan" element={<div className="p-6"><h1>Kelola Ruangan</h1></div>} />
            <Route path="gedung" element={<div className="p-6"><h1>Kelola Gedung</h1></div>} />
            <Route path="*" element={<Navigate to="dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};