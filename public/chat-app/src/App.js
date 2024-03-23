import React from 'react'
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Chat from './pages/ChatPage'
import Avatar from './pages/ChooseAvatar'
import {toast,ToastContainer} from 'react-toastify'
import axios from 'axios'
const App = () => {
  axios.defaults.withCredentials = true
  return (
    <BrowserRouter>
      <Routes>
      <Route path = 'register' element={<Register/>} ></Route>
      <Route path = 'login' element={<Login/>}></Route>
      <Route path = 'avatar' element={<Avatar/>}/>
      <Route path = '/' element={<Chat/>}></Route>
      </Routes>
      <ToastContainer/>
    </BrowserRouter>
  )
}

export default App
