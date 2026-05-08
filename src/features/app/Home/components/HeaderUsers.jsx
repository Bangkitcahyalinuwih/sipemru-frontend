// // src/features/app/Home/components/navbar.jsx

// import { Link, useLocation } from "react-router-dom";

// import {
//   LogOut,
//   Settings,
//   User,
//   Menu,
//   X,
// } from "lucide-react";

// import {
//   useState,
//   useEffect,
//   useCallback,
//   useRef,
// } from "react";

// export function Navbar({
//   user = {
//     name: "John Doe",
//     email: "john.doe@university.edu",
//   },
//   onLogout,
// }) {
//   const location = useLocation();

//   const [isDropdownOpen, setIsDropdownOpen] =
//     useState(false);

//   const [isMobileMenuOpen, setIsMobileMenuOpen] =
//     useState(false);

//   const [isScrolled, setIsScrolled] =
//     useState(false);

//   const dropdownRef = useRef(null);
//   const mobileMenuRef = useRef(null);

//   const isActive = useCallback(
//     (path) => location.pathname === path,
//     [location]
//   );

//   /* ================= SCROLL DETECTION ================= */

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 10);
//     };

//     window.addEventListener(
//       "scroll",
//       handleScroll
//     );

//     return () =>
//       window.removeEventListener(
//         "scroll",
//         handleScroll
//       );
//   }, []);

//   /* ================= CLOSE DROPDOWN ================= */

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         isDropdownOpen &&
//         dropdownRef.current &&
//         !dropdownRef.current.contains(
//           event.target
//         )
//       ) {
//         setIsDropdownOpen(false);
//       }

//       if (
//         isMobileMenuOpen &&
//         mobileMenuRef.current &&
//         !mobileMenuRef.current.contains(
//           event.target
//         )
//       ) {
//         setIsMobileMenuOpen(false);
//       }
//     };

//     document.addEventListener(
//       "mousedown",
//       handleClickOutside
//     );

//     return () =>
//       document.removeEventListener(
//         "mousedown",
//         handleClickOutside
//       );
//   }, [
//     isDropdownOpen,
//     isMobileMenuOpen,
//   ]);

//   /* ================= ROUTE CHANGE ================= */

//   useEffect(() => {
//     setIsDropdownOpen(false);
//     setIsMobileMenuOpen(false);
//   }, [location]);

//   /* ================= ESC KEY ================= */

//   useEffect(() => {
//     const handleEscKey = (event) => {
//       if (event.key === "Escape") {
//         setIsDropdownOpen(false);
//         setIsMobileMenuOpen(false);
//       }
//     };

//     document.addEventListener(
//       "keydown",
//       handleEscKey
//     );

//     return () =>
//       document.removeEventListener(
//         "keydown",
//         handleEscKey
//       );
//   }, []);

//   /* ================= BODY SCROLL LOCK ================= */

//   useEffect(() => {
//     if (isMobileMenuOpen) {
//       document.body.classList.add(
//         "overflow-hidden"
//       );
//     } else {
//       document.body.classList.remove(
//         "overflow-hidden"
//       );
//     }

//     return () => {
//       document.body.classList.remove(
//         "overflow-hidden"
//       );
//     };
//   }, [isMobileMenuOpen]);

//   /* ================= LOGOUT ================= */

//   const handleLogout = () => {
//     if (onLogout) {
//       onLogout();
//     }

//     setIsDropdownOpen(false);
//   };

//   /* ================= NAV LINKS ================= */

//   const NavLinks = () => (
//     <>
//       <Link
//         to="/"
//         className={`
//           relative rounded-full px-5 py-2 text-sm font-medium
//           transition-all duration-300 hover:scale-105
//           ${
//             isActive("/")
//               ? "bg-white/10 text-white shadow-lg"
//               : "text-gray-400 hover:bg-white/5 hover:text-white"
//           }
//         `}
//       >
//         Beranda
//       </Link>

