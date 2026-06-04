import api, { clearApiCache} from "../../../../api/api";

const USE_API = false;
const API_URL = "/rooms";

let dummyRuangan = [
  {
    id: 1,
    code: "R001",
    name: "Lab Komputer 1",
    type: "lab",
    capacity: 40,
    floor: 1,
    approval_type: "auto",
    description: "Lab untuk praktikum komputer mahasiswa.",
    facilities: ["AC", "Proyektor", "WiFi"],
    foto: "/fotolab.png",
  },
  {
    id: 2,
    code: "R002",
    name: "Aula Utama",
    type: "auditorium",
    capacity: 200,
    floor: 2,
    approval_type: "manual",
    description: "Digunakan untuk seminar dan acara besar.",
    facilities: ["Sound System", "Stage", "AC"],
    foto: "/aulapnm.jpg",
  },
  {
    id: 3,
    code: "R003",
    name: "Ruang Kelas 1",
    type: "kelas",
    capacity: 50,
    floor: 1,
    approval_type: "manual",
    description: "Ruang kelas reguler.",
    facilities: ["Proyektor", "AC"],
    foto: "/ruangkelas.jpg",
  },
  {
    id: 4,
    code: "R004",
    name: "Ruang Rapat 1",
    type: "rapat",
    capacity: 20,
    floor: 1,
    approval_type: "manual",
    description: "Ruang rapat dosen dan staf.",
    facilities: ["TV", "AC"],
    foto: "/meetroom.webp",
  },
];

export const getRuangan = async () => {
  try {
    if (!USE_API) {
      return [...dummyRuangan];
    }

    const res = await api.get(API_URL);
    return res.data.data || [];
  } catch (error) {
    console.error("Gagal ambil data ruangan:", error);
    return [];
  }
};

export const getRuanganById = async (id) => {
  try {
    if (!USE_API) {
      return dummyRuangan.find(
        (item) => item.id === Number(id)
      );
    }

    const res = await api.get(`${API_URL}/${id}`);
    return res.data.room || null;
  } catch (error) {
    console.error("Gagal ambil detail ruangan:", error);
    return null;
  }
};

export const createRuangan = async (formData) => {
  try {
    if (!USE_API) {
      const newData = {
        id: Date.now(),
        code: formData.get("code"),
        name: formData.get("name"),
        type: formData.get("type"),
        capacity: Number(formData.get("capacity")),
        floor: Number(formData.get("floor")),
        approval_type: formData.get("approval_type"),
        description: formData.get("description"),
        facilities: JSON.parse(
          formData.get("facilities") || "[]"
        ),
        foto: formData.get("photo")
          ? URL.createObjectURL(formData.get("photo"))
          : null,
      };

      dummyRuangan.push(newData);
      return newData;
    }

const res = await api.post(
  `/admin${API_URL}`,
  formData,
  {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }
);

clearApiCache();

return res.data.room;
  } catch (error) {
    console.error("Gagal tambah ruangan:", error);
    throw error;
  }
};

export const updateRuangan = async (id, formData) => {
  try {
    if (!USE_API) {
      dummyRuangan = dummyRuangan.map((item) =>
        item.id === Number(id)
          ? {
              ...item,
              code: formData.get("code"),
              name: formData.get("name"),
              type: formData.get("type"),
              capacity: Number(formData.get("capacity")),
              floor: Number(formData.get("floor")),
              approval_type: formData.get("approval_type"),
              description: formData.get("description"),
              facilities: JSON.parse(
                formData.get("facilities") || "[]"
              ),
              foto: formData.get("photo")
                ? URL.createObjectURL(
                    formData.get("photo")
                  )
                : item.foto,
            }
          : item
      );

      return true;
    }

const res = await api.put(
  `/admin${API_URL}/${id}`,
  formData,
  {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }
);

clearApiCache();

return res.data.room;
  } catch (error) {
    console.error("Gagal update ruangan:", error);
    throw error;
  }
};

export const deleteRuangan = async (id) => {
  try {
    if (!USE_API) {
      dummyRuangan = dummyRuangan.filter(
        (item) => item.id !== Number(id)
      );

      return true;
    }
await api.delete(
  `/admin${API_URL}/${id}`
);

clearApiCache();

return true;
  } catch (error) {
    console.error("Gagal hapus ruangan:", error);
    return false;
  }
};

export const deleteFotoRuangan = async (id) => {
  try {
    if (!USE_API) {
      dummyRuangan = dummyRuangan.map((item) =>
        item.id === Number(id)
          ? { ...item, foto: null }
          : item
      );

      return true;
    }

const res = await api.delete(
  `/admin${API_URL}/${id}/photo`
);

clearApiCache();

return res.data;
  } catch (error) {
    console.error("Gagal hapus foto ruangan:", error);
    throw error;
  }
};