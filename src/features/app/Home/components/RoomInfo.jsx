import { Users, Building2 } from "lucide-react";

export function RoomInfo({ room }) {
  return (
    <>
      <h1 className="text-2xl font-bold">{room.name}</h1>

      <p className="text-gray-600">{room.description}</p>

      <div className="flex gap-6 text-sm text-gray-600">
        <span className="flex items-center gap-1">
          <Building2 size={16} /> {room.building}
        </span>

        <span className="flex items-center gap-1">
          <Users size={16} /> {room.capacity} orang
        </span>
      </div>
    </>
  );
}