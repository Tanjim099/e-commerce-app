import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './components/Register'
import Login from './pages/Login'
import CartPage from './pages/cartPage'
import Order from './pages/Order'
import AdminDashboard from './pages/AdminDashboard'
import AdminOrder from './pages/AdminOrder'
import RequireAuth from './components/auth/RequireAuth'
import Denied from './pages/Denied'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/cart' element={<CartPage />} />
      <Route path='/order' element={<Order />} />
      <Route path='/denied' element={<Denied />} />

      <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
        <Route path='/admin/dashboard' element={<AdminDashboard />} />
        <Route path='/admin/orders' element={<AdminOrder />} />
      </Route>
    </Routes>
  )
}

export default App
