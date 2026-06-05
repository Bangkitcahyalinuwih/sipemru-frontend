import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  User,
  FileText,
  Building2,
  ArrowLeft,
  Users,
  Phone,
  CheckCircle2,
  Loader2,
  AlertTriangle, // Icon tambahan untuk pop-up error
  XCircle,
} from "lucide-react";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useNavigate, useLocation } from "react-router-dom";
import { createBooking } from "../../../Admin/Booking/service/BookingService";

// --- KOMPONEN INPUT ---
const Input = ({ icon: Icon, error, ...props }) => (
  <div className="relative space-y-1">
    <div className="relative">
      <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/70" />
      <input
        {...props}
        className={`w-full pl-11 pr-4 py-3 rounded-2xl bg-white/10 backdrop-blur-xl border ${
          error ? "border-red-500 focus:ring-red-500" : "border-white/20 focus:ring-cyan-400"
        } text-white placeholder:text-white/60 focus:outline-none focus:ring-2 transition-all`}
      />
    </div>
    {error && (
      <p className="text-red-400 text-xs pl-2 font-medium animate-pulse">{error}</p>
    )}
  </div>
);

// --- KOMPONEN OVERLAY MEMPROSES ---
const LoadingOverlay = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
  >
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      className="bg-gradient-to-br from-slate-900 to-indigo-950 p-8 rounded-3xl border border-white/20 shadow-2xl text-center"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-16 h-16 mx-auto mb-4 rounded-full border-4 border-cyan-500/30 border-t-cyan-500"
      />
      <p className="text-white text-lg font-semibold">Memproses Booking...</p>
      <p className="text-white/60 text-sm mt-2">Mohon tunggu sebentar</p>
    </motion.div>
  </motion.div>
);

// --- KOMPONEN OVERLAY BERHASIL ---
const SuccessOverlay = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", duration: 0.6 }}
        className="bg-gradient-to-br from-slate-900 to-indigo-950 p-10 rounded-3xl border border-white/20 shadow-2xl text-center relative overflow-hidden"
      >
        <CheckCircle2 className="w-20 h-20 mx-auto text-green-400" />
        <div className="mt-6">
          <h3 className="text-white text-2xl font-bold mb-2">Booking Berhasil!</h3>
          <p className="text-white/70 text-sm">Data peminjaman ruangan telah tersimpan</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- 🔥 KOMPONEN BARU: OVERLAY ERROR TABRAKAN JADWAL (CONFLICT) ---
const ConflictOverlay = ({ onClose, message }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.6, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.6, opacity: 0, y: 30 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="bg-gradient-to-br from-slate-900 to-red-950/40 p-8 rounded-3xl border border-red-500/30 shadow-2xl max-w-md w-full text-center relative mx-4"
      >
        <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-500/20">
          <AlertTriangle className="w-12 h-12 text-red-400" />
        </div>
        
        <h3 className="text-white text-2xl font-bold mb-3">Jadwal Bertabrakan!</h3>
        
        <p className="text-red-200/80 text-sm leading-relaxed mb-6 bg-red-950/40 border border-red-500/20 px-4 py-3 rounded-xl">
          {message || "Ruangan ini sudah di-booking oleh organisasi lain pada tanggal dan jam yang Anda pilih."}
        </p>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white font-semibold transition shadow-lg shadow-red-500/20 text-sm"
        >
          Atur Ulang Waktu & Tanggal
        </button>
      </motion.div>
    </motion.div>
  );
};

