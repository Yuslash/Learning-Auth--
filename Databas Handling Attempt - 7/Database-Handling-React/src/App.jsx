import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CardInfo from './Components/CardInfo'
import SetUsername from './Components/SetUsername'
import Test from './Components/Test'
import SecondTest from './Components/SeondTest'
import ThirdTest from './Components/ThirdTest'
import Parameter from './Components/Parameter'

export default function App()
{
  return<>
    <BrowserRouter>
      <Routes>
        <Route path='/data/:username' element={<CardInfo />} />
        <Route path='/set' element={<SetUsername />} />
        <Route path='/test' element={<Test />} />
        <Route path='/secound' element={<SecondTest />} />
        <Route path='/third' element={<ThirdTest />} />
        <Route path='/para/:id' element={<Parameter />} />
      </Routes>
    </BrowserRouter>
  </>
}