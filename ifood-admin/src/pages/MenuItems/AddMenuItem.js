import React, { useState } from 'react';
import axios from 'axios';
import './AddMenuItem.css';
import { useNavigate } from 'react-router-dom';

const AddMenuItem = () => {
    const navigate = useNavigate();
    const [menuItemData, setMenuItemData] = useState({
        nom: '',
        description: '',
        prix: '',
        categorie: 'burger', 
        image: '',
        disponible: true 
    });

 
   
    const handleChange = (e) => {
      const { name, value } = e.target;
      if (name === "available") {
 
          setMenuItemData({ ...menuItemData, [name]: value === "true" });
      } else {
          setMenuItemData({ ...menuItemData, [name]: value });
      }
  };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/api/menuitem", {
                nom: menuItemData.nom,
                description: menuItemData.description,
                prix: menuItemData.prix,
                categorie: menuItemData.categorie,
                image: menuItemData.image,
                disponible: menuItemData.disponible
            });

            console.log(response.data);

            setMenuItemData({
              nom: '',
              description: '',
              prix: '',
              categorie: 'burger', 
              image: '',
              disponible: true 
            });

            navigate('/menuitems');
        } catch (error) {
            console.error('Error adding menu item:', error);
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit} className="add-menu-item-form">
                <label>
                    Nom du Plat:
                    <input 
                        type="text" 
                        name="nom" 
                        value={menuItemData.nom} 
                        onChange={handleChange} 
                    />
                </label>
                <label>
                    Catégorie:
                    <select name="categorie" value={menuItemData.categorie} onChange={handleChange}>
                        <option value="Burger">Burger</option>
                        <option value="Pizza">Pizza</option>
                        <option value="Tacos">Tacos</option>
                        <option value="Salade">Salade</option>
                        <option value="Pâtes">Pâtes</option>
                        <option value="Sushi">Sushi</option>
                        <option value="Snack">Snack</option>
                        <option value="Plat principal">Plat Principal</option>
                    </select>
                </label>
                <label>
                    Description:
                    <textarea 
                        name="description" 
                        value={menuItemData.description} 
                        onChange={handleChange} 
                    />
                </label>
                <label>
                    Prix:
                    <input 
                        type="number" 
                        name="prix" 
                        value={menuItemData.prix} 
                        onChange={handleChange} 
                    />
                </label>
              
                <label>
                    Image URL:
                    <input 
                        type="text" 
                        name="image" 
                        value={menuItemData.image} 
                        onChange={handleChange} 
                    />
                </label>
                <label>
                    Available:
                    <select 
                        name="disponible" 
                        value={menuItemData.disponible.toString()}  // Convert boolean to string for the select
                        onChange={handleChange}
                    >
                        <option value="true">Available</option>
                        <option value="false">Not Available</option>
                    </select>
                </label>
                <button type="submit">Ajouter le Plat</button>
            </form>
        </div>
    );
};

export default AddMenuItem;
