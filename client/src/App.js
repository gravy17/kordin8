import React from 'react'
import HomePage from './pages/home/Home'
import Login from './pages/loginpage/Login'
import Signup from './pages/signup/Signup'
import RegisterAdmin from './pages/admin/Register'
import RegisterAgent from './pages/agentDashboard/Register'
import RegisterCustomer from './pages/custormerDashboard/Register'
import Admin from './pages/admin/Admin'

import {BrowserRouter as Router,Switch,Route,Link, BrowserRouter, Routes} from "react-router-dom";


function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
        <Route path="/" index element={<HomePage/>} />
          <Route path="admin" index element={<Admin />} />
            <Route path="login" element={<Login/>} />
            {/* <Route path="register" element={<Signup />} /> */}
            <Route path="register" element={<RegisterAdmin />} />
            <Route path="register" element={<RegisterCustomer />} />
            <Route path="register" element={<RegisterAgent />} />
           
        </Routes>
      </BrowserRouter>
  
    </div>
  );
}

export default App


