import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, MapPin, ArrowRight } from "lucide-react";

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
      dates.push({
        day: null,
        date: null,
      });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      dates.push({
        day: i,
        date: i,
      });
    }

    return {
      dates,
      daysInMonth,
      year,
      month,
    };
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

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0B0B12]">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-150px] left-[5%] h-[450px] w-[450px] rounded-full bg-purple-600/15 blur-3xl" />

        <div className="absolute bottom-[-100px] right-[5%] h-[500px] w-[500px] rounded-full bg-pink-600/10 blur-3xl" />

        <div className="absolute left-1/2 top-[40%] h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-indigo-600/10 blur-3xl" />

        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:70px_70px]" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 lg:grid-cols-2 lg:gap-16 lg:px-10 xl:px-14">
        <div className="mx-auto w-full max-w-[560px] lg:mx-0 lg:pr-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-white/[0.03] px-4 py-2 backdrop-blur-xl"
          >
            <div className="h-2 w-2 rounded-full bg-purple-400 animate-pulse" />

            <span className="text-xs font-medium text-purple-300">Sistem Booking Terpadu</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6"
          >
            <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
              <span className="bg-gradient-to-r from-purple-300 via-pink-300 to-indigo-300 bg-clip-text text-transparent">
                Pesan Ruangan
              </span>

              <br />

              <span className="text-white">Kampus dengan</span>

              <br />

              <span className="text-white">Mudah & Cepat</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-5 max-w-lg text-sm leading-relaxed text-gray-400 md:text-base"
          >
            Temukan dan booking ruangan kampus untuk kegiatan akademik, seminar, workshop, atau rapat dengan sistem modern dan efisien.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 grid grid-cols-3 gap-3"
          >
            {[{ icon: Calendar, label: "Real-time" }, { icon: Clock, label: "24/7" }, { icon: MapPin, label: "Semua Ruangan" }].map((item, index) => (
              <div key={index} className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-3 backdrop-blur-xl">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.03] border border-white/10">
                  <item.icon className="h-4 w-4 text-purple-400" />
                </div>

                <span className="text-xs text-gray-300">{item.label}</span>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <button
              onClick={() => navigate("/roomlist")}
              className="group flex items-center gap-2 rounded-2xl border border-purple-500/30 bg-gradient-to-r from-purple-600 to-indigo-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 transition-all duration-300 hover:scale-105"
            >
              Mulai Booking
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={() => navigate("/roomlist")}
              className="rounded-2xl border border-white/10 bg-white/[0.03] px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-xl transition-all hover:bg-white/[0.05]"
            >
              Lihat Ruangan
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="relative mt-8 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] py-3 backdrop-blur-2xl"
          >
            <div className="absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-[#0B0B12] to-transparent" />

            <div className="absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-[#0B0B12] to-transparent" />

            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
              className="flex w-max gap-10 px-6"
            >
              {[" 120+ Ruangan Tersedia", " Booking Real-time", " Auditorium & Lab Lengkap", " Approval Otomatis", " Akses 24/7", " Seminar & Praktikum", " 120+ Ruangan Tersedia", " Booking Real-time", " Auditorium & Lab Lengkap", " Approval Otomatis", " Akses 24/7", " Seminar & Praktikum"].map((item, index) => (
                <div key={index} className="flex items-center gap-2 whitespace-nowrap">
                  <div className="h-2 w-2 rounded-full bg-purple-400 shadow-[0_0_10px_rgba(192,132,252,0.8)]" />

                  <span className="text-xs text-gray-300">{item}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="relative flex justify-center lg:justify-center lg:pl-4"
          initial={{ opacity: 0, x: 80, scale: 0.92 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-full max-w-[400px] overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.03] p-5 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.45)]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-indigo-500/10" />

            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.05] to-transparent" />

            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
                <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
              </div>

              <div className="flex items-center gap-2 text-purple-300">
                <Calendar className="h-4 w-4" />

                <span className="text-xs font-semibold tracking-wide">{monthNames[month]} {year}</span>
              </div>
            </div>

            <div className="relative mt-5 rounded-[28px] border border-white/10 bg-black/20 p-5 backdrop-blur-xl">
              <div className="mb-5 flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-white">Booking Calendar</h3>

                  <p className="mt-1 text-[11px] text-gray-500">Pilih tanggal tersedia</p>
                </div>

                <div className="rounded-xl border border-purple-500/20 bg-purple-500/10 px-3 py-1.5 text-[10px] font-medium text-purple-300">Real-time</div>
              </div>

              <div className="grid grid-cols-7 gap-2 text-center text-[10px] font-medium text-gray-500">
                {["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"].map((day) => (
                  <span key={day}>{day}</span>
                ))}
              </div>

              <div className="mt-4 grid grid-cols-7 gap-2">
                {dates.map((item, i) => {
                  const dateNumber = item.date;

                  const isSelected = selectedDate === dateNumber;

                  const isToday = isCurrentMonth && dateNumber === today;

                  const hasBooking = dateNumber && [7, 14, 21].includes(dateNumber);

                  if (dateNumber === null) {
                    return <div key={i} className="h-10" />;
                  }

                  return (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedDate(dateNumber)}
                      className={`relative flex h-10 items-center justify-center rounded-xl border text-xs font-medium transition-all ${
                        isSelected
                          ? "border-white/20 bg-gradient-to-br from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/20"
                          : isToday
                            ? "border-purple-400/30 bg-white/[0.05] text-purple-300"
                            : hasBooking
                              ? "border-purple-500/20 bg-purple-500/10 text-purple-300"
                              : "border-transparent text-gray-300 hover:border-white/10 hover:bg-white/[0.03]"
                      }`}
                    >
                      {dateNumber}

                      {hasBooking && !isSelected && <div className="absolute bottom-1 h-1 w-1 rounded-full bg-indigo-400" />}
                    </motion.button>
                  );
                })}
              </div>

              <div className="mt-5 flex items-center justify-between">
                <span className="text-[11px] text-gray-500">{daysInMonth} hari tersedia</span>

                <div className="flex items-center gap-2 text-[11px] text-purple-300">
                  <div className="h-2 w-2 rounded-full bg-purple-400" />
                  Live booking
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/roomlist")}
                className="mt-5 flex w-full items-center justify-between rounded-2xl border border-purple-500/20 bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/20"
              >
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />

                  <span>{selectedDate ? `Booking ${selectedDate}` : "Pilih tanggal booking"}</span>
                </div>

                <ArrowRight className="h-4 w-4" />
              </motion.button>
            </div>

            <div className="absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-purple-500/10 blur-3xl" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}