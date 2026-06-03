import { useState, lazy, Suspense } from "react";
import {
  useLocation,
  useNavigate,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Sidebar from "../features/Admin/Content/components/Sidebar";
import Header from "../features/Admin/Content/components/Header";
import useAuthStore from "../store/useAuthStore";
import AdminLoginPage from "../features/auth/AuthAdmin/pages/AdminLoginPage";

const Dashboard = lazy(
  () => import("../features/dashboard/pages/DashboardPage"),
);
const UsersPage = lazy(() => import("../features/Admin/Users/pages/UsersPage"));
const RoomsPage = lazy(
  () => import("../features/Admin/Ruangan/pages/RoomsPage"),
);
const AddRooms = lazy(
  () => import("../features/Admin/Ruangan/components/AddRooms"),
);
const EditRooms = lazy(
  () => import("../features/Admin/Ruangan/components/EditRooms"),
);
const BuildingPage = lazy(
  () => import("../features/Admin/Building/Pages/BuildingPage"),
);
const AddBuilding = lazy(
  () => import("../features/Admin/Building/Components/AddBuilding"),
);
const EditBuilding = lazy(
  () => import("../features/Admin/Building/Components/EditBuilding"),
);
const SchedulePage = lazy(
  () => import("../features/Admin/Schedule/pages/Schedule"),
);
const AddSchedule = lazy(
  () => import("../features/Admin/Schedule/components/AddSchedule"),
);
const EditSchedule = lazy(
  () => import("../features/Admin/Schedule/components/EditSchedule"),
);
const BookingPage = lazy(
  () => import("../features/Admin/Booking/pages/BookingPage"),
);
const AddBooking = lazy(
  () => import("../features/Admin/Booking/components/AddBooking"),
);
const ApprovalBooking = lazy(
  () => import("../features/Admin/Approval_Book/Pages/Approval_Pages"),
);

const PageLoader = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="text-gray-600">Loading...</div>
  </div>
);

export const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, token } = useAuthStore();

const isAuthenticated = !!user && !!token;
const isAdmin = user?.role === "admin";

if (!isAuthenticated || !isAdmin) {
  return (
    <Routes>
      <Route path="login" element={<AdminLoginPage />} />
      <Route
        path="*"
        element={<Navigate to="/admin/login" replace />}
      />
    </Routes>
  );
}

  const getActiveMenu = () => {
    const path = location.pathname;

    if (path.includes("users")) return "users";
    if (path.includes("rooms")) return "rooms";
    if (path.includes("building")) return "building";
    if (path.includes("schedule")) return "schedule";
    if (path.includes("booking")) return "booking";
    if (path.includes("gedung")) return "gedung";
    if (path.includes("approval")) return "approval";

    return "dashboard";
  };

  const active = getActiveMenu();

  const handleNavClick = (menu) => {
    const routes = {
      dashboard: "/admin/dashboard",
      users: "/admin/users",
      rooms: "/admin/rooms",
      building: "/admin/building",
      schedule: "/admin/schedule",
      booking: "/admin/booking",
      gedung: "/admin/gedung",
      approval: "/admin/approval-booking",
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
    <Route
      index
      element={<Navigate to="/admin/dashboard" replace />}
    />

    <Route
      path="dashboard"
      element={
        <Suspense fallback={<PageLoader />}>
          <Dashboard />
        </Suspense>
      }
    />

    <Route
      path="users"
      element={
        <Suspense fallback={<PageLoader />}>
          <UsersPage />
        </Suspense>
      }
    />

    <Route
      path="rooms"
      element={
        <Suspense fallback={<PageLoader />}>
          <RoomsPage />
        </Suspense>
      }
    />

    <Route
      path="rooms/add"
      element={
        <Suspense fallback={<PageLoader />}>
          <AddRooms />
        </Suspense>
      }
    />

    <Route
      path="rooms/edit/:id"
      element={
        <Suspense fallback={<PageLoader />}>
          <EditRooms />
        </Suspense>
      }
    />

    <Route
      path="building"
      element={
        <Suspense fallback={<PageLoader />}>
          <BuildingPage />
        </Suspense>
      }
    />

    <Route
      path="building/add"
      element={
        <Suspense fallback={<PageLoader />}>
          <AddBuilding />
        </Suspense>
      }
    />

    <Route
      path="building/edit/:id"
      element={
        <Suspense fallback={<PageLoader />}>
          <EditBuilding />
        </Suspense>
      }
    />

    <Route
      path="schedule"
      element={
        <Suspense fallback={<PageLoader />}>
          <SchedulePage />
        </Suspense>
      }
    />

    <Route
      path="schedule/add"
      element={
        <Suspense fallback={<PageLoader />}>
          <AddSchedule />
        </Suspense>
      }
    />

    <Route
      path="schedule/edit/:id"
      element={
        <Suspense fallback={<PageLoader />}>
          <EditSchedule />
        </Suspense>
      }
    />

    <Route
      path="booking"
      element={
        <Suspense fallback={<PageLoader />}>
          <BookingPage />
        </Suspense>
      }
    />

    <Route
      path="booking/add"
      element={
        <Suspense fallback={<PageLoader />}>
          <AddBooking />
        </Suspense>
      }
    />

    <Route
      path="approval-booking"
      element={
        <Suspense fallback={<PageLoader />}>
          <ApprovalBooking />
        </Suspense>
      }
    />

    <Route
      path="*"
      element={<Navigate to="/admin/dashboard" replace />}
    />
  </Routes>
</main>
      </div>
    </div>
  );
};
