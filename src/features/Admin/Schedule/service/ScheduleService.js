import api from "../../../../api/api";

const API_URL = "/schedules";
const USE_API = false;

let dummySchedules = [
  {
    id: 1,
    room_id: 1,
    room_name: "Lab Komputer 1",
    course_name: "Pemrograman Web",
    lecturer: "Budi Santoso",
    prodi: "Informatika",
    kelas: "TI-2A",
    sks: 3,
    day_of_week: "monday",
    start_time: "08:00",
    end_time: "10:30",
    semester: "3",
    tahun_ajaran: "2025/2026",
    jenis_kegiatan: "kuliah",
  },
];

export const getSchedules = async () => {
  try {
    if (!USE_API) {
      return [...dummySchedules];
    }

    const res = await api.get(API_URL);

    return res.data;
  } catch (error) {
    console.error("Gagal ambil schedules:", error);

    return [];
  }
};

export const getScheduleById = async (id) => {
  try {
    if (!USE_API) {
      return (
        dummySchedules.find(
          (item) => item.id === Number(id)
        ) || null
      );
    }

    const res = await api.get(`${API_URL}/${id}`);

    return res.data;
  } catch (error) {
    console.error("Gagal ambil detail schedule:", error);

    return null;
  }
};

export const createSchedule = async (data) => {
  try {
    if (!USE_API) {
      const newData = {
        id: Date.now(),
        ...data,
      };

      dummySchedules.push(newData);

      return newData;
    }

    const res = await api.post(API_URL, data);

    return res.data;
  } catch (error) {
    console.error("Gagal tambah schedule:", error);

    throw error;
  }
};

export const updateSchedule = async (id, data) => {
  try {
    if (!USE_API) {
      dummySchedules = dummySchedules.map((item) =>
        item.id === Number(id)
          ? {
              ...item,
              ...data,
            }
          : item
      );

      return true;
    }

    await api.put(`${API_URL}/${id}`, data);

    return true;
  } catch (error) {
    console.error("Gagal update schedule:", error);

    return false;
  }
};

export const deleteSchedule = async (id) => {
  try {
    if (!USE_API) {
      dummySchedules = dummySchedules.filter(
        (item) => item.id !== Number(id)
      );

      return true;
    }

    await api.delete(`${API_URL}/${id}`);

    return true;
  } catch (error) {
    console.error("Gagal hapus schedule:", error);

    return false;
  }
};