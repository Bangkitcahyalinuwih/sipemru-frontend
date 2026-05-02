import { Link, useLocation } from "react-router-dom";
import { LogOut, Settings, User } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">R</span>
              </div>
              <div className="flex flex-col leading-tight">
                <h3 className="text-lg font-bold text-gray-900 text-left">Simaru</h3>
                <p className="text-sm text-gray-500 text-left">
                  Sistem Manajemen Ruangan
                </p>
              </div>
            </Link>

                <div className="hidden md:flex justify-center items-center h-screen space-x-1 m-70">
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
                to="/booking"
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActive("/booking")
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
          </div>

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
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">John Doe</p>
                  <p className="text-xs text-gray-500">
                    john.doe@university.edu
                  </p>
                </div>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center text-gray-700 cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </button>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center text-gray-700 cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </button>
                <div className="border-t border-gray-100 my-1"></div>
                <button className="w-full text-left px-4 py-2 hover:bg-red-50 flex items-center text-red-600 cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
