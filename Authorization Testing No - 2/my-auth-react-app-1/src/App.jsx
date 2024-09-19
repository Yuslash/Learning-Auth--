import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"
import Signup from "./Components/Signup"

export default function App() {

  return <>
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  </>

}