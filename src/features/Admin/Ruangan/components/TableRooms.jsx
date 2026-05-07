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

    setRuangan(data);

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
    return ruangan.filter(
      (item) =>
        item.name?.toLowerCase().includes(search.toLowerCase()) ||
        item.code?.toLowerCase().includes(search.toLowerCase()),
    );
  }, [ruangan, search]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Data Ruangan</h1>

          <p className="text-sm text-gray-500 mt-1">
            Total Ruangan: {filteredRuangan.length}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-5 border-b border-gray-100">
            <div className="relative w-full md:w-80">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />

              <input
                type="text"
                placeholder="Cari Ruangan..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">No</th>
                  <th className="px-6 py-4 text-left font-semibold">Ruangan</th>
                  <th className="px-6 py-4 text-left font-semibold">Tipe</th>
                  <th className="px-6 py-4 text-left font-semibold">
                    Kapasitas
                  </th>
                  <th className="px-6 py-4 text-left font-semibold">Lantai</th>
                  <th className="px-6 py-4 text-left font-semibold">
                    Fasilitas
                  </th>
                  <th className="px-6 py-4 text-left font-semibold">Status</th>
                  <th className="px-6 py-4 text-center font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="8" className="py-10 text-center text-gray-500">
                      Loading...
                    </td>
                  </tr>
                ) : filteredRuangan.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="py-10 text-center text-gray-500">
                      Data ruangan kosong
                    </td>
                  </tr>
                ) : (
                  filteredRuangan.map((item, index) => (
                    <tr
                      key={item.id}
                      className="border-t border-gray-100 hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-4 text-gray-600">{index + 1}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {item.foto ? (
                            <img
                              src={item.foto}
                              alt={item.name}
                              className="w-11 h-11 rounded-xl object-cover"
                            />
                          ) : (
                            <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center">
                              <Building2 size={18} className="text-blue-600" />
                            </div>
                          )}
                          <div>
                            <p className="font-medium text-gray-800">
                              {item.name}
                            </p>
                            <p className="text-xs text-gray-500">{item.code}</p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 capitalize">
                          {item.type}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-gray-600">
                        {item.capacity || "-"} Orang
                      </td>

                      <td className="px-6 py-4 text-gray-600">
                        Lantai {item.floor}
                      </td>

                      <td className="px-6 py-4 text-gray-600 max-w-xs">
                        <div className="truncate">
                          {item.facilities?.join(", ") || "-"}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
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

                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() =>
                              navigate(`/admin/rooms/edit/${item.id}`)
                            }
                            className="p-2 rounded-xl hover:bg-blue-100 text-blue-600 transition"
                          >
                            <Pencil size={18} />
                          </button>

                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-2 rounded-xl hover:bg-red-100 text-red-600 transition"
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
    </div>
  );
};

export default TableRuangan;
