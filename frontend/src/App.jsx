import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
// import Navbar from './components/Navbar'
import SignUp from './pages/SignUp'
import LogIn from './pages/LogIn'
import Home from './pages/Home'
import { useEffect } from 'react'
import { useAuthStore } from './store/useAuthStore.js'
import { useArticleStore } from './store/useArticleStore.js'

import { Loader } from 'lucide-react'
import Diseases from './pages/Disease.jsx'
// import Footer from './components/Footer.jsx'
import ProfileUpdate from './pages/ProfileUpdate.jsx'
import ArticlePage from './pages/ArticlePage.jsx'
import PostForm from './pages/PostForm.jsx'
import SubAndBody from './pages/SubAndBody.jsx'
import Product from './pages/Product.jsx'
import ChatWindow from './pages/ChatWindow.jsx'




function App() {

  const { checkAuth, isCheckingAuth, authUser } = useAuthStore();
  const { fetchArticle } = useArticleStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    fetchArticle();
  }, [fetchArticle]);


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
      <ChatWindow />
      <Routes>
        <Route path="/" element={authUser ? <Home /> : <Navigate to="login" />} />
        <Route path="/login" element={!authUser ? <LogIn /> : <Navigate to="/" />} />
        <Route path="/signup" element={!authUser ? <SignUp /> : <Navigate to="/" />} />
        <Route path="/profile" element={authUser ? <ProfileUpdate /> : <Navigate to="login" />} />
        <Route path="/articles" element={authUser ? <ArticlePage /> : <Navigate to="login" />} />
        <Route path="/form" element={authUser ? <PostForm /> : <Navigate to="login" />} />
        <Route path="/diseases" element={authUser ? <Diseases /> : <Navigate to="login" />} />
        <Route path="/subAndBody" element={authUser ? <SubAndBody /> : <Navigate to="login" />} />
        <Route path="/product" element={authUser ? <Product /> : <Navigate to="login" />} />
        <Route path="/articles" element={authUser ? <ArticlePage /> : <Navigate to="login" />} />
      </Routes>

      {/* <Footer/> */}
    </div>
  )
}

export default App
