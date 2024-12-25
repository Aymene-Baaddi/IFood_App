import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/sidebar/sidebar';
import Dashboard from './pages/Dashboard/Dashboard';
import Orders from './pages/Orders/Orders';
import MenuItems from './pages/MenuItems/MenuItems';
import Customers from './pages/Customers/Customers';
import Login from './pages/Login/Login';
import './App.css';
import Livreurs from './pages/Livreur/Livreur';
import AddLivreur from './pages/Livreur/AddLivreur';
import UpdateLivreur from './pages/Livreur/UpdateLivreur';
import Admin from './pages/Admin/Admin';
import AddMenuItem from './pages/MenuItems/AddMenuItem';



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  const handleLogin = () => {
    setIsLoggedIn(true); 
  };

  return (
    <Router>
      <div className="app-container">

        {isLoggedIn && <Sidebar />}
    
        <div className={isLoggedIn ? "page-content" : "page-content-login"}>
          <Routes>

            {!isLoggedIn ? (
              <Route path="/" element={<Login onLogin={handleLogin} />} />
            ) : (
              <>

                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/menuitems" element={<MenuItems />} />
                <Route path="/customers" element={<Customers />} />
                <Route path="/livreurs" element={<Livreurs />} />
                <Route path="/addlivreur" element={<AddLivreur />} />
                <Route path="/updatelivreur/:id" element={<UpdateLivreur />} />
                <Route path="/addadmin" element={<Admin />} />
                <Route path="/addmenuitem" element={<AddMenuItem/>} />
                <Route path="/updatemenuitem/:id" element={<UpdateLivreur/>} />
              </>
            )}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
