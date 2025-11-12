import { Route, Routes } from "react-router-dom"
import AdminLogin from "./pages/AdminLogin.jsx"
import StudentLogin from "./pages/StudentLogin.jsx"   
import HomePage from "./pages/HomePage.jsx"
import SignUp from "./pages/SignUp.jsx"
import ClubManagement from "./pages/ClubManagement.jsx"


function App() {
  return (
    <Routes>
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/" element={<StudentLogin />} />   
      <Route path="/home" element={<HomePage />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/clubmanagement" element={<ClubManagement />} />
      {/* Add more routes here */}
    </Routes>
  )
}

export default App