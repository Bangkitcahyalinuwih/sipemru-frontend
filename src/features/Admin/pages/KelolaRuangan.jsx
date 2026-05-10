import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import FilterBar from "../components/FilterBar";
import StatusBadge from "../components/StatusBadge";
import ActionButtons from "../components/ActionButtons";

const roomData = [
  {
    id: 1,
    code: "R-LB217",
    name: "R. 217 - Lab Komputer",
    campus: "Serayu",
    building: "M. Nuh",
    floor: "Lantai 2",
    capacity: 30,
    status: "Tersedia",
  },
  {
    id: 2,
    code: "R-LB218",
    name: "R. 218 - Lab Komputer",
    campus: "Serayu",
    building: "M. Nuh",
    floor: "Lantai 2",
    capacity: 30,
    status: "Tersedia",
  },
];

const filterOptions = {
  campus: ["Semua Kampus", "Serayu", "Cendekia"],
  building: ["Semua Gedung", "M. Nuh", "Gedung A", "Gedung B"],
  floor: ["Semua Lantai", "Lantai 1", "Lantai 2", "Lantai 3"],
  status: ["Semua Status", "Tersedia", "Sedang Dipakai", "Berlangsung", "Selesai"],
};

export default function KelolaRuangan() {
  const [query, setQuery] = useState("");
  const [campus, setCampus] = useState("Semua Kampus");
  const [building, setBuilding] = useState("Semua Gedung");
  const [floor, setFloor] = useState("Semua Lantai");
  const [status, setStatus] = useState("Semua Status");
  const [showFormPlaceholder, setShowFormPlaceholder] = useState(false);

  const filters = { campus, building, floor, status };

  const filteredRooms = useMemo(() => {
    return roomData.filter((room) => {
      const searchText = `${room.code} ${room.name} ${room.campus} ${room.building} ${room.floor}`.toLowerCase();
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
            <h1 className="text-2xl font-semibold text-slate-900">Kelola Ruangan</h1>
            <p className="text-sm text-slate-500">Kelola data ruangan dan akses cepat ke form tambah ruangan.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <FilterBar
              query={query}
              onQueryChange={setQuery}
              filters={filters}
              onFilterChange={(key, value) => {
                if (key === "campus") setCampus(value);
                if (key === "building") setBuilding(value);
                if (key === "floor") setFloor(value);
                if (key === "status") setStatus(value);
              }}
              filterOptions={filterOptions}
              placeholder="Cari Ruangan..."
            />
            <button
              type="button"
              onClick={() => setShowFormPlaceholder(true)}
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              <Plus className="w-4 h-4" />
              Tambah Ruangan
            </button>
          </div>
        </div>

        {showFormPlaceholder && (
          <div className="rounded-3xl border border-amber-500/30 bg-amber-500/10 p-6 text-amber-100">
            <p className="text-sm font-medium">Form tambah ruangan akan ditampilkan di sini.</p>
            <p className="text-sm text-amber-200">Implementasi form input dapat diselesaikan pada langkah selanjutnya.</p>
          </div>
        )}

        <div className="rounded-3xl border border-slate-800/10 bg-slate-950/80 p-6 shadow-xl shadow-slate-900/5 text-slate-100">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-slate-400">Kelola Ruangan — Kampus Serayu • Gedung M. Nuh • Lantai 2</p>
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
                  <th className="px-4 py-4 font-medium">Kampus</th>
                  <th className="px-4 py-4 font-medium">Gedung</th>
                  <th className="px-4 py-4 font-medium">Lantai</th>
                  <th className="px-4 py-4 font-medium">Kapasitas</th>
                  <th className="px-4 py-4 font-medium">Status</th>
                  <th className="px-4 py-4 font-medium">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 bg-slate-950">
                {filteredRooms.map((room, index) => (
                  <tr key={room.id} className="hover:bg-slate-900/80">
                    <td className="px-4 py-4 text-slate-300">{index + 1}</td>
                    <td className="px-4 py-4 font-medium text-white">{room.code}</td>
                    <td className="px-4 py-4 text-slate-300">{room.name}</td>
                    <td className="px-4 py-4 text-slate-300">{room.campus}</td>
                    <td className="px-4 py-4 text-slate-300">{room.building}</td>
                    <td className="px-4 py-4 text-slate-300">{room.floor}</td>
                    <td className="px-4 py-4 text-slate-300">{room.capacity}</td>
                    <td className="px-4 py-4">
                      <StatusBadge status={room.status} />
                    </td>
                    <td className="px-4 py-4">
                      <ActionButtons
                        onInspect={() => alert(`Inspect ${room.name}`)}
                        onUpdate={() => alert(`Update ${room.name}`)}
                        onDelete={() => alert(`Delete ${room.name}`)}
                      />
                    </td>
                  </tr>
                ))}
                {filteredRooms.length === 0 && (
                  <tr>
                    <td colSpan={9} className="px-4 py-8 text-center text-slate-400">
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
