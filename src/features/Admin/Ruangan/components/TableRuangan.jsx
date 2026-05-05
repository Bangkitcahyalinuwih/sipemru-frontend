import React, { useEffect, useState } from "react";
import { getRuangan } from "../service/ruanganService";

const TableRuangan = () => {
  const [ruangan, setRuangan] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRuangan = async () => {
      setLoading(true);
      const data = await getRuangan();
      setRuangan(data);
      setLoading(false);
    };

    fetchRuangan();
  }, []);

  return (
    <div className="p-6">
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Data Ruangan</h2>
        </div>

        {loading ? (
          <div className="p-6 text-gray-500">Loading data ruangan...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="px-6 py-3 text-left">No</th>
                  <th className="px-6 py-3 text-left">Foto</th>
                  <th className="px-6 py-3 text-left">Nama</th>
                  <th className="px-6 py-3 text-left">Kapasitas</th>
                  <th className="px-6 py-3 text-left">Lantai</th>
                  <th className="px-6 py-3 text-left">Fasilitas</th>
                  <th className="px-6 py-3 text-left">Deskripsi</th>
                  <th className="px-6 py-3 text-left">Approval</th>
                </tr>
              </thead>

              <tbody>
                {ruangan.map((item, index) => (
                  <tr
                    key={item.id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-3">{index + 1}</td>
                    <td className="px-6 py-3">
                      {item.foto ? (
                        <img
                          src={item.foto}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                      ) : (
                        <span className="text-gray-400 text-xs">No Image</span>
                      )}
                    </td>
                    <td className="px-6 py-3 font-medium text-gray-800">
                      {item.name}
                    </td>
                    <td className="px-6 py-3 text-gray-600">{item.capacity}</td>
                    <td className="px-6 py-3 text-gray-600">
                      Lantai {item.floor}
                    </td>
                    <td className="px-6 py-3">
                      <div className="flex flex-wrap gap-1">
                        {item.facilities?.map((f, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded"
                          >
                            {f}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-3 text-gray-600 max-w-xs truncate">
                      {item.description}
                    </td>
                    <td className="px-6 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.approval_type === "auto"
                            ? "bg-green-100 text-green-600"
                            : "bg-yellow-100 text-yellow-600"
                        }`}
                      >
                        {item.approval_type}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default TableRuangan;
