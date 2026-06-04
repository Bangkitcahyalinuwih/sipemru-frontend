import api from "../../../../api/api";

const API_URL = "/schedules";

// Semua fungsi langsung memanggil API tanpa fallback ke dummy

export const getSchedules = async () => {
  try {
    const res = await api.get(API_URL);
    return res.data.data || res.data || [];
  } catch (error) {
    console.error("Gagal ambil schedules:", error);
    return [];
  }
};

export const getSchedulesByRoomId = async (roomId) => {
  try {
    const res = await api.get(`${API_URL}/by-room/${roomId}`);
    
    console.log("=== BY ROOM RESPONSE ===", JSON.stringify(res.data, null, 2));
    
    return (
      res.data.schedules ||
      res.data.schedule  ||
      res.data.data      ||
      (Array.isArray(res.data) ? res.data : [])
    );
  } catch (error) {
    console.error("Gagal ambil schedules room:", error.response?.data || error);
    return [];
  }
};

export const getScheduleById = async (id) => {
  try {
    const res = await api.get(`${API_URL}/${id}`);
    return res.data;
  } catch (error) {
    console.error("Gagal ambil detail schedule:", error);
    return null;
  }
};

export const createSchedule = async (data) => {
  try {
    const res = await api.post(`/admin${API_URL}`, data);
    return res.data.schedule;
  } catch (error) {
    console.error("Gagal tambah schedule:", error);
    throw error;
  }
};

export const updateSchedule = async (id, data) => {
  try {
    const res = await api.put(`/admin${API_URL}/${id}`, data);
    return res.data.schedule;
  } catch (error) {
    console.error("Gagal update schedule:", error);
    throw error;
  }
};

export const deleteSchedule = async (id) => {
  try {
    await api.delete(`/admin${API_URL}/${id}`);
    return true;
  } catch (error) {
    console.error("Gagal hapus schedule:", error);
    return false;
  }
};