//       <Link
//         to="/roomlist"
//         className={`
//           relative rounded-full px-5 py-2 text-sm font-medium
//           transition-all duration-300 hover:scale-105
//           ${
//             isActive("/roomlist")
//               ? "bg-white/10 text-white shadow-lg"
//               : "text-gray-400 hover:bg-white/5 hover:text-white"
//           }
//         `}
//       >
//         Ruangan
//       </Link>

//       <Link
//         to="/history"
//         className={`
//           relative rounded-full px-5 py-2 text-sm font-medium
//           transition-all duration-300 hover:scale-105
//           ${
//             isActive("/history")
//               ? "bg-white/10 text-white shadow-lg"
//               : "text-gray-400 hover:bg-white/5 hover:text-white"
//           }
//         `}
//       >
//         Riwayat
//       </Link>
//     </>
//   );

//   return (
//     <nav
//       className={`
//         sticky top-0 z-[999] h-16
//         transition-all duration-300 ease-in-out
//         ${
//           isScrolled
//             ? "bg-[#0b0118]/95 backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.35)]"
//             : "bg-[#0b0118]/50 backdrop-blur-xl"
//         }
//       `}
//     >
//       {/* TOP LIGHT */}
//       <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent" />

//       {/* GLOW */}
//       <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
//         <div className="absolute -top-20 left-0 h-40 w-40 rounded-full bg-purple-600/10 blur-3xl" />

//         <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-pink-600/10 blur-3xl" />
//       </div>

//       <div className="relative px-6 lg:px-8 h-full">
//         <div className="flex h-full items-center justify-between">

//           {/* LOGO */}
//           <Link
//             to="/"
//             className="flex items-center gap-3 transition-all duration-300 hover:opacity-80"
//           >
//             <div
//               className="
//                 flex h-11 w-11 items-center justify-center
//                 rounded-xl
//                 bg-gradient-to-br from-indigo-500 to-purple-600
//                 shadow-lg shadow-indigo-600/20
//               "
//             >
//               <span className="text-lg font-bold text-white">
//                 R
//               </span>
//             </div>

//             <div className="flex flex-col leading-tight">
//               <h3 className="text-base font-bold text-white md:text-lg">
//                 Simaru
//               </h3>

//               <p
//                 className="
//                   whitespace-nowrap
//                   text-[10px]
//                   tracking-[0.2em]
//                   text-gray-400
//                   md:text-xs
//                 "
//               >
//                 SISTEM MANAJEMEN RUANGAN
//               </p>
//             </div>
//           </Link>

//           {/* DESKTOP MENU */}
//           <div
//             className="
//               hidden md:flex
//               items-center gap-2
//               rounded-full
//               border border-white/5
//               bg-white/[0.03]
//               px-2 py-2
//               backdrop-blur-xl
//             "
//           >
//             <NavLinks />
//           </div>

//           {/* RIGHT */}
//           <div className="flex items-center gap-3">

//             {/* MOBILE BUTTON */}
//             <button
//               onClick={() =>
//                 setIsMobileMenuOpen(
//                   !isMobileMenuOpen
//                 )
//               }
//               className="
//                 md:hidden
//                 flex h-10 w-10 items-center justify-center
//                 rounded-full
//                 bg-white/5
//                 text-white
//                 transition-all duration-300
//                 hover:bg-white/10
//               "
//             >
//               {isMobileMenuOpen ? (
//                 <X className="h-5 w-5" />
//               ) : (
//                 <Menu className="h-5 w-5" />
//               )}
//             </button>

//             {/* PROFILE */}
//             <div
//               className="relative"
//               ref={dropdownRef}
//             >
//               <button
//                 onClick={() =>
//                   setIsDropdownOpen(
//                     !isDropdownOpen
//                   )
//                 }
//                 className="group"
//               >
//                 <div
//                   className="
//                     relative h-11 w-11 overflow-hidden rounded-full
//                     bg-gradient-to-br from-orange-500 to-pink-500
//                     ring-2 ring-white/10
//                     transition-all duration-300
//                     group-hover:scale-105
//                     group-hover:ring-purple-500/50
//                     shadow-lg shadow-pink-500/20
//                   "
//                 >
//                   <div className="absolute inset-0 flex items-center justify-center text-lg font-semibold text-white">
//                     {user.name.charAt(0)}
//                   </div>
//                 </div>
//               </button>

