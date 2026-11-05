import Swal from "sweetalert2";
import api from "../../../../api/api";

const API_URL = "/bookings";

const REQUIRED_FIELDS = {
  room_id: "Ruangan",
  purpose: "Keperluan",
  organization: "Nama organisasi",
  booking_date: "Tanggal",
  start_time: "Jam mulai",
  end_time: "Jam selesai",
  jumlah_peserta: "Jumlah peserta",
  pic_name: "Nama PIC",
  pic_phone: "No HP",
  jenis_peminjaman: "Jenis peminjaman",
};

const swalBase = {
  background: "#0f172a",
  color: "#fff",
  confirmButtonColor: "#ef4444",
};

const showWarning = (title, html) =>
  Swal.fire({ ...swalBase, icon: "warning", title, html });

const listHtml = (items) =>
  `<ul style="text-align:left;padding-left:1.2rem;list-style:disc">${items
    .map((m) => `<li>${m}</li>`)
    .join("")}</ul>`;

/* HELPER: ubah error axios jadi pesan */
const getErrorMessage = (error) => {
  const status = error.response?.status;
  const data = error.response?.data;

  if (!error.response) {
    return {
      title: "Koneksi Gagal",
      html: "Tidak dapat terhubung ke server. Periksa koneksi atau pastikan backend berjalan.",
    };
  }

  if (status === 422) {
    const errors = data?.errors ? Object.values(data.errors).flat() : [];
    return {
      title: "Data Belum Lengkap",
      html: errors.length
        ? listHtml(errors)
        : data?.message || "Data yang dikirim tidak valid.",
    };
  }

  if (status === 401)
    return { title: "Sesi Berakhir", html: "Silakan login kembali." };
  if (status === 403)
    return {
      title: "Akses Ditolak",
      html: data?.message || "Anda tidak memiliki akses untuk aksi ini.",
    };
  if (status === 404)
    return {
      title: "Tidak Ditemukan",
      html: data?.message || "Data booking tidak ditemukan.",
    };
  if (status === 409)
    return {
      title: "Jadwal Bentrok",
      html: data?.message || "Ruangan sudah dibooking pada waktu tersebut.",
    };
  if (status >= 500)
    return {
      title: "Kesalahan Server",
      html: `Terjadi kesalahan pada server (${status}). Hubungi administrator.`,
    };

  return {
    title: "Terjadi Kesalahan",
    html: data?.message || `Permintaan gagal (${status}).`,
  };
};

/* Status 409 dilewati: ditangani ConflictOverlay di form */
const alertApiError = (error, fallbackTitle) => {
  if (error.response?.status === 409) return Promise.resolve();
  const { title, html } = getErrorMessage(error);
  return showWarning(title || fallbackTitle, html);
};

/* Data kalender untuk semua role (tanpa data sensitif) */
export const getCalendarBookings = async (params = {}) => {
  try {
    const res = await api.get(`${API_URL}/calendar`, {
      params,
      skipCache: true,
    });
    const data = res.data;

    if (Array.isArray(data)) return data;
    return data?.data ?? data?.bookings ?? [];
  } catch (error) {
    console.error("Gagal ambil data kalender:", error);
    return [];
  }
};

export const checkAvailabilitySilent = async (payload) => {
  try {
    const res = await api.post(`${API_URL}/check-availability`, payload, {
      skipCache: true,
    });
    const d = res.data;
    const available =
      d?.available ?? d?.is_available ?? d?.data?.available ?? true;

    return { available: Boolean(available), message: d?.message || "" };
  } catch (error) {
    if (error.response?.status === 409) {
      return {
        available: false,
        message: error.response.data?.message || "Jadwal bentrok",
      };
    }
    console.error("Gagal cek ketersediaan:", error);
    return null;
  }
};

/* HELPER: validasi kelengkapan sebelum request dikirim */
const validateRequired = (payload) => {
  const missing = Object.entries(REQUIRED_FIELDS)
    .filter(([key]) => {
      const v = payload?.[key];
      return v === undefined || v === null || String(v).trim() === "";
    })
    .map(([, label]) => label);

  if (missing.length) {
    showWarning(
      "Data Belum Lengkap",
      `Mohon lengkapi:${listHtml(missing)}`
    );
    return false;
  }
  return true;
};

export const getBookings = async () => {
  try {
    const res = await api.get(`/admin${API_URL}`);
    const data = res.data;

    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.data)) return data.data;
    if (Array.isArray(data?.bookings)) return data.bookings;

    return [];
  } catch (error) {
    console.error("Gagal ambil bookings:", error);
    return [];
  }
};

export const getMyBookings = async () => {
  try {
    const res = await api.get(`${API_URL}/my`);
    const data = res.data;

    return data?.bookings ?? data?.data ?? [];
  } catch (error) {
    console.error("Gagal ambil my bookings:", error);
    return [];
  }
};

export const createBooking = async (payload) => {
  if (!validateRequired(payload)) {
    const err = new Error("Validasi form gagal");
    err.alerted = true;
    throw err;
  }

  try {
    const res = await api.post(API_URL, payload);
    return res.data;
  } catch (error) {
    console.error("Gagal membuat booking:", error.response?.data || error);
    await alertApiError(error, "Booking Gagal");
    error.alerted = true;
    throw error;
  }
};

export const cancelBooking = async (id) => {
  try {
    await api.delete(`${API_URL}/${id}/cancel`);
    return true;
  } catch (error) {
    console.error("Gagal cancel booking:", error);
    await alertApiError(error, "Gagal Membatalkan Booking");
    return false;
  }
};

export const checkAvailability = async (payload) => {
  try {
    const res = await api.post(`${API_URL}/check-availability`, payload);
    return res.data;
  } catch (error) {
    console.error("Gagal check availability:", error);
    await alertApiError(error, "Gagal Cek Ketersediaan");
    error.alerted = true;
    throw error;
  }
};

export const verifyQr = async (token) => {
  try {
    const res = await api.get(`/qr/verify/${token}`);
    return res.data;
  } catch (error) {
    console.error("Gagal verify QR:", error);
    await alertApiError(error, "QR Tidak Valid");
    error.alerted = true;
    throw error;
  }
};

export const approveBooking = async (id) => {
  try {
    await api.post(`/admin${API_URL}/${id}/approve`);
    return true;
  } catch (error) {
    console.error("Gagal approve booking:", error);
    await alertApiError(error, "Gagal Menyetujui Booking");
    return false;
  }
};

export const rejectBooking = async (id) => {
  try {
    await api.post(`/admin${API_URL}/${id}/reject`);
    return true;
  } catch (error) {
    console.error("Gagal reject booking:", error);
    await alertApiError(error, "Gagal Menolak Booking");
    return false;
  }
};

export const deleteBooking = async (id) => {
  try {
    await api.delete(`/admin${API_URL}/${id}`);
    return true;
  } catch (error) {
    console.error("Gagal delete booking:", error);
    await alertApiError(error, "Gagal Menghapus Booking");
    return false;
  }
};