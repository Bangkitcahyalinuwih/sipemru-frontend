import { motion } from "motion/react";
import { Building2, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const rooms = [
  {
    id: 1,
    name: "Ruang A-201",
    building: "Gedung A",
    capacity: 40,
    status: "available",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
  },
  {
    id: 2,
    name: "Lab Komputer B-301",
    building: "Gedung B",
    capacity: 30,
    status: "available",
    image:
      "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=600&fit=crop",
  },
  {
    id: 3,
    name: "Ruang Meeting C-101",
    building: "Gedung C",
    capacity: 15,
    status: "full",
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop",
  },
];

const Card = ({ children }) => (
  <div className="relative bg-white/80 backdrop-blur-md rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
    {children}
  </div>
);

const Badge = ({ status }) => (
  <span
    className={`px-3 py-1 text-xs font-semibold rounded-full
    ${status === "available"
        ? "bg-green-500 text-white"
        : "bg-red-500 text-white"}`}
  >
    {status === "available" ? "Tersedia" : "Penuh"}
  </span>
);

const Button = ({ status, onClick }) => (
  <button
    disabled={status === "full"}
    onClick={onClick}
    className={`w-full py-2.5 rounded-xl text-sm font-medium
    ${status === "available"
        ? "bg-indigo-600 text-white hover:shadow-lg"
        : "bg-gray-200 text-gray-500 cursor-not-allowed"}`}
  >
    {status === "available" ? "Booking Sekarang" : "Tidak Tersedia"}
  </button>
);

export function RoomList() {
  const navigate = useNavigate();

  const handleBooking = (roomId, roomName) => {
    navigate("/booking", { state: { roomId, roomName } });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold mb-6">Ruangan Tersedia</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room, index) => (
          <motion.div
            key={room.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <img
                src={room.image}
                alt={room.name}
                className="h-48 w-full object-cover"
              />

              <div className="p-4">
                <h3 className="font-semibold">{room.name}</h3>
                <p className="text-sm text-gray-500">{room.building}</p>
                <p className="text-sm">{room.capacity} Orang</p>

                <div className="mt-2 mb-3">
                  <Badge status={room.status} />
                </div>

                <Button
                  status={room.status}
                  onClick={() => handleBooking(room.id, room.name)}
                />
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}