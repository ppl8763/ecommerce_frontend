import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './User/Login'
import Signup from './User/Signup'
import ProtectedRoute from './routes/ProtectedRoute'
import RoleBasedRoute from './routes/RoleBasedRoute'
import Dashboard from './pages/Dashboard'
import AdminDashboard from './pages/AdminDashboard'
import Add_items from './Admin/Add_items'
import Product_list from './Admin/Product_list'
import Update_items from './Admin/Update_item'
import All_products from './Product/All_products'
import Cart from './Cart/Cart'
const Admin = () => <h1>Admin Dashboard</h1>
const User = () => <h1>User Dashboard</h1>
const Unauthorized = () => <h1>Access Denied</h1>

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<All_products/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/unauthorized' element={<Unauthorized/>}/>

        <Route path='/admin' element={
          <ProtectedRoute>
            <RoleBasedRoute allowedRole="admin">
              <AdminDashboard/>
            </RoleBasedRoute>
          </ProtectedRoute>
        }/>
        <Route path='/add_items' element={
          <ProtectedRoute>  ``
            <RoleBasedRoute allowedRole="admin">
              <Add_items/>
            </RoleBasedRoute>
          </ProtectedRoute>
        }/>
        <Route path='/show_list' element={
          <ProtectedRoute>  ``
            <RoleBasedRoute allowedRole="admin">
              <Product_list/>
            </RoleBasedRoute>
          </ProtectedRoute>
        }/>
        <Route path="/update/:id" element={
          <ProtectedRoute>  ``
            <RoleBasedRoute allowedRole="admin">
              <Update_items/>
            </RoleBasedRoute>
          </ProtectedRoute>
        }/>
        <Route path='/user' element={
          <ProtectedRoute>
            <RoleBasedRoute allowedRole="user">
              <Dashboard/>
            </RoleBasedRoute>
          </ProtectedRoute>
        }/>
        <Route path='/user_cart' element={
          <ProtectedRoute>
            <RoleBasedRoute allowedRole="user">
              <Cart/>
            </RoleBasedRoute>
          </ProtectedRoute>
        }/>
      </Routes>
    </BrowserRouter>
  )
}

export default App