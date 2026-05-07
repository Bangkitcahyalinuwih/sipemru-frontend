import React from "react";
import { useNavigate } from "react-router-dom";
import TablesSchedule from "../components/TableSchedule";

const SchedulePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <TablesSchedule />
    </div>
  );
};

export default SchedulePage;