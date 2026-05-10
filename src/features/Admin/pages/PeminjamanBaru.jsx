import { useMemo, useState } from "react";
import { Check, X } from "lucide-react";
import FilterBar from "../components/FilterBar";
import StatusBadge from "../components/StatusBadge";
import ActionButtons from "../components/ActionButtons";

const bookingData = [
  {
    id: 1,
    borrower: "Abdul Aziz",
    nim: "244255626",
    program: "TRPL",
    campus: "Serayu",
    building: "M. Nuh",
    room: "217 - Lab. Komputer",
    activity: "Pemograman Web",
    date: "22/06/2026",
    time: "07:00 - 10:30",
    status: "Menunggu Konfirmasi",
  },
  {
    id: 2,
    borrower: "Lina Sari",
    nim: "244255627",
    program: "TI",
    campus: "Serayu",
    building: "M. Nuh",
    room: "101 - Ruang Kelas",
    activity: "Rapat Tim",
    date: "23/06/2026",
    time: "09:00 - 11:00",
    status: "Disetujui",
  },
  {
    id: 3,
    borrower: "Ridwan Putra",
    nim: "244255628",
    program: "SI",
    campus: "Serayu",
    building: "M. Nuh",
    room: "305 - Lab. Jaringan",
    activity: "Ujian Praktikum",
    date: "24/06/2026",
    time: "13:00 - 15:00",
    status: "Menunggu Konfirmasi",
  },
];

const filterOptions = {
  campus: ["Semua Kampus", "Serayu", "Cendekia"],
  building: ["Semua Gedung", "M. Nuh", "Gedung A", "Gedung B"],
  floor: ["Semua Lantai", "Lantai 1", "Lantai 2", "Lantai 3"],
  status: ["Semua Status", "Menunggu Konfirmasi", "Disetujui", "Ditolak"],
};

export default function PeminjamanBaru() {
  const [query, setQuery] = useState("");
  const [campus, setCampus] = useState("Semua Kampus");
  const [building, setBuilding] = useState("Semua Gedung");
  const [floor, setFloor] = useState("Semua Lantai");
  const [status, setStatus] = useState("Semua Status");

  const filters = { campus, building, floor, status };

  const filteredBookings = useMemo(() => {
    return bookingData.filter((booking) => {
      const searchText = `${booking.borrower} ${booking.nim} ${booking.program} ${booking.building} ${booking.room} ${booking.activity}`.toLowerCase();
      const matchesQuery = searchText.includes(query.toLowerCase());
      const matchesCampus = campus === "Semua Kampus" || booking.campus === campus;
      const matchesBuilding = building === "Semua Gedung" || booking.building === building;
      const matchesFloor = floor === "Semua Lantai" || booking.room.toLowerCase().includes(floor.toLowerCase());
      const matchesStatus = status === "Semua Status" || booking.status === status;
      return matchesQuery && matchesCampus && matchesBuilding && matchesFloor && matchesStatus;
    });
  }, [query, campus, building, floor, status]);

  return (
    <div className="p-8">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Peminjaman Baru</h1>
            <p className="text-sm text-slate-500">Lihat daftar permintaan peminjaman dan konfirmasi akses ruang.</p>
          </div>
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
            placeholder="Cari peminjaman..."
          />
        </div>

        <div className="rounded-3xl border border-slate-800/10 bg-slate-950/80 p-6 shadow-xl shadow-slate-900/5 text-slate-100">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-slate-300">
              <span className="font-medium text-slate-100">Peminjaman Baru</span>
              <span className="text-sm text-slate-400"> • Kampus Serayu • Gedung M. Nuh • Lantai 2</span>
            </div>
            <p className="text-sm text-slate-400">Menampilkan {filteredBookings.length} peminjaman</p>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-slate-800/60 bg-slate-950">
            <table className="min-w-full divide-y divide-slate-800 text-left text-sm text-slate-200">
              <thead className="bg-slate-900/90 text-slate-400">
                <tr>
                  <th className="px-4 py-4 font-medium">No.</th>
                  <th className="px-4 py-4 font-medium">Peminjam</th>
                  <th className="px-4 py-4 font-medium">NIM/NIP</th>
                  <th className="px-4 py-4 font-medium">Prodi</th>
                  <th className="px-4 py-4 font-medium">Gedung</th>
                  <th className="px-4 py-4 font-medium">Ruang</th>
                  <th className="px-4 py-4 font-medium">Kegiatan</th>
                  <th className="px-4 py-4 font-medium">Tanggal</th>
                  <th className="px-4 py-4 font-medium">Jam</th>
                  <th className="px-4 py-4 font-medium">Status</th>
                  <th className="px-4 py-4 font-medium">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 bg-slate-950">
                {filteredBookings.map((booking, index) => (
                  <tr key={booking.id} className="hover:bg-slate-900/70">
                    <td className="px-4 py-4 text-slate-300">{index + 1}</td>
                    <td className="px-4 py-4 text-slate-200">{booking.borrower}</td>
                    <td className="px-4 py-4 text-slate-200">{booking.nim}</td>
                    <td className="px-4 py-4 text-slate-200">{booking.program}</td>
                    <td className="px-4 py-4 text-slate-200">{booking.building}</td>
                    <td className="px-4 py-4 text-slate-200">{booking.room}</td>
                    <td className="px-4 py-4 text-slate-200">{booking.activity}</td>
                    <td className="px-4 py-4 text-slate-200">{booking.date}</td>
                    <td className="px-4 py-4 text-slate-200">{booking.time}</td>
                    <td className="px-4 py-4">
                      <StatusBadge status={booking.status} />
                    </td>
                    <td className="px-4 py-4">
                      <ActionButtons
                        agreement={() => alert(`Menyetujui peminjaman ${booking.id}`)}
                        rejection={() => alert(`Menolak peminjaman ${booking.id}`)}
                      />
                    </td>
                  </tr>
                ))}
                {filteredBookings.length === 0 && (
                  <tr>
                    <td colSpan={11} className="px-4 py-8 text-center text-slate-400">
                      Tidak ada peminjaman yang cocok dengan filter saat ini.
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
