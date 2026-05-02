// App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AdminLayout from './layouts/AdminLayout'
import { Home } from './features/app/Home/Pages/Home'
import { Booking } from './features/app/Home/Pages/Booking'
import { History } from './features/app/Home/Pages/History'
import { Navbar } from './features/app/Home/components/navbar'

function AppContent() {
  return (
    <Routes>
      <Route 
        path="/" 
        element={
          <>
            <Navbar />
            <Home />
          </>
        } 
      />
      <Route 
        path="/booking" 
        element={
          <>
            <Navbar />
            <Booking />
          </>
        } 
      />
      <Route 
        path="/history" 
        element={
          <>
            <Navbar />
            <History />
          </>
        } 
      />
      <Route path="/admin/*" element={<AdminLayout />} />
    </Routes>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App