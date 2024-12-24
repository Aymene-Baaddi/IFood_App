import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Customers.css"; 

const Customers = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/client");
      setClients(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des clients :", error);
    }
  };

  return (
    <div className="clients-container">
      <h1>Liste des Clients</h1>
      <table className="clients-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Email</th>
            <th>Adresse de Livraison</th>
            <th>Numéro de Téléphone</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id}>
              <td>{client.id}</td>
              <td>{client.nom}</td>
              <td>{client.email}</td>
              <td>{client.adresseLivraison}</td>
              <td>{client.numTelephone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Customers;