import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, MapPin, ArrowRight, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

export function Hero() {
  const navigate = useNavigate();

  // State untuk tanggal real-time
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  // Update tanggal setiap hari (opsional, untuk real-time)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 86400000); // Update setiap 24 jam

    return () => clearInterval(timer);
  }, []);

  // Fungsi untuk mendapatkan data kalender berdasarkan bulan dan tahun real-time
  const getCalendarData = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Mendapatkan hari pertama (0 = Minggu, 1 = Senin, dst)
    // Kita ingin Senin sebagai hari pertama, jadi perlu penyesuaian
    let startDayOfWeek = firstDayOfMonth.getDay();
    // Konversi ke format Senin = 0, Minggu = 6
    startDayOfWeek = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;

    const dates = [];

    // Tambahkan hari kosong di awal bulan
    for (let i = 0; i < startDayOfWeek; i++) {
      dates.push({ day: null, date: null });
    }

    // Tambahkan tanggal bulan ini
    for (let i = 1; i <= daysInMonth; i++) {
      dates.push({ day: i, date: i });
    }

    return { dates, daysInMonth, year, month };
  };

  const { dates, daysInMonth, year, month } = getCalendarData();
  const today = currentDate.getDate(); // Tanggal hari ini real-time
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Cek apakah bulan yang ditampilkan adalah bulan saat ini
  const isCurrentMonth = month === currentMonth && year === currentYear;

  // Nama bulan dalam bahasa Indonesia
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

  // Fungsi untuk navigasi bulan (opsional)
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
    <div className="relative bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 overflow-hidden min-h-[90vh]">
      {/* ANIMATED BACKGROUND PATTERN */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(168,85,247,0.15),transparent_50%)]" />
      </div>

      {/* FLOATING ELEMENTS */}
      <motion.div
        className="absolute top-32 left-[10%] w-2 h-2 bg-indigo-400 rounded-full"
        animate={{
          y: [0, -30, 0],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-[40%] right-[15%] w-3 h-3 bg-purple-400 rounded-full"
        animate={{
          y: [0, -40, 0],
          opacity: [0.4, 0.9, 0.4],
        }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
      />

      {/* GLOW EFFECTS */}
      <motion.div
        className="absolute top-20 -left-10 w-96 h-96 bg-gradient-to-r from-indigo-300 to-purple-300 rounded-full blur-[100px] opacity-20"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 40, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute bottom-10 right-0 w-96 h-96 bg-gradient-to-l from-purple-300 to-pink-300 rounded-full blur-[100px] opacity-20"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -50, 0],
          y: [0, 40, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* CONTENT - DIPERLEBAR DAN DIGESER */}
      <div className="relative max-w-[90%] mx-auto px-6 py-16 lg:py-20 grid lg:grid-cols-2 gap-8 items-center">
        {/* LEFT CONTENT - DIPERKECIL LEBARNYA */}
        <div className="space-y-8 max-w-xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm border border-indigo-200 rounded-full shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span className="text-sm font-medium text-indigo-700">
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
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Pesan Ruangan
              </span>
              <br />
              <span className="text-gray-900">Kampus dengan</span>
              <br />
              <span className="text-gray-900">Mudah & Cepat</span>
            </h1>
          </motion.div>

          {/* Description */}
          <motion.p
            className="text-lg md:text-xl text-gray-600 max-w-xl leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Temukan dan booking ruangan kampus untuk kegiatan akademik, seminar,
            atau rapat dengan sistem yang mudah dan efisien.
          </motion.p>

          {/* Features */}
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
              <div key={idx} className="flex items-center gap-2 text-gray-700">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-indigo-600" />
                </div>
                <span className="text-sm font-medium">{item.label}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <button
              onClick={() => navigate("/roomlist")}
              className="group bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-2xl hover:shadow-indigo-500/30 transition-all duration-300 hover:scale-105 flex items-center gap-2"
            >
              Mulai Booking
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => navigate("/roomlist")}
              className="bg-white/80 backdrop-blur-sm border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-2xl font-semibold hover:bg-white hover:border-gray-300 hover:shadow-lg transition-all duration-300"
            >
              Lihat Ruangan
            </button>
          </motion.div>
        </div>

        {/* RIGHT CONTENT - CALENDAR CARD (DIGESER KE KIRI) */}
        <motion.div
          className="relative flex justify-center lg:justify-end"
          initial={{ opacity: 0, x: 100, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 to-purple-500 blur-[120px] opacity-20 scale-110"></div>

          {/* Main Card */}
          <div className="relative">
            {/* Floating Card */}
            <motion.div
              className="relative bg-white/80 backdrop-blur-2xl border border-white/60 rounded-3xl shadow-2xl px-12 py-6 w-full max-w-[720px]"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>

                {/* Navigasi Bulan */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={goToPreviousMonth}
                    className="text-indigo-600 hover:text-indigo-800 p-1"
                  >
                    ←
                  </button>

                  <div className="flex items-center gap-2 text-indigo-600">
                    <Calendar className="w-5 h-5" />
                    <span className="text-base font-semibold">
                      {monthNames[month]} {year}
                    </span>
                  </div>

                  <button
                    onClick={goToNextMonth}
                    className="text-indigo-600 hover:text-indigo-800 p-1"
                  >
                    →
                  </button>

                  {!isCurrentMonth && (
                    <button
                      onClick={goToCurrentMonth}
                      className="text-xs bg-indigo-100 hover:bg-indigo-200 text-indigo-700 px-2 py-1 rounded-lg"
                    >
                      Hari Ini
                    </button>
                  )}
                </div>
              </div>

              {/* Calendar */}
              <div className="bg-gradient-to-br from-white to-indigo-50/30 rounded-2xl px-8 py-5 shadow-inner">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <div className="w-1 h-6 bg-gradient-to-b from-indigo-600 to-purple-600 rounded-full"></div>
                  Booking Ruangan
                </h3>

                {/* Day Header */}
                <div className="grid grid-cols-7 gap-3 text-xs font-semibold text-gray-500 mb-3">
                  {["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"].map(
                    (d, i) => (
                      <span key={i} className="text-center py-1">
                        {d}
                      </span>
                    ),
                  )}
                </div>

                {/* Dates */}
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
                            ? "bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-lg"
                            : isToday
                              ? "bg-indigo-100 text-indigo-700 ring-2 ring-indigo-300"
                              : hasBooking
                                ? "bg-purple-50 text-purple-600"
                                : "hover:bg-indigo-50 text-gray-700"
                        }`}
                      >
                        {dateNumber}

                        {hasBooking && !isSelected && (
                          <div className="absolute bottom-1 w-1 h-1 bg-purple-500 rounded-full"></div>
                        )}

                        {isToday && !isSelected && (
                          <div className="absolute -top-1 -right-1 w-2 h-2 bg-indigo-500 rounded-full"></div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>

                {/* Info */}
                <div className="mt-3 text-xs text-gray-500 text-center">
                  {daysInMonth} hari di bulan {monthNames[month]}
                </div>

                <div className="mt-2 text-center">
                  <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                    📅{" "}
                    {new Date().toLocaleDateString("id-ID", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>

                {/* Button */}
                <motion.div
                  className="mt-4 px-5 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg cursor-pointer"
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

            {/* Floating Mini Cards */}
            <motion.div
              className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl p-5 w-36"
              animate={{ y: [0, -15, 0], rotate: [0, 3, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-600">120+</div>
                <div className="text-xs text-gray-600 mt-1">
                  Ruangan Tersedia
                </div>
              </div>
            </motion.div>

            <motion.div
              className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-5 w-36"
              animate={{ y: [0, 15, 0], rotate: [0, -3, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">98%</div>
                <div className="text-xs text-gray-600 mt-1">
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
