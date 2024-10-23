
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Contact from './pages/Contact'
import About from './pages/About'
import Courses from './pages/AllCourses'
import Profile from './pages/Profile'
import Classroom from './pages/Classroom'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/"  element={<Home/>}/>
          <Route path="/signup"  element={<Signup/>}/>
          <Route path="/login"  element={<Login/>}/>
          <Route path='/courses' element={<Courses/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='classroom' element={<Classroom/>}/>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
