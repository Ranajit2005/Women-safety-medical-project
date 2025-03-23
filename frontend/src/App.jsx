import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SignUp from './pages/SignUp';


function App() {
  let a = false;

  return (
  
    
      <Routes>
        <Route path='/' element={ a ? <Home/> : <SignUp/>}/>
      </Routes>
    
  )
}

export default App
