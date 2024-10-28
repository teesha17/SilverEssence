import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import HomePage from './Components/Home/Home'
import AdminPage from './Components/Admin/Admin'
import AdminLogin from './Components/Admin/AdminLogin'

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path='/home' element={<HomePage/>}/>
        <Route path='/admins' element={<AdminPage/>}/>
        <Route path='/adminlogin' element={<AdminLogin/>}/>
      </Routes>
    </Router>
    </>
  )
}
export default App
