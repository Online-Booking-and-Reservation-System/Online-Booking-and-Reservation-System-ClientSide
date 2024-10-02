import { useState } from 'react'
import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Navbar from '../src/components/shared components/Navbar/Navbar';
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';

function App() {
  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navbar />}>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/login' element={<Login />}/>
          </Route>
        </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
