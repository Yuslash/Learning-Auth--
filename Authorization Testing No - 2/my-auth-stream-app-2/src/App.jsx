import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Signup from "./Auth/Signup"
import Protected from "./Page/Protected"
import Login from "./Auth/Login"
import Uploads from "./Uploads/Uploads"
import CardList from "./Page/CardList"
import AnimationTest from "./Animations/AnimationTest"
import CardDetail from "./Page/CardDetail"
import CardSet from "./Server/CardSet"

export default function App()
{
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/protected" element={<Protected />} />
        <Route path="/login" element={<Login />} />
        <Route path="/upload" element={<Uploads />} />
        <Route path="/list" element={<CardList />} />
        <Route path="/set" element={<CardSet />} />
        <Route path="/anima" element={<AnimationTest />} />
        <Route path="/card/:id" element={<CardDetail />} />
      </Routes>
    </Router>
  )
}