import { Route, Routes } from "react-router-dom"
import AdminLogin from "./pages/Admin/AdminLogin.jsx"
import StudentLogin from "./pages/Student/StudentLogin.jsx"   // 👈 add this import
//import Announcements from "./pages/announcements.jsx"
import HomePage from "./pages/Student/HomePage.jsx"
import SignUp from "./pages/Student/SignUp.jsx"
import ClubManagement from "./pages/ClubOwner/ClubOwnerDashboard.jsx"
import { PasswordRecovery } from "./component/PasswordRecovery.jsx"
import ManageAnnouncements from "./component/ClubOwnerComponent/ManageAnnoucement.jsx";
import Notification from "./component/StudentComponent/Notification.jsx"


function App() {
  return (
    <Routes>
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/StudentLogin" element={<StudentLogin />} />   {/* 👈 new route */}
      <Route path="/home" element={<HomePage/>}/>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/clubmanagement" element={<ClubManagement />} />
      <Route path="/password-recovery" element={<PasswordRecovery />} />
      <Route path="/ManageAnnouncement" element={<ManageAnnouncements />} />
      <Route path="/Notification" element={<Notification />} />


      {/* Add more routes here */}
    </Routes>
  )
}

export default App