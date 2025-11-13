import { Route, Routes } from "react-router-dom"
import AdminLogin from "./pages/AdminLogin.jsx"
import StudentLogin from "./pages/StudentLogin.jsx"   // 👈 add this import
import HomePage from "./pages/HomePage.jsx"
import ClubManagement from "./pages/ClubManagementPage.jsx"
import AdminPage from "./pages/AdminPage.jsx"


function App() {
  return (
    <Routes>
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/" element={<StudentLogin />} />   {/* 👈 new route */}
      <Route path="/home" element={<HomePage />} />
      <Route path="/clubManage" element={<ClubManagement />} />
      <Route path="/adminManage" element={<AdminPage />} />
      
      {/* Add more routes here */}
    </Routes>
  )
}

export default App