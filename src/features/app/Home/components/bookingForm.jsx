import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  User,
  FileText,
  Building2,
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

  // 🔥 Auto isi ulang kalau ada data dari RoomList
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

    if (
      !formData.name ||
      !formData.room ||
      !formData.date ||
      !formData.startTime ||
      !formData.endTime ||
      !formData.purpose
    ) {
      toast.error("Mohon lengkapi semua field!");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      toast.success("Booking berhasil!");
      setIsSubmitting(false);
      navigate("/history");
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="shadow-xl rounded-2xl overflow-hidden">
          
          {/* HEADER */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
            <h2 className="text-xl font-bold text-white">
              Form Booking
            </h2>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="p-6 space-y-5 bg-white">
            
            <input
              name="name"
              placeholder="Nama"
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />

            <input
              name="room"
              value={formData.room}
              readOnly
              className="w-full border p-2 rounded bg-gray-100"
            />

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />

            <input
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />

            <input
              type="time"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />

            <textarea
              name="purpose"
              placeholder="Keperluan"
              value={formData.purpose}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-2 rounded-lg"
            >
              {isSubmitting ? "Memproses..." : "Submit"}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}