import React, { useEffect, useMemo, useState } from "react";
import { Search, Pencil, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import {
  getSchedules,
  deleteSchedule,
} from "../service/ScheduleService";

import { getRuangan } from "../../Ruangan/service/RuanganService";

import { useNavigate } from "react-router-dom";

const TablesSchedule = () => {
  const [schedules, setSchedules] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchSchedules();
    fetchRooms();
  }, []);

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
    const room = rooms.find(
      (item) => item.id === Number(roomId)
    );

    return room?.name || "-";
  };

  const filtered = useMemo(() => {
    return schedules.filter((item) => {
      const keyword = search.toLowerCase();

      return (
        item.course_name?.toLowerCase().includes(keyword) ||
        item.lecturer?.toLowerCase().includes(keyword) ||
        item.prodi?.toLowerCase().includes(keyword) ||
        getRoomName(item.room_id)
          ?.toLowerCase()
          .includes(keyword)
      );
    });
  }, [schedules, rooms, search]);

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

      fetchSchedules();
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

    return map[day] || day;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Data Schedule
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Total Schedule: {filtered.length}
            </p>
          </div>

          <button
            onClick={() => navigate("/admin/schedule/add")}
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl transition shadow-sm"
          >
            + Tambah Schedule
          </button>
        </div>

        {/* CARD */}
        <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
          {/* SEARCH */}
          <div className="p-4 border-b">
            <div className="relative w-full md:w-80">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari schedule..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="p-4 text-left">No</th>
                  <th className="p-4 text-left">Ruangan</th>
                  <th className="p-4 text-left">Mata Kuliah</th>
                  <th className="p-4 text-left">Dosen</th>
                  <th className="p-4 text-left">Prodi</th>
                  <th className="p-4 text-left">Kelas</th>
                  <th className="p-4 text-left">SKS</th>
                  <th className="p-4 text-left">Hari</th>
                  <th className="p-4 text-left">Jam</th>
                  <th className="p-4 text-left">Semester</th>
                  <th className="p-4 text-left">Jenis</th>
                  <th className="p-4 text-center">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan="12"
                      className="text-center py-10 text-gray-500"
                    >
                      Loading...
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td
                      colSpan="12"
                      className="text-center py-10 text-gray-500"
                    >
                      Data schedule kosong
                    </td>
                  </tr>
                ) : (
                  filtered.map((item, index) => (
                    <tr
                      key={item.id}
                      className="border-t hover:bg-gray-50 transition"
                    >
                      <td className="p-4 font-medium">
                        {index + 1}
                      </td>

                      {/* ROOM NAME */}
                      <td className="p-4 font-semibold text-blue-600">
                        {getRoomName(item.room_id)}
                      </td>

                      <td className="p-4 font-medium">
                        {item.course_name || "-"}
                      </td>

                      <td className="p-4">
                        {item.lecturer || "-"}
                      </td>

                      <td className="p-4">
                        {item.prodi || "-"}
                      </td>

                      <td className="p-4">
                        {item.kelas || "-"}
                      </td>

                      <td className="p-4">
                        {item.sks || "-"}
                      </td>

                      <td className="p-4">
                        {formatDay(item.day_of_week)}
                      </td>

                      <td className="p-4 whitespace-nowrap">
                        {item.start_time} - {item.end_time}
                      </td>

                      <td className="p-4">
                        {item.semester || "-"}
                      </td>

                      <td className="p-4 capitalize">
                        {item.jenis_kegiatan || "-"}
                      </td>

                      <td className="p-4">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() =>
                              navigate(
                                `/admin/schedule/edit/${item.id}`
                              )
                            }
                            className="p-2 rounded-xl hover:bg-blue-100 text-blue-600 transition"
                          >
                            <Pencil size={16} />
                          </button>

                          <button
                            onClick={() =>
                              handleDelete(item.id)
                            }
                            className="p-2 rounded-xl hover:bg-red-100 text-red-600 transition"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TablesSchedule;