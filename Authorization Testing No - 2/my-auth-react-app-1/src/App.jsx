import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"
import Signup from "./Components/Signup"
import LoginPage from "./Components/LoginPage"
import ProtectedPage from './Components/ProtectedPage'
import FinalLogin from "./Components/FinalLogin"
import EnvTest from "./Components/EnvTest"
import Profile from "./Components/Profile"
import UploadVideo from "./Client/UploadVideo"

export default function App() {

  return <>
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/Protected" element={<ProtectedPage />} />
        <Route path="/FinalLogin" element={<FinalLogin />} />
        <Route path="/ev" element={<EnvTest />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/upload" element={<UploadVideo />} />
      </Routes>
    </Router>
  </>

}