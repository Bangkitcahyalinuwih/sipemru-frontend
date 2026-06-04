import { TrendingUp } from "lucide-react";
import api from "../../../../api/api";

// --- BAGIAN YANG DIUBAH (DI-SET TRUE AGAR KONEK BACKEND) ---
const USE_API = true; 
// ---------------------------------------------------------

const AUTH_KEY = "user";
const TOKEN_KEY = "token";

const initialUsers = [
  {
    id: 10,
    name: "Admin",
    email: "admin@gmail.com",
    password: "123456",
    role: "admin",
  },
  {
    id: 1,
    name: "Budi Santoso",
    email: "budi@gmail.com",
    password: "123456",
    role: "mahasiswa",
  },
];

const loadUsers = () => {
  const stored = localStorage.getItem("dummy_users");
  return stored ? JSON.parse(stored) : initialUsers;
};

let dummyUsers = loadUsers();

const saveUsers = () => {
  localStorage.setItem("dummy_users", JSON.stringify(dummyUsers));
};

/* 1. LOGIN USER */
export const loginUser = async (email, password) => {
  if (!USE_API) {
    const user = dummyUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) throw new Error("Email atau password salah");

    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    localStorage.setItem(TOKEN_KEY, "dummy-token");

    return user;
  }

  const res = await api.post("/login", { email, password });

  // PENGAMAN RESPON: Mendukung format langsung (res.data.user) atau dibungkus (res.data.data.user)
  const userData = res.data.user || res.data.data?.user || res.data.data;
  const tokenData = res.data.token || res.data.data?.token;

  if (!userData) {
    throw new Error("Struktur respon login dari server tidak sesuai");
  }

  // Simpan data user dan token asli dari database ke LocalStorage browser
  localStorage.setItem(AUTH_KEY, JSON.stringify(userData));
  if (tokenData) {
    localStorage.setItem(TOKEN_KEY, tokenData);
  }

  return userData;
};

/* 2. REGISTER USER */
export const registerUser = async (data) => {
  if (!USE_API) {
    const newUser = {
      id: Date.now(),
      role: "mahasiswa",
      ...data,
    };

    dummyUsers.push(newUser);
    saveUsers();

    return newUser;
  }

  const res = await api.post("/register", data);
  
  // Mengembalikan data user yang baru didaftarkan
  return res.data.data || res.data;
};

/* 3. LOGOUT USER */
export const logoutUser = () => {
  localStorage.removeItem(AUTH_KEY);
  localStorage.removeItem(TOKEN_KEY);
};

/* 4. AMBIIL DATA USER YANG SEDANG LOGIN (DI LOCALSTORAGE) */
export const getCurrentUser = () => {
  const user = localStorage.getItem(AUTH_KEY);
  return user ? JSON.parse(user) : null;
};