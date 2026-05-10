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
} from "lucide-react";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useNavigate, useLocation } from "react-router-dom";

import { createBooking } from "../../../Admin/Booking/service/BookingService";

const Input = ({ icon: Icon, ...props }) => (
  <div className="relative">
    <Icon
      className="
        absolute
        left-4
        top-1/2
        -translate-y-1/2
        w-4
        h-4
        text-white/70
      "
    />

    <input
      {...props}
      className="
        w-full
        pl-11
        pr-4
        py-3
        rounded-2xl
        bg-white/10
        backdrop-blur-xl
        border
        border-white/20
        text-white
        placeholder:text-white/60
        focus:outline-none
        focus:ring-2
        focus:ring-cyan-400
        transition-all
      "
    />
  </div>
);

const LoadingOverlay = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="
      fixed
      inset-0
      z-50
      flex
      items-center
      justify-center
      bg-black/60
      backdrop-blur-sm
    "
  >
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      className="
        bg-gradient-to-br
        from-slate-900
        to-indigo-950
        p-8
        rounded-3xl
        border
        border-white/20
        shadow-2xl
        text-center
      "
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
          w-16
          h-16
          mx-auto
          mb-4
          rounded-full
          border-4
          border-cyan-500/30
          border-t-cyan-500
        "
      />

      <p className="text-white text-lg font-semibold">Memproses Booking...</p>

      <p className="text-white/60 text-sm mt-2">Mohon tunggu sebentar</p>
    </motion.div>
  </motion.div>
);
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
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/60
        backdrop-blur-sm
      "
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{
          type: "spring",
          duration: 0.6,
        }}
        className="
          bg-gradient-to-br
          from-slate-900
          to-indigo-950
          p-10
          rounded-3xl
          border
          border-white/20
          shadow-2xl
          text-center
          relative
          overflow-hidden
        "
      >
        <CheckCircle2
          className="
            w-20
            h-20
            mx-auto
            text-green-400
          "
        />

        <div className="mt-6">
          <h3 className="text-white text-2xl font-bold mb-2">
            Booking Berhasil!
          </h3>

          <p className="text-white/70 text-sm">
            Data peminjaman ruangan telah tersimpan
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export function BookingForm() {
  const navigate = useNavigate();
  const location = useLocation();

  const { roomName = "", roomId = "" } = location.state || {};

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    room_id: roomId,
    room: roomName,
    organization: "",
    participants: "",
    phone: "",
    date: "",
    startTime: "",
    endTime: "",
    purpose: "",
  });

  useEffect(() => {
    if (roomName || roomId) {
      setFormData((prev) => ({
        ...prev,
        room: roomName,
        room_id: roomId,
      }));
    }
  }, [roomName, roomId]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      name,
      room_id,
      organization,
      participants,
      phone,
      date,
      startTime,
      endTime,
      purpose,
    } = formData;

    if (
      !name ||
      !room_id ||
      !organization ||
      !participants ||
      !phone ||
      !date ||
      !startTime ||
      !endTime ||
      !purpose
    ) {
      toast.error("Mohon lengkapi semua field!");
      return;
    }

    try {
      setIsSubmitting(true);

      const payload = {
        user_id: 1,
        room_id: Number(room_id),
        room_name: formData.room,
        purpose: purpose,
        organization: organization,
        jumlah_peserta: Number(participants),
        jenis_peminjaman: "internal",
        pic_name: name,
        pic_phone: phone,
        booking_date: date,
        start_time: startTime,
        end_time: endTime,
      };

      console.log(payload);

      await createBooking(payload);

      setShowSuccess(true);

      toast.success("Booking berhasil!");
    } catch (error) {
      console.error(error);

      toast.error("Gagal membuat booking");

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
      <AnimatePresence>
        {isSubmitting && !showSuccess && <LoadingOverlay />}

        {showSuccess && <SuccessOverlay onComplete={handleSuccessComplete} />}
      </AnimatePresence>
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="
            absolute
            top-0
            left-0
            w-72
            h-72
            bg-cyan-500/20
            rounded-full
            blur-3xl
          "
        />

        <div
          className="
            absolute
            bottom-0
            right-0
            w-96
            h-96
            bg-indigo-500/20
            rounded-full
            blur-3xl
          "
        />
      </div>

      <div className="relative max-w-3xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="
            flex
            items-center
            gap-2
            text-white/80
            hover:text-white
            mb-5
            transition
          "
        >
          <ArrowLeft size={18} />
          Kembali
        </button>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div
            className="
              rounded-3xl
              border
              border-white/10
              bg-white/10
              backdrop-blur-2xl
              shadow-2xl
              overflow-hidden
            "
          >
            <div
              className="
                px-8
                py-7
                border-b
                border-white/10
                bg-white/5
                backdrop-blur-xl
              "
            >
              <h2 className="text-3xl font-bold text-white">Booking Ruangan</h2>

              <p className="text-white/70 mt-2 text-sm">
                Isi data peminjaman ruangan dengan lengkap
              </p>
            </div>
            <form onSubmit={handleSubmit} className="p-8 space-y-5">
              <Input
                icon={User}
                name="name"
                placeholder="Nama Peminjam"
                value={formData.name}
                onChange={handleChange}
              />
              <div className="relative">
                <Building2
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    w-4
                    h-4
                    text-white/70
                  "
                />

                <input
                  name="room"
                  value={formData.room}
                  readOnly
                  className="
                    w-full
                    pl-11
                    pr-4
                    py-3
                    rounded-2xl
                    bg-white/5
                    border
                    border-white/10
                    text-white/70
                    cursor-not-allowed
                  "
                />
              </div>

              <Input
                icon={Building2}
                name="organization"
                placeholder="Nama Organisasi"
                value={formData.organization}
                onChange={handleChange}
              />

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

              <div className="relative group">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/70 group-focus-within:text-cyan-400 transition" />

                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="
                            w-full
                            pl-11
                            pr-4
                            py-3
                            rounded-2xl

                            bg-white/10 backdrop-blur-xl
                            border border-white/20

                            text-white
                            [color-scheme:dark]

                            focus:outline-none
                            focus:ring-2
                            focus:ring-cyan-400

                            hover:border-cyan-400/40
                            transition-all
                          "
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative group">
                  <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/70 group-focus-within:text-cyan-400 transition" />

                  <input
                    type="time"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleChange}
                    className="
                            w-full
                            pl-11
                            pr-4
                            py-3
                            rounded-2xl

                            bg-white/10 backdrop-blur-xl
                            border border-white/20

                            text-white
                            [color-scheme:dark]

                            focus:outline-none
                            focus:ring-2
                            focus:ring-cyan-400

                            hover:border-cyan-400/40
                            transition-all
                          "
                  />
                </div>

                <div className="relative group">
                  <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/70 group-focus-within:text-cyan-400 transition" />

                  <input
                    type="time"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleChange}
                    className="
          w-full
          pl-11
          pr-4
          py-3
          rounded-2xl

          bg-white/10 backdrop-blur-xl
          border border-white/20

          text-white
          [color-scheme:dark]

          focus:outline-none
          focus:ring-2
          focus:ring-cyan-400

          hover:border-cyan-400/40
          transition-all
        "
                  />
                </div>
              </div>
              <div className="relative">
                <FileText
                  className="
                    absolute
                    left-4
                    top-4
                    w-4
                    h-4
                    text-white/70
                  "
                />

                <textarea
                  name="purpose"
                  placeholder="Keperluan peminjaman"
                  value={formData.purpose}
                  onChange={handleChange}
                  className="
                    w-full
                    pl-11
                    pr-4
                    py-3
                    rounded-2xl
                    h-32
                    resize-none
                    bg-white/10
                    backdrop-blur-xl
                    border
                    border-white/20
                    text-white
                    placeholder:text-white/60
                    focus:outline-none
                    focus:ring-2
                    focus:ring-cyan-400
                  "
                />
              </div>

              <motion.button
                whileTap={{ scale: 0.98 }}
                whileHover={{ scale: 1.01 }}
                type="submit"
                disabled={isSubmitting}
                className="
                  w-full
                  py-3
                  rounded-2xl
                  font-semibold
                  text-white
                  bg-gradient-to-r
                  from-cyan-500
                  to-indigo-600
                  hover:opacity-90
                  transition-all
                  shadow-lg
                  shadow-cyan-500/20
                  disabled:opacity-60
                  disabled:cursor-not-allowed
                  flex
                  items-center
                  justify-center
                  gap-2
                "
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
