import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import SignUp from './pages/SignUp'
import LogIn from './pages/LogIn'
import Home from './pages/Home'
import { useEffect } from 'react'
import { useAuthStore } from './store/useAuthStore.js'

import { Loader } from 'lucide-react'
import Footer from './components/Footer.jsx'
import ProfileUpdate from './pages/ProfileUpdate.jsx'




function App() {

  const { checkAuth, isCheckingAuth, authUser } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);


  if (isCheckingAuth && !authUser) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Loader className='size-10 animate-spin bg-base-100' />
      </div>
    )
  }


  return (
    <div>

      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={authUser ? <Home /> : <Navigate to="login" />} />
        <Route path="/login" element={!authUser ? <LogIn /> : <Navigate to="/" />} />
        <Route path="/signup" element={!authUser ? <SignUp /> : <Navigate to="/" />} />
        <Route path="/profile" element={authUser ? <ProfileUpdate /> : <Navigate to="login" />}/>
      </Routes>

      {/* <Footer/> */}
    </div>
  )
}

export default App
