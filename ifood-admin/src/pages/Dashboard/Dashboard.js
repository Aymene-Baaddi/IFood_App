import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css';

import { IoRestaurant, IoFastFood, IoBicycle, IoPerson, IoCheckmarkDone, IoCash } from 'react-icons/io5';


const Dashboard = () => {
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalMenuItems, setTotalMenuItems] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalLivreur, setTotalLivreur] = useState(0);
  const [totalGains, setTotalGains] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:8080/api/commandes') 
      .then(response => {
        const totalGains = response.data.reduce((acc, commande) => acc + commande.total, 0);
        setTotalOrders(response.data.length); 
        setTotalGains(totalGains);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des commandes:', error);
      });
  }, []);
  

 
  useEffect(() => {
    axios.get('http://localhost:8080/api/menuitem') 
      .then(response => {
        setTotalMenuItems(response.data.length);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des éléments de menu:', error);
      });
  }, []);
  useEffect(() => {
    axios.get('http://localhost:8080/api/client') 
      .then(response => {
        setTotalCustomers(response.data.length);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des éléments des clients:', error);
      });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:8080/api/livreur') 
      .then(response => {
        setTotalLivreur(response.data.length);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des éléments des livreurs:', error);
      });
  }, []);

  return (
    <div className="home">
      <div className="card1 green">
        <div className="card1-content">
          <IoRestaurant size={30} />
          <span>Total des commandes:</span>
          <h2>{totalOrders}</h2>
        </div>
      </div>
      <div className="card1 red">
        <div className="card1-content">
          <IoFastFood size={30} />
          <span>Total des menuitems:</span>
          <h2>{totalMenuItems}</h2>
        </div>
      </div>
      <div className="card1 blue">
        <div className="card1-content">
          <IoPerson size={30} />
          <span>Total des clients:</span>
          <h2>{totalCustomers}</h2>
        </div>
      </div>
      <div className="card1 orange">
        <div className="card1-content">
          <IoBicycle size={30} />
          <span>Total des livreurs:</span>
          <h2>{totalLivreur}</h2>
        </div>
      </div>
      <div className="card1 purple">
        <div className="card1-content">
          <IoCheckmarkDone size={30} />
          <span>Statistique 5:</span>
          <h2>N/A</h2>
        </div>
      </div>
      <div className="card1 teal">
        <div className="card1-content">
          <IoCash size={30} />
          <span>Total des gains:</span>
          <h2>{totalGains}</h2>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
