import { Routes, Route } from 'react-router-dom'
import Signup from './Signup.jsx'
import HomePage from './HomePage.jsx'
import StudentLogin from './StudentLogin.jsx'
import AdminLogin from './AdminLogin.jsx'
import AdminConsole from './AdminConsole.jsx'
import ClubManagement from './ClubManagement.jsx'


function App() {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />              {/* Default landing page */}
      <Route path="/home" element={<HomePage />} />
      <Route path="/student-login" element={<StudentLogin />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/admin-console" element={<AdminConsole />} />
      <Route path="/club-management" element={<ClubManagement />} />
    </Routes>
  )
}

export default App
