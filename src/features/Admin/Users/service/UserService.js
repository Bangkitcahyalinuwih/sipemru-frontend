import api from "../../../../api/api";

const API_URL = "/users";
const USE_API = false;

const STORAGE_KEY = "dummy_users";
const AUTH_KEY = "user";

/* ================= DUMMY DATA ================= */

const initialUsers = [
  {
    id: 10,
    name: "Septian Angga",
    email: "septian@gmail.com",
    password: "123456",
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
    password: "123456",
    role: "mahasiswa",
    nim: "87654321",
    jurusan: "Sistem Informasi",
    phone: "08987654321",
    email_verified_at: null,
  },
];

/* ================= LOAD LOCAL STORAGE ================= */

const loadUsers = () => {
  const stored =
    localStorage.getItem(STORAGE_KEY);

  return stored
    ? JSON.parse(stored)
    : initialUsers;
};

let dummyUsers = loadUsers();

const saveUsers = () => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(dummyUsers)
  );
};

/* ================= GET ALL USERS ================= */

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

/* ================= GET USER BY ID ================= */

export const getUserById = async (id) => {
  try {
    if (!USE_API) {
      return (
        dummyUsers.find(
          (item) =>
            Number(item.id) === Number(id)
        ) || null
      );
    }

    const res = await api.get(
      `${API_URL}/${id}`
    );

    return res.data;
  } catch (error) {
    console.error(
      "Gagal mengambil detail user:",
      error
    );

    return null;
  }
};

/* ================= LOGIN ================= */

export const loginUser = async (
  email,
  password
) => {
  try {
    if (!USE_API) {
      const user = dummyUsers.find(
        (item) =>
          item.email === email &&
          item.password === password
      );

      if (!user) {
        throw new Error(
          "Email atau password salah"
        );
      }

      localStorage.setItem(
        AUTH_KEY,
        JSON.stringify(user)
      );

      return user;
    }

    const res = await api.post(
      "/login",
      {
        email,
        password,
      }
    );

    localStorage.setItem(
      AUTH_KEY,
      JSON.stringify(res.data.user)
    );

    return res.data.user;
  } catch (error) {
    console.error("Login gagal:", error);

    throw error;
  }
};

/* ================= CURRENT USER ================= */

export const getCurrentUser = () => {
  const user =
    localStorage.getItem(AUTH_KEY);

  return user ? JSON.parse(user) : null;
};

/* ================= LOGOUT ================= */

export const logoutUser = () => {
  localStorage.removeItem(AUTH_KEY);
};

/* ================= CREATE USER ================= */

export const createUser = async (
  data
) => {
  try {
    if (!USE_API) {
      const newUser = {
        id: Date.now(),
        ...data,
      };

      dummyUsers.push(newUser);

      saveUsers();

      return newUser;
    }

    const res = await api.post(
      API_URL,
      data
    );

    return res.data;
  } catch (error) {
    console.error(
      "Gagal membuat user:",
      error
    );

    throw error;
  }
};