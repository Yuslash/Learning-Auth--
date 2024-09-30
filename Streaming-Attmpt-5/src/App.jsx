import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Signup from "./Auth/Signup"
import Protected from "./Page/Protected"
import Login from "./Auth/Login"
import CardList from "./Page/CardList"
import AnimationTest from "./Animations/AnimationTest"
import CardDetail from "./Page/CardDetail"
import MainStream from "./Turbo/MainStream"
import Dashboard from "./Uploads/Dashboard"
import SearchPage from "./Page/SearchPage"
import mainstreamData from './Server/mainstream.json'
import MainCardDetails from "./Page/MainCardDetails"

export default function App()
{
  

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/protected" element={<Protected />} />
        <Route path="/login" element={<Login />} />
        <Route path="/upload" element={<Dashboard />} />
        <Route path="/list" element={<CardList />} />
        <Route path="/anima" element={<AnimationTest />} />
        <Route path="/card/:id" element={<CardDetail />} />
        <Route path="/main/:id" element={<MainCardDetails />} />
        <Route path="/main" element={<MainStream />} />
        <Route path="/search" element={<SearchPage userData={mainstreamData} />} />
      </Routes>
    </Router>
  )
}