import React, { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";

import {
  Search,
  CheckCircle,
  XCircle,
  Building2,
  CalendarDays,
  Clock3,
  Users,
} from "lucide-react";
import { getBookings, updateBooking } from "../../../Booking/service/BookingService";



const ApprovalBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getBookings();
      setBookings(data);
    } catch (error) {
      Swal.fire("Gagal", "Gagal mengambil data booking", "error");
    } finally {
      setLoading(false);
    }
  };

  // hanya pending
  const pendingBookings = useMemo(() => {
    return bookings.filter((item) => item.status === "pending");
  }, [bookings]);

  // search filter
  const filteredBookings = useMemo(() => {
    return pendingBookings.filter((item) => {
      const keyword = search.toLowerCase();

      return (
        item.room_name?.toLowerCase().includes(keyword) ||
        item.pic_name?.toLowerCase().includes(keyword) ||
        item.organization?.toLowerCase().includes(keyword) ||
        item.purpose?.toLowerCase().includes(keyword)
      );
    });
  }, [pendingBookings, search]);

  const handleUpdateStatus = async (id, status) => {
    const confirm = await Swal.fire({
      title: status === "approved" ? "Approve booking?" : "Reject booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya",
    });

    if (!confirm.isConfirmed) return;

    try {
      await updateBooking(id, { status });

      Swal.fire("Berhasil", `Booking ${status}`, "success");
      fetchData();
    } catch (error) {
      Swal.fire("Error", "Gagal update status", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Approval Booking
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Total Pending: {filteredBookings.length}
            </p>
          </div>

        </div>

        {/* SEARCH */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-5 border-b border-gray-100">
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
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">

              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Room</th>
                  <th className="px-6 py-4 text-left font-semibold">PIC</th>
                  <th className="px-6 py-4 text-left font-semibold">Organisasi</th>
                  <th className="px-6 py-4 text-left font-semibold">Tanggal</th>
                  <th className="px-6 py-4 text-left font-semibold">Jam</th>
                  <th className="px-6 py-4 text-center font-semibold">Aksi</th>
                </tr>
              </thead>

              <tbody>

                {/* LOADING */}
                {loading ? (
                  <tr>
                    <td colSpan="6" className="text-center py-10 text-gray-500">
                      Loading...
                    </td>
                  </tr>
                ) : filteredBookings.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-10 text-gray-500">
                      Tidak ada booking pending
                    </td>
                  </tr>
                ) : (
                  filteredBookings.map((item) => (
                    <tr
                      key={item.id}
                      className="border-t border-gray-100 hover:bg-gray-50 transition"
                    >

                      {/* ROOM */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">

                          <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                            <Building2 size={18} className="text-blue-600" />
                          </div>

                          <div>
                            <p className="font-medium text-gray-800">
                              {item.room_name}
                            </p>

                            <p className="text-xs text-gray-500">
                              {item.purpose}
                            </p>
                          </div>

                        </div>
                      </td>

                      {/* PIC */}
                      <td className="px-6 py-4">
                        <p className="font-medium">{item.pic_name}</p>
                        <p className="text-xs text-gray-500">{item.pic_phone}</p>
                      </td>

                      {/* ORGANIZATION */}
                      <td className="px-6 py-4">
                        {item.organization}
                      </td>

                      {/* DATE */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <CalendarDays size={15} className="text-gray-400" />
                          {item.booking_date}
                        </div>
                      </td>

                      {/* TIME */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Clock3 size={15} className="text-gray-400" />
                          {item.start_time} - {item.end_time}
                        </div>
                      </td>

                      {/* ACTION */}
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-2">

                          <button
                            onClick={() =>
                              handleUpdateStatus(item.id, "approved")
                            }
                            className="p-2 rounded-xl bg-green-100 text-green-600 hover:bg-green-200 transition"
                          >
                            <CheckCircle size={18} />
                          </button>

                          <button
                            onClick={() =>
                              handleUpdateStatus(item.id, "rejected")
                            }
                            className="p-2 rounded-xl bg-red-100 text-red-600 hover:bg-red-200 transition"
                          >
                            <XCircle size={18} />
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

export default ApprovalBooking;