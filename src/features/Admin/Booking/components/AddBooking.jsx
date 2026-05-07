import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  Building2,
  Users,
  User,
  Phone,
  CalendarDays,
  Clock3,
} from "lucide-react";

const rooms = [
  { id: 1, name: "Lab Komputer 1" },
  { id: 2, name: "Aula Utama" },
  { id: 3, name: "Ruang Rapat" },
];

const initialState = {
  user_id: "",
  room_id: "",
  purpose: "",
  organization: "",
  jumlah_peserta: "",
  jenis_peminjaman: "internal",
  pic_name: "",
  pic_phone: "",
  booking_date: "",
  start_time: "",
  end_time: "",
};

const AddBooking = () => {
  const [form, setForm] = useState(initialState);

  const navigate = useNavigate();

  const inputClass =
    "w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition";

  const setField = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.room_id ||
      !form.purpose ||
      !form.booking_date
    ) {
      return Swal.fire(
        "Error",
        "Lengkapi data booking",
        "error"
      );
    }

    console.log(form);

    Swal.fire({
      icon: "success",
      title: "Berhasil",
      text: "Booking berhasil dibuat",
      timer: 1500,
      showConfirmButton: false,
    });

    navigate("/admin/booking");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">

        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6 text-white">
          <h1 className="text-2xl font-bold">
            Tambah Booking
          </h1>

          <p className="text-blue-100 text-sm mt-1">
            Isi data peminjaman ruangan dengan lengkap
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-8 space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <div className="relative">
              <User
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="number"
                placeholder="User ID"
                value={form.user_id}
                onChange={(e) =>
                  setField("user_id", e.target.value)
                }
                className={inputClass}
              />
            </div>

            <div className="relative">
              <Building2
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <select
                value={form.room_id}
                onChange={(e) =>
                  setField("room_id", e.target.value)
                }
                className={inputClass}
              >
                <option value="">Pilih Ruangan</option>

                {rooms.map((room) => (
                  <option key={room.id} value={room.id}>
                    {room.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative md:col-span-2">
              <BookOpen
                size={18}
                className="absolute left-3 top-4 text-gray-400"
              />

              <textarea
                placeholder="Tujuan Peminjaman"
                value={form.purpose}
                onChange={(e) =>
                  setField("purpose", e.target.value)
                }
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition min-h-[110px]"
              />
            </div>

            <div className="relative">
              <Building2
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                placeholder="Organisasi"
                value={form.organization}
                onChange={(e) =>
                  setField("organization", e.target.value)
                }
                className={inputClass}
              />
            </div>

            <div className="relative">
              <Users
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="number"
                placeholder="Jumlah Peserta"
                value={form.jumlah_peserta}
                onChange={(e) =>
                  setField(
                    "jumlah_peserta",
                    e.target.value
                  )
                }
                className={inputClass}
              />
            </div>

            <div className="relative">
              <BookOpen
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <select
                value={form.jenis_peminjaman}
                onChange={(e) =>
                  setField(
                    "jenis_peminjaman",
                    e.target.value
                  )
                }
                className={inputClass}
              >
                <option value="internal">
                  Internal
                </option>

                <option value="external">
                  External
                </option>
              </select>
            </div>

            <div className="relative">
              <User
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                placeholder="Nama PIC"
                value={form.pic_name}
                onChange={(e) =>
                  setField("pic_name", e.target.value)
                }
                className={inputClass}
              />
            </div>

            <div className="relative">
              <Phone
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                placeholder="No HP PIC"
                value={form.pic_phone}
                onChange={(e) =>
                  setField("pic_phone", e.target.value)
                }
                className={inputClass}
              />
            </div>

            <div className="relative">
              <CalendarDays
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="date"
                value={form.booking_date}
                onChange={(e) =>
                  setField(
                    "booking_date",
                    e.target.value
                  )
                }
                className={inputClass}
              />
            </div>

            <div className="relative">
              <Clock3
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="time"
                value={form.start_time}
                onChange={(e) =>
                  setField("start_time", e.target.value)
                }
                className={inputClass}
              />
            </div>

            <div className="relative">
              <Clock3
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="time"
                value={form.end_time}
                onChange={(e) =>
                  setField("end_time", e.target.value)
                }
                className={inputClass}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium hover:opacity-90 transition"
          >
            Simpan Booking
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBooking;