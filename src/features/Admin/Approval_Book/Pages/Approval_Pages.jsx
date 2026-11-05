import { useEffect, useState, useMemo } from "react";
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
    let isActive = true;

    const loadBookings = async () => {
      try {
        const data = await getBookings();
        if (isActive) setBookings(data);
      } catch {
        if (isActive) Swal.fire("Error", "Gagal mengambil data", "error");
      } finally {
        if (isActive) setLoading(false);
      }
    };

    loadBookings();
    return () => {
      isActive = false;
    };
  }, []);

  const pendingBookings = useMemo(() => {
    return bookings.filter((item) => item.status?.toLowerCase() === "pending");
  }, [bookings]);

  const filtered = useMemo(() => {
    return pendingBookings.filter((item) => {
      const keyword = search.trim().toLowerCase();
      const searchableValues = [
        item.id,
        item.room_name,
        item.room?.name,
        item.room?.room_name,
        item.room?.building?.name,
        item.user?.name,
        item.user?.email,
        item.user?.nim,
        item.user?.student_id,
        item.user_name,
        item.user_email,
        item.email,
        item.nim,
        item.pic_name,
        item.pic_phone,
        item.organization,
        item.purpose,
        item.jenis_peminjaman,
        item.jumlah_peserta,
        item.booking_date,
        item.start_time,
        item.end_time,
      ]
        .filter((value) => value !== null && value !== undefined)
        .join(" ")
        .toLowerCase();

      return searchableValues.includes(keyword);
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
        setBookings((currentBookings) =>
          currentBookings.map((booking) =>
            booking.id === id ? { ...booking, status } : booking
          )
        );
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