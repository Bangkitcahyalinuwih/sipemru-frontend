import { useLocation, useNavigate } from "react-router-dom";
import { BookingDetailCard } from "../components/History/BookingDetailCard";
import { BackButton } from "../components/BackButton";

export function HistoryDetailPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) return <div>Data tidak ditemukan</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-3xl mx-auto px-4">
        <BackButton onClick={() => navigate(-1)} />

        <BookingDetailCard booking={state} />
      </div>
    </div>
  );
}