import { Hero } from '../components/Hero';
import { Stats } from '../components/Stats';
import { RoomList } from '../components/RoomList';

export function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Hero />
      <Stats />
      <RoomList />
    </div>
  );
}
