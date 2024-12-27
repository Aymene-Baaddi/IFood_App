import React, { useState} from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';

import Sidebar from './components/sidebar/sidebar';
import Dashboard from './pages/Dashboard/Dashboard';
import Orders from './pages/Orders/Orders';
import MenuItems from './pages/MenuItems/MenuItems';
import Customers from './pages/Customers/Customers';
import Login from './pages/Login/Login';
import Livreurs from './pages/Livreur/Livreur';
import AddLivreur from './pages/Livreur/AddLivreur';
import UpdateLivreur from './pages/Livreur/UpdateLivreur';
import Admin from './pages/Admin/Admin';
import AddMenuItem from './pages/MenuItems/AddMenuItem';
import UpdateMenuItem from './pages/MenuItems/UpdateMenuItem';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

 


  return (
    <div className={isLoggedIn ? 'page-content' : 'app-content-login'}>
   <Router>
      <ConditionalNavbar isLoggedIn={isLoggedIn} />
      <Routes>
        <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        
        {isLoggedIn ? (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/menuitems" element={<MenuItems />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/livreurs" element={<Livreurs />} />
            <Route path="/addlivreur" element={<AddLivreur />} />
            <Route path="/updatelivreur/:id" element={<UpdateLivreur />} />
            <Route path="/addadmin" element={<Admin />} />
            <Route path="/addmenuitem" element={<AddMenuItem />} />
            <Route path="/updatemenuitem/:id" element={<UpdateMenuItem />} />
          </>
        ) : (
  
          <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        )}
      </Routes>
    </Router>
    </div>
  );
};

const ConditionalNavbar = ({ isLoggedIn }) => {
  const location = useLocation();

  const isLoginPage = location.pathname === '/';


  return isLoggedIn && !isLoginPage  && <Sidebar/>;

};

export default App;
