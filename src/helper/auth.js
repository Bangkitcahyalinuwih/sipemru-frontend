import { jwtDecode } from "jwt-decode";

export const getToken = () => {
  return localStorage.getItem("token");
};

export const getCurrentUser = () => {
  try {
    const token = getToken();
    if (token) {
      return jwtDecode(token);
    }
    const user =
      localStorage.getItem("user");

    return user
      ? JSON.parse(user)
      : null;
  } catch (error) {
    console.error(error);

    return null;
  }
};