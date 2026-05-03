import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {AdminLayout} from "./layouts/AdminLayout";
import { Home } from "./features/app/Home/Pages/Home";
import { History } from "./features/app/Home/Pages/History";
import { Navbar } from "./features/app/Home/components/navbar";

import { Booking } from "./features/app/Home/Pages/Booking";
import { RoomDetailPage } from "./features/app/Home/Pages/roomDetail";
import RoomListPages from "./features/app/Home/Pages/RoomList";
import { HistoryDetailPage } from "./features/app/Home/Pages/HistoryDetailPages";

function AppContent() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/roomlist" element={<RoomListPages />} />
        <Route path="/history" element={<History />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/admin/*" element={<AdminLayout />} />
        <Route path="/room/:id" element={<RoomDetailPage />} />
        <Route path="/history/:id" element={<HistoryDetailPage />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;