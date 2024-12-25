import React, { useState } from 'react';
import axios from 'axios';
import './AddLivreur.css';
import { useNavigate } from 'react-router-dom';



const AddLivreur = () => {
    const navigate = useNavigate();
    const [livreurData, setLivreurData] = useState({
        nom: '',
        email: '',
        statut: "DISPONIBLE",
        motdepasse:'',
        numTelephone: ''

    });
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLivreurData({ ...livreurData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/api/livreur/register", {
                nom: livreurData.nom,
                email: livreurData.email,
                statut: livreurData.statut,
                motdepasse:livreurData.motdepasse,
                numTelephone: livreurData.numTelephone
                
            });

            console.log(response.data);

            setLivreurData({
                nom: '',
                email: '',
                statut: '',
                motdepasse:'',
                telephone: ''
                
            });

            navigate('/livreurs');
        } catch (error) {
            console.error('Error adding livreur:', error);
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit} className="add-livreur-form">
                <label>
                    Nom:
                    <input type="text" name="nom" value={livreurData.nom} onChange={handleChange} />
                </label>
                <label>
                    Email:
                    <input type="email" name="email" value={livreurData.email} onChange={handleChange} />
                </label>
                 <label>
                    Statut:
                    <select name="statut" value={livreurData.statut} onChange={handleChange}>
                        <option value="DISPONIBLE">DISPONIBLE</option>
                        <option value="INDISPONIBLE">INDISPONIBLE</option>
                    </select>
                    <label>
                        Mot de passe:
                        <input type="password" name="motdepasse" value={livreurData.motdepasse} onChange={handleChange}/>
                    </label>
                </label>
                <label>
                    Téléphone:
                    <input type="text" name="numTelephone" value={livreurData.numTelephone} onChange={handleChange} />
                </label>
               
                <button type="submit">Ajouter le livreur</button>
            </form>


        </div>
    );
};

export default AddLivreur;
