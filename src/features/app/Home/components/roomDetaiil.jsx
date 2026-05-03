
import { RoomCalendar } from "./RoomCalender";
import { RoomInfo } from "./RoomInfo";


export function RoomDetailCard({ room, onBooking }) {
  return (
    <div className="bg-white rounded-2xl shadow overflow-hidden">
      
      {/* IMAGE */}
      <img
        src={room.image}
        className="w-full h-72 object-cover"
      />

      {/* CONTENT */}
      <div className="p-6 space-y-4">
        <RoomInfo room={room} />

        < RoomCalendar/>

        <button
          onClick={onBooking}
          className="w-full py-2.5 rounded-xl text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 cursor-pointer"
        >
          Booking Ruangan
        </button>
      </div>
    </div>
  );
}