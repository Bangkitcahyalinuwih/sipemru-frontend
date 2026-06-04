import React, { useEffect, useState, useMemo } from "react";
import Swal from "sweetalert2";

// ✅ UBAH DISINI: Ganti updateBooking menjadi approveBooking dan rejectBooking
import { getBookings, approveBooking, rejectBooking } from "../../Booking/service/BookingService";
import ApprovalHeader from "../components/ApprovalHeader";
import ApprovalSearch from "../components/ApprovalSearch";
import ApprovalTable from "../components/ApprovalTable";

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
    } catch (err) {
      Swal.fire("Error", "Gagal mengambil data", "error");
    } finally {
      setLoading(false);
    }
  };

  const pendingBookings = useMemo(() => {
    return bookings.filter((item) => item.status === "pending");
  }, [bookings]);

  const filtered = useMemo(() => {
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

  // ✅ UBAH DISINI: Sesuaikan fungsi handleUpdateStatus
  const handleUpdateStatus = async (id, status) => {
    const isApprove = status === "approved";
    
    const confirm = await Swal.fire({
      title: isApprove ? "Approve booking?" : "Reject booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya",
    });

    if (!confirm.isConfirmed) return;

    try {
      // Jalankan fungsi service yang sesuai berdasarkan parameter status
      const success = isApprove ? await approveBooking(id) : await rejectBooking(id);

      if (success) {
        Swal.fire("Success", `Booking berhasil di-${status}`, "success");
        fetchData();
      } else {
        Swal.fire("Error", `Gagal melakukan ${status} booking`, "error");
      }
    } catch {
      Swal.fire("Error", "Terjadi kesalahan sistem", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <ApprovalHeader count={filtered.length} />
        <ApprovalSearch search={search} setSearch={setSearch} />
        <ApprovalTable
          loading={loading}
          data={filtered}
          onUpdateStatus={handleUpdateStatus}
        />
      </div>
    </div>
  );
};

export default ApprovalBooking;