import { Route, Routes } from "react-router-dom"
import AdminLogin from "./pages/AdminLogin.jsx"
import StudentLogin from "./pages/StudentLogin.jsx"   // 👈 add this import
import Announcements from "./pages/announcements.jsx"

function App() {
  return (
    <Routes>
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/student" element={<StudentLogin />} />   {/* 👈 new route */}
      <Route path="/announcements" element={<Announcements />} />

      {/* Add more routes here */}
    </Routes>
  )
}

export default App