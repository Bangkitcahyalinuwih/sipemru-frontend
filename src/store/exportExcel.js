import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

import { getRuangan } from "../features/Admin/Ruangan/service/ruanganService";
import { getBuildings } from "../features/Admin/Building/Service/BuildingService";
import { getSchedules } from "../features/Admin/Schedule/service/ScheduleService";



export const exportDashboardExcel = async ({
  analytics,
  bookings,
}) => {
  try {
    const [users, rooms, buildings, schedules] =
      await Promise.all([
        getUsers(),
        getRuangan(),
        getBuildings(),
        getSchedules(),
      ]);

    const wb = XLSX.utils.book_new();

    /* =====================================
       SHEET 1 - EXECUTIVE SUMMARY
    ===================================== */

    const summary = [
      ["LAPORAN PEMINJAMAN RUANGAN"],
      [""],
      [
        "Tanggal Export",
        new Date().toLocaleString("id-ID"),
      ],
      [""],
      ["Total Booking", analytics.total],
      ["Approved", analytics.approved],
      ["Pending", analytics.pending],
      ["Ongoing", analytics.ongoing],
      ["Rejected", analytics.rejected],
      ["Total User", users.length],
      ["Total Ruangan", rooms.length],
      ["Total Gedung", buildings.length],
      ["Total Jadwal", schedules.length],
      ["Approval Rate", `${analytics.approvalRate}%`],
    ];

    const wsSummary =
      XLSX.utils.aoa_to_sheet(summary);

    wsSummary["!cols"] = [
      { wch: 30 },
      { wch: 20 },
    ];

    XLSX.utils.book_append_sheet(
      wb,
      wsSummary,
      "Executive Summary"
    );

    /* =====================================
       SHEET 2 - DETAIL BOOKING
    ===================================== */

    const bookingSheet = bookings.map(
      (booking, index) => {
        const user = users.find(
          (u) =>
            Number(u.id) ===
            Number(booking.user_id)
        );

        const room = rooms.find(
          (r) =>
            Number(r.id) ===
            Number(booking.room_id)
        );

        return {
          No: index + 1,
          Booking_ID: booking.id,

          Nama_Peminjam:
            user?.name || "-",

          Email:
            user?.email || "-",

          NIM:
            user?.nim || "-",

          Jurusan:
            user?.jurusan || "-",

          Telepon:
            user?.phone || "-",

          Ruangan:
            room?.name ||
            booking.room_name ||
            "-",

          Kode_Ruangan:
            room?.code || "-",

          Kapasitas:
            room?.capacity || "-",

          Organisasi:
            booking.organization,

          PIC:
            booking.pic_name,

          PIC_Phone:
            booking.pic_phone,

          Keperluan:
            booking.purpose,

          Jenis:
            booking.jenis_peminjaman,

          Peserta:
            booking.jumlah_peserta,

          Tanggal:
            booking.booking_date,

          Mulai:
            booking.start_time,

          Selesai:
            booking.end_time,

          Status:
            booking.status,
        };
      }
    );

    const wsBooking =
      XLSX.utils.json_to_sheet(
        bookingSheet
      );

    wsBooking["!cols"] = [
      { wch: 8 },
      { wch: 15 },
      { wch: 25 },
      { wch: 25 },
      { wch: 15 },
      { wch: 20 },
      { wch: 15 },
      { wch: 15 },
      { wch: 12 },
      { wch: 25 },
      { wch: 20 },
      { wch: 18 },
      { wch: 40 },
      { wch: 15 },
      { wch: 12 },
      { wch: 15 },
      { wch: 12 },
      { wch: 12 },
      { wch: 15 },
    ];

    XLSX.utils.book_append_sheet(
      wb,
      wsBooking,
      "Detail Booking"
    );

    /* =====================================
       SHEET 3 - DATA USER
    ===================================== */

    const userSheet = users.map(
      (user, index) => ({
        No: index + 1,
        ID: user.id,
        Nama: user.name,
        Email: user.email,
        Role: user.role,
        NIM: user.nim,
        Jurusan: user.jurusan,
        Phone: user.phone,
        Verified:
          user.email_verified_at
            ? "Ya"
            : "Belum",
      })
    );

    XLSX.utils.book_append_sheet(
      wb,
      XLSX.utils.json_to_sheet(
        userSheet
      ),
      "Users"
    );

    /* =====================================
       SHEET 4 - DATA RUANGAN
    ===================================== */

    const roomSheet = rooms.map(
      (room, index) => ({
        No: index + 1,
        ID: room.id,
        Kode: room.code,
        Nama: room.name,
        Tipe: room.type,
        Kapasitas: room.capacity,
        Lantai: room.floor,
        Approval:
          room.approval_type,
        Deskripsi:
          room.description,
      })
    );

    XLSX.utils.book_append_sheet(
      wb,
      XLSX.utils.json_to_sheet(
        roomSheet
      ),
      "Rooms"
    );

    /* =====================================
       SHEET 5 - DATA GEDUNG
    ===================================== */

    const buildingSheet =
      buildings.map(
        (building, index) => ({
          No: index + 1,
          ID: building.id,
          Nama: building.name,
          Kampus:
            building.campus,
          Alamat:
            building.address,
          Lantai:
            building.floors,
          Status:
            building.is_active
              ? "Aktif"
              : "Tidak Aktif",
          Deskripsi:
            building.description,
        })
      );

    XLSX.utils.book_append_sheet(
      wb,
      XLSX.utils.json_to_sheet(
        buildingSheet
      ),
      "Buildings"
    );

    /* =====================================
       SHEET 6 - JADWAL
    ===================================== */

    const scheduleSheet =
      schedules.map(
        (schedule, index) => ({
          No: index + 1,
          Ruangan:
            schedule.room_name,
          Mata_Kuliah:
            schedule.course_name,
          Dosen:
            schedule.lecturer,
          Prodi:
            schedule.prodi,
          Kelas:
            schedule.kelas,
          SKS:
            schedule.sks,
          Hari:
            schedule.day_of_week,
          Mulai:
            schedule.start_time,
          Selesai:
            schedule.end_time,
          Semester:
            schedule.semester,
          Tahun_Ajaran:
            schedule.tahun_ajaran,
          Jenis:
            schedule.jenis_kegiatan,
        })
      );

    XLSX.utils.book_append_sheet(
      wb,
      XLSX.utils.json_to_sheet(
        scheduleSheet
      ),
      "Schedules"
    );

    /* =====================================
       SHEET 7 - STATISTIK RUANGAN
    ===================================== */

    const roomStats = rooms.map(
      (room) => ({
        Ruangan: room.name,
        Total_Booking:
          bookings.filter(
            (b) =>
              Number(
                b.room_id
              ) ===
              Number(room.id)
          ).length,
      })
    );

    XLSX.utils.book_append_sheet(
      wb,
      XLSX.utils.json_to_sheet(
        roomStats
      ),
      "Room Statistics"
    );

    /* =====================================
       SHEET 8 - STATISTIK USER
    ===================================== */

    const userStats = users.map(
      (user) => ({
        Nama: user.name,
        Total_Peminjaman:
          bookings.filter(
            (b) =>
              Number(
                b.user_id
              ) ===
              Number(user.id)
          ).length,
      })
    );

    XLSX.utils.book_append_sheet(
      wb,
      XLSX.utils.json_to_sheet(
        userStats
      ),
      "User Statistics"
    );

    /* =====================================
       SHEET 9 - TOP ORGANISASI
    ===================================== */

    const orgSheet =
      analytics.topOrgs.map(
        ([org, total]) => ({
          Organisasi: org,
          Total_Booking: total,
        })
      );

    XLSX.utils.book_append_sheet(
      wb,
      XLSX.utils.json_to_sheet(
        orgSheet
      ),
      "Organizations"
    );

    /* =====================================
       SHEET 10 - TREND BOOKING
    ===================================== */

    const trendSheet =
      XLSX.utils.json_to_sheet(
        analytics.trendData
      );

    XLSX.utils.book_append_sheet(
      wb,
      trendSheet,
      "Booking Trend"
    );

    /* =====================================
       EXPORT FILE
    ===================================== */

    const excelBuffer = XLSX.write(
      wb,
      {
        bookType: "xlsx",
        type: "array",
      }
    );

    const file = new Blob(
      [excelBuffer],
      {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      }
    );

    saveAs(
      file,
      `Laporan_Peminjaman_Ruangan_${
        new Date()
          .toISOString()
          .split("T")[0]
      }.xlsx`
    );
  } catch (error) {
    console.error(
      "Gagal export excel:",
      error
    );
  }
};