import axios from "axios";

// ======================
// CONFIG
// ======================
const API_URL = "http://localhost:8000/api/rooms";
const USE_API = false; // ubah ke true kalau backend sudah siap

// ======================
// DUMMY DATA
// ======================
const dummyRuangan = [
  {
    id: 1,
    code: "R001",
    name: "Lab Komputer 1",
    type: "lab",
    capacity: 40,
    floor: 1,
    approval_type: "auto",
    description: "Lab untuk praktikum komputer mahasiswa.",
    facilities: ["AC", "Proyektor", "WiFi"],
    foto: "https://via.placeholder.com/60",
  },
  {
    id: 2,
    code: "R002",
    name: "Aula Utama",
    type: "auditorium",
    capacity: 200,
    floor: 2,
    approval_type: "manual",
    description: "Digunakan untuk seminar dan acara besar.",
    facilities: ["Sound System", "Stage", "AC"],
    foto: null,
  },
];

// ======================
// SERVICE FUNCTION
// ======================
export const getRuangan = async () => {
  try {
    // MODE DUMMY
    if (!USE_API) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(dummyRuangan);
        }, 500);
      });
    }

    // MODE API
    const res = await axios.get(API_URL);
    return res.data;

  } catch (error) {
    console.error("Gagal ambil data ruangan:", error);
    return [];
  }
};