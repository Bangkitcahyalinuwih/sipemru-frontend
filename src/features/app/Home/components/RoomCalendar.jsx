import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import idLocale from "@fullcalendar/core/locales/id";
import Swal from "sweetalert2";
import { getSchedulesByRoomId } from "../../../Admin/Schedule/service/ScheduleService";
import { getBookings } from "../../../Admin/Booking/service/BookingService";

const dayMap = {
  sunday: 0, minggu: 0,
  monday: 1, senin: 1,
  tuesday: 2, selasa: 2,
  wednesday: 3, rabu: 3,
  thursday: 4, kamis: 4,
  friday: 5, jumat: 5,
  saturday: 6, sabtu: 6,
};

export default function RoomCalendar({ room }) {
  const [schedules, setSchedules] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (room?.id) {
      fetchCalendarData();
    }
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

      const allBookings = await getBookings();
      const filteredBookings = (allBookings || []).filter(
        (item) =>
          Number(item.room_id) === Number(room.id) &&
          item.status?.toLowerCase() === "approved"
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

  const scheduleEvents = schedules.map((item) => {
    const dayString = String(item.day_of_week || "").toLowerCase().trim();
    const targetDayIndex = dayMap[dayString] ?? 1;
    const currentYear = new Date().getFullYear();

    return {
      id: `schedule-${item.id}`,
      title: `${item.course_name || "Mata Kuliah"} (${item.kelas || ""})`,
      daysOfWeek: [targetDayIndex],
      startTime: item.start_time || "07:00:00",
      endTime: item.end_time || "09:30:00",
      startRecur: `${currentYear}-01-01`,
      endRecur: `${currentYear}-12-31`,
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
    };
  });

  const bookingEvents = bookings.map((item) => ({
    id: `booking-${item.id}`,
    title: `${item.purpose || item.keperluan || "Booking Ruangan"}`,
    start: `${item.booking_date || item.tanggal_booking}T${item.start_time || "07:00:00"}`,
    end: `${item.booking_date || item.tanggal_booking}T${item.end_time || "17:00:00"}`,
    backgroundColor: "#d1fae5",
    borderColor: "#6ee7b7",
    textColor: "#064e3b",
    extendedProps: {
      type: "booking",
      status: item.status,
      organization: item.organization || item.nama_organisasi,
      pic: item.pic_name || item.nama_pic,
      peserta: item.jumlah_peserta,
      startTime: item.start_time,
      endTime: item.end_time,
    },
  }));

  const events = [...scheduleEvents, ...bookingEvents];

  const handleDateClick = (info) => {
    const dayNumber = info.date.getDay();
    const hasSchedule = schedules.some(
      (item) => dayMap[String(item.day_of_week || "").toLowerCase().trim()] === dayNumber
    );

    if (hasSchedule) {
      Swal.fire({
        icon: "info",
        title: "Ruangan Tidak Tersedia",
        html: `<p>Ruangan <strong>${room?.name}</strong> tidak dapat digunakan pada hari <strong>${info.date.toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</strong>.</p>
               <p class="text-red-500">⚠️ Terdapat jadwal kuliah rutin.</p>`,
        confirmButtonText: "Mengerti",
        confirmButtonColor: "#f97316",
        background: "#fff7ed",
        iconColor: "#f97316",
        timerProgressBar: true,
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Ruangan Tersedia!",
      html: `<div class="text-left">
              <p><strong>🗓️ Tanggal:</strong> ${info.date.toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</p>
              <p><strong>🏢 Ruangan:</strong> ${room?.name}</p>
              <p class="text-emerald-600 mt-2">✅ Anda dapat melakukan booking untuk ruangan ini pada tanggal tersebut.</p>
             </div>`,
      confirmButtonText: "Booking Sekarang",
      confirmButtonColor: "#10b981",
      showCancelButton: true,
      cancelButtonText: "Nanti",
      cancelButtonColor: "#64748b",
    }).then((result) => {
      if (result.isConfirmed) {
        // Arahkan ke halaman booking atau buka form booking
        // Sesuaikan dengan routing Anda
        window.location.href = `/booking?room=${room?.id}&date=${info.dateStr}`;
      }
    });
  };

  const handleEventClick = (info) => {
    setSelectedEvent({ event: info.event, props: info.event.extendedProps });
  };

  const DetailRow = ({ label, value }) => (
    <div>
      <p className="text-[11px] uppercase tracking-widest text-slate-500 font-semibold mb-0.5">{label}</p>
      <p className="text-sm font-medium text-slate-800">{value || "-"}</p>
    </div>
  );

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
            selectable
            editable={false}
            weekends
            height="auto"
            events={events}
            slotMinTime="07:00:00"
            slotMaxTime="21:00:00"
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
                <DetailRow
                  label="Waktu"
                  value={
                    selectedEvent.props.startTime && selectedEvent.props.endTime
                      ? `${selectedEvent.props.startTime.slice(0, 5)} – ${selectedEvent.props.endTime.slice(0, 5)}`
                      : null
                  }
                />
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                <div className="col-span-2"><DetailRow label="Tujuan Kegiatan" value={selectedEvent.event.title} /></div>
                <DetailRow label="Penanggung Jawab (PIC)" value={selectedEvent.props.pic} />
                <DetailRow label="Jumlah Peserta" value={selectedEvent.props.peserta ? `${selectedEvent.props.peserta} orang` : null} />
                <div className="col-span-2"><DetailRow label="Organisasi / Instansi" value={selectedEvent.props.organization} /></div>
                <DetailRow
                  label="Waktu"
                  value={
                    selectedEvent.props.startTime && selectedEvent.props.endTime
                      ? `${selectedEvent.props.startTime.slice(0, 5)} – ${selectedEvent.props.endTime.slice(0, 5)}`
                      : null
                  }
                />
                <div>
                  <p className="text-[11px] uppercase tracking-widest text-slate-500 font-semibold mb-0.5">Status</p>
                  <span className="inline-block px-2.5 py-1 text-xs font-bold bg-emerald-100 text-emerald-800 rounded-md capitalize">
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
        .fc-daygrid-day { background: #fff; transition: background 0.12s; }
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

        /* Event chip — teks hitam di atas background pastel */
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

        .fc-timegrid-slot { height: 44px !important; }
        .fc-timegrid-slot-label { color: #475569; font-size: 11px; font-weight: 500; }
        .fc-more-link { color: #6366f1; font-size: 11px; font-weight: 600; }
      `}</style>
    </div>
  );
}