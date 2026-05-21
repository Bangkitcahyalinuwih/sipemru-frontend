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
              if (props.type === "schedule") {
                alert(`
                    JADWAL KULIAH

                    Mata Kuliah:
                    ${info.event.title}

                    Kelas:
                    ${props.kelas}

                    Dosen:
                    ${props.lecturer}

                    Prodi:
                    ${props.prodi}

                    Semester:
                    ${props.semester}
                `);

                return;
              }
              if (props.type === "booking") {
                alert(`
                    BOOKING RUANGAN

                    Kegiatan:
                    ${info.event.title}

                    PIC:
                    ${props.pic}

                    Organisasi:
                    ${props.organization}

                    Peserta:
                    ${props.peserta}

                    Status:
                    ${props.status}
                `);
              }
            }}
          />
        </div>
      </div>

      <style>{`
        .fc {
          background: transparent;
          font-family: 'Inter', sans-serif;
          color: #1f2937;
        }

        .fc-theme-standard td,
        .fc-theme-standard th,
        .fc-theme-standard .fc-scrollgrid {
          border-color: rgba(
            255,
            255,
            255,
            0.2
          );
        }

        .fc-scrollgrid {
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid
            rgba(
              255,
              255,
              255,
              0.3
            );
        }

        .fc-col-header-cell {
          background: rgba(
            255,
            255,
            255,
            0.4
          );

          backdrop-filter: blur(8px);

          padding: 16px 0;

          border-bottom: 1px solid
            rgba(
              255,
              255,
              255,
              0.3
            );
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
          background: rgba(
            255,
            255,
            255,
            0.3
          );
        }

        .fc-day-today {
          background: rgba(
            99,
            102,
            241,
            0.15
          ) !important;
        }

        .fc-day-today
          .fc-daygrid-day-number {
          background: #6366f1;

          color: white !important;

          border-radius: 50%;

          width: 28px;
          height: 28px;

          display: flex;

          align-items: center;

          justify-content: center;

          margin: 4px;

          box-shadow:
            0 4px 12px
            rgba(
              99,
              102,
              241,
              0.4
            );
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
          background: rgba(
            255,
            255,
            255,
            0.5
          ) !important;

          border: 1px solid
            rgba(
              255,
              255,
              255,
              0.5
            ) !important;

          color: #374151 !important;

          font-weight: 600;

          border-radius: 12px !important;

          padding: 8px 16px !important;

          backdrop-filter: blur(4px);

          transition: all 0.2s;

          box-shadow:
            0 2px 4px
            rgba(0,0,0,0.05);
        }

        .fc-button:hover {
          background: rgba(
            255,
            255,
            255,
            0.8
          ) !important;

          transform: translateY(-1px);

          box-shadow:
            0 4px 6px
            rgba(0,0,0,0.1);
        }

        .fc-button-active {
          background: linear-gradient(
            135deg,
            #6366f1,
            #8b5cf6
          ) !important;

          color: white !important;

          border-color:
            transparent !important;

          box-shadow:
            0 4px 12px
            rgba(
              99,
              102,
              241,
              0.3
            );
        }

        .fc-event {
          border: none !important;

          border-radius: 10px !important;

          padding: 4px 8px !important;

          font-weight: 600;

          box-shadow:
            0 4px 10px
            rgba(0,0,0,0.1);

          cursor: pointer;

          transition:
            transform 0.1s;
        }

        .fc-event:hover {
          transform: scale(1.03);

          z-index: 50;
        }

        .fc-event-title {
          font-size: 11px;

          font-weight: 600;

          color: white;
        }

        .fc-event-time {
          color: rgba(
            255,
            255,
            255,
            0.9
          );

          font-size: 10px;
        }

        .fc-timegrid-slot-label {
          color: #9ca3af;

          font-size: 0.75rem;
        }

        .fc-timegrid-slot {
          height: 48px !important;

          border-color:
            rgba(0,0,0,0.03);
        }

        .fc-timegrid-col.fc-day-today {
          background: rgba(
            255,
            255,
            255,
            0.2
          );
        }

        .fc-scroller::-webkit-scrollbar {
          width: 4px;
          height: 4px;
        }

        .fc-scroller::-webkit-scrollbar-thumb {
          background: rgba(
            0,
            0,
            0,
            0.1
          );

          border-radius: 4px;
        }
      `}</style>
    </div>
  );
}
