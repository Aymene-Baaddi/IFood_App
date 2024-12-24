import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/sidebar/sidebar';
import Dashboard from './pages/Dashboard/Dashboard';
import Orders from './pages/Orders/Orders';
import MenuItems from './pages/MenuItems/MenuItems';
import Customers from './pages/Customers/Customers';
import './App.css';
import Login from './pages/Login/Login';

function App() {
  return (
    <Router>
    <div className="app-container">

    <Sidebar />
    
 
    <div className="page-content">
         <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/menuitems" element={<MenuItems/>} />
                <Route path="/customers" element={<Customers />} />
              </Routes>
    </div>
  </div>
</Router>
  );
}

export default App;

