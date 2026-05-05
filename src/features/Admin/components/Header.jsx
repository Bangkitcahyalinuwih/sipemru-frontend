import {
  Menu,
  LogOut,
  User,
  Shield,
  ChevronDown,
  Bell,
  Search,
  Settings,
  HelpCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getUser } from "../service/profileHeader";

export default function Header({ collapsed, setCollapsed, title }) {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getUser().then(setUser);

    const handleClick = () => setOpen(false);
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

const LogOut = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};

  return (
    <div className="h-16 backdrop-blur-md bg-white/70 flex items-center justify-between px-6 border-b border-gray-200 shadow-sm">
      {/* LEFT */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg hover:bg-gray-100 transition"
        >
          <Menu className="w-5 h-5 text-gray-600" />
        </button>

        <p className="text-base font-semibold text-black">{title}</p>
      </div>

      {/* CENTER - SEARCH FULL WIDTH */}
      <div className="flex-1 max-w-2xl mx-8">
        <div className="flex items-center bg-gray-100/80 hover:bg-gray-100 px-4 py-2.5 rounded-xl border border-gray-200 focus-within:border-blue-300 focus-within:ring-2 focus-within:ring-blue-100 transition-all duration-200">
          <Search className="w-5 h-5 text-gray-500 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search rooms, users, bookings..."
            className="bg-transparent outline-none text-sm ml-3 w-full text-gray-800 placeholder-gray-500"
          />
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-2">
        {/* NEW ICON 1 - HELP */}
        <div className="p-2 rounded-lg hover:bg-gray-100 transition cursor-pointer relative group">
          <HelpCircle className="w-5 h-5 text-gray-600" />
          <span className="absolute right-0 top-full mt-1 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap z-10">
            Help
          </span>
        </div>

        {/* NEW ICON 2 - SETTINGS */}
        <div className="p-2 rounded-lg hover:bg-gray-100 transition cursor-pointer relative group">
          <Settings className="w-5 h-5 text-gray-600" />
          <span className="absolute right-0 top-full mt-1 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap z-10">
            Settings
          </span>
        </div>

        {/* NOTIFICATION */}
        <div className="relative cursor-pointer p-2 rounded-lg hover:bg-gray-100 transition group">
          <Bell className="w-5 h-5 text-gray-600" />

          {/* notif badge */}
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white shadow-sm"></span>
          <span className="absolute right-0 top-full mt-1 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap z-10">
            Notifications
          </span>
        </div>

        {/* USER */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            setOpen(!open);
          }}
          className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 px-3 py-2 rounded-xl transition-all border border-transparent hover:border-gray-200"
        >
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-gray-800">{user?.name}</p>
            <div className="flex items-center justify-end gap-1 text-xs text-gray-500">
              <Shield className="w-3 h-3" />
              {user?.role}
            </div>
          </div>

          {/* avatar + status */}
          <div className="relative">
            <img
              src={user?.avatar}
              alt="avatar"
              className="w-10 h-10 rounded-full object-cover border-2 border-gray-200 shadow-sm"
            />
            <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full shadow-sm"></span>
          </div>

          <ChevronDown
            className={`w-4 h-4 text-gray-500 transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />
        </div>

        {/* DROPDOWN */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
              className="absolute right-0 top-16 w-64 backdrop-blur-md bg-white/90 border border-gray-200 rounded-2xl shadow-2xl py-3 ring-1 ring-black/5"
            >
              {/* USER INFO */}
              <div className="px-5 py-3 border-b border-gray-100">
                <p className="text-sm font-semibold text-gray-900 mb-0.5">
                  {user?.name}
                </p>
                <p className="text-xs text-gray-500 mb-1">{user?.email}</p>
                <div className="flex items-center gap-1 text-xs text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full w-fit">
                  <Shield className="w-3 h-3" />
                  {user?.role}
                </div>
              </div>

              <button className="w-full flex items-center gap-3 px-5 py-3 text-sm hover:bg-gray-50 transition-all group">
                <User className="w-4 h-4 text-gray-500 group-hover:text-gray-700" />
                <span>Profile</span>
              </button>

              <div className="my-1 border-t border-gray-100"></div>

<button
  className="w-full flex items-center gap-3 px-5 py-3 text-sm hover:bg-red-50 text-red-600 hover:text-red-700 transition-all cursor-pointer"
  onClick={LogOut}
>
  Logout
</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
