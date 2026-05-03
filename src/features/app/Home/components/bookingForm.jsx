import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  User,
  FileText,
  Building2,
  ArrowLeft,
} from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useNavigate, useLocation } from "react-router-dom";

export function BookingForm() {
  const navigate = useNavigate();
  const location = useLocation();

  const { roomName = "" } = location.state || {};

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    room: roomName,
    date: "",
    startTime: "",
    endTime: "",
    purpose: "",
  });

  useEffect(() => {
    if (roomName) {
      setFormData((prev) => ({
        ...prev,
        room: roomName,
      }));
    }
  }, [roomName]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, room, date, startTime, endTime, purpose } = formData;

    if (!name || !room || !date || !startTime || !endTime || !purpose) {
      toast.error("Mohon lengkapi semua field!");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      toast.success("Booking berhasil!");
      setIsSubmitting(false);
      navigate("/history");
    }, 1200);
  };

  const Input = ({ icon: Icon, ...props }) => (
    <div className="relative">
      <Icon className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
      <input
        {...props}
        className="w-full pl-10 pr-3 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">

      {/* BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
      >
        <ArrowLeft size={18} />
        Kembali
      </button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="bg-white rounded-2xl shadow-xl border overflow-hidden">

          {/* HEADER */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
            <h2 className="text-xl font-bold text-white">
              Form Booking Ruangan
            </h2>
            <p className="text-blue-100 text-sm">
              Isi data peminjaman ruangan dengan lengkap
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">

            <Input
              icon={User}
              name="name"
              placeholder="Nama peminjam"
              value={formData.name}
              onChange={handleChange}
            />

            <div className="relative">
              <Building2 className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
              <input
                name="room"
                value={formData.room}
                readOnly
                className="w-full pl-10 pr-3 py-2.5 border rounded-xl bg-gray-100 text-gray-600"
              />
            </div>

            <Input
              icon={Calendar}
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />

            <div className="grid grid-cols-2 gap-3">
              <Input
                icon={Clock}
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
              />

              <Input
                icon={Clock}
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
              />
            </div>

            <div className="relative">
              <FileText className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
              <textarea
                name="purpose"
                placeholder="Keperluan peminjaman"
                value={formData.purpose}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-2.5 border rounded-xl h-28 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <motion.button
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={isSubmitting}
  style={{ cursor: "pointer" }}
  className="w-full py-2.5 rounded-xl text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700"
            >
              {isSubmitting ? "Memproses..." : "Booking Sekarang"}
            </motion.button>

          </form>
        </div>
      </motion.div>
    </div>
  );
}