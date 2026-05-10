import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import { AdminLayout } from "./layouts/AdminLayout";
import { UserLayout } from "./layouts/UserLayout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<UserLayout />} />
        <Route path="/admin/*" element={<AdminLayout />} />
      </Routes>
    </Router>
  );
}

export default App;