import api from "../../../../api/api";

const USE_API = false;

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

/* LOGIN */
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

  localStorage.setItem(AUTH_KEY, JSON.stringify(res.data.user));
  localStorage.setItem(TOKEN_KEY, res.data.token);

  return res.data.user;
};

/* REGISTER */
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
  return res.data;
};

/* LOGOUT */
export const logoutUser = () => {
  localStorage.removeItem(AUTH_KEY);
  localStorage.removeItem(TOKEN_KEY);
};

/* ME */
export const getCurrentUser = () => {
  const user = localStorage.getItem(AUTH_KEY);
  return user ? JSON.parse(user) : null;
};