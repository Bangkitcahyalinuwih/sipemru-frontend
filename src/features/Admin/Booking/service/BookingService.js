import api from "../../../../api/api";

const API_URL = "/bookings";

// ======================================
// ADMIN - GET ALL BOOKINGS
// ======================================
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

// ======================================
// USER - GET MY BOOKINGS
// ======================================
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

// ======================================
// USER - CREATE BOOKING
// ======================================
export const createBooking = async (payload) => {
  try {
    const res = await api.post(API_URL, payload);
    return res.data;
  } catch (error) {
  console.log("🔥 FULL ERROR RESPONSE:");
  console.log(error.response?.data);
console.log("🔥 ERRORS DETAIL:", JSON.stringify(error.response?.data?.errors, null, 2));
  console.log("🔥 STATUS:", error.response?.status);
  console.log("🔥 HEADERS:", error.response?.headers);

  throw error;
}
};

// ======================================
// USER - CANCEL BOOKING
// ======================================
export const cancelBooking = async (id) => {
  try {
    await api.delete(`${API_URL}/${id}/cancel`);
    return true;
  } catch (error) {
    console.error("Gagal cancel booking:", error);
    return false;
  }
};

// ======================================
// USER - CHECK AVAILABILITY
// ======================================
export const checkAvailability = async (payload) => {
  try {
    const res = await api.post(`${API_URL}/check-availability`, payload);
    return res.data;
  } catch (error) {
    console.error("Gagal check availability:", error);
    throw error;
  }
};

// ======================================
// QR - VERIFY BOOKING
// ======================================
export const verifyQr = async (token) => {
  try {
    const res = await api.get(`/qr/verify/${token}`);
    return res.data;
  } catch (error) {
    console.error("Gagal verify QR:", error);
    throw error;
  }
};

// ======================================
// ADMIN - APPROVE BOOKING
// ======================================
export const approveBooking = async (id) => {
  try {
    await api.post(`/admin${API_URL}/${id}/approve`);
    return true;
  } catch (error) {
    console.error("Gagal approve booking:", error);
    return false;
  }
};

// ======================================
// ADMIN - REJECT BOOKING
// ======================================
export const rejectBooking = async (id) => {
  try {
    await api.post(`/admin${API_URL}/${id}/reject`);
    return true;
  } catch (error) {
    console.error("Gagal reject booking:", error);
    return false;
  }
};

// ======================================
// ADMIN - DELETE BOOKING
// ======================================
export const deleteBooking = async (id) => {
  try {
    await api.delete(`/admin${API_URL}/${id}`);
    return true;
  } catch (error) {
    console.error("Gagal delete booking:", error);
    return false;
  }
};