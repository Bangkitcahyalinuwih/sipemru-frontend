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

import {
  getBookings,
  deleteBooking,
} from "../service/BookingService";

import { getUsers } from "../../Users/service/UserService";

const TableBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
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
      const userData = await getUsers();

      setBookings(bookingData);
      setUsers(userData);
    } catch (error) {
      console.error(error);

      Swal.fire(
        "Gagal",
        "Gagal mengambil data booking",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const getUserName = (userId) => {
    const user = users.find(
      (item) =>
        Number(item.id) === Number(userId)
    );

    return (
      user?.name || "User tidak ditemukan"
    );
  };

  const filteredBookings = useMemo(() => {
    return bookings.filter((item) => {
      const keyword =
        search.toLowerCase();

      return (
        item.room_name
          ?.toLowerCase()
          .includes(keyword) ||
        item.purpose
          ?.toLowerCase()
          .includes(keyword) ||
        item.organization
          ?.toLowerCase()
          .includes(keyword) ||
        item.pic_name
          ?.toLowerCase()
          .includes(keyword) ||
        getUserName(item.user_id)
          .toLowerCase()
          .includes(keyword)
      );
    });
  }, [bookings, search, users]);

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
      Swal.fire(
        "Berhasil",
        "Booking berhasil dihapus",
        "success"
      );

      fetchData();
    } else {
      Swal.fire(
        "Gagal",
        "Booking gagal dihapus",
        "error"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Data Booking
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Total Booking:{" "}
              {filteredBookings.length}
            </p>
          </div>
          <button
            onClick={() =>
              navigate(
                "/admin/booking/add"
              )
            }
            className="bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 transition shadow-sm"
          >
            + Tambah Booking
          </button>
        </div>
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
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">

              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">
                    No
                  </th>

                  <th className="px-6 py-4 text-left font-semibold">
                    User
                  </th>

                  <th className="px-6 py-4 text-left font-semibold">
                    Ruangan
                  </th>

                  <th className="px-6 py-4 text-left font-semibold">
                    Tujuan
                  </th>

                  <th className="px-6 py-4 text-left font-semibold">
                    Organisasi
                  </th>

                  <th className="px-6 py-4 text-left font-semibold">
                    Peserta
                  </th>

                  <th className="px-6 py-4 text-left font-semibold">
                    PIC
                  </th>

                  <th className="px-6 py-4 text-left font-semibold">
                    Tanggal
                  </th>

                  <th className="px-6 py-4 text-left font-semibold">
                    Jam
                  </th>

                  <th className="px-6 py-4 text-left font-semibold">
                    Status
                  </th>

                  <th className="px-6 py-4 text-center font-semibold">
                    Aksi
                  </th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan="11"
                      className="text-center py-10 text-gray-500"
                    >
                      Loading...
                    </td>
                  </tr>
                ) : filteredBookings.length ===
                  0 ? (
                  <tr>
                    <td
                      colSpan="11"
                      className="text-center py-10 text-gray-500"
                    >
                      Data booking kosong
                    </td>
                  </tr>
                ) : (
                  filteredBookings.map(
                    (item, index) => (
                      <tr
                        key={item.id}
                        className="border-t border-gray-100 hover:bg-gray-50 transition"
                      >
                        <td className="px-6 py-4">
                          {index + 1}
                        </td>

                        {/* USER */}
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-gray-800">
                              {getUserName(
                                item.user_id
                              )}
                            </p>

                            <p className="text-xs text-gray-500">
                              ID:{" "}
                              {item.user_id}
                            </p>
                          </div>
                        </td>

                        {/* ROOM */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                              <Building2
                                size={18}
                                className="text-blue-600"
                              />
                            </div>

                            <div>
                              <p className="font-medium text-gray-800">
                                {
                                  item.room_name
                                }
                              </p>

                              <p className="text-xs text-gray-500 capitalize">
                                {
                                  item.jenis_peminjaman
                                }
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* PURPOSE */}
                        <td className="px-6 py-4 font-medium text-gray-700">
                          {item.purpose}
                        </td>

                        {/* ORGANIZATION */}
                        <td className="px-6 py-4">
                          {
                            item.organization
                          }
                        </td>

                        {/* PARTICIPANTS */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Users
                              size={15}
                              className="text-gray-400"
                            />

                            {
                              item.jumlah_peserta
                            }
                          </div>
                        </td>

                        {/* PIC */}
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium">
                              {
                                item.pic_name
                              }
                            </p>

                            <p className="text-xs text-gray-500">
                              {
                                item.pic_phone
                              }
                            </p>
                          </div>
                        </td>

                        {/* DATE */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <CalendarDays
                              size={15}
                              className="text-gray-400"
                            />

                            {
                              item.booking_date
                            }
                          </div>
                        </td>

                        {/* TIME */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Clock3
                              size={15}
                              className="text-gray-400"
                            />

                            {
                              item.start_time
                            }{" "}
                            -{" "}
                            {
                              item.end_time
                            }
                          </div>
                        </td>

                        {/* STATUS */}
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex px-3 py-1 rounded-full text-xs font-medium capitalize ${
                              item.status ===
                              "approved"
                                ? "bg-green-100 text-green-700"
                                : item.status ===
                                  "pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>

                        {/* ACTION */}
                        <td className="px-6 py-4">
                          <div className="flex justify-center gap-2">

                            <button
                              onClick={() =>
                                navigate(
                                  `/admin/booking/edit/${item.id}`
                                )
                              }
                              className="p-2 rounded-xl hover:bg-blue-100 text-blue-600 transition"
                            >
                              <Pencil
                                size={18}
                              />
                            </button>

                            <button
                              onClick={() =>
                                handleDelete(
                                  item.id
                                )
                              }
                              className="p-2 rounded-xl hover:bg-red-100 text-red-600 transition"
                            >
                              <Trash2
                                size={18}
                              />
                            </button>

                          </div>
                        </td>
                      </tr>
                    )
                  )
                )}
              </tbody>

            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableBooking;