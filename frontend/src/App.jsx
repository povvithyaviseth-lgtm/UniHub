import { Route, Routes } from "react-router-dom"
import AdminLogin from "./pages/AdminLogin.jsx"

function App() {
  return (
    <Routes>
      <Route path="/admin" element={<AdminLogin/>} />
      {/* Add more routes here */}
    </Routes>
  )
}

export default App