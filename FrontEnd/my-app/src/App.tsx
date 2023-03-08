import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useState } from 'react'
import Index from './components/views/Index'
import Home from './components/views/Home'
import Login from './components/views/auth/Login'
import Logout from './components/views/auth/Logout'
import Navbar from './components/Navbar'
import SignUp from './components/views/auth/SignUp'
import Title from './components/Title'
import NoMatch from './components/views/NoMatch'
import TaskList from './components/views/TaskList'

function App() {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [completeTodos, setCompleteTodos] = useState([]);

  return (
    <Router>
      {isAuth ? <Navbar isAuth={isAuth} /> : <Title />}
      <Routes>
        <Route path='/' element={<Index isAuth={isAuth} />}></Route>
        <Route path='/home' element={<Home completeTodos={completeTodos}/>}></Route>
        <Route path='/task_list' element={<TaskList setCompleteTodos={setCompleteTodos} />}></Route>
        <Route path='/signup' element={<SignUp />}></Route>
        <Route path='/login' element={<Login setIsAuth={setIsAuth} />}></Route>
        <Route path='/logout' element={<Logout setIsAuth={setIsAuth} />}></Route>
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </Router>
  )
}

export default App
