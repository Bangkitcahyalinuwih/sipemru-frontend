import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import idLocale from "@fullcalendar/core/locales/id";
import Swal from "sweetalert2";
import { getSchedulesByRoomId } from "../../../Admin/Schedule/service/ScheduleService";
import { getCalendarBookings } from "../../../Admin/Booking/service/BookingService";

const dayMap = {
  sunday: 0, minggu: 0,
  monday: 1, senin: 1,
  tuesday: 2, selasa: 2,
  wednesday: 3, rabu: 3,
  thursday: 4, kamis: 4,
  friday: 5, jumat: 5,
  saturday: 6, sabtu: 6,
};

// Jam operasional ruangan (menit sejak 00:00)
const DAY_START = 7 * 60;
const DAY_END = 21 * 60;
const MIN_SLOT = 30; // slot kosong minimal yang boleh dibooking
const INCLUDE_PENDING = true; // booking pending ikut memblokir jam

// --- HELPER ---
const normDate = (d) => String(d || "").slice(0, 10); // "2026-11-10T00:00:00Z" -> "2026-11-10"
const normTime = (t, fallback = "00:00") => String(t || fallback).slice(0, 5); // "09:00:00" -> "09:00"
const toMin = (t) => {
  const [h, m] = normTime(t).split(":").map(Number);
  return h * 60 + (m || 0);
};
const fmt = (min) =>
  `${String(Math.floor(min / 60)).padStart(2, "0")}:${String(min % 60).padStart(2, "0")}`;
const localDateStr = (d = new Date()) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const dayIndexOf = (item) =>
  dayMap[String(item.day_of_week || "").toLowerCase().trim()];

// Gabungkan interval sibuk lalu hitung celah kosong
const freeGaps = (busy, from = DAY_START, to = DAY_END) => {
  const sorted = [...busy].sort((a, b) => a[0] - b[0]);
  const gaps = [];
  let cursor = from;

  for (const [s, e] of sorted) {
    if (s > cursor) gaps.push([cursor, Math.min(s, to)]);
    cursor = Math.max(cursor, e);
    if (cursor >= to) break;
  }
  if (cursor < to) gaps.push([cursor, to]);

  return gaps.filter(([s, e]) => e - s >= MIN_SLOT);
};

const DetailRow = ({ label, value }) => (
  <div>
    <p className="text-[11px] uppercase tracking-widest text-slate-500 font-semibold mb-0.5">{label}</p>
    <p className="text-sm font-medium text-slate-800">{value || "-"}</p>
  </div>
);

