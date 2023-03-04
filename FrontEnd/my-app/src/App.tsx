import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './components/views/Home'
import CreatePost from './components/CreatePost'
import Login from './components/views/Login'
import Logout from './components/views/Logout'
import Navbar from './components/Navbar'
import SingUp from './components/views/SignUp'
import { useState } from 'react'
import HelloWorld from './components/views/HelloWorld'

function App() {
  const [isAuth, setIsAuth] = useState<boolean>(false);

  return (
    <Router>
      <Navbar isAuth={isAuth} />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/helloworld' element={<HelloWorld />}></Route>
        <Route path='/create_post' element={<CreatePost />}></Route>
        <Route path='/signup' element={<SingUp />}></Route>
        <Route path='/login' element={<Login setIsAuth={setIsAuth} />}></Route>
        <Route path='/logout' element={<Logout setIsAuth={setIsAuth} />}></Route>
      </Routes>
    </Router>
  )
}

export default App
