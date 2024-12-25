import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Livreur.css"; 
import { useNavigate } from "react-router-dom";

const Livreurs = () => {
  const [livreurs, setLivreurs] = useState([]);
  const navigate = useNavigate();

  const handleAddLivreur = () => {
    navigate("/addlivreur");
  };

  const handleUpdateLivreur = (id) => {
    navigate(`/updatelivreur/${id}`);  
  };

  useEffect(() => {
    fetchLivreurs();
  }, []);

  const fetchLivreurs = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/livreur");
      setLivreurs(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des livreurs :", error);
    }
  };

  const handleDeleteLivreur = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/livreur/${id}`);
      setLivreurs(livreurs.filter(livreur => livreur.id !== id));
      console.log(`Livreur avec l'ID ${id} supprimé avec succès`);
    } catch (error) {
      console.error(`Erreur lors de la suppression du livreur avec l'ID ${id} :`, error);
    }
  };

  return (
    <div className="livreurs-container">
      <h1>Liste des Livreurs</h1>
      <button className="button add-button" onClick={handleAddLivreur}>
        Ajouter un livreur
      </button>
      <table className="livreurs-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Email</th>
            <th>Statut</th>
            <th>Numéro de Téléphone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {livreurs.map((livreur) => (
            <tr key={livreur.id}>
              <td>{livreur.id}</td> {/* Affichage de l'ID du livreur */}
              <td>{livreur.nom}</td>
              <td>{livreur.email}</td>
              <td>{livreur.statut}</td>
              <td>{livreur.numTelephone}</td>
              <td className="livreur-actions">
                <button
                    className="button update-button"
                    onClick={() => handleUpdateLivreur(livreur.id)}
                >
                    Modifier
                </button>
                <button
                    className="button delete-button"
                    onClick={() => handleDeleteLivreur(livreur.id)}
                >
                    Supprimer
                </button>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Livreurs;
