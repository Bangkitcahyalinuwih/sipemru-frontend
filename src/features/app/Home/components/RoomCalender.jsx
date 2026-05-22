import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import idLocale from "@fullcalendar/core/locales/id";
import { getSchedulesByRoomId } from "../../../Admin/Schedule/service/ScheduleService";
import { getBookings } from "../../../Admin/Booking/service/BookingService";

const dayMap = {
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
};

export default function RoomCalendar({ room }) {
  const [schedules, setSchedules] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    if (room?.id) {
      fetchCalendarData();
    }
  }, [room?.id]);

  const fetchCalendarData = async () => {
    try {
      const scheduleData = await getSchedulesByRoomId(room.id);
      const bookingData = await getBookings();
      const filteredBookings = bookingData.filter(
        (item) => item.room_id === room.id && item.status === "approved",
      );
      setSchedules(scheduleData);
      setBookings(filteredBookings);
    } catch (error) {
      console.error(error);
    }
  };

  const scheduleEvents = schedules.map((item) => ({
    id: `schedule-${item.id}`,
    title: `📘 ${item.course_name}`,
    daysOfWeek: [dayMap[item.day_of_week]],
    startTime: item.start_time,
    endTime: item.end_time,
    backgroundColor: "#6366f1",
    borderColor: "#6366f1",
    extendedProps: {
      type: "schedule",
      lecturer: item.lecturer,
      kelas: item.kelas,
      prodi: item.prodi,
      semester: item.semester,
    },
  }));

  const bookingEvents = bookings.map((item) => ({
    id: `booking-${item.id}`,
    title: `🏢 ${item.purpose}`,
    start: `${item.booking_date}T${item.start_time}`,
    end: `${item.booking_date}T${item.end_time}`,
    backgroundColor: "#10b981",
    borderColor: "#10b981",
    extendedProps: {
      type: "booking",
      status: item.status,
      organization: item.organization,
      pic: item.pic_name,
      peserta: item.jumlah_peserta,
    },
  }));

  const events = [...scheduleEvents, ...bookingEvents];

  return (
    <div
      className="
        relative overflow-hidden
        rounded-[30px]
        border border-white/40
        bg-white/70
        backdrop-blur-2xl
        shadow-[0_8px_30px_rgba(0,0,0,0.12)]
        p-6
      "
    >
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-500/30 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/30 blur-[100px] rounded-full pointer-events-none" />
      <div className="relative z-10">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-800 tracking-tight">
            Jadwal & Booking
          </h2>

          <p className="text-sm text-gray-600 mt-1 opacity-80">
            Kalender penggunaan ruangan{" "}
            <span className="font-semibold text-indigo-600">{room?.name}</span>
          </p>
        </div>

        <div className="flex flex-wrap gap-4 mb-6 text-xs font-medium text-gray-700">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/40 border border-white/50 backdrop-blur-sm shadow-sm">
            <div className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
            <span>Jadwal Kuliah</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/40 border border-white/50 backdrop-blur-sm shadow-sm">
            <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
            <span>Ruangan Dibooking</span>
          </div>
        </div>

        <div
          className="
            rounded-2xl
            border border-white/40
            bg-white/40
            backdrop-blur-md
            p-2
            shadow-inner
          "
        >
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            locale={idLocale}
            initialView="dayGridMonth"
            selectable={true}
            editable={false}
            weekends={true}
            height="auto"
            events={events}
            slotMinTime="07:00:00"
            slotMaxTime="18:00:00"
            slotLabelFormat={{
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            }}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek",
            }}
            buttonText={{
              today: "Hari Ini",
              month: "Bulan",
              week: "Minggu",
            }}
            dayHeaderFormat={{
              weekday: "long",
            }}
            
            dateClick={(info) => {
              const clickedDate = info.date;
              const dayNumber = clickedDate.getDay();
              const hasSchedule = schedules.some(
                (item) => dayMap[item.day_of_week] === dayNumber,
              );

              if (hasSchedule) {
                alert(` Ruangan sedang digunakan untuk jadwal kuliah `);
                return;
              }

              alert(`
                    Booking tanggal:
                    ${info.dateStr}

                    Ruangan:
                    ${room?.name}
              `);
            }}
            eventClick={(info) => {
              const props = info.event.extendedProps;
              setSelectedEvent({ event: info.event, props });
            }}
          />
        </div>

        {/* Info Panel */}
        {selectedEvent && (
          <div className="mt-6 rounded-2xl border border-white/40 bg-white/60 backdrop-blur-md p-6 shadow-lg">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-black">
                {selectedEvent.props.type === "schedule" ? "JADWAL KULIAH" : "BOOKING RUANGAN"}
              </h3>
              <button
                onClick={() => setSelectedEvent(null)}
                className="text-gray-600 hover:text-black transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {selectedEvent.props.type === "schedule" ? (
              <div className="space-y-3 text-black">
                <div>
                  <p className="text-sm text-gray-700 font-medium">Mata Kuliah</p>
                  <p className="text-base font-semibold">{selectedEvent.event.title}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-700 font-medium">Kelas</p>
                    <p className="text-base font-semibold">{selectedEvent.props.kelas}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-700 font-medium">Semester</p>
                    <p className="text-base font-semibold">{selectedEvent.props.semester}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-700 font-medium">Dosen</p>
                  <p className="text-base font-semibold">{selectedEvent.props.lecturer}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-700 font-medium">Prodi</p>
                  <p className="text-base font-semibold">{selectedEvent.props.prodi}</p>
                </div>
              </div>
            ) : (
              <div className="space-y-3 text-black">
                <div>
                  <p className="text-sm text-gray-700 font-medium">Kegiatan</p>
                  <p className="text-base font-semibold">{selectedEvent.event.title}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-700 font-medium">PIC</p>
                    <p className="text-base font-semibold">{selectedEvent.props.pic}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-700 font-medium">Peserta</p>
                    <p className="text-base font-semibold">{selectedEvent.props.peserta} orang</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-700 font-medium">Organisasi</p>
                  <p className="text-base font-semibold">{selectedEvent.props.organization}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-700 font-medium">Status</p>
                  <p className="text-base font-semibold capitalize">{selectedEvent.props.status}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        .fc {
          background: transparent;
          font-family: 'Inter', sans-serif;
          color: #000 !important;
        }

        .fc-theme-standard td,
        .fc-theme-standard th,
        .fc-theme-standard .fc-scrollgrid {
          border-color: rgba(255, 255, 255, 0.2);
        }

        .fc-scrollgrid {
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .fc-col-header-cell {
          background: rgba(255, 255, 255, 0.4);
          backdrop-filter: blur(8px);
          padding: 16px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.3);
        }

        .fc-col-header-cell-cushion {
          color: #374151;
          font-weight: 700;
          text-transform: uppercase;
          font-size: 0.75rem;
          letter-spacing: 0.05em;
          text-decoration: none;
        }

        .fc-daygrid-day {
          background: transparent;
          transition: all 0.2s ease;
        }

        .fc-daygrid-day:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        .fc-day-today {
          background: rgba(99, 102, 241, 0.15) !important;
        }

        .fc-day-today .fc-daygrid-day-number {
          background: #6366f1;
          color: white !important;
          border-radius: 50%;
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 4px;
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
        }

        .fc-daygrid-day-number {
          color: #4b5563;
          font-weight: 600;
          margin: 8px;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .fc-toolbar {
          margin-bottom: 1.5rem !important;
        }

        .fc-toolbar-title {
          color: #111827;
          font-size: 1.25rem !important;
          font-weight: 800;
        }

        .fc-button {
          background: rgba(255, 255, 255, 0.5) !important;
          border: 1px solid rgba(255, 255, 255, 0.5) !important;
          color: #374151 !important;
          font-weight: 600;
          border-radius: 12px !important;
          padding: 8px 16px !important;
          backdrop-filter: blur(4px);
          transition: all 0.2s;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }

        .fc-button:hover {
          background: rgba(255, 255, 255, 0.8) !important;
          transform: translateY(-1px);
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }

        .fc-button-active {
          background: linear-gradient(135deg, #6366f1, #8b5cf6) !important;
          color: white !important;
          border-color: transparent !important;
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
        }

        .fc-event {
          border: none !important;
          border-radius: 10px !important;
          padding: 6px 10px !important;
          font-weight: 700;
          box-shadow: 0 4px 10px rgba(0,0,0,0.15);
          cursor: pointer;
          transition: transform 0.1s;
          min-height: 24px !important;
        }

        .fc-event:hover {
          transform: scale(1.03);
          z-index: 50;
        }

        .fc-event-title {
          font-size: 13px !important;
          font-weight: 700 !important;
          color: #000000 !important;
          line-height: 1.3 !important;
          text-shadow: 0 1px 2px rgba(255, 255, 255, 0.3);
        }

        .fc-event-time {
          color: #000000 !important;
          font-size: 11px !important;
          font-weight: 600 !important;
          text-shadow: 0 1px 2px rgba(255, 255, 255, 0.3);
        }

        .fc-timegrid-slot-label {
          color: #9ca3af;
          font-size: 0.75rem;
        }

        .fc-timegrid-slot {
          height: 48px !important;
          border-color: rgba(0,0,0,0.03);
        }

        .fc-timegrid-col.fc-day-today {
          background: rgba(255, 255, 255, 0.2);
        }

        .fc-scroller::-webkit-scrollbar {
          width: 4px;
          height: 4px;
        }

        .fc-scroller::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.1);
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
}