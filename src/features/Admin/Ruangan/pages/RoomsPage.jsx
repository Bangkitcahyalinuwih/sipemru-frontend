import React from "react";
import TableRuangan from "../components/TableRooms";
import { useNavigate } from "react-router-dom";

const RuanganPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold text-gray-800">
          Data Ruangan
        </h1>

        <button
          onClick={() => navigate("/admin/rooms/add")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          + Tambah Ruangan
        </button>
      </div>

      <TableRuangan />
    </div>
  );
};

export default RuanganPage;