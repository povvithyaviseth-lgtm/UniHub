import { Route, Routes } from "react-router-dom"
import AdminLogin from "./pages/Admin/AdminLogin.jsx"
import StudentLogin from "./pages/Student/StudentLogin.jsx"   
import HomePage from "./pages/Student/HomePage.jsx"
import SignUp from "./pages/Student/SignUp.jsx"
import ClubManagement from "./pages/ClubOwner/ClubManagementPage.jsx"
import ClubManagmentEventsPage from "./pages/ClubOwner/ClubManagmentEventsPage.jsx"
import ClubManagement from "./pages/ClubOwner/ClubOwnerDashboard.jsx"
import AdminDashboard from "./pages/Admin/AdminDashboard.jsx"

function App() {
  return (
    <Routes>
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/" element={<StudentLogin />} />   
      <Route path="/home" element={<HomePage />} />
      <Route path="/signup" element={<SignUp />} />
      
      <Route path="/clubManage" element={<ClubManagement />} />
      <Route path="/clubManageEvents" element={<ClubManagmentEventsPage />} />
      <Route path="/adminManage" element={<AdminPage />} />
      <Route path="/clubmanagement" element={<ClubManagement />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      {/* Add more routes here */}
    </Routes>
  )
}

export default App