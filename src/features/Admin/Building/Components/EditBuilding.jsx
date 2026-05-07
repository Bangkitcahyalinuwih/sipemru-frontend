import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { getBuildingById, updateBuilding } from "../Service/BuildingService";
import {
  Building2,
  MapPin,
  Home,
  Layers,
  FileText,
  CheckCircle,
} from "lucide-react";

const initialState = {
  name: "",
  campus: "",
  address: "",
  floors: "",
  description: "",
  is_active: 1,
};

const EditBuilding = () => {
  const [form, setForm] = useState(initialState);
  const navigate = useNavigate();
  const { id } = useParams();

  const inputClass =
    "w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition bg-white";

  const setField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const data = await getBuildingById(id);
        setForm(data);
      } catch (error) {
        console.error(error);
        Swal.fire("Error", "Gagal mengambil data gedung", "error");
      }
    };

    fetchDetail();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.campus) {
      return Swal.fire("Error", "Nama & Kampus wajib diisi", "error");
    }

    try {
      await updateBuilding(id, form);

      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Gedung berhasil diupdate",
        timer: 1200,
        showConfirmButton: false,
      });

      navigate("/admin/building");
    } catch (error) {
      console.error(error);
      Swal.fire("Gagal", "Data tidak berhasil diupdate", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl overflow-hidden border">
        <div className="px-6 py-6 bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
          <div className="flex items-center gap-3">
            <Building2 />
            <div>
              <h1 className="text-lg font-semibold">Edit Gedung</h1>
              <p className="text-sm text-yellow-100">
                Perbarui data gedung
              </p>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Home className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                className={inputClass}
                placeholder="Nama Gedung"
                value={form.name}
                onChange={(e) => setField("name", e.target.value)}
              />
            </div>

            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                className={inputClass}
                placeholder="Kampus"
                value={form.campus}
                onChange={(e) => setField("campus", e.target.value)}
              />
            </div>

            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                className={inputClass}
                placeholder="Alamat"
                value={form.address}
                onChange={(e) => setField("address", e.target.value)}
              />
            </div>

            <div className="relative">
              <Layers className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="number"
                className={inputClass}
                placeholder="Total Lantai"
                value={form.floors}
                onChange={(e) => setField("floors", e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between md:col-span-2 p-3 border rounded-xl">

              <div className="flex items-center gap-2">
                <CheckCircle size={18} className="text-gray-500" />
                <span className="text-sm font-medium text-gray-700">
                  Status Gedung
                </span>
              </div>

              <button
                type="button"
                onClick={() =>
                  setField("is_active", form.is_active ? 0 : 1)
                }
                className={`w-14 h-7 flex items-center rounded-full p-1 transition ${
                  form.is_active ? "bg-green-500" : "bg-red-400"
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow-md transition ${
                    form.is_active ? "translate-x-7" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

          </div>

          <div className="relative">
            <FileText className="absolute left-3 top-3 text-gray-400" size={18} />
            <textarea
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition bg-white min-h-[120px]"
              placeholder="Deskripsi"
              value={form.description}
              onChange={(e) => setField("description", e.target.value)}
            />
          </div>

          <button type="submit" className="w-full py-3 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-medium hover:opacity-90 transition" >
            Update Gedung
          </button>

        </form>
      </div>
    </div>
  );
};

export default EditBuilding;