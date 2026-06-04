import React, { useMemo, useState, useEffect } from "react";
import { Upload } from "lucide-react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

import { createRuangan } from "../service/ruanganService";
import { getBuildings } from "../../Building/Service/BuildingService";

const initialState = {
  building_id: "",
  code: "",
  name: "",
  type: "lab",
  capacity: "",
  floor: "",
  approval_type: "manual",
  facilities: "",
  foto: null,
};

const AddRooms = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState(initialState);
  const [extraDesc, setExtraDesc] = useState("");
  const [preview, setPreview] = useState(null);
  const ROOM_TYPES = ["lab", "auditorium", "rkb"];

  const [buildings, setBuildings] = useState([]);
  const [loadingBuildings, setLoadingBuildings] = useState(true);
  const [loading, setLoading] = useState(false);

  const inputClass =
    "w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition";

  const setField = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleTypeChange = (value) => {
    setForm((prev) => ({
      ...prev,
      type: value,
      approval_type: value === "lab" ? "manual" : "auto",
    }));
  };

  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        setLoadingBuildings(true);
        const data = await getBuildings();

        setBuildings(Array.isArray(data) ? data : data?.data || []);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Gagal memuat data gedung",
        });
      } finally {
        setLoadingBuildings(false);
      }
    };

    fetchBuildings();
  }, []);

  // ubah string jadi array
  const facilitiesArray = useMemo(() => {
    return form.facilities
      ? form.facilities
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean)
      : [];
  }, [form.facilities]);

  const autoDescription = useMemo(() => {
    return `${form.name || "Ruangan"} ${form.type} kapasitas ${
      form.capacity || 0
    } orang di lantai ${form.floor || 0} dengan fasilitas ${
      facilitiesArray.length ? facilitiesArray.join(", ") : "-"
    }`;
  }, [form, facilitiesArray]);

  const finalDescription = useMemo(() => {
    return extraDesc ? `${autoDescription}. ${extraDesc}` : autoDescription;
  }, [autoDescription, extraDesc]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setField("foto", file);

    if (preview) URL.revokeObjectURL(preview);

    setPreview(URL.createObjectURL(file));
  };

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.building_id ||
      !form.code ||
      !form.name ||
      !form.capacity ||
      !form.floor
    ) {
      Swal.fire({
        icon: "warning",
        title: "Data belum lengkap",
      });
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("building_id", form.building_id);
      formData.append("code", form.code);
      formData.append("name", form.name);
      formData.append("type", form.type);
      formData.append("capacity", form.capacity);
      formData.append("floor", form.floor);
      formData.append("approval_type", form.approval_type);
      formData.append("description", finalDescription);

      // ✅ FIX: harus array format Laravel
      facilitiesArray.forEach((item) => {
        formData.append("facilities[]", item);
      });

      // ✅ FIX: backend pakai "photo"
      if (form.foto) {
        formData.append("photo", form.foto);
      }

      await createRuangan(formData);

      await Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Ruangan berhasil disimpan",
        timer: 1500,
        showConfirmButton: false,
      });

      setForm(initialState);
      setExtraDesc("");
      setPreview(null);

      navigate("/admin/rooms");
    } catch (error) {
      console.error(error.response?.data);

      let message = "Ruangan gagal disimpan";

      if (error.response?.data?.errors) {
        message = Object.entries(error.response.data.errors)
          .map(([field, errors]) => `${field}: ${errors.join(", ")}`)
          .join("<br>");
      }

      Swal.fire({
        icon: "error",
        title: "Validasi Gagal",
        html: message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-6">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl overflow-hidden">

        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-5">
          <h2 className="text-white text-xl font-semibold">
            Tambah Ruangan
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">

          <div className="grid md:grid-cols-2 gap-4">

            <select
              value={form.building_id}
              onChange={(e) =>
                setField("building_id", e.target.value)
              }
              className={inputClass}
            >
              <option value="">Pilih Gedung</option>
              {buildings.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>

            <input
              value={form.code}
              onChange={(e) => setField("code", e.target.value)}
              placeholder="Kode Ruangan"
              className={inputClass}
            />

            <input
              value={form.name}
              onChange={(e) => setField("name", e.target.value)}
              placeholder="Nama Ruangan"
              className={inputClass}
            />

<select
  value={form.type}
  onChange={(e) => handleTypeChange(e.target.value)}
>
  {ROOM_TYPES.map((t) => (
    <option key={t} value={t}>
      {t.toUpperCase()}
    </option>
  ))}
</select>

            <input
              type="number"
              value={form.capacity}
              onChange={(e) => setField("capacity", e.target.value)}
              placeholder="Kapasitas"
              className={inputClass}
            />

            <input
              type="number"
              value={form.floor}
              onChange={(e) => setField("floor", e.target.value)}
              placeholder="Lantai"
              className={inputClass}
            />

            <input
              disabled
              value={form.approval_type}
              className="w-full px-4 py-2.5 rounded-xl border bg-gray-100"
            />

            <input
              value={form.facilities}
              onChange={(e) => setField("facilities", e.target.value)}
              placeholder="AC, WiFi, Proyektor"
              className={inputClass}
            />
          </div>

          <textarea
            value={extraDesc}
            onChange={(e) => setExtraDesc(e.target.value)}
            placeholder="Deskripsi tambahan"
            className="w-full p-4 border rounded-xl"
          />

          <div className="border rounded-xl p-4 text-sm bg-gray-50">
            <strong>Preview:</strong>
            <div>{finalDescription}</div>
          </div>

          {/* UPLOAD FOTO */}
          <div className="border-2 border-dashed p-6 rounded-xl bg-gray-50">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="foto"
            />

            <label htmlFor="foto" className="cursor-pointer flex flex-col items-center">
              {preview ? (
                <img src={preview} className="w-40 h-40 object-cover rounded-xl" />
              ) : (
                <>
                  <Upload className="w-8 h-8 text-blue-600" />
                  <span>Upload Foto</span>
                </>
              )}
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-white rounded-xl"
          >
            {loading ? "Menyimpan..." : "Simpan Ruangan"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default AddRooms;  