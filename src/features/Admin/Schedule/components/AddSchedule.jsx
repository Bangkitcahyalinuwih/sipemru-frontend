import React, { useEffect, useState, useCallback } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { 
  Building2, 
  BookOpen, 
  User, 
  GraduationCap, 
  Users, 
  Calendar,
  Clock,
  BookMarked,
  School,
  FileText
} from "lucide-react";

import { createSchedule } from "../service/ScheduleService";
import { getRuangan } from "../../Ruangan/service/RuanganService";

// ================= FIXED OUTSIDE COMPONENT ================= 
const InputWrapper = React.memo(({ icon: Icon, children, label, className = "" }) => (
  <div className={`space-y-2 ${className}`}>
    <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 uppercase tracking-wide">
      {Icon && <Icon className="w-3.5 h-3.5 text-slate-500" />}
      {label}
    </label>
    {children}
  </div>
));

InputWrapper.displayName = "InputWrapper";

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
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // ================= MEMOIZED CALLBACKS ================= 
  const setField = useCallback((key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = useCallback(async () => {
    try {
      const data = await getRuangan();
      setRooms(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Gagal ambil ruangan:", error);
    }
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    if (!form.course_name.trim() || !form.room_id) {
      return Swal.fire("Error", "Mata kuliah dan ruangan wajib diisi", "error");
    }

    try {
      setLoading(true);
      await createSchedule(form);

      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Jadwal berhasil ditambahkan",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/admin/schedule");
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Gagal!",
        text: "Tidak bisa menambahkan jadwal",
      });
    } finally {
      setLoading(false);
    }
  }, [form, navigate]);

  // ================= STABLE CLASSES ================= 
  const inputClass = useCallback(() => `
    w-full h-12 px-4 rounded-lg border border-slate-200 text-sm 
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
    transition-all duration-200 bg-white hover:border-slate-300
    placeholder:text-slate-400 placeholder:font-normal
  `, []);

  const selectClass = useCallback(() => `
    ${inputClass()} appearance-none bg-white cursor-pointer
    bg-[url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")]
    bg-[length:1.25rem] bg-[right_0.5rem_center] bg-no-repeat pr-10
  `, [inputClass]);

  const timePickerWrapperClass = useCallback(() => `
    flex items-center h-12 px-4 rounded-lg border border-slate-200 bg-white 
    focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent
    transition-all duration-200 hover:border-slate-300
  `, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        
        {/* HEADER CARD */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 px-8 py-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Tambah Jadwal Baru</h1>
                <p className="text-sm text-blue-100 mt-1">
                  Lengkapi informasi jadwal perkuliahan di bawah ini
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FORM CARD */}
        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-8">
              
              {/* SECTION: INFO DASAR */}
              <div className="mb-8">
                <h2 className="text-base font-bold text-slate-800 mb-1 flex items-center gap-2">
                  <div className="w-1 h-5 bg-blue-600 rounded-full"></div>
                  Informasi Dasar
                </h2>
                <p className="text-xs text-slate-500 ml-3 mb-6">Data mata kuliah dan pengajar</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  
                  <InputWrapper icon={Building2} label="Ruangan *">
                    <select
                      className={selectClass()}
                      value={form.room_id}
                      onChange={(e) => setField("room_id", e.target.value)}
                    >
                      <option value="">Pilih Ruangan...</option>
                      {rooms.map((room) => (
                        <option key={room.id} value={room.id}>
                          {room.name}
                        </option>
                      ))}
                    </select>
                  </InputWrapper>

                  <InputWrapper icon={BookOpen} label="Mata Kuliah *">
                    <input
                      className={inputClass()}
                      placeholder="Contoh: Pemrograman Web"
                      value={form.course_name}
                      onChange={(e) => setField("course_name", e.target.value)}
                    />
                  </InputWrapper>

                  <InputWrapper icon={User} label="Dosen Pengampu">
                    <input
                      className={inputClass()}
                      placeholder="Contoh: Dr. Ahmad Santoso, M.Kom"
                      value={form.lecturer}
                      onChange={(e) => setField("lecturer", e.target.value)}
                    />
                  </InputWrapper>

                  <InputWrapper icon={GraduationCap} label="Program Studi">
                    <input
                      className={inputClass()}
                      placeholder="Contoh: Teknik Informatika"
                      value={form.prodi}
                      onChange={(e) => setField("prodi", e.target.value)}
                    />
                  </InputWrapper>

                  <InputWrapper icon={Users} label="Kelas">
                    <input
                      className={inputClass()}
                      placeholder="Contoh: TI-3A"
                      value={form.kelas}
                      onChange={(e) => setField("kelas", e.target.value)}
                    />
                  </InputWrapper>

                  <InputWrapper icon={BookMarked} label="Jumlah SKS">
                    <input
                      type="number"
                      className={inputClass()}
                      placeholder="3"
                      value={form.sks}
                      onChange={(e) => setField("sks", e.target.value)}
                      min="1"
                      max="6"
                    />
                  </InputWrapper>

                </div>
              </div>

              {/* SECTION: WAKTU */}
              <div className="mb-8">
                <h2 className="text-base font-bold text-slate-800 mb-1 flex items-center gap-2">
                  <div className="w-1 h-5 bg-emerald-600 rounded-full"></div>
                  Waktu Pelaksanaan
                </h2>
                <p className="text-xs text-slate-500 ml-3 mb-6">Atur hari dan jam pelaksanaan</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  <InputWrapper icon={Calendar} label="Hari">
                    <select
                      className={selectClass()}
                      value={form.day_of_week}
                      onChange={(e) => setField("day_of_week", e.target.value)}
                    >
                      <option value="">Pilih Hari...</option>
                      {days.map((d) => (
                        <option key={d.value} value={d.value}>
                          {d.label}
                        </option>
                      ))}
                    </select>
                  </InputWrapper>

                  <InputWrapper icon={Clock} label="Jam Mulai">
                    <div className={timePickerWrapperClass()}>
                      <TimePicker
                        value={form.start_time}
                        onChange={(value) => setField("start_time", value || "")}
                        disableClock
                        format="HH:mm"
                        clearIcon={null}
                        clockIcon={null}
                        className="w-full h-full"
                      />
                    </div>
                  </InputWrapper>

                  <InputWrapper icon={Clock} label="Jam Selesai">
                    <div className={timePickerWrapperClass()}>
                      <TimePicker
                        value={form.end_time}
                        onChange={(value) => setField("end_time", value || "")}
                        disableClock
                        format="HH:mm"
                        clearIcon={null}
                        clockIcon={null}
                        className="w-full h-full"
                      />
                    </div>
                  </InputWrapper>

                </div>
              </div>

              {/* SECTION: INFO AKADEMIK */}
              <div>
                <h2 className="text-base font-bold text-slate-800 mb-1 flex items-center gap-2">
                  <div className="w-1 h-5 bg-purple-600 rounded-full"></div>
                  Informasi Akademik
                </h2>
                <p className="text-xs text-slate-500 ml-3 mb-6">Detail semester dan jenis kegiatan</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  <InputWrapper icon={School} label="Semester">
                    <input
                      className={inputClass()}
                      placeholder="Contoh: Ganjil / Genap"
                      value={form.semester}
                      onChange={(e) => setField("semester", e.target.value)}
                    />
                  </InputWrapper>

                  <InputWrapper icon={Calendar} label="Tahun Ajaran">
                    <input
                      className={inputClass()}
                      placeholder="Contoh: 2024/2025"
                      value={form.tahun_ajaran}
                      onChange={(e) => setField("tahun_ajaran", e.target.value)}
                    />
                  </InputWrapper>

                  <InputWrapper icon={FileText} label="Jenis Kegiatan">
                    <select
                      className={selectClass()}
                      value={form.jenis_kegiatan}
                      onChange={(e) => setField("jenis_kegiatan", e.target.value)}
                    >
                      <option value="kuliah">Kuliah</option>
                      <option value="praktikum">Praktikum</option>
                      <option value="ujian">Ujian</option>
                      <option value="seminar">Seminar</option>
                    </select>
                  </InputWrapper>

                </div>
              </div>

            </div>

            {/* FOOTER ACTIONS */}
            <div className="bg-slate-50/80 backdrop-blur-sm border-t border-slate-200 px-8 py-6 flex items-center justify-between">
              <button
                type="button"
                onClick={() => navigate("/admin/schedule")}
                className="px-8 py-3 rounded-xl border-2 border-slate-200 text-slate-700 font-semibold 
                          hover:border-slate-300 hover:bg-slate-100 hover:shadow-md 
                          transition-all duration-200 bg-white/50 backdrop-blur-sm"
              >
                <span className="flex items-center gap-2">
                  ← Kembali
                </span>
              </button>
              
              <button
                type="submit"
                disabled={loading}
                className="px-10 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 
                          text-white font-semibold shadow-lg hover:shadow-xl 
                          hover:from-blue-700 hover:to-indigo-700 
                          hover:scale-[1.02] transition-all duration-200 
                          disabled:opacity-50 disabled:cursor-not-allowed 
                          disabled:hover:scale-100 flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <Calendar className="w-4 h-4" />
                    Simpan Jadwal
                  </>
                )}
              </button>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSchedule;