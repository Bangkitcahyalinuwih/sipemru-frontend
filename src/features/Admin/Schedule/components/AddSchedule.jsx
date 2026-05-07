import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

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

const days = [
  { value: "monday", label: "Senin" },
  { value: "tuesday", label: "Selasa" },
  { value: "wednesday", label: "Rabu" },
  { value: "thursday", label: "Kamis" },
  { value: "friday", label: "Jumat" },
  { value: "saturday", label: "Sabtu" },
  { value: "sunday", label: "Minggu" },
];

const AddSchedule = () => {
  const [form, setForm] = useState(initialState);
  const navigate = useNavigate();

  const inputClass =
    "w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition bg-white";

  const setField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.course_name || !form.room_id) {
      return Swal.fire("Error", "Mata kuliah dan ruangan wajib diisi", "error");
    }

    Swal.fire({
      icon: "success",
      title: "Berhasil",
      text: "Schedule berhasil ditambahkan",
      timer: 1200,
      showConfirmButton: false,
    });

    navigate("/admin/schedule");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden">

        {/* HEADER */}
        <div className="px-6 py-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <h1 className="text-lg font-semibold">Tambah Schedule</h1>
          <p className="text-sm text-blue-100">
            Isi data jadwal perkuliahan dengan lengkap
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
              placeholder="Tahun Ajaran (2025/2026)"
              value={form.tahun_ajaran}
              onChange={(e) => setField("tahun_ajaran", e.target.value)}
            />

            <select
              className={inputClass}
              value={form.jenis_kegiatan}
              onChange={(e) => setField("jenis_kegiatan", e.target.value)}
            >
              <option value="kuliah">Kuliah</option>
              <option value="praktikum">Praktikum</option>
              <option value="ujian">Ujian</option>
              <option value="seminar">Seminar</option>
            </select>

          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium hover:opacity-90 transition"
          >
            Simpan Schedule
          </button>

        </form>
      </div>
    </div>
  );
};

export default AddSchedule;