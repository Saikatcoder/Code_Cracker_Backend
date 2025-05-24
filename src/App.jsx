import React from 'react'
import { Route,  Navigate, Routes } from 'react-router-dom'
import { LoginPage } from './pages/LoginPage'
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignupPage.jsx'

const App = () => {
  let authUser = null;
  return (
    <div className='flex justify-center items-center flex-col'>
      <Routes>
        <Route path='/' element={authUser ? <HomePage/> : <Navigate to={"/login"}/>}/>
        <Route path='/login' element={!authUser ? <LoginPage/> : <Navigate to={"/"} />}/>
        <Route path='/signup' element={!authUser ? <SignUpPage/> : <Navigate to={"/"}/>}/>
        <Route path="/problem/:id" element={authUser ? <ProblemPage/> : <Navigate to={"<Login/>"}/>}/>
      </Routes>
    </div>
  )
}
export default App



