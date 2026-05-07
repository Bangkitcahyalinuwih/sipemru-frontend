import api from "../../../../api/api";

const API_URL = "/users";
const USE_API = false;

let dummyUsers = [
  {
    id: 10,
    name: "Septian Angga",
    email: "septian@gmail.com",
    role: "admin",
    nim: "12345678",
    jurusan: "Informatika",
    phone: "08123456789",
    email_verified_at: "2025-01-01",
  },
  {
    id: 25,
    name: "Budi Santoso",
    email: "budi@gmail.com",
    role: "mahasiswa",
    nim: "87654321",
    jurusan: "Sistem Informasi",
    phone: "08987654321",
    email_verified_at: null,
  },
];

export const getUsers = async () => {
  try {
    if (!USE_API) {
      return [...dummyUsers];
    }
    const res = await api.get(API_URL);

    return res.data;

  } catch (error) {

    console.error(
      "Gagal mengambil user:",
      error
    );

    return [];
  }
};