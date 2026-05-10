import { Link, useLocation } from "react-router-dom";
import { LogOut, Settings, User, Menu, X } from "lucide-react";
import { useState, useEffect, useCallback, useRef } from "react";

export function Navbar({
  user = {
    name: "John Doe",
    email: "john.doe@university.edu",
  },
  onLogout,
}) {
  const location = useLocation();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const isActive = useCallback(
    (path) => location.pathname === path,
    [location]
  );

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isDropdownOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }

      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownOpen, isMobileMenuOpen]);
  useEffect(() => {
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setIsDropdownOpen(false);
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", isMobileMenuOpen);

    return () => document.body.classList.remove("overflow-hidden");
  }, [isMobileMenuOpen]);

  const handleLogout = () => {
    onLogout?.();
    setIsDropdownOpen(false);
  };

  const NavLinks = () => (
    <>
      {[
        { to: "/", label: "Beranda" },
        { to: "/roomlist", label: "Ruangan" },
        { to: "/history", label: "Riwayat" },
      ].map((item) => (
        <Link
          key={item.to}
          to={item.to}
          className={`relative rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 ${
            isActive(item.to)
              ? "bg-white/10 text-white shadow-lg"
              : "text-gray-400 hover:bg-white/5 hover:text-white"
          }`}
        >
          {item.label}
        </Link>
      ))}
    </>
  );

  return (
    <nav
      className={`
        sticky top-0 z-[999]
        w-full
        rounded-2xl
        border border-white/10
        transition-all duration-300
        ${
          isScrolled
            ? "bg-[#0b0118]/95 backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.35)]"
            : "bg-[#0b0118]/70 backdrop-blur-xl"
        }
      `}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-400/40 to-transparent" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
        <div className="absolute -top-20 left-0 h-40 w-40 rounded-full bg-purple-600/10 blur-3xl" />
        <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-pink-600/10 blur-3xl" />
      </div>

      <div className="relative px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg">
              <span className="text-lg font-bold text-white">R</span>
            </div>

            <div className="leading-tight">
              <h3 className="text-base font-bold text-white">Simaru</h3>
              <p className="text-[10px] tracking-[0.2em] text-gray-400">
                SISTEM MANAJEMEN RUANGAN
              </p>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-2 rounded-full border border-white/5 bg-white/[0.03] px-2 py-2 backdrop-blur-xl">
            <NavLinks />
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex h-10 w-10 items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5 text-white" />
              ) : (
                <Menu className="h-5 w-5 text-white" />
              )}
            </button>

            <div className="relative" ref={dropdownRef}>
              <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                <div className="h-11 w-11 rounded-full bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center text-white font-semibold">
                  {user.name.charAt(0)}
                </div>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-3 w-60 rounded-2xl border border-white/10 bg-[#120021]/90 backdrop-blur-2xl shadow-2xl">
                  <div className="border-b border-white/10 px-5 py-4">
                    <p className="text-white text-sm font-semibold">{user.name}</p>
                    <p className="text-gray-400 text-xs">{user.email}</p>
                  </div>

                  <div className="p-2">
                    <Link className="flex items-center gap-3 px-3 py-3 text-gray-300 hover:bg-white/5 rounded-xl">
                      <User className="h-4 w-4" /> Profile
                    </Link>

                    <Link className="flex items-center gap-3 px-3 py-3 text-gray-300 hover:bg-white/5 rounded-xl">
                      <Settings className="h-4 w-4" /> Settings
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 px-3 py-3 text-red-400 hover:bg-red-500/10 rounded-xl"
                    >
                      <LogOut className="h-4 w-4" /> Logout
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="md:hidden absolute top-full left-0 right-0 mt-3 rounded-2xl border border-white/10 bg-[#120021]/95 backdrop-blur-2xl shadow-2xl p-4"
        >
          <div className="flex flex-col gap-2">
            <NavLinks />
          </div>
        </div>
      )}
    </nav>
  );
}