import api from "../../../../api/api";

const USE_API = true;

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

/* HELPER: tentukan field mana yang salah dari respon backend */
const detectLoginField = (data) => {
  const payloads = [data, data?.data, data?.error];

  for (const payload of payloads) {
    if (payload?.errors?.email) return "email";
    if (payload?.errors?.password) return "password";
    if (payload?.field === "email" || payload?.field === "password") {
      return payload.field;
    }
  }

  const msg = payloads
    .map((payload) => payload?.message)
    .filter((message) => typeof message === "string")
    .join(" ")
    .toLowerCase();
  if (
    (msg.includes("email") ||
      msg.includes("akun") ||
      msg.includes("account") ||
      msg.includes("user")) &&
    (msg.includes("tidak ditemukan") ||
      msg.includes("tidak terdaftar") ||
      msg.includes("not found") ||
      msg.includes("not registered"))
  ) {
    return "email";
  }
  if (
    msg.includes("password") ||
    msg.includes("kata sandi") ||
    msg.includes("wrong password") ||
    msg.includes("incorrect password")
  ) {
    return "password";
  }
  return null;
};

const getLoginFieldMessage = (data, field) => {
  const payloads = [data, data?.data, data?.error];
  for (const payload of payloads) {
    const value = payload?.errors?.[field];
    if (typeof value === "string") return value;
    if (Array.isArray(value) && typeof value[0] === "string") return value[0];
    if (typeof value?.message === "string") return value.message;
  }
  return null;
};

/* HELPER: terjemahkan error axios menjadi pesan yang spesifik */
const parseApiError = (err, { isLogin = false } = {}) => {
  let message;
  let field = null;
  const status = err.response?.status;
  const data = err.response?.data;

  if (!err.response) {
    if (err.code === "ECONNABORTED" || err.code === "ETIMEDOUT") {
      message = "Server terlalu lama merespon (timeout). Coba lagi.";
    } else if (err.code === "ERR_NETWORK") {
      message =
        "Tidak dapat terhubung ke server. Periksa koneksi internet atau pastikan backend sudah berjalan.";
    } else {
      message = err.message || "Terjadi kesalahan jaringan";
    }
  } else if (isLogin && (status === 400 || status === 401 || status === 422)) {
    field = detectLoginField(data);

    if (field === "email") {
      message =
        status === 422
          ? getLoginFieldMessage(data, "email") || "Format email tidak valid"
          : "Email tidak terdaftar";
    } else if (field === "password") {
      message =
        status === 422
          ? getLoginFieldMessage(data, "password") || "Password tidak valid"
          : "Password salah";
    } else {
      message = "Email atau password salah";
    }
  } else if (status === 401 || status === 400) {
    message = data?.message || "Permintaan tidak valid";
  } else if (status === 403) {
    message = data?.message || "Akun Anda tidak memiliki akses";
  } else if (status === 404) {
    message = "Endpoint tidak ditemukan (404). Periksa baseURL dan route API.";
  } else if (status === 419) {
    message = "Sesi kedaluwarsa (419). Muat ulang halaman lalu coba lagi.";
  } else if (status === 422) {
    const firstError = data?.errors
      ? Object.values(data.errors).flat()[0]
      : null;
    message = firstError || data?.message || "Data yang dikirim tidak valid";
  } else if (status === 429) {
    message = "Terlalu banyak percobaan. Tunggu beberapa saat lalu coba lagi.";
  } else if (status >= 500) {
    message = `Terjadi kesalahan pada server (${status}). Hubungi administrator.`;
  } else {
    message = data?.message || `Terjadi kesalahan (${status})`;
  }

  const error = new Error(message);
  error.status = status;
  error.field = field; // "email" | "password" | null
  return error;
};

/* 1. LOGIN USER */
export const loginUser = async (email, password) => {
  if (!USE_API) {
    const user = dummyUsers.find((u) => u.email === email);

    if (!user) {
      const error = new Error("Email tidak terdaftar");
      error.status = 401;
      error.field = "email";
      throw error;
    }

    if (user.password !== password) {
      const error = new Error("Password salah");
      error.status = 401;
      error.field = "password";
      throw error;
    }

    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    localStorage.setItem(TOKEN_KEY, "dummy-token");

    return user;
  }

  let res;
  try {
    res = await api.post("/login", { email, password });
  } catch (err) {
    throw parseApiError(err, { isLogin: true });
  }

  const userData = res.data.user || res.data.data?.user || res.data.data;
  const tokenData = res.data.token || res.data.data?.token;

  if (!userData) {
    throw new Error("Struktur respon login dari server tidak sesuai");
  }

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

  try {
    const res = await api.post("/register", data);
    return res.data.data || res.data;
  } catch (err) {
    throw parseApiError(err);
  }
};

/* 3. LOGOUT USER */
export const logoutUser = () => {
  localStorage.removeItem(AUTH_KEY);
  localStorage.removeItem(TOKEN_KEY);
};

/* 4. AMBIL DATA USER YANG SEDANG LOGIN */
export const getCurrentUser = () => {
  const user = localStorage.getItem(AUTH_KEY);
  return user ? JSON.parse(user) : null;
};