import api from "../../../../api/api";

const API_URL = "/bookings";

const USE_API = false;

const STORAGE_KEY = "dummy_bookings";

const initialDummyBookings = [
  {
    id: 1,
    user_id: 1,
    room_id: 1,
    room_name: "Lab Komputer 1",
    purpose: "Praktikum Pemrograman Web",
    organization: "Teknik Informatika",
    jumlah_peserta: 35,
    jenis_peminjaman: "internal",
    pic_name: "Septian",
    pic_phone: "081234567890",
    booking_date: "2026-05-10",
    start_time: "08:00",
    end_time: "10:00",
    status: "approved",
  },

  {
    id: 2,
    user_id: 2,
    room_id: 2,
    room_name: "Aula Utama",
    purpose: "Seminar Teknologi AI",
    organization: "BEM Kampus",
    jumlah_peserta: 150,
    jenis_peminjaman: "external",
    pic_name: "Angga",
    pic_phone: "089876543210",
    booking_date: "2026-05-12",
    start_time: "13:00",
    end_time: "16:00",
    status: "pending",
  },
];

const loadBookings = () => {
  const stored = localStorage.getItem(
    STORAGE_KEY
  );

  return stored
    ? JSON.parse(stored)
    : initialDummyBookings;
};

let dummyBookings = loadBookings();

const saveBookings = () => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(dummyBookings)
  );
};

export const getBookings = async () => {
  try {
    if (!USE_API) {
      await new Promise((resolve) =>
        setTimeout(resolve, 500)
      );

      return [...dummyBookings];
    }

    const res = await api.get(API_URL);

    return res.data;
  } catch (error) {
    console.error(
      "Gagal ambil bookings:",
      error
    );

    return [];
  }
};

export const getBookingById = async (id) => {
  try {
    if (!USE_API) {
      return (
        dummyBookings.find(
          (item) =>
            item.id === Number(id)
        ) || null
      );
    }

    const res = await api.get(
      `${API_URL}/${id}`
    );

    return res.data;
  } catch (error) {
    console.error(
      "Gagal ambil booking:",
      error
    );

    return null;
  }
};

export const createBooking = async (
  data
) => {
  try {
    if (!USE_API) {
      const newData = {
        id: Date.now(),
        status: "pending",
        created_at:
          new Date().toISOString(),
        ...data,
      };

      dummyBookings.unshift(newData);

      saveBookings();

      return newData;
    }

    const res = await api.post(
      API_URL,
      data
    );

    return res.data;
  } catch (error) {
    console.error(
      "Gagal tambah booking:",
      error
    );

    throw error;
  }
};

export const updateBooking = async (
  id,
  data
) => {
  try {
    if (!USE_API) {
      dummyBookings =
        dummyBookings.map((item) =>
          item.id === Number(id)
            ? {
                ...item,
                ...data,
              }
            : item
        );

      saveBookings();

      return true;
    }

    await api.put(
      `${API_URL}/${id}`,
      data
    );

    return true;
  } catch (error) {
    console.error(
      "Gagal update booking:",
      error
    );

    return false;
  }
};

export const deleteBooking = async (
  id
) => {
  try {
    if (!USE_API) {
      dummyBookings =
        dummyBookings.filter(
          (item) =>
            item.id !== Number(id)
        );

      saveBookings();

      return true;
    }

    await api.delete(
      `${API_URL}/${id}`
    );

    return true;
  } catch (error) {
    console.error(
      "Gagal hapus booking:",
      error
    );

    return false;
  }
};


export const cancelBooking = async (
  id
) => {
  try {
    if (!USE_API) {
      dummyBookings =
        dummyBookings.map((item) =>
          item.id === Number(id)
            ? {
                ...item,
                status: "cancelled",
              }
            : item
        );

      saveBookings();

      return true;
    }

    await api.patch(
      `${API_URL}/${id}/cancel`
    );

    return true;
  } catch (error) {
    console.error(
      "Gagal cancel booking:",
      error
    );

    return false;
  }
};