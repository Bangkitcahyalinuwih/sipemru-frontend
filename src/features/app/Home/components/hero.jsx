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
<div className="relative overflow-hidden min-h-[100vh] pb-0 bg-[#0B0B12]">
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-[-150px] left-[5%] w-[450px] h-[450px] rounded-full bg-purple-600/15 blur-3xl" />

    <div className="absolute bottom-[-100px] right-[5%] w-[500px] h-[500px] rounded-full bg-pink-600/10 blur-3xl" />

    <div className="absolute top-[40%] left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-indigo-600/10 blur-3xl" />

    <div
      className="
        absolute inset-0
        bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)]
        bg-[size:70px_70px]
        opacity-20
      "
    />
  </div>

  <div className="relative max-w-[90%] mx-auto px-6 py-16 lg:py-20 grid lg:grid-cols-2 gap-8 items-center">
    <div className="space-y-8 max-w-xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/20 bg-white/[0.03] backdrop-blur-xl"
      >
        <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />

        <span className="text-sm font-medium text-purple-300">
          Sistem Booking Terpadu
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
          <span className="bg-gradient-to-r from-purple-300 via-pink-300 to-indigo-300 bg-clip-text text-transparent">
            Pesan Ruangan
          </span>

          <br />

          <span className="text-white">
            Kampus dengan
          </span>

          <br />

          <span className="text-white">
            Mudah & Cepat
          </span>
        </h1>
      </motion.div>

      <motion.p
        className="text-lg md:text-xl text-gray-400 max-w-xl leading-relaxed"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Temukan dan booking ruangan kampus untuk kegiatan akademik,
        seminar, atau rapat dengan sistem yang mudah dan efisien.
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
          <div
            key={idx}
            className="flex items-center gap-2 text-gray-300"
          >
            <div className="w-10 h-10 rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-xl flex items-center justify-center">
              <item.icon className="w-5 h-5 text-purple-400" />
            </div>

            <span className="text-sm font-medium">
              {item.label}
            </span>
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
          className="
            group
            px-8 py-4
            rounded-2xl
            font-semibold
            text-white
            border border-purple-500/30
            bg-gradient-to-r from-purple-600 to-indigo-600
            hover:scale-105
            transition-all duration-300
            shadow-lg shadow-purple-500/20
            flex items-center gap-2
          "
        >
          Mulai Booking

          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>

        <button
          onClick={() => navigate("/roomlist")}
          className="
            px-8 py-4
            rounded-2xl
            font-semibold
            text-white
            border border-white/10
            bg-white/[0.03]
            backdrop-blur-xl
            hover:bg-white/[0.05]
            transition-all duration-300
          "
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
      <div className="relative">
        <motion.div
          className="
            relative
            overflow-hidden
            rounded-[32px]
            border border-white/10
            bg-white/[0.03]
            backdrop-blur-2xl
            shadow-2xl
            px-12 py-6
            w-full
            max-w-[720px]
          "
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div
            className="
              absolute inset-0 opacity-0
              transition duration-700
              hover:opacity-100
              bg-gradient-to-br from-purple-500/10 to-indigo-500/5
            "
          />

          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.05] to-transparent" />

          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={goToPreviousMonth}
                  className="text-purple-300 hover:text-white transition-colors"
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
                  className="text-purple-300 hover:text-white transition-colors"
                >
                  →
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <div className="w-1 h-6 rounded-full bg-gradient-to-b from-purple-400 to-indigo-400" />

                Booking Ruangan
              </h3>

              <div className="grid grid-cols-7 gap-3 text-xs font-semibold text-gray-500 mb-3">
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
                  const isToday =
                    isCurrentMonth && dateNumber === today;

                  const hasBooking =
                    dateNumber &&
                    [7, 14, 21].includes(dateNumber);

                  if (dateNumber === null) {
                    return (
                      <div key={i} className="h-10"></div>
                    );
                  }

                  return (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() =>
                        setSelectedDate(dateNumber)
                      }
                      className={`
                        h-10
                        flex items-center justify-center
                        rounded-xl
                        cursor-pointer
                        font-medium
                        transition-all
                        relative
                        border
                        ${
                          isSelected
                            ? "bg-gradient-to-br from-purple-600 to-indigo-600 text-white border-white/20 shadow-lg shadow-purple-500/20"
                            : isToday
                              ? "bg-white/[0.08] text-purple-300 border-purple-400/40"
                              : hasBooking
                                ? "bg-purple-500/10 text-purple-300 border-purple-500/20"
                                : "text-gray-300 border-transparent hover:border-white/10 hover:bg-white/[0.03]"
                        }
                      `}
                    >
                      {dateNumber}

                      {hasBooking && !isSelected && (
                        <div className="absolute bottom-1 w-1 h-1 rounded-full bg-indigo-400" />
                      )}

                      {isToday && !isSelected && (
                        <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-purple-400" />
                      )}
                    </motion.div>
                  );
                })}
              </div>

              <div className="mt-4 text-center text-xs text-gray-500">
                {daysInMonth} hari di bulan {monthNames[month]}
              </div>

              <motion.div
                className="
                  mt-5
                  px-5 py-3
                  rounded-xl
                  border border-purple-500/20
                  bg-gradient-to-r from-purple-600 to-indigo-600
                  shadow-lg shadow-purple-500/20
                  cursor-pointer
                "
                whileHover={{ scale: 1.02 }}
                onClick={() =>
                  selectedDate &&
                  navigate(`/booking?date=${selectedDate}`)
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
          </div>

          <div className="absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-white/[0.03] blur-3xl" />

          <div className="pointer-events-none absolute inset-0 rounded-[32px] border border-white/5" />
        </motion.div>
      </div>
    </motion.div>
  </div>
</div>
  );
}
