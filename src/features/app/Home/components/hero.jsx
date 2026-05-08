import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, MapPin, ArrowRight, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

export function Hero() {
  const navigate = useNavigate();

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { damping: 50, stiffness: 200 });
  const smoothMouseY = useSpring(mouseY, { damping: 50, stiffness: 200 });

  const orb1X = useTransform(smoothMouseX, [0, window.innerWidth], [-80, 80]);
  const orb1Y = useTransform(smoothMouseY, [0, window.innerHeight], [-80, 80]);
  const orb2X = useTransform(smoothMouseX, [0, window.innerWidth], [80, -80]);
  const orb2Y = useTransform(smoothMouseY, [0, window.innerHeight], [40, -40]);
  const orb3X = useTransform(smoothMouseX, [0, window.innerWidth], [-40, 40]);
  const orb3Y = useTransform(smoothMouseY, [0, window.innerHeight], [80, -80]);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 86400000);

    return () => clearInterval(timer);
  }, []);

  const getCalendarData = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    let startDayOfWeek = firstDayOfMonth.getDay();
    startDayOfWeek = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;

    const dates = [];
    for (let i = 0; i < startDayOfWeek; i++) {
      dates.push({ day: null, date: null });
    }
    for (let i = 1; i <= daysInMonth; i++) {
      dates.push({ day: i, date: i });
    }

    return { dates, daysInMonth, year, month };
  };

  const { dates, year, month } = getCalendarData();
  const today = currentDate.getDate();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const isCurrentMonth = month === currentMonth && year === currentYear;

  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
    "Jul", "Agu", "Sep", "Okt", "Nov", "Des",
  ];

  const goToPreviousMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const goToNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const goToCurrentMonth = () => {
    setCurrentDate(new Date());
    setSelectedDate(null);
  };

  return (
    <div className="relative bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 overflow-hidden py-16 text-white">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div style={{ x: orb1X, y: orb1Y }} className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-600/30 rounded-full blur-3xl" />
        <motion.div style={{ x: orb2X, y: orb2Y }} className="absolute top-1/3 right-1/4 w-80 h-80 bg-pink-600/20 rounded-full blur-3xl" />
        <motion.div style={{ x: orb3X, y: orb3Y }} className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-indigo-600/25 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-10 lg:py-14 grid lg:grid-cols-2 gap-10 items-center">

        {/* LEFT */}
        <div className="space-y-6 max-w-lg">

          <motion.div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-purple-500/30 rounded-full">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
            <span className="text-xs text-purple-300">Sistem Booking</span>
          </motion.div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            <span>Pesan Ruangan</span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Kampus Mudah & Cepat
            </span>
          </h1>

          <p className="text-sm md:text-base text-gray-300">
            Booking ruangan untuk kegiatan kampus dengan cepat dan efisien.
          </p>

          <div className="flex flex-wrap gap-4 text-xs">
            {[
              { icon: Clock, label: "Real-time" },
              { icon: Sparkles, label: "24/7" },
              { icon: MapPin, label: "Semua Ruangan" },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="w-6 h-6 bg-indigo-600/20 rounded-md flex items-center justify-center">
                  <item.icon className="w-3 h-3 text-indigo-400" />
                </div>
                <span>{item.label}</span>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => navigate("/roomlist")}
              className="bg-indigo-600 px-5 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2"
            >
              Booking <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigate("/roomlist")}
              className="bg-white/10 px-5 py-2.5 rounded-lg text-sm"
            >
              Lihat
            </button>
          </div>
        </div>

        {/* RIGHT - CALENDAR */}
        <div className="relative flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[380px]">

            <motion.div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4">

              <div className="flex justify-between mb-4">
                <span className="text-xs text-gray-400">Ruangan</span>
                <span className="text-2xl font-bold">120+</span>
              </div>

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4" />
                  {monthNames[month]} {year}
                </div>

                <div className="flex gap-2 text-xs">
                  <button onClick={goToPreviousMonth}>←</button>
                  <button onClick={goToNextMonth}>→</button>
                  {!isCurrentMonth && (
                    <button onClick={goToCurrentMonth}>Today</button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-7 gap-1 text-[10px] text-center mb-2">
                {["Sen","Sel","Rab","Kam","Jum","Sab","Min"].map((d,i)=>(
                  <span key={i}>{d}</span>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1 text-xs">
                {dates.map((item,i)=>{
                  if(!item.date) return <div key={i} className="h-8" />;

                  const isToday = isCurrentMonth && item.date === today;
                  const isSelected = selectedDate === item.date;

                  return (
                    <div
                      key={i}
                      onClick={()=>setSelectedDate(item.date)}
                      className={`h-8 flex items-center justify-center rounded-lg cursor-pointer ${
                        isSelected
                          ? "bg-indigo-600"
                          : isToday
                          ? "bg-white/10"
                          : "bg-white/5"
                      }`}
                    >
                      {item.date}
                    </div>
                  );
                })}
              </div>

              <button
                onClick={() => selectedDate && navigate(`/booking?date=${selectedDate}`)}
                className="w-full mt-4 bg-indigo-600 py-2.5 rounded-lg text-sm"
              >
                {selectedDate ? `Booking ${selectedDate}` : "Pilih Tanggal"}
              </button>

            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}