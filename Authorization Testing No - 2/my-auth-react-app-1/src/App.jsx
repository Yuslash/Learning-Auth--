import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"
import Signup from "./Components/Signup"
import LoginPage from "./Components/LoginPage"
import ProtectedPage from './Components/ProtectedPage'
import FinalLogin from "./Components/FinalLogin"

export default function App() {

  return <>
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/Protected" element={<ProtectedPage />} />
        <Route path="/FinalLogin" element={<FinalLogin />} />
      </Routes>
    </Router>
  </>

}