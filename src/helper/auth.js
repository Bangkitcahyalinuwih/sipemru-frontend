export const login = (userData) => {
  const fakeToken = btoa(
    JSON.stringify({
      id: userData.id,
      name: userData.name,
      role: userData.role,
      exp: Date.now() + 24 * 60 * 60 * 1000,
    }),
  );

  localStorage.setItem("token", fakeToken);
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const getCurrentUser = () => {
  try {
    const token = getToken();

    if (!token) {
      return null;
    }

    const decoded = JSON.parse(atob(token));

    // cek expired
    if (decoded.exp < Date.now()) {
      logout();

      return null;
    }

    return decoded;
  } catch (error) {
    logout();

    return null;
  }
};

export const isAuthenticated = () => {
  return !!getCurrentUser();
};

export const isAdmin = () => {
  const user = getCurrentUser();

  return user?.role === "admin";
};

export const isMahasiswa = () => {
  const user = getCurrentUser();

  return user?.role === "mahasiswa";
};