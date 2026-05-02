import { useLocation } from 'react-router-dom';
import { BookingForm } from '../components/BookingForm';

export function Booking() {
  const location = useLocation();
  const roomName = location.state?.roomName || '';

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <BookingForm roomName={roomName} />
    </div>
  );
}