//               {/* DROPDOWN */}
//               {isDropdownOpen && (
//                 <div
//                   className="
//                     absolute right-0 mt-3 w-60
//                     overflow-hidden
//                     rounded-2xl
//                     border border-white/10
//                     bg-[#120021]/90
//                     backdrop-blur-2xl
//                     shadow-2xl
//                   "
//                 >
//                   <div className="border-b border-white/10 px-5 py-4">
//                     <p className="text-sm font-semibold text-white">
//                       {user.name}
//                     </p>

//                     <p className="mt-1 text-xs text-gray-400">
//                       {user.email}
//                     </p>
//                   </div>

//                   <div className="p-2">

//                     <Link
//                       to="/profile"
//                       className="
//                         flex items-center gap-3
//                         rounded-xl px-3 py-3
//                         text-sm text-gray-300
//                         transition-all duration-200
//                         hover:bg-white/5
//                         hover:text-white
//                       "
//                     >
//                       <User className="h-4 w-4" />
//                       Profile
//                     </Link>

//                     <Link
//                       to="/settings"
//                       className="
//                         flex items-center gap-3
//                         rounded-xl px-3 py-3
//                         text-sm text-gray-300
//                         transition-all duration-200
//                         hover:bg-white/5
//                         hover:text-white
//                       "
//                     >
//                       <Settings className="h-4 w-4" />
//                       Settings
//                     </Link>

//                     <div className="my-2 border-t border-white/10" />

//                     <button
//                       onClick={handleLogout}
//                       className="
//                         flex w-full items-center gap-3
//                         rounded-xl px-3 py-3
//                         text-sm text-red-400
//                         transition-all duration-200
//                         hover:bg-red-500/10
//                         hover:text-red-300
//                       "
//                     >
//                       <LogOut className="h-4 w-4" />
//                       Logout
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* MOBILE MENU */}
//       {isMobileMenuOpen && (
//         <div
//           ref={mobileMenuRef}
//           className="
//             md:hidden
//             absolute top-full left-0 right-0 mt-3
//             overflow-hidden
//             rounded-2xl
//             border border-white/10
//             bg-[#120021]/95
//             backdrop-blur-2xl
//             shadow-2xl
//           "
//         >
//           <div className="flex flex-col space-y-2 p-4">

//             <Link
//               to="/"
//               onClick={() =>
//                 setIsMobileMenuOpen(false)
//               }
//               className={`
//                 rounded-xl px-5 py-3 text-sm font-medium
//                 transition-all duration-300
//                 ${
//                   isActive("/")
//                     ? "bg-white/10 text-white"
//                     : "text-gray-400 hover:bg-white/5 hover:text-white"
//                 }
//               `}
//             >
//               Beranda
//             </Link>

//             <Link
//               to="/roomlist"
//               onClick={() =>
//                 setIsMobileMenuOpen(false)
//               }
//               className={`
//                 rounded-xl px-5 py-3 text-sm font-medium
//                 transition-all duration-300
//                 ${
//                   isActive("/roomlist")
//                     ? "bg-white/10 text-white"
//                     : "text-gray-400 hover:bg-white/5 hover:text-white"
//                 }
//               `}
//             >
//               Ruangan
//             </Link>

//             <Link
//               to="/history"
//               onClick={() =>
//                 setIsMobileMenuOpen(false)
//               }
//               className={`
//                 rounded-xl px-5 py-3 text-sm font-medium
//                 transition-all duration-300
//                 ${
//                   isActive("/history")
//                     ? "bg-white/10 text-white"
//                     : "text-gray-400 hover:bg-white/5 hover:text-white"
//                 }
//               `}
//             >
//               Riwayat
//             </Link>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }