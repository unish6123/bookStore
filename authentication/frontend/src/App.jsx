
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from '../pages/home.jsx'
import LogIn from '../pages/login.jsx'
import Navbar from './components/navbar.jsx'
import BrowseBooks from '../pages/browseBooks.jsx'
import PasswordReset from '../pages/passwordReset.jsx'
import VerifyOtp from '../pages/verifyResetOtp.jsx'
import BookContent from '../pages/bookContent.jsx'

function App() {


  return (

    <>
    <Navbar />
      <Routes>
        <Route path = "/" element = {<Home />} />
        <Route path = "/login" element = {<LogIn />} />
        <Route path = "/browseBooks" element = {<BrowseBooks />} />
        <Route path = "/passwordReset" element = {<PasswordReset />} />
        <Route path = "/verifyOtp" element = {<VerifyOtp />} />
        <Route path = "/bookContent/:bookId" element = {<BookContent />} />
        
      </Routes>
       
    </>
  )
}

export default App
