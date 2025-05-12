import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/navbar/Navbar.jsx'
import Footer from './components/footer/Footer.jsx'
import Home from './pages/home/Home.jsx'
import Create from './pages/create/Create.jsx'
import Details from './pages/details/Details.jsx'
import Edit from './pages/edit/Edit.jsx'
export default function App() {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/create' element={<Create/>}></Route>
      <Route path='/details/:userId' element={<Details/>}></Route>
      <Route path='/edit/:userId' element={<Edit/>}></Route>

    </Routes>
    <Footer/>
    </>
  )
}
