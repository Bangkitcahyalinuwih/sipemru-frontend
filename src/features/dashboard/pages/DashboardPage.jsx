import { useState } from "react";
import { DoorOpen, Activity, Calendar, Users, Clock } from "lucide-react";

export default function Dashboard() {
  /* ================= STATUS ================= */
  const STATUS = {
    AVAILABLE: "available",
    OCCUPIED: "occupied",
    PENDING: "pending",
    APPROVED: "approved",
    ONGOING: "ongoing",
    SCHEDULED: "scheduled",
  };

  /* ================= STATUS CONFIG ================= */
  const statusConfig = {
    available: {
      label: "Tersedia",
      wrapper: "bg-emerald-50 border-emerald-200 text-emerald-800",
      badge: "bg-emerald-100 text-emerald-700 border-emerald-200",
    },
    occupied: {
      label: "Dipakai",
      wrapper: "bg-red-50 border-red-200 text-red-800",
      badge: "bg-red-100 text-red-700 border-red-200",
    },
    pending: {
      label: "Menunggu",
      wrapper: "bg-amber-50 border-amber-200 text-amber-800",
      badge: "bg-amber-100 text-amber-700 border-amber-200",
    },
    approved: {
      label: "Disetujui",
      wrapper: "bg-purple-50 border-purple-200 text-purple-800",
      badge: "bg-purple-100 text-purple-700 border-purple-200",
    },
    ongoing: {
      label: "Berlangsung",
      wrapper: "bg-blue-50 border-blue-200 text-blue-800",
      badge: "bg-blue-100 text-blue-700 border-blue-200",
    },
    scheduled: {
      label: "Terjadwal",
      wrapper: "bg-slate-50 border-slate-200 text-slate-800",
      badge: "bg-slate-100 text-slate-700 border-slate-200",
    },
  };

  /* ================= DATA CAMPUS PNM (INCLUDE LAB + RANDOM ROOMS) ================= */
  const campuses = [
    {
      id: 1,
      name: "Kampus 1",
      buildings: [
        {
          id: 1,
          name: "Gedung M.Nuh",
          rooms: [
            {
              id: 1,
              name: "Auditorium M.Nuh",
              capacity: 200,
              status: STATUS.ONGOING,
              timeStart: "07:00",
              timeEnd: "09:00",
              activity: "Praktikum Web - TI Semester 3",
            },
            {
              id: 2,
              name: "Ruang Seminar M.Nuh",
              capacity: 80,
              status: STATUS.AVAILABLE,
            },
            {
              id: 3,
              name: "Lab Komputer M.Nuh A",
              capacity: 30,
              status: STATUS.PENDING,
            },
            {
              id: 4,
              name: "Lab Jaringan M.Nuh",
              capacity: 25,
              status: STATUS.AVAILABLE,
            },
          ],
        },
        {
          id: 2,
          name: "Gedung Auditorium",
          rooms: [
            {
              id: 5,
              name: "Auditorium Utama Kampus 1",
              capacity: 300,
              status: STATUS.PENDING,
            },
            {
              id: 6,
              name: "Lab Multimedia Kampus 1",
              capacity: 40,
              status: STATUS.AVAILABLE,
            },
          ],
        },
      ],
    },
    {
      id: 2,
      name: "Kampus 2",
      buildings: [
        {
          id: 3,
          name: "Gedung A",
          rooms: [
            {
              id: 7,
              name: "Auditorium Gedung A",
              capacity: 150,
              status: STATUS.APPROVED,
            },
            {
              id: 8,
              name: "Lab Komputer A",
              capacity: 30,
              status: STATUS.OCCUPIED,
              timeStart: "09:00",
              timeEnd: "11:00",
              activity: "Ujian Jaringan - TI Semester 5",
            },
          ],
        },
        {
          id: 4,
          name: "Gedung B",
          rooms: [
            {
              id: 9,
              name: "Auditorium Gedung B",
              capacity: 150,
              status: STATUS.OCCUPIED,
              timeStart: "10:00",
              timeEnd: "12:00",
              activity: "Seminar Nasional IT",
            },
            {
              id: 10,
              name: "Lab Jaringan B",
              capacity: 25,
              status: STATUS.PENDING,
            },
          ],
        },
        {
          id: 5,
          name: "Gedung C",
          rooms: [
            {
              id: 11,
              name: "Auditorium Gedung C",
              capacity: 150,
              status: STATUS.PENDING,
            },
            {
              id: 12,
              name: "Lab Multimedia C",
              capacity: 40,
              status: STATUS.AVAILABLE,
            },
          ],
        },
        {
          id: 6,
          name: "Gedung D",
          rooms: [
            {
              id: 13,
              name: "Auditorium Gedung D",
              capacity: 150,
              status: STATUS.SCHEDULED,
            },
            {
              id: 14,
              name: "Lab Komputer D",
              capacity: 30,
              status: STATUS.AVAILABLE,
            },
          ],
        },
      ],
    },
  ];

  /* ================= FLATTEN ROOMS ================= */
  const rooms = campuses.flatMap((campus) =>
    campus.buildings.flatMap((building) =>
      building.rooms.map((room) => ({
        ...room,
        campus: campus.name,
        building: building.name,
      })),
    ),
  );

  /* ================= FILTER & SEARCH ================= */
  const [filter, setFilter] = useState("ALL");
  const [search, setSearch] = useState("");

  const filteredRooms = rooms.filter((r) => {
    const campusMatch = filter === "ALL" || r.campus === filter;
    const searchMatch =
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.building.toLowerCase().includes(search.toLowerCase());
    return campusMatch && searchMatch;
  });

  /* ================= GRID INFO ================= */
  const stats = [
    {
      title: "Total Ruangan",
      value: rooms.length,
      icon: <DoorOpen className="w-5 h-5" />,
    },
    {
      title: "Sedang Dipakai",
      value: rooms.filter(
        (r) => r.status === STATUS.OCCUPIED || r.status === STATUS.ONGOING,
      ).length,
      icon: <Activity className="w-5 h-5" />,
    },
    {
      title: "Booking Pending",
      value: rooms.filter((r) => r.status === STATUS.PENDING).length,
      icon: <Calendar className="w-5 h-5" />,
    },
    {
      title: "Total Kapasitas",
      value: rooms.reduce((acc, r) => acc + r.capacity, 0),
      icon: <Users className="w-5 h-5" />,
    },
  ];

  return (
    <div className="p-6 space-y-8 bg-slate-50 min-h-screen text-slate-900">
      {/* SEARCH & FILTER CAMPUS */}
      <div className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Cari ruangan atau gedung..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
          />
        </div>

        <div className="flex gap-2">
          {["ALL", "Kampus 1", "Kampus 2"].map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`px-4 py-2 rounded-lg border text-sm transition ${filter === item ? "bg-slate-900 text-white" : "bg-white"}`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* GRID INFO */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div
            key={i}
            className="bg-white border rounded-2xl p-5 shadow-sm flex justify-between"
          >
            <div>
              <p className="text-xs text-slate-500">{s.title}</p>
              <p className="text-xl font-bold">{s.value}</p>
            </div>
            <div className="p-3 bg-slate-100 rounded-xl">{s.icon}</div>
          </div>
        ))}
      </div>

      {/* LIST RUANG */}
