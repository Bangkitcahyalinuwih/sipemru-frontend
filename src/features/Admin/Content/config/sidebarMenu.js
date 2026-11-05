import {
  LayoutDashboard,
  Home,
  CalendarDays,
  LayoutTemplate,
  CalendarCheck,
} from "lucide-react";

export const sidebarMenu = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    key: "building",
    label: "Gedung",
    icon: Home,
  },
  {
    key: "rooms",
    label: "Daftar Ruangan",
    icon: LayoutTemplate,
  },
  {
    key: "schedule",
    label: "Jadwal Perkuliahan",
    icon: CalendarDays,
  },
  {
    key: "booking",
    label: "Booking",
    icon: CalendarCheck,
  },
  {
    section: "Kelola Ruangan",
  },
  // {
  //   key: "ruangan",
  //   label: "Kelola Ruangan",
  //   icon: Home,
  // },
  {
    key: "approval",
    label: "Kelola Booking",
    icon: CalendarDays,
  },
];