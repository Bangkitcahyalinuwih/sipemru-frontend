import api from "../../../api/api";

const USE_API = false;

export const getUser = async () => {
  try {
    if (!USE_API) {
      return {
        id: 1,
        name: "Septian Angga",
        email: "septian@gmail.com",
        role: "Admin",
      };
    }
    const res = await api.get("/me");
    return res.data;
  } catch (error) {

    console.error(
      "Gagal mengambil user:",
      error
    );

    return null;
  }
};