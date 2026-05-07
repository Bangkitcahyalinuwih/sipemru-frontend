import api from "../../../../api/api";

const API_URL = "/buildings";
const USE_API = false;

let dummyBuildings = [
  {
    id: 1,
    name: "Gedung Teknik",
    campus: "Politeknik Negeri Madiun",
    address: "Jl. Serayu No.84",
    description: "Gedung utama jurusan teknik",
    floors: 3,
    is_active: true,
  },
  {
    id: 2,
    name: "Gedung Rektorat",
    campus: "Politeknik Negeri Madiun",
    address: "Jl. Serayu No.84",
    description: "Gedung administrasi kampus",
    floors: 2,
    is_active: true,
  },
  {
    id: 3,
    name: "Gedung Perpustakaan",
    campus: "Politeknik Negeri Madiun",
    address: "Jl. Serayu No.84",
    description: "Pusat literasi mahasiswa",
    floors: 4,
    is_active: false,
  },
];

export const getBuildings = async () => {
  try {
    if (!USE_API) {
      return [...dummyBuildings];
    }

    const res = await api.get(API_URL);

    return res.data;
  } catch (error) {
    console.error("Gagal mengambil data gedung:", error);
    return [];
  }
};

export const getBuildingById = async (id) => {
  try {
    if (!USE_API) {
      return dummyBuildings.find(
        (item) => item.id === Number(id)
      );
    }

    const res = await api.get(
      `${API_URL}/${id}`
    );

    return res.data;
  } catch (error) {
    console.error("Gagal mengambil detail gedung:", error);
    return null;
  }
};

export const createBuilding = async (data) => {
  try {
    if (!USE_API) {
      const newData = {
        id: Date.now(),
        ...data,
      };

      dummyBuildings.push(newData);

      return newData;
    }

    const res = await api.post(
      API_URL,
      data
    );

    return res.data;
  } catch (error) {
    console.error("Gagal menambahkan gedung:", error);
    throw error;
  }
};

export const updateBuilding = async (
  id,
  data
) => {
  try {
    if (!USE_API) {
      dummyBuildings = dummyBuildings.map(
        (item) =>
          item.id === Number(id)
            ? {
                ...item,
                ...data,
              }
            : item
      );

      return true;
    }

    await api.put(
      `${API_URL}/${id}`,
      data
    );

    return true;
  } catch (error) {
    console.error("Gagal update gedung:", error);
    return false;
  }
};

export const deleteBuilding = async (id) => {
  try {
    if (!USE_API) {
      dummyBuildings = dummyBuildings.filter(
        (item) =>
          item.id !== Number(id)
      );

      return true;
    }

    await api.delete(
      `${API_URL}/${id}`
    );

    return true;
  } catch (error) {
    console.error("Gagal hapus gedung:", error);
    return false;
  }
};