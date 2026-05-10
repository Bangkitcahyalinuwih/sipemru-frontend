import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, MapPin, ArrowRight, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

export function Hero() {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

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

  const { dates, daysInMonth, year, month } = getCalendarData();
  const today = currentDate.getDate(); 
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();


  const isCurrentMonth = month === currentMonth && year === currentYear;

  const monthNames = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const goToCurrentMonth = () => {
    setCurrentDate(new Date());
    setSelectedDate(null);
  };

  return (
    <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden min-h-[90vh]">
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dots" x="50" y="50" width="50" height="50" patternUnits="userSpaceOnUse">
              <circle cx="25" cy="25" r="2" fill="rgba(139, 92, 246, 0.4)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(139,92,246,0.25),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(59,130,246,0.25),transparent_50%)]" />
      </div>

      <motion.div
        className="absolute top-32 left-[10%] w-2 h-2 bg-purple-500 rounded-full"
        animate={{
          y: [0, -30, 0],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-[40%] right-[15%] w-3 h-3 bg-blue-500 rounded-full"
        animate={{
          y: [0, -40, 0],
          opacity: [0.4, 0.9, 0.4],
        }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
      />

      <motion.div
        className="absolute top-20 -left-10 w-96 h-96 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur-[120px] opacity-15"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 40, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute bottom-10 right-0 w-96 h-96 bg-gradient-to-l from-blue-600 to-purple-600 rounded-full blur-[120px] opacity-15"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -50, 0],
          y: [0, 40, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative max-w-[90%] mx-auto px-6 py-16 lg:py-20 grid lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-8 max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full shadow-lg hover:bg-white/15 transition-colors"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium text-purple-300">
              Sistem Booking Terpadu
            </span>
          </motion.div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
              <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Pesan Ruangan
              </span>
              <br />
              <span className="text-white">Kampus dengan</span>
              <br />
              <span className="text-white">Mudah & Cepat</span>
            </h1>
          </motion.div>

          {/* Description */}
          <motion.p
            className="text-lg md:text-xl text-slate-300 max-w-xl leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Temukan dan booking ruangan kampus untuk kegiatan akademik, seminar,
            atau rapat dengan sistem yang mudah dan efisien.
          </motion.p>

          <motion.div
            className="grid grid-cols-3 gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {[
              { icon: Calendar, label: "Real-time" },
              { icon: Clock, label: "24/7 Akses" },
              { icon: MapPin, label: "Semua Ruangan Di Kampus" },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-slate-300">
                <div className="w-10 h-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg flex items-center justify-center hover:bg-white/15 transition-colors">
                  <item.icon className="w-5 h-5 text-purple-400" />
                </div>
                <span className="text-sm font-medium">{item.label}</span>
              </div>
            ))}
          </motion.div>

          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <button
              onClick={() => navigate("/roomlist")}
              className="group bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 hover:scale-105 flex items-center gap-2 backdrop-blur-xl border border-purple-400/30"
            >
              Mulai Booking
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => navigate("/roomlist")}
              className="bg-white/10 backdrop-blur-xl border-2 border-white/20 text-slate-100 px-8 py-4 rounded-2xl font-semibold hover:bg-white/15 hover:border-white/30 hover:shadow-lg transition-all duration-300"
            >
              Lihat Ruangan
            </button>
          </motion.div>
        </div>

        <motion.div
          className="relative flex justify-center lg:justify-end"
          initial={{ opacity: 0, x: 100, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >

          <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500 blur-[120px] opacity-10 scale-110"></div>
          <div className="relative">
            <motion.div
              className="relative bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl px-12 py-6 w-full max-w-[720px] hover:bg-white/15 transition-colors"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full shadow-lg shadow-red-500/50"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full shadow-lg shadow-yellow-500/50"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full shadow-lg shadow-green-500/50"></div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={goToPreviousMonth}
                    className="text-purple-300 hover:text-purple-200 p-1 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    ←
                  </button>

                  <div className="flex items-center gap-2 text-purple-300">
                    <Calendar className="w-5 h-5" />
                    <span className="text-base font-semibold">
                      {monthNames[month]} {year}
                    </span>
                  </div>

                  <button
                    onClick={goToNextMonth}
                    className="text-purple-300 hover:text-purple-200 p-1 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    →
                  </button>

                  {!isCurrentMonth && (
                    <button
                      onClick={goToCurrentMonth}
                      className="text-xs bg-purple-500/30 hover:bg-purple-500/50 text-purple-200 px-2 py-1 rounded-lg border border-purple-400/30 transition-colors"
                    >
                      Hari Ini
                    </button>
                  )}
                </div>
              </div>
              <div className="bg-gradient-to-br from-white/5 to-purple-500/10 rounded-2xl px-8 py-5 shadow-inner border border-white/10">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <div className="w-1 h-6 bg-gradient-to-b from-purple-400 to-blue-400 rounded-full"></div>
                  Booking Ruangan
                </h3>
                <div className="grid grid-cols-7 gap-3 text-xs font-semibold text-slate-400 mb-3">
                  {["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"].map(
                    (d, i) => (
                      <span key={i} className="text-center py-1">
                        {d}
                      </span>
                    ),
                  )}
                </div>
                <div className="grid grid-cols-7 gap-3 text-sm">
                  {dates.map((item, i) => {
                    const dateNumber = item.date;
                    const isSelected = selectedDate === dateNumber;
                    const isToday = isCurrentMonth && dateNumber === today;
                    const hasBooking =
                      dateNumber && [7, 14, 21].includes(dateNumber);

                    if (dateNumber === null) {
                      return <div key={i} className="h-10"></div>;
                    }

                    return (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedDate(dateNumber)}
                        className={`h-10 flex items-center justify-center rounded-xl cursor-pointer font-medium transition-all relative ${
                          isSelected
                            ? "bg-gradient-to-br from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/40 border border-white/20"
                            : isToday
                              ? "bg-white/20 text-purple-200 ring-2 ring-purple-400/50 border border-white/10"
                              : hasBooking
                                ? "bg-purple-500/20 text-purple-300 border border-purple-400/30"
                                : "hover:bg-white/10 text-slate-300 border border-transparent hover:border-white/20"
                        }`}
                      >
                        {dateNumber}

                        {hasBooking && !isSelected && (
                          <div className="absolute bottom-1 w-1 h-1 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50"></div>
                        )}

                        {isToday && !isSelected && (
                          <div className="absolute -top-1 -right-1 w-2 h-2 bg-purple-400 rounded-full shadow-lg shadow-purple-400/50"></div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>

                <div className="mt-3 text-xs text-slate-400 text-center">
                  {daysInMonth} hari di bulan {monthNames[month]}
                </div>

                <div className="mt-2 text-center">
                  <span className="text-xs text-blue-300 bg-blue-500/20 border border-blue-400/30 px-2 py-1 rounded-full">
                    📅{" "}
                    {new Date().toLocaleDateString("id-ID", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>

                <motion.div
                  className="mt-4 px-5 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl shadow-lg cursor-pointer hover:shadow-purple-500/20 transition-shadow border border-purple-400/30 backdrop-blur-sm"
                  whileHover={{ scale: 1.02 }}
                  onClick={() =>
                    selectedDate && navigate(`/booking?date=${selectedDate}`)
                  }
                >
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm font-semibold">
                        {selectedDate
                          ? `Booking untuk tanggal ${selectedDate}`
                          : "Pilih tanggal untuk booking"}
                      </span>
                    </div>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              className="absolute -top-6 -right-6 bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl p-5 w-36 border border-white/20 hover:bg-white/15 transition-colors"
              animate={{ y: [0, -15, 0], rotate: [0, 3, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              <div className="text-center">
                <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">120+</div>
                <div className="text-xs text-slate-300 mt-1">
                  Ruangan Tersedia
                </div>
              </div>
            </motion.div>

            <motion.div
              className="absolute -bottom-6 -left-6 bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl p-5 w-36 border border-white/20 hover:bg-white/15 transition-colors"
              animate={{ y: [0, 15, 0], rotate: [0, -3, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
            >
              <div className="text-center">
                <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">98%</div>
                <div className="text-xs text-slate-300 mt-1">
                  Tingkat Kepuasan
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
