import React from "react";
import { Search } from "lucide-react";

const ApprovalSearch = ({ search, setSearch }) => {
  return (
    <div className="bg-white p-4 rounded-2xl border shadow-sm">
      <div className="relative w-full md:w-80">
        <Search className="absolute left-3 top-3 text-gray-400" size={18} />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari booking..."
          className="w-full pl-10 pr-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
};

export default ApprovalSearch;