import React from "react";
import TableRuangan from "../components/TableRooms";
import { useNavigate } from "react-router-dom";

const RuanganPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 p-6">


      <TableRuangan />
    </div>
  );
};

export default RuanganPage;