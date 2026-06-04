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
  } from "lucide-react";

  import { getBookings, deleteBooking } from "../service/BookingService";

  const TableBooking = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
      fetchData();
    }, []);

    const fetchData = async () => {
      try {
        setLoading(true);

        const bookingData = await getBookings();

        console.log("API RESULT:", bookingData); // 🔥 DEBUG

        setBookings(Array.isArray(bookingData) ? bookingData : []);
      } catch (error) {
        console.error(error);
        Swal.fire("Gagal", "Gagal mengambil data booking", "error");
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };

    const safe = (v) => (v || "").toLowerCase();

    const filteredBookings = useMemo(() => {
      return (bookings || []).filter((item) => {
        const keyword = search.toLowerCase();

        return (
          safe(item.room_name).includes(keyword) ||
          safe(item.purpose).includes(keyword) ||
          safe(item.organization).includes(keyword) ||
          safe(item.pic_name).includes(keyword) ||
          safe(item.user?.name).includes(keyword) ||
          safe(item.user?.email).includes(keyword)
        );
      });
    }, [bookings, search]);

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

        // 🔥 optimasi tanpa fetch ulang
        setBookings((prev) => prev.filter((b) => b.id !== id));
      } else {
        Swal.fire("Gagal", "Booking gagal dihapus", "error");
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

          {/* SEARCH */}
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
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm"
              />
            </div>
          </div>

          {/* TABLE */}
          <div className="bg-white rounded-2xl shadow-sm border overflow-x-auto">
            <table className="w-full text-sm">

              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="px-6 py-4 text-left">No</th>
                  <th className="px-6 py-4 text-left">User</th>
                  <th className="px-6 py-4 text-left">Ruangan</th>
                  <th className="px-6 py-4 text-left">Tujuan</th>
                  <th className="px-6 py-4 text-left">Organisasi</th>
                  <th className="px-6 py-4 text-left">Peserta</th>
                  <th className="px-6 py-4 text-left">PIC</th>
                  <th className="px-6 py-4 text-left">Tanggal</th>
                  <th className="px-6 py-4 text-left">Jam</th>
                  <th className="px-6 py-4 text-left">Status</th>
                  <th className="px-6 py-4 text-center">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="11" className="text-center py-10">
                      Loading...
                    </td>
                  </tr>
                ) : filteredBookings.length === 0 ? (
                  <tr>
                    <td colSpan="11" className="text-center py-10">
                      Data booking kosong
                    </td>
                  </tr>
                ) : (
                  filteredBookings.map((item, index) => (
                    <tr key={item.id} className="border-t hover:bg-gray-50">

                      <td className="px-6 py-4">{index + 1}</td>

                      {/* USER */}
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium">
                            {item.user?.name || "-"}
                          </p>
                          <p className="text-xs text-gray-500">
                            {item.user?.nim || "-"}
                          </p>
                        </div>
                      </td>

                      <td className="px-6 py-4 flex items-center gap-2">
                        <Building2 size={16} />
                        {item.room_name}
                      </td>

                      <td className="px-6 py-4">{item.purpose}</td>
                      <td className="px-6 py-4">{item.organization}</td>

                      <td className="px-6 py-4">
                        <Users size={14} className="inline mr-1" />
                        {item.jumlah_peserta}
                      </td>

                      <td className="px-6 py-4">
                        <p>{item.pic_name}</p>
                        <p className="text-xs text-gray-500">
                          {item.pic_phone}
                        </p>
                      </td>

                      <td className="px-6 py-4">
                        <CalendarDays size={14} className="inline mr-1" />
                        {item.booking_date}
                      </td>

                      <td className="px-6 py-4">
                        <Clock3 size={14} className="inline mr-1" />
                        {item.start_time} - {item.end_time}
                      </td>

                      <td className="px-6 py-4">
                        <span className="px-2 py-1 rounded-full text-xs bg-gray-100">
                          {item.status}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() =>
                            navigate(`/admin/booking/edit/${item.id}`)
                          }
                          className="mr-2 text-blue-600"
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-red-600"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>

                    </tr>
                  ))
                )}
              </tbody>

            </table>
          </div>
        </div>
      </div>
    );
  };

  export default TableBooking;