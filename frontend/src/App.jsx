import { Routes, Route } from 'react-router-dom'
import { Box } from '@chakra-ui/react'
import Signup from './pages/Signup.jsx'
import HomePage from './pages/HomePage.jsx'
import StudentLogin from './pages/StudentLogin.jsx'
import AdminLogin from './pages/AdminLogin.jsx'
import AdminConsole from './pages/AdminConsole.jsx'
import ClubManagement from './pages/ClubManagement.jsx'

function App() {
  return (
    <Box p={4}>
      <Routes>
        <Route path="/" element={<Signup />} />              
        <Route path="/home" element={<HomePage />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-console" element={<AdminConsole />} />
        <Route path="/club-management" element={<ClubManagement />} />
      </Routes>
    </Box>
  )
}

export default App
