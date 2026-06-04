import api from "../../../../api/api";

const API_URL = "/buildings";
const USE_API = true; // Set true untuk mengambil data asli dari database backend Laragon/Ngrok

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

// 1. AMBIL SEMUA DATA GEDUNG
export const getBuildings = async () => {
  try {
    if (!USE_API) {
      return [...dummyBuildings];
    }

    const res = await api.get(API_URL);

    // FIX: Mengambil array dari res.data.data jika dibungkus Laravel, atau res.data jika array mentah
    return res.data.data || res.data;
  } catch (error) {
    console.error("Gagal mengambil data gedung:", error);
    return []; // Mengembalikan array kosong agar filter tidak crash jika API error
  }
};

// 2. AMBIL DETAIL SATU GEDUNG BY ID
export const getBuildingById = async (id) => {
  try {
    if (!USE_API) {
      return dummyBuildings.find(
        (item) => item.id === Number(id)
      );
    }

    const res = await api.get(`${API_URL}/${id}`);

    // FIX: Menyesuaikan data tunggal hasil dari backend
    return res.data.data || res.data;
  } catch (error) {
    console.error("Gagal mengambil detail gedung:", error);
    return null;
  }
};

// 3. TAMBAH DATA GEDUNG BARU
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

    // Mengirim ke endpoint POST /api/admin/buildings
    const res = await api.post(`/admin${API_URL}`, data);

    return res.data.data || res.data;
  } catch (error) {
    console.error("Gagal menambahkan gedung:", error);
    throw error;
  }
};

// 4. UPDATE DATA GEDUNG BY ID
export const updateBuilding = async (id, data) => {
  try {
    if (!USE_API) {
      dummyBuildings = dummyBuildings.map((item) =>
        item.id === Number(id) ? { ...item, ...data } : item
      );
      return true;
    }

    // Mengirim ke endpoint PUT /api/admin/buildings/{id}
    await api.put(`/admin${API_URL}/${id}`, data);

    return true;
  } catch (error) {
    console.error("Gagal update gedung:", error);
    return false;
  }
};

// 5. HAPUS DATA GEDUNG BY ID
export const deleteBuilding = async (id) => {
  try {
    if (!USE_API) {
      dummyBuildings = dummyBuildings.filter(
        (item) => item.id !== Number(id)
      );
      return true;
    }

    // Mengirim ke endpoint DELETE /api/admin/buildings/{id}
    await api.delete(`/admin${API_URL}/${id}`);

    return true;
  } catch (error) {
    console.error("Gagal hapus gedung:", error);
    return false;
  }
};