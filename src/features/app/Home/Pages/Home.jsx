import { Hero } from '../components/hero';
import { Stats } from '../components/stats';
import { RoomList } from '../components/roomList';
import { CardPeminjaman } from '../components/CardPeminjaman';

export function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative z-0">
        <Hero />
      </div>
      <div className="relative mt-16 pt-1.5 z-0">
        <Stats />
      </div>
      <div className="relative z-50">
        <RoomList />
      </div>
      <div className="relative z-0">
        <CardPeminjaman></CardPeminjaman>
      </div>
    </div>
  );
}