<div className="space-y-4">
  {filteredRooms.map((room) => (
    <div
      key={room.id}
      className={`p-5 rounded-xl border ${statusConfig[room.status].wrapper}`}
    >
      <div className="flex justify-between items-start text-left">
        
        <div className="flex-1">
          <p className="font-semibold text-sm">{room.name}</p>

          <p className="text-xs opacity-70 mt-1">
            {room.campus} • {room.building} • {room.capacity} orang
          </p>

          {/* JAM & AGENDA */}
          {(room.status === STATUS.OCCUPIED || room.status === STATUS.ONGOING) &&
            room.timeStart &&
            room.timeEnd && (
              <div className="mt-2 text-xs opacity-80">
                
                {/* Jam */}
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5" />
                  <span className="font-medium">
                    {room.timeStart} - {room.timeEnd}
                  </span>
                </div>

                {/* Agenda */}
                {room.activity && (
                  <p className="pl-5 opacity-70">
                    {room.activity}
                  </p>
                )}
              </div>
            )}
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-2">
          <span
            className={`text-xs px-3 py-1 rounded-full border ${statusConfig[room.status].badge}`}
          >
            {statusConfig[room.status].label}
          </span>

          {room.status === STATUS.AVAILABLE && (
            <button className="text-xs px-3 py-1 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700">
              Booking
            </button>
          )}

          {room.status === STATUS.PENDING && (
            <button className="text-xs px-3 py-1 rounded-lg bg-amber-600 text-white hover:bg-amber-700">
              Detail
            </button>
          )}
        </div>

      </div>
    </div>
  ))}
</div>

      {/* SCHEDULE */}
      <div className="bg-white rounded-2xl shadow-sm border p-5">
        <h2 className="mb-4 text-xl font-semibold tracking-tight !text-slate-900 md:text-lg lg:text-xl text-left">
          Jadwal Pemakaian
        </h2>

        <div className="space-y-4">
          {[
            {
              time: "07:00 - 09:00",
              title: "Praktikum Web",
              organizer: "TI - Semester 3",
              room: "Auditorium M.Nuh",
              status: STATUS.ONGOING,
            },
            {
              time: "09:00 - 11:00",
              title: "Ujian Jaringan",
              organizer: "TI - Semester 5",
              room: "Lab Komputer A",
              status: STATUS.SCHEDULED,
            },
          ].map((item, i) => (
            <div
              key={i}
              className={`p-4 rounded-xl border flex justify-between items-center ${statusConfig[item.status].wrapper}`}
            >
              <div>
                <p className="font-semibold text-sm">{item.title}</p>
                <p className="text-xs opacity-70">
                  {item.organizer} • {item.room}
                </p>
                <p className="text-xs opacity-60">{item.time}</p>
              </div>

              <span
                className={`text-xs px-3 py-1 rounded-full border ${statusConfig[item.status].badge}`}
              >
                {statusConfig[item.status].label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}