// --- INDUK KOMPONEN UTAMA ---
export function BookingForm() {
  const navigate = useNavigate();
  const location = useLocation();

  const { roomName = "", roomId = "" } = location.state || {};

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showConflict, setShowConflict] = useState(false); // State pelacak pop-up error tabrakan
  const [conflictMessage, setConflictMessage] = useState(""); // Menyimpan pesan detail dari backend

  const [formData, setFormData] = useState({
    name: "",
    organization: "",
    participants: "",
    phone: "",
    date: "",
    startTime: "",
    endTime: "",
    purpose: "",
    jenisPeminjaman: "",
  });

  const [errors, setErrors] = useState({
    date: "",
    startTime: "",
    endTime: "",
  });

  const todayString = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (roomName || roomId) {
      setFormData((prev) => ({
        ...prev,
        room: roomName,
        room_id: roomId,
      }));
    }
  }, [roomName, roomId]);

  useEffect(() => {
    validateTiming();
  }, [formData.date, formData.startTime, formData.endTime]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateTiming = () => {
    let tempErrors = { date: "", startTime: "", endTime: "" };
    let isValid = true;

    if (!formData.date) return isValid;

    const now = new Date();
    const selectedDate = new Date(formData.date);

    const todayDateOnly = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const selectedDateOnly = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
    
    if (selectedDateOnly < todayDateOnly) {
      tempErrors.date = "Tanggal sudah terlewat / kedaluwarsa!";
      isValid = false;
    }
    if (formData.startTime && formData.endTime && formData.startTime >= formData.endTime) {
      tempErrors.endTime = "Jam selesai harus lebih lambat dari jam mulai!";
      isValid = false;
    }
    if (selectedDateOnly.getTime() === todayDateOnly.getTime() && formData.startTime) {
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      const [startHour, startMinute] = formData.startTime.split(":").map(Number);

      if (startHour < currentHour || (startHour === currentHour && startMinute < currentMinute)) {
        tempErrors.startTime = "Waktu mulai sudah terlewat untuk hari ini!";
        isValid = false;
      }
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, organization, participants, phone, date, startTime, endTime, purpose } = formData;

    if (!name || !organization || !participants || !phone || !date ||
      !startTime || !endTime || !purpose || !formData.jenisPeminjaman) {
      toast.error("Mohon lengkapi semua field!");
      return;
    }

    if (!validateTiming()) {
      toast.error("Gagal memproses. Terdapat ketidaksinkronan pada tanggal atau jam!");
      return;
    }

    const payload = {
      room_id: Number(roomId),
      purpose: purpose.trim(),
      organization: organization.trim(),
      booking_date: date,
      start_time: startTime?.slice(0, 5),
      end_time: endTime?.slice(0, 5),
      jumlah_peserta: Number(participants),
      pic_name: name.trim(),
      pic_phone: phone.trim(),
      jenis_peminjaman: formData.jenisPeminjaman,
    };

    try {
      setIsSubmitting(true);
      await createBooking(payload);
      setShowSuccess(true);
    } catch (error) {
      console.error("ERRORS:", JSON.stringify(error.response?.data?.errors, null, 2));
      
      const serverMessage = error.response?.data?.message || "";
      
      // 🔥 DETEKSI ERROR TABRAKAN JADWAL DARI SERVER
      // Silakan sesuaikan keyword status code (misal 409 atau 422) atau potongan teks message dari backend-mu
      if (error.response?.status === 409 || error.response?.status === 422 || serverMessage.toLowerCase().includes("tabrakan") || serverMessage.toLowerCase().includes("already booked") || serverMessage.toLowerCase().includes("konflik")) {
        setConflictMessage(serverMessage || "Ruangan sudah terisi pada jam tersebut. Silakan pilih alternatif jam atau hari lain.");
        setShowConflict(true);
      } else {
        toast.error(serverMessage || "Gagal membuat booking");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSuccessComplete = () => {
    setShowSuccess(false);
    setIsSubmitting(false);
    navigate("/history");
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 px-4 py-10">
      
      {/* MANAGEMENT POP-UP ROUTER */}
      <AnimatePresence>
        {isSubmitting && !showSuccess && <LoadingOverlay />}
        {showSuccess && <SuccessOverlay onComplete={handleSuccessComplete} />}
        {showConflict && (
          <ConflictOverlay 
            message={conflictMessage} 
            onClose={() => setShowConflict(false)} 
          />
        )}
      </AnimatePresence>

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-3xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-white/80 hover:text-white mb-5 transition"
        >
          <ArrowLeft size={18} />
          Kembali
        </button>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-2xl shadow-2xl overflow-hidden">
            <div className="px-8 py-7 border-b border-white/10 bg-white/5 backdrop-blur-xl">
              <h2 className="text-3xl font-bold text-white">Booking Ruangan</h2>
              <p className="text-white/70 mt-2 text-sm">
                Isi data peminjaman ruangan dengan lengkap
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-5">
              <Input
                icon={User}
                name="name"
                placeholder="Nama PIC"
                value={formData.name}
                onChange={handleChange}
              />

              <div className="relative">
                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 w-4 h-4" />
                <input
                  value={roomName}
                  disabled
                  className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/5 text-white/50 cursor-not-allowed border border-white/10"
                />
              </div>

              <Input
                icon={Building2}
                name="organization"
                placeholder="Nama Organisasi"
                value={formData.organization}
                onChange={handleChange}
              />

              {/* Jenis Peminjaman */}
              <div className="relative">
                <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/70 z-10" />
                <select
                  name="jenisPeminjaman"
                  value={formData.jenisPeminjaman}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all appearance-none cursor-pointer"
                >
                  <option value="" disabled className="bg-slate-900 text-white/60">Jenis Peminjaman</option>
                  <option value="kegiatan_mahasiswa" className="bg-slate-900 text-white">Kegiatan Mahasiswa</option>
                  <option value="seminar" className="bg-slate-900 text-white">Seminar</option>
                  <option value="rapat" className="bg-slate-900 text-white">Rapat</option>
                  <option value="praktikum_tambahan" className="bg-slate-900 text-white">Praktikum Tambahan</option>
                  <option value="lainnya" className="bg-slate-900 text-white">Lainnya</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  icon={Users}
                  type="number"
                  name="participants"
                  placeholder="Jumlah Peserta"
                  value={formData.participants}
                  onChange={handleChange}
                />

                <Input
                  icon={Phone}
                  name="phone"
                  placeholder="No HP"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              {/* Input Tanggal */}
              <div className="space-y-1">
                <div className="relative group">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/70 group-focus-within:text-cyan-400 transition" />
                  <input
                    type="date"
                    name="date"
                    min={todayString}
                    value={formData.date}
                    onChange={handleChange}
                    className={`w-full pl-11 pr-4 py-3 rounded-2xl bg-white/10 backdrop-blur-xl text-white [color-scheme:dark] focus:outline-none focus:ring-2 transition-all border ${
                      errors.date ? "border-red-500 focus:ring-red-500" : "border-white/20 focus:ring-cyan-400"
                    }`}
                  />
                </div>
                {errors.date && <p className="text-red-400 text-xs pl-2 font-medium">{errors.date}</p>}
              </div>

              {/* Input Jam */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="relative group">
                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/70 group-focus-within:text-cyan-400 transition" />
                    <input
                      type="time"
                      name="startTime"
                      value={formData.startTime}
                      onChange={handleChange}
                      className={`w-full pl-11 pr-4 py-3 rounded-2xl bg-white/10 backdrop-blur-xl text-white [color-scheme:dark] focus:outline-none focus:ring-2 transition-all border ${
                        errors.startTime ? "border-red-500 focus:ring-red-500" : "border-white/20 focus:ring-cyan-400"
                      }`}
                    />
                  </div>
                  {errors.startTime && <p className="text-red-400 text-xs pl-2 font-medium">{errors.startTime}</p>}
                </div>

                <div className="space-y-1">
                  <div className="relative group">
                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/70 group-focus-within:text-cyan-400 transition" />
                    <input
                      type="time"
                      name="endTime"
                      value={formData.endTime}
                      onChange={handleChange}
                      className={`w-full pl-11 pr-4 py-3 rounded-2xl bg-white/10 backdrop-blur-xl text-white [color-scheme:dark] focus:outline-none focus:ring-2 transition-all border ${
                        errors.endTime ? "border-red-500 focus:ring-red-500" : "border-white/20 focus:ring-cyan-400"
                      }`}
                    />
                  </div>
                  {errors.endTime && <p className="text-red-400 text-xs pl-2 font-medium">{errors.endTime}</p>}
                </div>
              </div>

              <div className="relative">
                <FileText className="absolute left-4 top-4 w-4 h-4 text-white/70" />
                <textarea
                  name="purpose"
                  placeholder="Keperluan peminjaman"
                  value={formData.purpose}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 rounded-2xl h-32 resize-none bg-white/10 backdrop-blur-xl border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
              </div>

              <motion.button
                whileTap={{ scale: 0.98 }}
                whileHover={{ scale: 1.01 }}
                type="submit"
                disabled={isSubmitting || !!errors.date || !!errors.startTime || !!errors.endTime}
                className="w-full py-3 rounded-2xl font-semibold text-white bg-gradient-to-r from-cyan-500 to-indigo-600 hover:opacity-90 transition-all shadow-lg shadow-cyan-500/20 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Memproses...
                  </>
                ) : (
                  "Booking Sekarang"
                )}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}