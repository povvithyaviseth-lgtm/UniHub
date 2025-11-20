import { Route, Routes } from "react-router-dom"
import AdminLogin from "./pages/Admin/AdminLogin.jsx"
import StudentLogin from "./pages/Student/StudentLogin.jsx"   
import HomePage from "./pages/Student/HomePage.jsx"
import SignUp from "./pages/Student/SignUp.jsx"
import ClubManagement from "./pages/ClubOwner/ClubOwnerDashboard.jsx"
import PasswordRecovery from "./component/PasswordRecovery.jsx"


function App() {
  return (
    <Routes>
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/" element={<StudentLogin />} />   
      <Route path="/home" element={<HomePage />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/clubmanagement" element={<ClubManagement />} />
      <Route path="/PasswordRecovery" element={<PasswordRecovery />} />
      {/* Add more routes here */}
    </Routes>
  )
}

export default App