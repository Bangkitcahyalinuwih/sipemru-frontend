import { useState } from "react";
import {
  useLocation,
  useNavigate,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Sidebar from "../features/Admin/components/Sidebar";
import Header from "../features/Admin/components/Header";
import Dashboard from "../features/dashboard/pages/DashboardPage";

import UsersPage from "../features/Admin/Users/pages/UsersPage";

import RoomsPage from "../features/Admin/Ruangan/pages/RoomsPage";
import AddRooms from "../features/Admin/Ruangan/components/AddRooms";
import EditRooms from "../features/Admin/Ruangan/components/EditRooms";

import BuildingPage from "../features/Admin/Building/Pages/BuildingPage";
import AddBuilding from "../features/Admin/Building/Components/AddBuilding";
import EditBuilding from "../features/Admin/Building/Components/EditBuilding";

export const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const getActiveMenu = () => {
    const path = location.pathname;

    if (path.includes("users")) return "users";
    if (path.includes("rooms")) return "rooms";
    if (path.includes("building")) return "building";
    if (path.includes("peminjaman")) return "peminjaman";
    if (path.includes("riwayat-peminjaman")) return "riwayat-peminjaman";
    if (path.includes("gedung")) return "gedung";

    return "dashboard";
  };

  const active = getActiveMenu();

  const handleNavClick = (menu) => {
    const routes = {
      dashboard: "/admin/dashboard",
      users: "/admin/users",
      rooms: "/admin/rooms",
      building: "/admin/building",
      peminjaman: "/admin/peminjaman",
      "riwayat-peminjaman": "/admin/riwayat-peminjaman",
      gedung: "/admin/gedung",
    };

    navigate(routes[menu] || "/admin/dashboard");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <aside
        className={`${collapsed ? "w-16" : "w-56"} bg-slate-900 text-white transition-all duration-300`}
      >
        <Sidebar
          collapsed={collapsed}
          active={active}
          onNavClick={handleNavClick}
        />
      </aside>

      <div className="flex flex-col flex-1 overflow-hidden">
        <Header
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          active={active}
        />

        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route index element={<Navigate to="dashboard" replace />} />

            <Route path="dashboard" element={<Dashboard />} />
            <Route path="users" element={<UsersPage />} />

            <Route path="rooms" element={<RoomsPage />} />
            <Route path="rooms/add" element={<AddRooms />} />
            <Route path="rooms/edit/:id" element={<EditRooms />} />

            <Route path="building" element={<BuildingPage />} />
            <Route path="building/add" element={<AddBuilding />} />
            <Route path="building/edit/:id" element={<EditBuilding />} />

            <Route
              path="peminjaman"
              element={<h1 className="p-6">Peminjaman</h1>}
            />
            <Route
              path="riwayat-peminjaman"
              element={<h1 className="p-6">Riwayat Peminjaman</h1>}
            />
            <Route
              path="gedung"
              element={<h1 className="p-6">Kelola Gedung</h1>}
            />

            <Route path="*" element={<Navigate to="dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};