export default function RoomCalendar({ room }) {
  const navigate = useNavigate();
  const [schedules, setSchedules] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (room?.id) {
      fetchCalendarData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [room?.id]);

  const fetchCalendarData = async () => {
    setLoading(true);
    try {
      const responseData = await getSchedulesByRoomId(room.id);

      let targetPayload = responseData;
      if (responseData?.data && !responseData.schedule) {
        targetPayload = responseData.data;
      }

      let flatSchedules = [];
      if (targetPayload && Array.isArray(targetPayload.schedule)) {
        flatSchedules = targetPayload.schedule.flatMap((dayGroup) => dayGroup.schedules || []);
      } else if (Array.isArray(targetPayload)) {
        flatSchedules = targetPayload.flatMap((dayGroup) => dayGroup.schedules || dayGroup);
      }

      const allBookings = await getCalendarBookings({ room_id: room.id });
      const allowed = INCLUDE_PENDING ? ["approved", "pending"] : ["approved"];
      const filteredBookings = (allBookings || []).filter(
        (item) =>
          Number(item.room_id) === Number(room.id) &&
          allowed.includes(String(item.status || "").toLowerCase())
      );

      setSchedules(flatSchedules);
      setBookings(filteredBookings);
    } catch (error) {
      console.error("Error fetching calendar data:", error);
      setSchedules([]);
      setBookings([]);
      Swal.fire({
        icon: "error",
        title: "Gagal Memuat Data",
        text: "Terjadi kesalahan saat mengambil jadwal. Silakan coba lagi.",
        confirmButtonColor: "#6366f1",
      });
    } finally {
      setLoading(false);
    }
  };

  // --- EVENT KALENDER ---
  const currentYear = new Date().getFullYear();

  const scheduleEvents = schedules
    .filter((item) => dayIndexOf(item) !== undefined)
    .map((item) => ({
      id: `schedule-${item.id}`,
      title: `${item.course_name || "Mata Kuliah"}${item.kelas ? ` (${item.kelas})` : ""}`,
      daysOfWeek: [dayIndexOf(item)],
      startTime: normTime(item.start_time, "07:00") + ":00",
      endTime: normTime(item.end_time, "09:30") + ":00",
      startRecur: `${currentYear}-01-01`,
      endRecur: `${currentYear + 1}-01-01`,
      backgroundColor: "#e0e7ff",
      borderColor: "#a5b4fc",
      textColor: "#1e1b4b",
      extendedProps: {
        type: "schedule",
        lecturer: item.lecturer,
        kelas: item.kelas,
        prodi: item.prodi,
        semester: item.semester,
        jenis: item.jenis_kegiatan,
        startTime: item.start_time,
        endTime: item.end_time,
      },
    }));

  const bookingEvents = bookings
    .map((item) => {
      const date = normDate(item.booking_date || item.tanggal_booking);
      if (!date) return null;
      const isPending = String(item.status || "").toLowerCase() === "pending";

      return {
        id: `booking-${item.id}`,
        title: item.purpose || item.keperluan || item.organization || "Booking Ruangan",
        start: `${date}T${normTime(item.start_time, "07:00")}:00`,
        end: `${date}T${normTime(item.end_time, "17:00")}:00`,
        backgroundColor: isPending ? "#fef3c7" : "#d1fae5",
        borderColor: isPending ? "#fcd34d" : "#6ee7b7",
        textColor: isPending ? "#78350f" : "#064e3b",
        extendedProps: {
          type: "booking",
          status: item.status,
          organization: item.organization || item.nama_organisasi,
          pic: item.pic_name || item.nama_pic,
          peserta: item.jumlah_peserta,
          startTime: item.start_time,
          endTime: item.end_time,
        },
      };
    })
    .filter(Boolean);

  const events = [...scheduleEvents, ...bookingEvents];

  // --- LOGIKA KETERSEDIAAN PER JAM ---
  const getBusyIntervals = (dateStr, dayNumber) => {
    const lectures = schedules
      .filter((s) => dayIndexOf(s) === dayNumber)
      .map((s) => [toMin(s.start_time), toMin(s.end_time)]);

    const booked = bookings
      .filter((b) => normDate(b.booking_date || b.tanggal_booking) === dateStr)
      .map((b) => [toMin(b.start_time), toMin(b.end_time)]);

    return [...lectures, ...booked];
  };

  const goBooking = (dateStr, startMin) => {
    navigate("/booking", {
      state: {
        roomId: room?.id,
        roomName: room?.name,
        date: dateStr,
        startTime: startMin != null ? fmt(startMin) : "",
      },
    });
  };

  const handleDateClick = (info) => {
    const dateStr = info.dateStr.slice(0, 10);
    const today = localDateStr();
    const prettyDate = info.date.toLocaleDateString("id-ID", {
      weekday: "long", day: "numeric", month: "long", year: "numeric",
    });

    if (dateStr < today) {
      Swal.fire({
        icon: "info",
        title: "Tanggal Sudah Lewat",
        text: "Pilih tanggal hari ini atau setelahnya.",
        confirmButtonColor: "#6366f1",
      });
      return;
    }

    // Hari ini: slot yang sudah lewat tidak boleh dibooking
    let lowerBound = DAY_START;
    if (dateStr === today) {
      const now = new Date();
      const nowMin = Math.ceil((now.getHours() * 60 + now.getMinutes()) / 5) * 5;
      lowerBound = Math.max(DAY_START, nowMin);
    }

    const busy = getBusyIntervals(dateStr, info.date.getDay());
    const gaps = freeGaps(busy, lowerBound, DAY_END);

    const gapListHtml = gaps.length
      ? `<ul style="text-align:left;padding-left:1.2rem;list-style:disc">${gaps
          .map(([s, e]) => `<li><strong>${fmt(s)} – ${fmt(e)}</strong></li>`)
          .join("")}</ul>`
      : "";

    // Semua jam terpakai
    if (gaps.length === 0) {
      Swal.fire({
        icon: "info",
        title: "Tidak Ada Jam Kosong",
        html: `<p><strong>${room?.name}</strong> penuh pada <strong>${prettyDate}</strong>.</p>`,
        confirmButtonText: "Mengerti",
        confirmButtonColor: "#f97316",
      });
      return;
    }

    // Klik pada slot jam tertentu (tampilan Minggu)
    if (!info.allDay) {
      const clickedMin = info.date.getHours() * 60 + info.date.getMinutes();
      const gap = gaps.find(([s, e]) => clickedMin >= s && clickedMin < e);

      if (!gap) {
        Swal.fire({
          icon: "info",
          title: "Jam Tidak Tersedia",
          html: `<p>Jam <strong>${fmt(clickedMin)}</strong> sudah terpakai. Jam kosong pada hari ini:</p>${gapListHtml}`,
          confirmButtonText: "Mengerti",
          confirmButtonColor: "#f97316",
        });
        return;
      }

      Swal.fire({
        icon: "success",
        title: "Jam Tersedia!",
        html: `<p><strong>${prettyDate}</strong><br/>Kosong sampai <strong>${fmt(gap[1])}</strong></p>`,
        confirmButtonText: "Booking Sekarang",
        confirmButtonColor: "#10b981",
        showCancelButton: true,
        cancelButtonText: "Nanti",
        cancelButtonColor: "#64748b",
      }).then((r) => {
        if (r.isConfirmed) goBooking(dateStr, clickedMin);
      });
      return;
    }

    // Klik tanggal (tampilan Bulan): tampilkan semua jam kosong
    Swal.fire({
      icon: "success",
      title: "Ada Jam Kosong",
      html: `<p><strong>${prettyDate}</strong></p><p style="margin-top:6px">Jam yang bisa dibooking:</p>${gapListHtml}`,
      confirmButtonText: "Booking Sekarang",
      confirmButtonColor: "#10b981",
      showCancelButton: true,
      cancelButtonText: "Nanti",
      cancelButtonColor: "#64748b",
    }).then((r) => {
      if (r.isConfirmed) goBooking(dateStr, gaps[0][0]);
    });
  };

  const handleEventClick = (info) => {
    setSelectedEvent({ event: info.event, props: info.event.extendedProps });
  };

  const timeText = (p) =>
    p.startTime && p.endTime
      ? `${normTime(p.startTime)} – ${normTime(p.endTime)}`
      : null;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 pt-6 pb-4 border-b border-slate-100">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">Jadwal & Booking</h2>
            <p className="text-sm text-slate-600 mt-0.5">
              Kalender penggunaan{" "}
              <span className="font-semibold text-indigo-600">{room?.name || "Ruangan"}</span>
            </p>
          </div>
          <div className="flex gap-2 shrink-0">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 border border-indigo-100 text-xs font-semibold text-indigo-700">
              <span className="w-2 h-2 rounded-full bg-indigo-400 inline-block" />
              {schedules.length} Jadwal
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-100 text-xs font-semibold text-emerald-700">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
              {bookings.length} Booking
            </span>
          </div>
        </div>
      </div>

      {/* Calendar */}
      <div className="p-4 md:p-6">
        {loading ? (
          <div className="flex items-center justify-center h-64 text-slate-500 text-sm gap-2">
            <svg className="animate-spin w-5 h-5 text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            Memuat data kalender...
          </div>
        ) : (
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            locale={idLocale}
            initialView="dayGridMonth"
            editable={false}
            weekends
            height="auto"
            events={events}
            eventDisplay="block"
            displayEventTime
            eventTimeFormat={{ hour: "2-digit", minute: "2-digit", hour12: false }}
            dayMaxEvents={3}
            allDaySlot={false}
            nowIndicator
            slotMinTime="07:00:00"
            slotMaxTime="21:00:00"
            slotDuration="00:30:00"
            slotLabelFormat={{ hour: "2-digit", minute: "2-digit", hour12: false }}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek",
            }}
            buttonText={{ today: "Hari Ini", month: "Bulan", week: "Minggu" }}
            dayHeaderFormat={{ weekday: "short" }}
            dateClick={handleDateClick}
            eventClick={handleEventClick}
          />
        )}
      </div>

      {/* Event Detail Panel */}
      {selectedEvent && (
        <div className="mx-4 md:mx-6 mb-6 rounded-xl border border-slate-200 bg-slate-50 overflow-hidden">
          <div
            className={`px-5 py-3 flex items-center justify-between ${
              selectedEvent.props.type === "schedule" ? "bg-indigo-600" : "bg-emerald-600"
            }`}
          >
            <span className="text-white text-sm font-bold tracking-wide">
              {selectedEvent.props.type === "schedule" ? "Detail Jadwal Kuliah" : "Detail Reservasi Ruangan"}
            </span>
            <button
              type="button"
              onClick={() => setSelectedEvent(null)}
              className="text-white/70 hover:text-white transition-colors p-1 rounded-md hover:bg-white/10"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="p-5">
            {selectedEvent.props.type === "schedule" ? (
              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                <div className="col-span-2"><DetailRow label="Mata Kuliah" value={selectedEvent.event.title} /></div>
                <DetailRow label="Kelas" value={selectedEvent.props.kelas} />
                <DetailRow label="Semester" value={selectedEvent.props.semester} />
                <DetailRow label="Dosen Pengampu" value={selectedEvent.props.lecturer} />
                <DetailRow label="Program Studi" value={selectedEvent.props.prodi} />
                <DetailRow label="Jenis Kegiatan" value={selectedEvent.props.jenis} />
                <DetailRow label="Waktu" value={timeText(selectedEvent.props)} />
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                <div className="col-span-2"><DetailRow label="Tujuan Kegiatan" value={selectedEvent.event.title} /></div>
                {selectedEvent.props.pic && (
                  <DetailRow label="Penanggung Jawab (PIC)" value={selectedEvent.props.pic} />
                )}
                {selectedEvent.props.peserta && (
                  <DetailRow label="Jumlah Peserta" value={`${selectedEvent.props.peserta} orang`} />
                )}
                <div className="col-span-2"><DetailRow label="Organisasi / Instansi" value={selectedEvent.props.organization} /></div>
                <DetailRow label="Waktu" value={timeText(selectedEvent.props)} />
                <div>
                  <p className="text-[11px] uppercase tracking-widest text-slate-500 font-semibold mb-0.5">Status</p>
                  <span
                    className={`inline-block px-2.5 py-1 text-xs font-bold rounded-md capitalize ${
                      String(selectedEvent.props.status).toLowerCase() === "pending"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-emerald-100 text-emerald-800"
                    }`}
                  >
                    {selectedEvent.props.status}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        .fc {
          background: transparent;
          font-family: ui-sans-serif, system-ui, sans-serif;
          color: #0f172a;
        }
        .fc-theme-standard td, .fc-theme-standard th, .fc-theme-standard .fc-scrollgrid {
          border-color: #e2e8f0;
        }
        .fc-scrollgrid {
          border-radius: 12px;
          overflow: hidden;
          background: #fff;
        }
        .fc-col-header-cell {
          background: #f8fafc;
          padding: 10px 0;
        }
        .fc-col-header-cell-cushion {
          color: #1e293b;
          font-weight: 700;
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          text-decoration: none;
        }
        .fc-daygrid-day { background: #fff; transition: background 0.12s; cursor: pointer; }
        .fc-daygrid-day:hover { background: #f8fafc; }
        .fc-day-today { background: #eef2ff !important; }
        .fc-day-today .fc-daygrid-day-number {
          background: #6366f1;
          color: #fff !important;
          border-radius: 50%;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 4px;
          font-size: 12px;
        }
        .fc-daygrid-day-number {
          color: #0f172a;
          font-weight: 600;
          margin: 4px;
          text-decoration: none;
          font-size: 12px;
        }
        .fc-toolbar-title {
          color: #0f172a;
          font-size: 1rem !important;
          font-weight: 800;
        }
        .fc-toolbar.fc-header-toolbar { margin-bottom: 1.25rem !important; }
        .fc-button-group { display: flex; gap: 8px; }
        .fc-button-group .fc-button, .fc-button {
          background: #ffffff !important;
          border: 1px solid #cbd5e1 !important;
          color: #1e293b !important;
          font-weight: 600;
          font-size: 0.8rem !important;
          border-radius: 10px !important;
          padding: 6px 14px !important;
          box-shadow: 0 1px 1px rgba(0,0,0,0.02) !important;
          transition: all 0.2s ease;
          cursor: pointer;
          margin: 0 2px !important;
        }
        .fc-button:hover {
          background: #f1f5f9 !important;
          color: #0f172a !important;
          border-color: #94a3b8 !important;
        }
        .fc-button-active,
        .fc-button-primary:not(:disabled).fc-button-active {
          background: #6366f1 !important;
          color: #ffffff !important;
          border-color: #4f46e5 !important;
        }
        .fc-icon { font-size: 1.2em; color: #1e293b; }
        .fc-button-active .fc-icon { color: #ffffff; }

        .fc-event {
          border-radius: 5px !important;
          padding: 2px 6px !important;
          cursor: pointer;
          transition: filter 0.1s, transform 0.1s;
          margin-bottom: 2px !important;
          font-size: 11px !important;
          font-weight: 600 !important;
        }
        .fc-event:hover { filter: brightness(0.95); transform: translateY(-1px); }
        .fc-event-title, .fc-event-time {
          font-size: 11px !important;
          font-weight: 600 !important;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .fc-timegrid-slot { height: 44px !important; cursor: pointer; }
        .fc-timegrid-slot-label { color: #475569; font-size: 11px; font-weight: 500; }
        .fc-more-link { color: #6366f1; font-size: 11px; font-weight: 600; }
      `}</style>
    </div>
  );
}