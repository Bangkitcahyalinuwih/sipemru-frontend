import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { Suspense, lazy } from "react";

const AdminLayout = lazy(() => import("./layouts/AdminLayout").then(m => ({ default: m.AdminLayout })));
const UserLayout = lazy(() => import("./layouts/UserLayout").then(m => ({ default: m.UserLayout })));

const Loading = () => (
  <div className="flex items-center justify-center min-h-screen bg-[#0B0B12]">
    <div className="text-gray-400">Loading page...</div>
  </div>
);

function App() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/*" element={<UserLayout />} />
          <Route path="/admin/*" element={<AdminLayout />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;