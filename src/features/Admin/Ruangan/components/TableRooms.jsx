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
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { getRuangan, deleteRuangan } from "../service/ruanganService";

const TableRuangan = () => {
  const [ruangan, setRuangan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    fetchRuangan();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const fetchRuangan = async () => {
    try {
      setLoading(true);
      const data = await getRuangan();
      setRuangan(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Hapus data?",
      text: "Data ruangan akan dihapus",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus",
      cancelButtonText: "Batal",
      confirmButtonColor: "#dc2626",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteRuangan(id);
        
        setRuangan((prev) => {
          const updated = prev.filter((item) => item.id !== id);
          const nextTotalPages = Math.ceil((filteredRuangan.length - 1) / itemsPerPage);
          if (currentPage > nextTotalPages && nextTotalPages > 0) {
            setCurrentPage(nextTotalPages);
          }
          return updated;
        });

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

  const totalPages = Math.ceil(filteredRuangan.length / itemsPerPage);

  const displayedRuangan = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredRuangan.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredRuangan, currentPage, itemsPerPage]);

  const formatFacilities = (facilities) => {
    if (!facilities) return "-";
    if (Array.isArray(facilities)) {
      return facilities.join(", ");
    }
    return facilities;
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              Data Ruangan
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Total Ruangan: <span className="font-semibold text-gray-700">{filteredRuangan.length}</span>
            </p>
          </div>

          <button
            onClick={() => navigate("/admin/rooms/add")}
            className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition duration-200 shadow-sm hover:shadow active:scale-[0.98]"
          >
            + Tambah Ruangan
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          
          <div className="p-5 border-b border-gray-100 bg-white">
            <div className="relative w-full md:w-80">
              <Search
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari ruangan..."
                className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition duration-150 placeholder:text-gray-400"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-50/70 border-b border-gray-100 text-gray-600 font-semibold text-left">
                  <th className="px-5 py-4 w-12">No</th>
                  <th className="px-5 py-4 min-w-[220px]">Ruangan</th>
                  <th className="px-5 py-4">Tipe</th>
                  <th className="px-5 py-4">Kapasitas</th>
                  <th className="px-5 py-4">Lantai</th>
                  <th className="px-5 py-4 min-w-[200px]">Fasilitas</th>
                  <th className="px-5 py-4 w-28">Status</th>
                  <th className="px-5 py-4 text-center sticky right-0 bg-gray-50">Aksi</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100 text-gray-700">
                {loading ? (
                  <tr>
                    <td colSpan="8" className="text-center py-12 text-gray-400 font-medium bg-white">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        <span>Memuat data ruangan...</span>
                      </div>
                    </td>
                  </tr>
                ) : displayedRuangan.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center py-12 text-gray-400 font-medium bg-white">
                      Data ruangan tidak ditemukan
                    </td>
                  </tr>
                ) : (
                  displayedRuangan.map((item, index) => (
                    <tr
                      key={item.id}
                      className="hover:bg-gray-50/60 transition duration-150"
                    >
                      <td className="px-5 py-4 font-medium text-gray-400">
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 flex-shrink-0">
                            <Building2 size={18} />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{item.name}</p>
                            <p className="text-xs font-mono text-gray-400 mt-0.5">{item.code}</p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4 capitalize font-medium text-gray-800">
                        {item.type}
                      </td>

                      <td className="px-5 py-4">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700">
                          {item.capacity} Orang
                        </span>
                      </td>

                      <td className="px-5 py-4 font-medium text-gray-600">
                        Lantai {item.floor}
                      </td>

                      <td className="px-5 py-4 text-xs text-gray-500 leading-relaxed max-w-xs truncate">
                        {formatFacilities(item.facilities)}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                            item.is_active
                              ? "bg-green-50 text-green-700 border border-green-100"
                              : "bg-red-50 text-red-700 border border-red-100"
                          }`}
                        >
                          {item.is_active ? <CheckCircle size={13} /> : <XCircle size={13} />}
                          {item.is_active ? "Aktif" : "Nonaktif"}
                        </span>
                      </td>

                      <td className="px-5 py-4 sticky right-0 bg-white/95 backdrop-blur-sm shadow-[-10px_0_15px_-3px_rgba(0,0,0,0.03)]">
                        <div className="flex justify-center items-center gap-1.5">
                          <button
                            onClick={() => navigate(`/admin/rooms/edit/${item.id}`)}
                            className="p-1.5 rounded-lg text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition duration-150"
                            title="Edit"
                          >
                            <Pencil size={15} />
                          </button>

                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-1.5 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 transition duration-150"
                            title="Hapus"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {!loading && filteredRuangan.length > 0 && (
            <div className="bg-white px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-100">
              <div className="text-xs sm:text-sm text-gray-500">
                Menampilkan{" "}
                <span className="font-semibold text-gray-800">
                  {(currentPage - 1) * itemsPerPage + 1}
                </span>{" "}
                sampai{" "}
                <span className="font-semibold text-gray-800">
                  {Math.min(currentPage * itemsPerPage, filteredRuangan.length)}
                </span>{" "}
                dari <span className="font-semibold text-gray-800">{filteredRuangan.length}</span> data
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-transparent transition duration-150"
                >
                  <ChevronLeft size={16} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`min-w-[36px] h-9 px-2 rounded-xl text-xs font-semibold transition duration-150 ${
                      currentPage === page
                        ? "bg-blue-600 text-white shadow-sm"
                        : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-transparent transition duration-150"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TableRuangan;