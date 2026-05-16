import React, { useEffect, useState, useMemo } from "react";
import Swal from "sweetalert2";

import { getBookings, updateBooking } from "../../Booking/service/BookingService";
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

      Swal.fire("Success", `Booking ${status}`, "success");
      fetchData();
    } catch {
      Swal.fire("Error", "Gagal update status", "error");
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