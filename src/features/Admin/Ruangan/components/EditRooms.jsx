import React, { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const buildings = [
  { id: 1, name: "Gedung A" },
  { id: 2, name: "Gedung B" },
  { id: 3, name: "Gedung C" },
];

const EditRooms = ({ room }) => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    building_id: "",
    code: "",
    name: "",
    type: "lab",
    capacity: "",
    floor: "",
    approval_type: "manual",
    facilities: "",
    foto: null,
  });

  const [extraDesc, setExtraDesc] = useState("");
  const [previewFoto, setPreviewFoto] = useState(null);

  useEffect(() => {
    if (!room) return;

    let facilitiesData = [];

    try {
      facilitiesData = Array.isArray(room.facilities)
        ? room.facilities
        : JSON.parse(room.facilities || "[]");
    } catch {
      facilitiesData = [];
    }

    setForm({
      building_id: room.building_id || "",
      code: room.code || "",
      name: room.name || "",
      type: room.type || "lab",
      capacity: room.capacity || "",
      floor: room.floor || "",
      approval_type: room.approval_type || "manual",
      facilities: facilitiesData.join(", "),
      foto: null,
    });

    setPreviewFoto(room.foto || null);

    if (room.description) {
      const split = room.description.split(". ");
      setExtraDesc(split.slice(1).join(". "));
    }
  }, [room]);

  const inputClass =
    "w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition";

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.building_id) {
      Swal.fire("Error", "Gedung dan Nama wajib diisi", "error");
      return;
    }

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

    console.log("UPDATE DATA:", [...formData.entries()]);

    Swal.fire({
      icon: "success",
      title: "Berhasil",
      text: "Ruangan berhasil diupdate",
      timer: 1500,
      showConfirmButton: false,
    }).then(() => {
      navigate("/admin/rooms");
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">

      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl overflow-hidden">


        <div className="px-6 py-5 bg-gradient-to-r from-yellow-500 to-orange-500">
          <h2 className="text-white text-lg font-semibold">
            Edit Ruangan
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <select
              value={form.building_id}
              onChange={(e) => setField("building_id", e.target.value)}
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
              className={inputClass}
            >
              <option value="lab">Lab</option>
              <option value="auditorium">Auditorium</option>
              <option value="rkb">RKB</option>
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
              value={form.approval_type}
              disabled
              className="w-full px-4 py-2.5 rounded-xl border bg-gray-100 text-sm"
            />

            <input
              value={form.facilities}
              onChange={(e) => setField("facilities", e.target.value)}
              placeholder="Fasilitas (AC, WiFi)"
              className={inputClass}
            />
          </div>
          <textarea
            value={extraDesc}
            onChange={(e) => setExtraDesc(e.target.value)}
            placeholder="Tambahan deskripsi..."
            className="w-full p-4 rounded-xl border min-h-[120px]"
          />

          <div className="p-4 bg-gray-50 rounded-xl text-sm text-gray-600">
            <strong>Preview:</strong> {finalDescription}
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-600">Foto Ruangan</label>

            <div className="flex items-center gap-4">

              {previewFoto ? (
                <img
                  src={previewFoto}
                  alt="preview"
                  className="w-24 h-24 object-cover rounded-xl border"
                />
              ) : (
                <div className="w-24 h-24 flex items-center justify-center border rounded-xl text-gray-400 text-xs">
                  No Image
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setField("foto", file);

                  if (file) {
                    setPreviewFoto(URL.createObjectURL(file));
                  }
                }}
                className="text-sm"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-yellow-500 text-white font-medium hover:opacity-90 transition"
          >
            Update Ruangan
          </button>

        </form>
      </div>
    </div>
  );
};

export default EditRooms;