
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Contact from './pages/Contact'
import About from './pages/About'
import Courses from './pages/AllCourses'
import Profile from './pages/Profile'
import Classroom from './pages/Classroom'
import SingleClass from './pages/SingleClass'
import SearchNotes from './pages/SearchNotes'
import Reward from './pages/Reward'

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
          <Route path='/classroom/:classCode' element={<SingleClass/>}/>
          <Route path='/searchnotes' element={<SearchNotes/>}/>
          <Route path='/reward' element={<Reward/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
