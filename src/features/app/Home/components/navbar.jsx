import { Link, useLocation } from "react-router-dom";
import { LogOut, Settings, User } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-[999] bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex justify-between items-center h-16">

          {/* LEFT: LOGO + TITLE */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">R</span>
            </div>

            <div className="flex flex-col leading-tight min-w-[180px]">
              <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                Simaru
              </h3>
              <p className="text-sm text-gray-500 whitespace-nowrap">
                Sistem Manajemen Ruangan
              </p>
            </div>
          </Link>

          {/* CENTER: MENU */}
          <div className="hidden md:flex items-center space-x-2">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive("/")
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              Beranda
            </Link>

            <Link
              to="/roomlist"
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive("/roomlist")
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              Ruangan
            </Link>

            <Link
              to="/history"
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive("/history")
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              Riwayat
            </Link>
          </div>

          {/* RIGHT: USER DROPDOWN */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="focus:outline-none"
            >
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=user"
                alt="Avatar"
                className="h-10 w-10 rounded-full cursor-pointer ring-2 ring-transparent hover:ring-blue-500 transition-all duration-200"
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-[1000]">
                
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">
                    John Doe
                  </p>
                  <p className="text-xs text-gray-500">
                    john.doe@university.edu
                  </p>
                </div>

                <button className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center text-gray-700">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </button>

                <button className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center text-gray-700">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </button>

                <div className="border-t border-gray-100 my-1" />

                <button className="w-full text-left px-4 py-2 hover:bg-red-50 flex items-center text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}