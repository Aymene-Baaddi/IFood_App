import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddLivreur';
import { useNavigate, useParams } from 'react-router-dom';


const UpdateLivreur = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [livreurData, setLivreurData] = useState({
        nom: '',
        email: '',
        statut: '',
        motdepasse:'',
        numTelephone: ''
    });


    useEffect(() => {
        const fetchLivreur = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/livreur/${id}`);
                setLivreurData(response.data); 
            } catch (error) {
                console.error('Error fetching livreur data:', error);
            }
        };
        fetchLivreur();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLivreurData({ ...livreurData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:8080/api/livreur/${id}`, {
                nom: livreurData.nom,
                email: livreurData.email,
                statut: livreurData.statut,
                motdepasse:livreurData.motdepasse,
                numTelephone: livreurData.numTelephone
            });

            console.log(response.data);
            navigate('/livreurs'); 
        } catch (error) {
            console.error('Error updating livreur:', error);
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit} className="add-livreur-form">
                <label>
                    Nom:
                    <input 
                        placeholder={livreurData.nom} 
                        type="text" 
                        name="nom" 
                        value={livreurData.nom} 
                        onChange={handleChange} 
                    />
                </label>
                <label>
                    Email:
                    <input 
                        placeholder={livreurData.email}
                        type="email" 
                        name="email" 
                        value={livreurData.email} 
                        onChange={handleChange} 
                    />
                </label>
                <label>
                    Statut:
                    <select 
                        placeholder={livreurData.statut}
                        name="statut" 
                        value={livreurData.statut} 
                        onChange={handleChange}
                    >
                        <option value="DISPONIBLE">DISPONIBLE</option>
                        <option value="INDISPONIBLE">INDISPONIBLE</option>
                    </select>
                </label>
                <label>
                    Mot de passe:
                    <input
                    placeholder={livreurData.motdepasse}
                    type="password"
                    name="motdepasse"
                    value={livreurData.motdepasse}
                    onChange={handleChange}
                    />
                </label>
                <label>
                    Téléphone:
                    <input 
                        placeholder={livreurData.numTelephone}
                        type="text" 
                        name="numTelephone" 
                        value={livreurData.numTelephone} 
                        onChange={handleChange} 
                    />
                </label>

                <button type="submit">Mettre à jour le livreur</button>
            </form>
        </div>
    );
};

export default UpdateLivreur;
