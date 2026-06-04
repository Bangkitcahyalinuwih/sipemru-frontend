import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import {
  Search,
  Pencil,
  Trash2,
  CalendarDays,
  Clock3,
  Building2,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { getBookings, deleteBooking } from "../service/BookingService";

const TableBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; 

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const bookingData = await getBookings();
      console.log("API RESULT:", bookingData);
      setBookings(Array.isArray(bookingData) ? bookingData : []);
    } catch (error) {
      console.error(error);
      Swal.fire("Gagal", "Gagal mengambil data booking", "error");
      setBookings([]);
    } finally {
      loading && setLoading(false);
    }
  };

  const safe = (v) => (v || "").toLowerCase();

  const getRoomName = (item) => {
    return item?.room_name || item?.room?.name || item?.room?.room_name || "Ruangan Tidak Diketahui";
  };

  const filteredBookings = useMemo(() => {
    return (bookings || []).filter((item) => {
      const keyword = search.toLowerCase();
      const roomName = getRoomName(item);

      return (
        safe(roomName).includes(keyword) ||
        safe(item.purpose).includes(keyword) ||
        safe(item.organization).includes(keyword) ||
        safe(item.pic_name).includes(keyword) ||
        safe(item.user?.name).includes(keyword) ||
        safe(item.user?.email).includes(keyword)
      );
    });
  }, [bookings, search]);

  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);

  const displayedBookings = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredBookings.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredBookings, currentPage, itemsPerPage]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Hapus booking?",
      text: "Data booking akan dihapus",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus",
      cancelButtonText: "Batal",
    });

    if (!result.isConfirmed) return;

    const success = await deleteBooking(id);

    if (success) {
      Swal.fire("Berhasil", "Booking berhasil dihapus", "success");
      setBookings((prev) => prev.filter((b) => b.id !== id));
      
      const updatedTotalItems = filteredBookings.length - 1;
      const updatedTotalPages = Math.ceil(updatedTotalItems / itemsPerPage);
      if (currentPage > updatedTotalPages && updatedTotalPages > 0) {
        setCurrentPage(updatedTotalPages);
      }
    } else {
      Swal.fire("Gagal", "Booking gagal dihapus", "error");
    }
  };

  const getStatusBadgeClass = (status) => {
    const base = "px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ";
    switch (status?.toLowerCase()) {
      case "approved":
        return base + "bg-green-100 text-green-700";
      case "rejected":
        return base + "bg-red-100 text-red-700";
      case "cancelled":
        return base + "bg-amber-100 text-amber-700";
      default:
        return base + "bg-blue-100 text-blue-700";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* HEADER */}
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Data Booking
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Total Booking: {filteredBookings.length}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border p-5">
          <div className="relative w-full md:w-80">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Cari booking..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">No</th>
                  <th className="px-6 py-4 text-left font-semibold">User</th>
                  <th className="px-6 py-4 text-left font-semibold">Ruangan</th>
                  <th className="px-6 py-4 text-left font-semibold">Tujuan</th>
                  <th className="px-6 py-4 text-left font-semibold">Organisasi</th>
                  <th className="px-6 py-4 text-left font-semibold">Peserta</th>
                  <th className="px-6 py-4 text-left font-semibold">PIC</th>
                  <th className="px-6 py-4 text-left font-semibold">Tanggal</th>
                  <th className="px-6 py-4 text-left font-semibold">Jam</th>
                  <th className="px-6 py-4 text-left font-semibold">Status</th>
                  <th className="px-6 py-4 text-center font-semibold">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="11" className="text-center py-10 text-gray-500 font-medium">
                      Loading...
                    </td>
                  </tr>
                ) : displayedBookings.length === 0 ? (
                  <tr>
                    <td colSpan="11" className="text-center py-10 text-gray-500 font-medium">
                      Data booking kosong
                    </td>
                  </tr>
                ) : (
                  displayedBookings.map((item, index) => (
                    <tr key={item.id} className="border-t hover:bg-gray-50 transition duration-150">
                      <td className="px-6 py-4 font-medium text-gray-600">
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-800">
                            {item.user?.name || "-"}
                          </p>
                          <p className="text-xs text-gray-500">
                            {item.user?.nim || "-"}
                          </p>
                        </div>
                      </td>

                      <td className="px-6 py-4 font-medium text-gray-800">
                        <div className="flex items-center gap-2">
                          <Building2 size={16} className="text-gray-400" />
                          {getRoomName(item)}
                        </div>
                      </td>

                      <td className="px-6 py-4 text-gray-700">{item.purpose}</td>
                      <td className="px-6 py-4 text-gray-700">{item.organization}</td>

                      <td className="px-6 py-4 text-gray-700">
                        <div className="flex items-center gap-1">
                          <Users size={14} className="text-gray-400" />
                          {item.jumlah_peserta ?? item.total_participants ?? 0}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <p className="font-medium text-gray-800">{item.pic_name}</p>
                        <p className="text-xs text-gray-500">{item.pic_phone}</p>
                      </td>

                      <td className="px-6 py-4 text-gray-700">
                        <div className="flex items-center gap-1.5">
                          <CalendarDays size={14} className="text-gray-400" />
                          {item.booking_date}
                        </div>
                      </td>

                      <td className="px-6 py-4 text-gray-700">
                        <div className="flex items-center gap-1.5">
                          <Clock3 size={14} className="text-gray-400" />
                          {item.start_time} - {item.end_time}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className={getStatusBadgeClass(item.status)}>
                          {item.status || "pending"}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center items-center gap-3">
                          <button
                            onClick={() => navigate(`/admin/booking/edit/${item.id}`)}
                            className="text-blue-600 hover:text-blue-800 transition"
                            title="Edit Booking"
                          >
                            <Pencil size={16} />
                          </button>


                          <button
                            onClick={() => handleDelete(item.id)}
                            className="text-red-600 hover:text-red-800 transition"
                            title="Hapus Booking"
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

          {!loading && filteredBookings.length > 0 && (
            <div className="bg-white px-6 py-4 flex items-center justify-between border-t border-gray-200">
              <div className="text-sm text-gray-500">
                Menampilkan{" "}
                <span className="font-medium">
                  {(currentPage - 1) * itemsPerPage + 1}
                </span>{" "}
                sampai{" "}
                <span className="font-medium">
                  {Math.min(currentPage * itemsPerPage, filteredBookings.length)}
                </span>{" "}
                dari <span className="font-medium">{filteredBookings.length}</span> hasil
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-transparent transition"
                >
                  <ChevronLeft size={16} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                      currentPage === page
                        ? "bg-blue-600 text-white"
                        : "border text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-transparent transition"
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

export default TableBooking;