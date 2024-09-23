import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"
import Signup from "./Components/Signup"
import LoginPage from "./Components/LoginPage"
import ProtectedPage from './Components/ProtectedPage'
import FinalLogin from "./Components/FinalLogin"
import EnvTest from "./Components/EnvTest"
import Profile from "./Components/Profile"
import UploadVideo from "./Client/UploadVideo"
import StreamPage from "./StreamPage/StreamPage"
import DynamicCard from "./Dynamic/DynamicCard"
import CardList from "./Dynamic/CardList"
import CardDetail from "./Dynamic/CardDetail"

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
        <Route path="/stream" element={<StreamPage />} />

        {/* CardLIst START*/}
        <Route path="/dynamic" element={<DynamicCard />} />
        <Route path="/cardlist" element={<CardList />} />
        <Route path="/card/:id" element={<CardDetail />} />
        {/* CardList END */}
      </Routes>
    </Router>
  </>

}