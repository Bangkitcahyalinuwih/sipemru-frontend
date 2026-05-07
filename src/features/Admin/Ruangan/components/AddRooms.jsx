import React, { useMemo, useState } from "react";
import { Upload } from "lucide-react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { createRuangan } from "../service/ruanganService";

const buildings = [
  { id: 1, name: "Gedung A" },
  { id: 2, name: "Gedung B" },
  { id: 3, name: "Gedung C + D" },
];

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
  const [form, setForm] = useState(initialState);
  const [extraDesc, setExtraDesc] = useState("");
  const [preview, setPreview] = useState(null);

  const navigate = useNavigate();

  const inputClass =
    "w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition capitalize";

  const setField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleTypeChange = (value) => {
    setForm((prev) => ({
      ...prev,
      type: value,
      approval_type: value === "lab" ? "manual" : "auto",
    }));
  };

  const facilitiesArray = useMemo(() => {
    return form.facilities
      ? form.facilities.split(",").map((i) => i.trim()).filter(Boolean)
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

  const selectedBuilding = useMemo(() => {
    return buildings.find((b) => b.id === Number(form.building_id));
  }, [form.building_id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setField("foto", file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.building_id) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Gedung dan Nama wajib diisi",
      });
      return;
    }

    try {
      const formData = new FormData();

      formData.append("building_id", form.building_id);
      formData.append("building_name", selectedBuilding?.name || "");
      formData.append("code", form.code);
      formData.append("name", form.name);
      formData.append("type", form.type);
      formData.append("capacity", form.capacity);
      formData.append("floor", form.floor);
      formData.append("approval_type", form.approval_type);
      formData.append("description", finalDescription);
      formData.append("facilities", JSON.stringify(facilitiesArray));

      if (form.foto) formData.append("foto", form.foto);

      await createRuangan(formData);

      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Ruangan berhasil disimpan",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        navigate("/admin/rooms");
      });

      setForm(initialState);
      setExtraDesc("");
      setPreview(null);
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Ruangan gagal disimpan",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="px-6 py-5 bg-gradient-to-r from-blue-600 to-indigo-600">
          <h2 className="text-white text-lg font-semibold capitalize">
            tambah ruangan
          </h2>
          <p className="text-blue-100 text-sm capitalize">
            isi data dengan lengkap
          </p>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-5 capitalize">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <select
              value={form.building_id}
              onChange={(e) => setField("building_id", e.target.value)}
              className={inputClass}
            >
              <option value="">pilih gedung</option>
              {buildings.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>

            <input
              value={form.code}
              onChange={(e) => setField("code", e.target.value)}
              placeholder="kode ruangan"
              className={inputClass}
            />

            <input
              value={form.name}
              onChange={(e) => setField("name", e.target.value)}
              placeholder="nama ruangan"
              className={inputClass}
            />

            <select
              value={form.type}
              onChange={(e) => handleTypeChange(e.target.value)}
              className={inputClass}
            >
              <option value="lab">lab</option>
              <option value="auditorium">auditorium</option>
              <option value="rkb">rkb</option>
            </select>

            <input
              type="number"
              value={form.capacity}
              onChange={(e) => setField("capacity", e.target.value)}
              placeholder="kapasitas"
              className={inputClass}
            />

            <input
              type="number"
              value={form.floor}
              onChange={(e) => setField("floor", e.target.value)}
              placeholder="lantai"
              className={inputClass}
            />

            <input
              value={form.approval_type}
              disabled
              className="w-full px-4 py-2.5 rounded-xl border bg-gray-100 text-sm text-gray-600 capitalize"
            />

            <input
              value={form.facilities}
              onChange={(e) => setField("facilities", e.target.value)}
              placeholder="fasilitas (ac, wifi)"
              className={inputClass}
            />
          </div>

          <textarea
            value={extraDesc}
            onChange={(e) => setExtraDesc(e.target.value)}
            placeholder="Tambahkan deskripsi tambahan (opsional)..."
            className="w-full p-4 rounded-xl border bg-white text-sm min-h-[120px] capitalize"
          />

          <div className="w-full p-4 rounded-xl border bg-gray-50 text-sm text-gray-600 capitalize">
            <strong>preview:</strong> {finalDescription}
          </div>

          <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 bg-gray-50 hover:border-blue-400 transition">
            <input
              id="foto"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />

            <label
              htmlFor="foto"
              className="flex flex-col items-center gap-2 cursor-pointer"
            >
              {preview ? (
                <img
                  src={preview}
                  alt="preview"
                  className="w-40 h-40 object-cover rounded-xl"
                />
              ) : (
                <>
                  <Upload className="w-8 h-8 text-blue-600" />
                  <span className="text-sm font-medium">upload foto</span>
                  <span className="text-xs text-gray-500">png / jpg</span>
                </>
              )}
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium hover:opacity-90 transition capitalize"
          >
            simpan ruangan
          </button>

        </form>
      </div>
    </div>
  );
};

export default AddRooms;