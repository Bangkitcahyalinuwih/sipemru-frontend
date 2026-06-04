import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import {
  Pencil,
  Trash2,
  Search,
  Building2,
  CheckCircle,
  XCircle,
} from "lucide-react";

import { getRuangan, deleteRuangan } from "../service/ruanganService";

const TableRuangan = () => {
  const [ruangan, setRuangan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchRuangan();
  }, []);

  const fetchRuangan = async () => {
    setLoading(true);

    const data = await getRuangan();
    setRuangan(Array.isArray(data) ? data : []);

    setLoading(false);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Hapus data?",
      text: "Data ruangan akan dihapus",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteRuangan(id);
        fetchRuangan();

        Swal.fire("Berhasil", "Data berhasil dihapus", "success");
      }
    });
  };

  const filteredRuangan = useMemo(() => {
    return ruangan.filter((item) => {
      const name = item.name?.toLowerCase() || "";
      const code = item.code?.toLowerCase() || "";
      const keyword = search.toLowerCase();

      return name.includes(keyword) || code.includes(keyword);
    });
  }, [ruangan, search]);

  // 🔥 FIX FOTO LARAVEL STORAGE
  const getImage = (item) => {
    if (item.photo_url) return item.photo_url;

    if (item.foto) {
      return `${import.meta.env.VITE_API_URL}/storage/${item.foto}`;
    }

    return null;
  };

  // 🔥 FIX FACILITIES
  const formatFacilities = (facilities) => {
    if (!facilities) return "-";

    if (Array.isArray(facilities)) {
      return facilities.join(", ");
    }

    return facilities;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Data Ruangan
            </h1>
            <p className="text-sm text-gray-500">
              Total: {filteredRuangan.length}
            </p>
          </div>

          <button
            onClick={() => navigate("/admin/rooms/add")}
            className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
          >
            + Tambah
          </button>
        </div>

        {/* SEARCH */}
        <div className="bg-white p-4 rounded-xl border">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari ruangan..."
              className="w-full pl-10 pr-4 py-2 border rounded-xl"
            />
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-xl border overflow-x-auto">
          <table className="w-full text-sm">

            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-left">No</th>
                <th className="p-4 text-left">Ruangan</th>
                <th className="p-4 text-left">Tipe</th>
                <th className="p-4 text-left">Kapasitas</th>
                <th className="p-4 text-left">Lantai</th>
                <th className="p-4 text-left">Fasilitas</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-center">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" className="text-center p-10">
                    Loading...
                  </td>
                </tr>
              ) : filteredRuangan.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center p-10">
                    Data kosong
                  </td>
                </tr>
              ) : (
                filteredRuangan.map((item, index) => (
                  <tr key={item.id} className="border-t">

                    <td className="p-4">{index + 1}</td>

                    {/* RUANG + FOTO */}
                    <td className="p-4 flex items-center gap-3">
                      {getImage(item) ? (
                        <img
                          src={getImage(item)}
                          className="w-11 h-11 rounded-xl object-cover"
                        />
                      ) : (
                        <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center">
                          <Building2 size={18} />
                        </div>
                      )}

                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-xs text-gray-500">{item.code}</p>
                      </div>
                    </td>

                    <td className="p-4 capitalize">{item.type}</td>

                    <td className="p-4">{item.capacity} Orang</td>

                    <td className="p-4">Lantai {item.floor}</td>

                    <td className="p-4">
                      {formatFacilities(item.facilities)}
                    </td>

                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs flex items-center gap-1 ${
                          item.is_active
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {item.is_active ? (
                          <CheckCircle size={14} />
                        ) : (
                          <XCircle size={14} />
                        )}

                        {item.is_active ? "Aktif" : "Nonaktif"}
                      </span>
                    </td>

                    <td className="p-4">
                      <div className="flex justify-center gap-2">

                        <button
                          onClick={() =>
                            navigate(`/admin/rooms/edit/${item.id}`)
                          }
                          className="p-2 text-blue-600 hover:bg-blue-100 rounded-xl"
                        >
                          <Pencil size={18} />
                        </button>

                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-xl"
                        >
                          <Trash2 size={18} />
                        </button>

                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>

          </table>
        </div>

      </div>
    </div>
  );
};

export default TableRuangan;