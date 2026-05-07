import {
  LayoutDashboard,
  Users,
  Settings,
  Home,
  Plus,
  History,
  CalendarDays,
  LayoutTemplate,
} from "lucide-react";

export const sidebarMenu = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    key: "users",
    label: "Users",
    icon: Users,
  },
  {
    key:"building",
    label:"Gedung",
    icon: Home,
  },
  {
    key: "rooms",
    label: "Daftar Ruangan",
    icon: LayoutTemplate,
  },
  {
    key: "peminjaman",
    label: "Peminjaman",
    icon: Plus,
  },
  {
    key: "riwayat-peminjaman",
    label: "Riwayat Peminjaman",
    icon: History,
  },
  {
    section: "Kelola Ruangan",
  },
  {
    key: "ruangan",
    label: "Kelola Ruangan",
    icon: Home,
  },
  {
    key: "gedung",
    label: "Kelola Gedung",
    icon: CalendarDays,
  },
];