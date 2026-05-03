import { useLocation, useNavigate } from "react-router-dom";

import { BackButton } from "../components/BackButton";
import { RoomDetailCard } from "../components/roomDetaiil";

export function RoomDetailPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) return <div>Room tidak ditemukan</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-5xl mx-auto px-4">
        <BackButton onClick={() => navigate(-1)} />

        <RoomDetailCard
          room={state}
          onBooking={() =>
            navigate("/booking", {
              state: {
                roomName: state.name,
                roomId: state.id,
              },
            })
          }
        />
      </div>
    </div>
  );
}