import api from "../../../../api/api";

const API_URL = "/rooms";
const USE_API = false;

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
    foto: "https://via.placeholder.com/60",
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
    foto: null,
  },
  {
    id: 3,
    code: "R003",
    name: "Ruang Kelas 1",
    type: "classroom",
    capacity: 50,
    floor: 1,
    approval_type: "manual",
    description: "Digunakan untuk seminar dan acara besar.",
    facilities: ["Sound System", "Stage", "AC"],
    foto: null,
  },
  {
    id: 4,
    code: "R004",
    name: "Ruang Rapat 1",
    type: "meeting_room",
    capacity: 20,
    floor: 1,
    approval_type: "manual",
    description: "Digunakan untuk seminar dan acara besar.",
    facilities: ["Sound System", "Stage", "AC"],
    foto: null,
  },
];

export const getRuangan = async () => {
  try {
    if (!USE_API) {
      return [...dummyRuangan];
    }

    const res = await api.get(API_URL);

    return res.data;
  } catch (error) {
    console.error("Gagal ambil data ruangan:", error);
    return [];
  }
};

export const createRuangan = async (formData) => {
  try {
    if (!USE_API) {
      const newData = {
        id: Date.now(),
        building_id: formData.get("building_id"),
        building_name: formData.get("building_name"),
        code: formData.get("code"),
        name: formData.get("name"),
        type: formData.get("type"),
        capacity: formData.get("capacity"),
        floor: formData.get("floor"),
        approval_type: formData.get("approval_type"),
        description: formData.get("description"),
        facilities: JSON.parse(formData.get("facilities")),
        foto: formData.get("foto")
          ? URL.createObjectURL(formData.get("foto"))
          : null,
      };

      dummyRuangan.push(newData);

      return newData;
    }

    const res = await api.post(API_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  } catch (error) {
    console.error("Gagal tambah ruangan:", error);
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

    await api.delete(`${API_URL}/${id}`);

    return true;
  } catch (error) {
    console.error("Gagal hapus ruangan:", error);
    return false;
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

    return res.data;
  } catch (error) {
    console.error("Gagal ambil detail ruangan:", error);
    return null;
  }
};


export const updateRuangan = async (id, formData) => {
  try {
    if (!USE_API) {
      dummyRuangan = dummyRuangan.map((item) =>
        item.id === Number(id)
          ? {
              ...item,
              building_id: formData.get("building_id"),
              building_name: formData.get("building_name"),
              code: formData.get("code"),
              name: formData.get("name"),
              type: formData.get("type"),
              capacity: formData.get("capacity"),
              floor: formData.get("floor"),
              approval_type: formData.get("approval_type"),
              description: formData.get("description"),
              facilities: JSON.parse(
                formData.get("facilities")
              ),
              foto: formData.get("foto")
                ? URL.createObjectURL(formData.get("foto"))
                : item.foto,
            }
          : item
      );

      return true;
    }

    await api.post(
      `${API_URL}/${id}?_method=PUT`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return true;
  } catch (error) {
    console.error("Gagal update ruangan:", error);
    return false;
  }
};