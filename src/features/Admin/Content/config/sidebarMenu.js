import { label } from "framer-motion/client";
import {
  LayoutDashboard,
  Users,
  Settings,
  Home,
  Plus,
  History,
  CalendarDays,
  LayoutTemplate,
  Book,
  CalendarCheck,
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
    key: "schedule",
    label: "Jadwal Peminjaman",
    icon: CalendarDays,
  },
  {
    key: "booking",
    label: "Boooking",
    icon: CalendarCheck,
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