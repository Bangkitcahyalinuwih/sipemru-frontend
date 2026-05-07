import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";

const days = [
  { value: "monday", label: "Senin" },
  { value: "tuesday", label: "Selasa" },
  { value: "wednesday", label: "Rabu" },
  { value: "thursday", label: "Kamis" },
  { value: "friday", label: "Jumat" },
  { value: "saturday", label: "Sabtu" },
  { value: "sunday", label: "Minggu" },
];

const initialState = {
  room_id: "",
  course_name: "",
  lecturer: "",
  prodi: "",
  kelas: "",
  sks: "",
  day_of_week: "",
  start_time: "",
  end_time: "",
  semester: "",
  tahun_ajaran: "",
  jenis_kegiatan: "kuliah",
};

const EditSchedule = () => {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { id } = useParams();

  const inputClass =
    "w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 transition bg-white";

  const setField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    fetchDetail();
  }, []);

  const fetchDetail = async () => {
    try {
      setLoading(true);

      // dummy data
      const data = {
        id,
        room_id: "1",
        course_name: "Pemrograman Web",
        lecturer: "Budi Santoso",
        prodi: "Informatika",
        kelas: "TI-2A",
        sks: 3,
        day_of_week: "monday",
        start_time: "08:00",
        end_time: "10:30",
        semester: "3",
        tahun_ajaran: "2025/2026",
        jenis_kegiatan: "kuliah",
      };

      setForm(data);
    } catch (error) {
      console.error(error);

      Swal.fire("Error", "Gagal mengambil data", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.course_name || !form.room_id) {
      return Swal.fire(
        "Error",
        "Mata kuliah dan ruangan wajib diisi",
        "error"
      );
    }

    try {
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Schedule berhasil diupdate",
        timer: 1200,
        showConfirmButton: false,
      });

      navigate("/admin/schedule");
    } catch (error) {
      console.error(error);

      Swal.fire("Error", "Gagal update schedule", "error");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 text-sm">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden">

        {/* HEADER */}
        <div className="px-6 py-6 bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
          <h1 className="text-lg font-semibold">Edit Schedule</h1>

          <p className="text-sm text-yellow-100">
            Update data jadwal perkuliahan
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <input
              className={inputClass}
              placeholder="ID Ruangan"
              value={form.room_id}
              onChange={(e) => setField("room_id", e.target.value)}
            />

            <input
              className={inputClass}
              placeholder="Nama Mata Kuliah"
              value={form.course_name}
              onChange={(e) => setField("course_name", e.target.value)}
            />

            <input
              className={inputClass}
              placeholder="Dosen"
              value={form.lecturer}
              onChange={(e) => setField("lecturer", e.target.value)}
            />

            <input
              className={inputClass}
              placeholder="Prodi"
              value={form.prodi}
              onChange={(e) => setField("prodi", e.target.value)}
            />

            <input
              className={inputClass}
              placeholder="Kelas"
              value={form.kelas}
              onChange={(e) => setField("kelas", e.target.value)}
            />

            <input
              type="number"
              className={inputClass}
              placeholder="SKS"
              value={form.sks}
              onChange={(e) => setField("sks", e.target.value)}
            />

            <select
              className={inputClass}
              value={form.day_of_week}
              onChange={(e) => setField("day_of_week", e.target.value)}
            >
              <option value="">Pilih Hari</option>

              {days.map((d) => (
                <option key={d.value} value={d.value}>
                  {d.label}
                </option>
              ))}
            </select>

            <input
              type="time"
              className={inputClass}
              value={form.start_time}
              onChange={(e) => setField("start_time", e.target.value)}
            />

            <input
              type="time"
              className={inputClass}
              value={form.end_time}
              onChange={(e) => setField("end_time", e.target.value)}
            />

            <input
              className={inputClass}
              placeholder="Semester"
              value={form.semester}
              onChange={(e) => setField("semester", e.target.value)}
            />

            <input
              className={inputClass}
              placeholder="Tahun Ajaran"
              value={form.tahun_ajaran}
              onChange={(e) => setField("tahun_ajaran", e.target.value)}
            />

            <select
              className={inputClass}
              value={form.jenis_kegiatan}
              onChange={(e) =>
                setField("jenis_kegiatan", e.target.value)
              }
            >
              <option value="kuliah">Kuliah</option>
              <option value="praktikum">Praktikum</option>
              <option value="ujian">Ujian</option>
              <option value="seminar">Seminar</option>
            </select>

          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-medium hover:opacity-90 transition"
          >
            Update Schedule
          </button>

        </form>
      </div>
    </div>
  );
};

export default EditSchedule;