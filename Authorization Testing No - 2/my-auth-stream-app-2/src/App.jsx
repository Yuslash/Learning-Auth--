import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Signup from "./Auth/Signup"
import Protected from "./Page/Protected"
import Login from "./Auth/Login"

export default function App()
{
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/protected" element={<Protected />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  )
}