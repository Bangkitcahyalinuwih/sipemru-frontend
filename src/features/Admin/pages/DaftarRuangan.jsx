import { useMemo, useState } from "react";

const roomData = [
  {
    id: 1,
    code: "R-LB217",
    name: "R. 217 - Lab Komputer",
    building: "Gedung M. Nuh",
    floor: "Lantai 1",
    campus: "Serayu",
    capacity: 2,
    status: "Berlangsung",
  },
  {
    id: 2,
    code: "R-LB218",
    name: "R. 218 - Lab Komputer",
    building: "Gedung M. Nuh",
    floor: "Lantai 1",
    campus: "Serayu",
    capacity: 2,
    status: "Sedang Dipakai",
  },
  {
    id: 3,
    code: "R-A101",
    name: "R. A101 - Ruang Kelas",
    building: "Gedung A",
    floor: "Lantai 2",
    campus: "Cendekia",
    capacity: 20,
    status: "Tersedia",
  },
];

const filterOptions = {
  campus: ["Semua Kampus", "Serayu", "Cendekia"],
  building: ["Semua Gedung", "Gedung M. Nuh", "Gedung A", "Gedung B"],
  floor: ["Semua Lantai", "Lantai 1", "Lantai 2", "Lantai 3"],
  status: ["Semua Status", "Berlangsung", "Sedang Dipakai", "Tersedia"],
};

const statusStyles = {
  Berlangsung: "bg-blue-500 text-white",
  "Sedang Dipakai": "bg-red-500 text-white",
  Tersedia: "bg-green-500 text-white",
};

export default function DaftarRuangan() {
  const [query, setQuery] = useState("");
  const [campus, setCampus] = useState("Semua Kampus");
  const [building, setBuilding] = useState("Semua Gedung");
  const [floor, setFloor] = useState("Semua Lantai");
  const [status, setStatus] = useState("Semua Status");

  const filteredRooms = useMemo(() => {
    return roomData.filter((room) => {
      const searchText = `${room.code} ${room.name} ${room.building} ${room.floor}`.toLowerCase();
      const matchesQuery = searchText.includes(query.toLowerCase());
      const matchesCampus = campus === "Semua Kampus" || room.campus === campus;
      const matchesBuilding = building === "Semua Gedung" || room.building === building;
      const matchesFloor = floor === "Semua Lantai" || room.floor === floor;
      const matchesStatus = status === "Semua Status" || room.status === status;
      return matchesQuery && matchesCampus && matchesBuilding && matchesFloor && matchesStatus;
    });
  }, [query, campus, building, floor, status]);

  return (
    <div className="p-8">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Daftar Ruang</h1>
            <p className="text-sm text-slate-500">Kelola dan lihat status ruangan kampus secara cepat.</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <label className="flex-1">
              <span className="sr-only">Cari Ruangan</span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari Ruangan..."
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500"
              />
            </label>
            <select
              value={campus}
              onChange={(e) => setCampus(e.target.value)}
              className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none"
            >
              {filterOptions.campus.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <select
              value={building}
              onChange={(e) => setBuilding(e.target.value)}
              className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none"
            >
              {filterOptions.building.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <select
              value={floor}
              onChange={(e) => setFloor(e.target.value)}
              className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none"
            >
              {filterOptions.floor.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none"
            >
              {filterOptions.status.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800/10 bg-slate-950/80 p-6 shadow-xl shadow-slate-900/5 text-slate-100">
          <div className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-slate-400">Daftar Ruang — Gedung M. Nuh</p>
            </div>
            <p className="text-sm text-slate-400">Menampilkan {filteredRooms.length} ruangan</p>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-slate-800/60 bg-slate-950">
            <table className="min-w-full divide-y divide-slate-800 text-left text-sm text-slate-200">
              <thead className="bg-slate-900/90 text-slate-400">
                <tr>
                  <th className="px-4 py-4 font-medium">No.</th>
                  <th className="px-4 py-4 font-medium">Kode Ruang</th>
                  <th className="px-4 py-4 font-medium">Ruang</th>
                  <th className="px-4 py-4 font-medium">Gedung</th>
                  <th className="px-4 py-4 font-medium">Lantai</th>
                  <th className="px-4 py-4 font-medium">Kapasitas</th>
                  <th className="px-4 py-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 bg-slate-950">
                {filteredRooms.map((room, index) => (
                  <tr key={room.id} className="hover:bg-slate-900/80">
                    <td className="px-4 py-4 text-slate-300">{index + 1}</td>
                    <td className="px-4 py-4 font-medium text-white">{room.code}</td>
                    <td className="px-4 py-4 text-slate-300">{room.name}</td>
                    <td className="px-4 py-4 text-slate-300">{room.building}</td>
                    <td className="px-4 py-4 text-slate-300">{room.floor}</td>
                    <td className="px-4 py-4 text-slate-300">{room.capacity}</td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[room.status] || "bg-slate-500 text-white"}`}>
                        {room.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {filteredRooms.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-slate-400">
                      Tidak ada ruangan yang cocok dengan filter saat ini.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
