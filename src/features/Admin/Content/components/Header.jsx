import {
  Menu,
  LogOut as LogOutIcon, 
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
import { getCurrentUser, logoutUser } from "../../Users/service/UserService";


export default function Header({ collapsed, setCollapsed, title }) {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);

    const handleClick = () => setOpen(false);
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  const handleLogOut = () => {
    logoutUser(); 
    window.location.href = "/admin/login"; 
  };

  return (
    <div className="sticky top-0 z-50 h-16 backdrop-blur-md bg-white/95 flex items-center justify-between px-6 border-b border-gray-200 shadow-sm transition-shadow duration-300">
      
      {/* SISI KIRI: TOGGLE MENU & TITLE */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg hover:bg-gray-100 transition"
        >
          <Menu className="w-5 h-5 text-gray-600" />
        </button>
        <p className="text-base font-semibold text-black">{title}</p>
      </div>

      <div className="flex-1 max-w-2xl mx-8 hidden md:block">
        <div className="flex items-center bg-gray-100/80 hover:bg-gray-100 px-4 py-2 rounded-xl border border-gray-200 focus-within:border-blue-300 focus-within:ring-2 focus-within:ring-blue-100 transition-all duration-200">
          <Search className="w-4 h-4 text-gray-500 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search rooms, users, bookings..."
            className="bg-transparent outline-none text-sm ml-3 w-full text-gray-800 placeholder-gray-500"
          >
          </input>
        </div>
      </div>

      {/* SISI KANAN: UTILITY BUTTONS & AKUN PROFILE */}
      <div className="flex items-center gap-2">
        
        {/* Help */}
        <div className="p-2 rounded-lg hover:bg-gray-100 transition cursor-pointer relative group">
          <HelpCircle className="w-5 h-5 text-gray-600" />
          <span className="absolute right-0 top-full mt-1 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap z-10">
            Help
          </span>
        </div>

        {/* Settings */}
        <div className="p-2 rounded-lg hover:bg-gray-100 transition cursor-pointer relative group">
          <Settings className="w-5 h-5 text-gray-600" />
          <span className="absolute right-0 top-full mt-1 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap z-10">
            Settings
          </span>
        </div>

        {/* Notifications */}
        <div className="relative cursor-pointer p-2 rounded-lg hover:bg-gray-100 transition group">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white shadow-sm"></span>
          <span className="absolute right-0 top-full mt-1 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap z-10">
            Notifications
          </span>
        </div>

        {/* PROFILE BLOCK TRIGGER */}
        <div
          onClick={(e) => {
            e.stopPropagation(); 
            setOpen(!open);
          }}
          className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 px-3 py-1.5 rounded-xl transition-all border border-transparent hover:border-gray-200 select-none"
        >
          {/* Avatar Bulat dengan Huruf Depan */}
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold text-xs uppercase shadow-inner">
            {user?.name ? user.name.substring(0, 2) : "AD"}
          </div>

          <div className="text-left hidden sm:block">
            <p className="text-sm font-medium text-gray-800 leading-none">
              {user?.name || "Memuat User..."}
            </p>
            <div className="flex items-center gap-1 text-[10px] uppercase font-mono tracking-wider text-gray-400 mt-1">
              <Shield className="w-3 h-3 text-blue-500" />
              <span>{user?.role || "Guest"}</span>
            </div>
          </div>
          <ChevronDown className={`w-3 h-3 text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
        </div>

        {/* DROPDOWN MENU ANIMASI */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 23 }}
              className="absolute right-6 top-16 w-64 bg-white border border-gray-200 rounded-2xl shadow-2xl py-2 ring-1 ring-black/5 z-50"
              onClick={(e) => e.stopPropagation()} 
            >
              <div className="px-5 py-3 border-b border-gray-100">
                <p className="text-sm font-semibold text-gray-900 mb-0.5 truncate">
                  {user?.name || "User Resmi"}
                </p>
                <p className="text-xs text-gray-400 mb-2 truncate">{user?.email || "Tidak ada email"}</p>
                
                <div className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-md w-fit">
                  <Shield className="w-3 h-3" />
                  <span>{user?.role || "Staff"}</span>
                </div>
              </div>

              {/* Menu Item: Profile */}
              <button className="w-full flex items-center gap-3 px-5 py-2.5 text-sm hover:bg-gray-50 text-gray-700 transition-all group">
                <User className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                <span>Profil Saya</span>
              </button>

              <div className="my-1 border-t border-gray-100"></div>

              {/* Menu Item: Logout */}
              <button
                className="w-full flex items-center gap-3 px-5 py-2.5 text-sm hover:bg-red-50 text-red-600 hover:text-red-700 font-medium transition-all cursor-pointer"
                onClick={handleLogOut}
              >
                <LogOutIcon className="w-4 h-4 text-red-500" />
                <span>Keluar Sistem</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}