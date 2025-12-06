import { Route, Routes } from "react-router-dom"
import AdminLogin from "./pages/Admin/AdminLogin.jsx"
import StudentLogin from "./pages/Student/StudentLogin.jsx"   
import HomePage from "./pages/Student/HomePage.jsx"
import SignUp from "./pages/Student/SignUp.jsx"

import ClubManagement from "./pages/ClubOwner/ClubManagementPage.jsx"
import ClubDashboard from "./pages/ClubOwner/ClubDashboard.jsx";
import AdminDashboard from "./pages/Admin/AdminDashboard.jsx"



function App() {
  return (
    <Routes>
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/" element={<StudentLogin />} />   
      <Route path="/home" element={<HomePage />} />
      <Route path="/signup" element={<SignUp />} />
      
      <Route path="/console/clubs" element={<ClubManagement />} />
      <Route path="/console/clubs/:clubId" element={<ClubDashboard />} />

      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      
      {/* Add more routes here */}
    </Routes>
  )
}

export default App