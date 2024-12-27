import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddMenuItem.css';  
import { useNavigate, useParams } from 'react-router-dom';

const UpdateMenuItem = () => {
  const navigate = useNavigate();
  const [menuItemData, setMenuItemData] = useState({
    nom: '',
    description: '',
    prix: '',
    categorie: '',
    image:'',
    disponible: false, 
  });

  const { id } = useParams(); 

  useEffect(() => {
    const fetchMenuItemData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/menuitem/${id}`);
        setMenuItemData(response.data);  
      } catch (error) {
        console.error('Error fetching menu item data:', error);
      }
    };

    fetchMenuItemData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "disponible") {
      setMenuItemData({ ...menuItemData, [name]: value === "true" });
    } else {
      setMenuItemData({ ...menuItemData, [name]: value });
    }
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8080/api/menuitem/${id}`, menuItemData);
      console.log('Menu item updated:', response.data);
      navigate("/menuitems"); 
    } catch (error) {
      console.error('Error updating menu item:', error);
    }
  };

  return (
    <div className="container">

      <form onSubmit={handleSubmit} className="add-menu-item-form">
        <label>
          Name:
          <input
            type="text"
            name="nom"
            value={menuItemData.nom}
            placeholder={menuItemData.nom || "Enter name"}
            onChange={handleChange}
          />
        </label>
        <label>
          Category:
          <select
            name="categorie"
            value={menuItemData.categorie}
            onChange={handleChange}
          >
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
            placeholder={menuItemData.description || "Enter description"}
            onChange={handleChange}
          />
        </label>

        <label>
          Price:
          <input
            type="number"
            name="prix"
            value={menuItemData.prix}
            placeholder={menuItemData.prix || "Enter price"}
            onChange={handleChange}
          />
        </label>
        <label>
          Image URL:
          <input 
            type="text" 
            name="image" 
            value={menuItemData.image} 
            placeholder={menuItemData.image || "Enter image URL"}
             onChange={handleChange} 
           />
                </label>

        
        <label>
          Available:
          <select
            name="disponible"
            value={menuItemData.disponible.toString()} 
            onChange={handleChange}
          >
            <option value="true">Available</option>
            <option value="false">Not Available</option>
          </select>
        </label>

        <button type="submit">Update Menu Item</button>
      </form>
    </div>
  );
};

export default UpdateMenuItem;
