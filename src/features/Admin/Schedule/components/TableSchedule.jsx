import React, { useEffect, useMemo, useState } from "react";
import { Search, Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import Swal from "sweetalert2";
import { getSchedules, deleteSchedule } from "../service/ScheduleService";
import { getRuangan } from "../../Ruangan/service/RuanganService";
import { useNavigate } from "react-router-dom";

const TablesSchedule = () => {
  const [schedules, setSchedules] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const navigate = useNavigate();

  useEffect(() => {
    fetchSchedules();
    fetchRooms();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const fetchSchedules = async () => {
    try {
      setLoading(true);
      const data = await getSchedules();
      setSchedules(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetch schedules:", error);
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Tidak bisa mengambil data schedule",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchRooms = async () => {
    try {
      const data = await getRuangan();
      setRooms(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetch rooms:", error);
    }
  };

  const getRoomName = (roomId) => {
    const room = rooms.find((item) => item.id === Number(roomId));
    return room?.name || "-";
  };

  const filtered = useMemo(() => {
    return schedules.filter((item) => {
      const keyword = search.toLowerCase();
      return (
        item.course_name?.toLowerCase().includes(keyword) ||
        item.lecturer?.toLowerCase().includes(keyword) ||
        item.prodi?.toLowerCase().includes(keyword) ||
        getRoomName(item.room_id)?.toLowerCase().includes(keyword)
      );
    });
  }, [schedules, rooms, search]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const displayedSchedules = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filtered.slice(startIndex, startIndex + itemsPerPage);
  }, [filtered, currentPage, itemsPerPage]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Hapus Schedule?",
      text: "Data yang dihapus tidak bisa dikembalikan",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Hapus",
      cancelButtonText: "Batal",
      confirmButtonColor: "#dc2626",
    });

    if (!result.isConfirmed) return;

    const success = await deleteSchedule(id);

    if (success) {
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Schedule berhasil dihapus",
      });

      setSchedules((prev) => {
        const updated = prev.filter((item) => item.id !== id);
        const nextTotalPages = Math.ceil((filtered.length - 1) / itemsPerPage);
        if (currentPage > nextTotalPages && nextTotalPages > 0) {
          setCurrentPage(nextTotalPages);
        }
        return updated;
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Tidak bisa menghapus data",
      });
    }
  };

  const formatDay = (day) => {
    const map = {
      monday: "Senin",
      tuesday: "Selasa",
      wednesday: "Rabu",
      thursday: "Kamis",
      friday: "Jumat",
      saturday: "Sabtu",
      sunday: "Minggu",
    };
    return map[day?.toLowerCase()] || day;
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              Data Schedule
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Total Jadwal Tersedia: <span className="font-semibold text-gray-700">{filtered.length}</span>
            </p>
          </div>

          <button
            onClick={() => navigate("/admin/schedule/add")}
            className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition duration-200 shadow-sm hover:shadow active:scale-[0.98]"
          >
            + Tambah Schedule
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-5 border-b border-gray-100 bg-white">
            <div className="relative w-full md:w-80">
              <Search
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari ruang, matkul, dosen..."
                className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition duration-150 placeholder:text-gray-400"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-50/70 border-b border-gray-100 text-gray-600 font-semibold">
                  <th className="px-5 py-4 text-left w-12">No</th>
                  <th className="px-5 py-4 text-left min-w-[140px]">Ruangan</th>
                  <th className="px-5 py-4 text-left min-w-[180px]">Mata Kuliah</th>
                  <th className="px-5 py-4 text-left min-w-[160px]">Dosen</th>
                  <th className="px-5 py-4 text-left">Prodi</th>
                  <th className="px-4 py-4 text-center">Kelas</th>
                  <th className="px-4 py-4 text-center">SKS</th>
                  <th className="px-5 py-4 text-left">Hari</th>
                  <th className="px-5 py-4 text-left min-w-[150px]">Jam</th>
                  <th className="px-5 py-4 text-center">Smstr</th>
                  <th className="px-5 py-4 text-left">Jenis</th>
                  <th className="px-5 py-4 text-center sticky right-0 bg-gray-50">Aksi</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100 text-gray-700">
                {loading ? (
                  <tr>
                    <td colSpan="12" className="text-center py-12 text-gray-400 font-medium bg-white">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        <span>Memuat data jadwal...</span>
                      </div>
                    </td>
                  </tr>
                ) : displayedSchedules.length === 0 ? (
                  <tr>
                    <td colSpan="12" className="text-center py-12 text-gray-400 font-medium bg-white">
                      Data schedule tidak ditemukan
                    </td>
                  </tr>
                ) : (
                  displayedSchedules.map((item, index) => (
                    <tr
                      key={item.id}
                      className="hover:bg-gray-50/60 transition duration-150"
                    >
                      <td className="px-5 py-4 font-medium text-gray-400">
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </td>

                      <td className="px-5 py-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                          {getRoomName(item.room_id)}
                        </span>
                      </td>

                      <td className="px-5 py-4 font-semibold text-gray-900">
                        {item.course_name || "-"}
                      </td>

                      <td className="px-5 py-4 text-gray-600 text-xs font-medium leading-relaxed">
                        {item.lecturer || "-"}
                      </td>

                      <td className="px-5 py-4 text-gray-600 whitespace-nowrap">
                        {item.prodi || "-"}
                      </td>

                      <td className="px-4 py-4 text-center font-medium text-gray-800">
                        {item.kelas || "-"}
                      </td>

                      <td className="px-4 py-4 text-center">
                        <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-600 font-mono">
                          {item.sks || "0"}
                        </span>
                      </td>

                      <td className="px-5 py-4 font-medium text-gray-800">
                        {formatDay(item.day_of_week)}
                      </td>

                      <td className="px-5 py-4 font-mono text-xs text-gray-600 whitespace-nowrap">
                        {item.start_time?.slice(0, 5)} - {item.end_time?.slice(0, 5)}
                      </td>

                      <td className="px-5 py-4 text-center font-medium text-gray-700">
                        {item.semester || "-"}
                      </td>

                      <td className="px-5 py-4">
                        <span className={`inline-block px-2 py-0.5 text-[11px] font-medium rounded-full capitalize ${
                          item.jenis_kegiatan === 'praktikum' 
                            ? 'bg-purple-50 text-purple-700 border border-purple-100' 
                            : 'bg-amber-50 text-amber-700 border border-amber-100'
                        }`}>
                          {item.jenis_kegiatan || "Teori"}
                        </span>
                      </td>

                      <td className="px-5 py-4 sticky right-0 bg-white/95 backdrop-blur-sm shadow-[-10px_0_15px_-3px_rgba(0,0,0,0.03)]">
                        <div className="flex justify-center items-center gap-1.5">
                          <button
                            onClick={() => navigate(`/admin/schedule/edit/${item.id}`)}
                            className="p-1.5 rounded-lg text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition duration-150"
                            title="Edit"
                          >
                            <Pencil size={15} />
                          </button>

                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-1.5 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 transition duration-150"
                            title="Hapus"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {!loading && filtered.length > 0 && (
            <div className="bg-white px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-100">
              <div className="text-xs sm:text-sm text-gray-500">
                Menampilkan{" "}
                <span className="font-semibold text-gray-800">
                  {(currentPage - 1) * itemsPerPage + 1}
                </span>{" "}
                sampai{" "}
                <span className="font-semibold text-gray-800">
                  {Math.min(currentPage * itemsPerPage, filtered.length)}
                </span>{" "}
                dari <span className="font-semibold text-gray-800">{filtered.length}</span> data
              </div>
              
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-transparent transition duration-150"
                >
                  <ChevronLeft size={16} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`min-w-[36px] h-9 px-2 rounded-xl text-xs font-semibold transition duration-150 ${
                      currentPage === page
                        ? "bg-blue-600 text-white shadow-sm"
                        : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-transparent transition duration-150"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TablesSchedule;