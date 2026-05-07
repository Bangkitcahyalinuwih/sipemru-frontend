import {
  CheckCircle,
  icons,
  Pencil,
  Search,
  Trash2,
  XCircle,
} from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { deleteBuilding, getBuildings } from "../Service/BuildingService";

const TablesBuilding = () => {
  const [buildings, setBuildings] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBuildings();
  }, []);

  const fetchBuildings = async () => {
    try {
      setLoading(true);

      const data = await getBuildings();

      setBuildings(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredBuildings = useMemo(() => {
    return buildings.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [buildings, search]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Hapus Gedung?",
      text: "Data yang dihapus tidak bisa dikembalikan",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Hapus",
      cancelButtonText: "Batal",
    });

    if (!result.isConfirmed) return;

    const success = await deleteBuilding(id);

    if (success) {
      Swal.fire("Berhasil", "Gedung berhasil dihapus", "success");

      fetchBuildings();
    } else {
      Swal.fire("Gagal", "Gedung gagal dihapus", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Data Gedung</h1>

          <p className="text-sm text-gray-500 mt-1">
            Total Gedung: {filteredBuildings.length}
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-5 border-b border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">    
              <div className="relative w-full md:w-80">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />

                <input
                  type="text"
                  placeholder="Cari Gedung..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr className="text-left text-gray-600">
                  <th className="px-5 py-4 font-semibold">No</th>
                  <th className="px-5 py-4 font-semibold">Nama Gedung</th>
                  <th className="px-5 py-4 font-semibold">Kampus</th>
                  <th className="px-5 py-4 font-semibold">Alamat</th>
                  <th className="px-5 py-4 font-semibold">Total Lantai</th>
                  <th className="px-5 py-4 font-semibold">Deskripsi</th>
                  <th className="px-5 py-4 font-semibold">Status</th>
                  <th className="px-5 py-4 font-semibold text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="7" className="text-center py-10 text-gray-500">
                      Loading...
                    </td>
                  </tr>
                ) : filteredBuildings.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-10 text-gray-500">
                      Data gedung kosong
                    </td>
                  </tr>
                ) : (
                  filteredBuildings.map((item, index) => (
                    <tr
                      key={item.id}
                      className="border-t border-gray-100 hover:bg-gray-50 transition"
                    >
                      <td className="px-5 py-4">{index + 1}</td>
                      <td className="px-5 py-4 font-medium text-gray-700">
                        {item.name}
                      </td>
                      <td className="px-5 py-4 text-gray-600">{item.campus}</td>
                      <td className="px-5 py-4 text-gray-600">
                        {item.address || "-"}
                      </td>
                      <td className="px-5 py-4 text-center text-gray-600">
                        {item.floors}
                      </td>
                      <td className="px-5 py-4">{item.description || "-"}</td>
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center justify-center px-3 py-1 rounded-full ${
                            item.is_active ? "bg-green-100" : "bg-red-100"
                          }`}
                        >
                          {item.is_active ? (
                            <CheckCircle className="text-green-600" size={16} />
                          ) : (
                            <XCircle className="text-red-600" size={16} />
                          )}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() =>
                              navigate(`/admin/building/edit/${item.id}`)
                            }
                            className="p-2 rounded-lg bg-yellow-100 text-yellow-700 hover:bg-yellow-200 transition"
                          >
                            <Pencil size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition"
                          >
                            <Trash2 size={16} />
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

export default TablesBuilding;
