// import {
//   useEffect,
//   useState,
// } from "react";

// import {
//   useNavigate,
// } from "react-router-dom";

// import {
//   LazyMotion,
//   domAnimation,
//   m,
// } from "framer-motion";

// const fade = {
//   hidden: {
//     opacity: 0,
//   },

//   show: {
//     opacity: 1,

//     transition: {
//       duration: 0.4,
//     },
//   },
// };

// const scaleUp = {
//   hidden: {
//     opacity: 0,
//     scale: 0.9,
//   },

//   show: {
//     opacity: 1,
//     scale: 1,

//     transition: {
//       duration: 0.5,
//     },
//   },
// };

// const Preload = () => {
//   const navigate = useNavigate();

//   const [progress, setProgress] =
//     useState(0);

//   /*
//     =========================
//     FAKE LOADING
//     =========================
//   */

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setProgress((prev) => {
//         if (prev >= 100)
//           return 100;

//         return prev + 5;
//       });
//     }, 50);

//     return () =>
//       clearInterval(interval);
//   }, []);

//   /*
//     =========================
//     REDIRECT ONLY
//     =========================
//   */

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       /*
//         LANGSUNG KE HOME
//         LOGIN DIMATIKAN DULU
//       */

//       navigate("/");
//     }, 1200);

//     return () =>
//       clearTimeout(timer);
//   }, [navigate]);

//   return (
//     <LazyMotion
//       features={domAnimation}
//     >
//       <div
//         className="
//           relative
//           flex items-center
//           justify-center
//           w-full h-screen
//           overflow-hidden
//           bg-gradient-to-br
//           from-slate-950
//           via-indigo-950
//           to-slate-950
//         "
//       >
//         {/* BACKGROUND */}

//         <div
//           className="
//             absolute inset-0
//             overflow-hidden
//             pointer-events-none
//           "
//         >
//           <div
//             className="
//               absolute
//               -top-20
//               -left-20
//               w-[250px]
//               h-[250px]
//               bg-indigo-500/20
//               blur-3xl
//               rounded-full
//             "
//           />

//           <div
//             className="
//               absolute
//               bottom-0
//               right-0
//               w-[300px]
//               h-[300px]
//               bg-purple-500/20
//               blur-3xl
//               rounded-full
//             "
//           />
//         </div>

//         {/* CONTENT */}

//         <m.div
//           variants={scaleUp}
//           initial="hidden"
//           animate="show"
//           className="
//             relative z-10
//             w-[90%]
//             max-w-md
//             rounded-3xl
//             border border-white/10
//             bg-white/10
//             backdrop-blur-md
//             p-8
//             shadow-2xl
//           "
//         >
//           {/* LOGO */}

//           <m.div
//             variants={fade}
//             initial="hidden"
//             animate="show"
//             className="
//               flex items-center
//               justify-center
//               mb-6
//             "
//           >
//             <div
//               className="
//                 w-20 h-20
//                 rounded-3xl
//                 bg-gradient-to-br
//                 from-indigo-500
//                 to-purple-600
//                 flex items-center
//                 justify-center
//                 text-3xl
//                 shadow-xl
//               "
//             >
//               🚀
//             </div>
//           </m.div>

//           {/* TITLE */}

//           <m.div
//             variants={fade}
//             initial="hidden"
//             animate="show"
//             transition={{
//               delay: 0.1,
//             }}
//             className="text-center"
//           >
//             <h1
//               className="
//                 text-2xl
//                 font-bold
//                 text-white
//               "
//             >
//               SIPEMRU
//             </h1>

//             <p
//               className="
//                 mt-2
//                 text-sm
//                 text-slate-300
//               "
//             >
//               Menyiapkan aplikasi...
//             </p>
//           </m.div>

//           {/* PROGRESS */}

//           <m.div
//             variants={fade}
//             initial="hidden"
//             animate="show"
//             transition={{
//               delay: 0.2,
//             }}
//             className="mt-8"
//           >
//             <div
//               className="
//                 w-full
//                 h-3
//                 rounded-full
//                 bg-white/10
//                 overflow-hidden
//               "
//             >
//               <div
//                 className="
//                   h-full
//                   rounded-full
//                   bg-gradient-to-r
//                   from-indigo-500
//                   to-purple-500
//                   transition-all
//                   duration-300
//                 "
//                 style={{
//                   width: `${progress}%`,
//                 }}
//               />
//             </div>

//             <div
//               className="
//                 flex items-center
//                 justify-between
//                 mt-3
//                 text-xs
//                 text-slate-300
//               "
//             >
//               <span>
//                 Loading...
//               </span>

//               <span>
//                 {progress}%
//               </span>
//             </div>
//           </m.div>

//           {/* DOTS */}

//           <div
//             className="
//               flex items-center
//               justify-center
//               gap-2
//               mt-8
//             "
//           >
//             <div
//               className="
//                 w-2 h-2
//                 rounded-full
//                 bg-indigo-400
//                 animate-bounce
//               "
//             />

//             <div
//               className="
//                 w-2 h-2
//                 rounded-full
//                 bg-purple-400
//                 animate-bounce
//                 [animation-delay:0.15s]
//               "
//             />

//             <div
//               className="
//                 w-2 h-2
//                 rounded-full
//                 bg-pink-400
//                 animate-bounce
//                 [animation-delay:0.3s]
//               "
//             />
//           </div>
//         </m.div>
//       </div>
//     </LazyMotion>
//   );
// };

// export default Preload;