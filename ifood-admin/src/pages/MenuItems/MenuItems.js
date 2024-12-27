import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./MenuItems.css";

const MenuItems = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const handleAddMenuItem = () => {
    navigate("/addmenuitem");
  };

  const handleUpdateMenuItem = (id) => {
    navigate(`/updatemenuitem/${id}`);
  };

  const handleDeleteMenuItem = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/menuitem/${id}`);
      setMenuItems(menuItems.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting menu item", error);
    }
  };

  const fetchMenuItems = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/menuitem");
      const items = response.data;

      // Extraire les catégories uniques des items
      const uniqueCategories = [...new Set(items.map(item => item.categorie))];

      setCategories(uniqueCategories);
      setMenuItems(items);
    } catch (error) {
      console.error("Error fetching menu items", error);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const filterByCategory = (category) => {
    return menuItems.filter(item => item.categorie === category);
  };

  return (
    <div className="menu-container">
      <h1>Liste des MenuItems</h1>
      <div className="menu-header">
      
        <button className="add-button" onClick={handleAddMenuItem}>
          Add New MenuItem
        </button>
      </div>
      {categories.map((category) => (
        <div key={category} className="category-section">
          <h2 className="category-title">{category}</h2>
          <div className="menu-grid">
            {filterByCategory(category).length > 0 ? (
              filterByCategory(category).map((item) => (
                <div className="menu-card" key={item.id}>
                  <div className="menu-image-container">
                    <img
                      src={item.image}
                      alt={item.nom}
                      className="menu-image"
                    />
                  </div>
                  <div className="menu-details">
                    <h2 className="menu-name">{item.nom}</h2> 
                    <p className="menu-description">{item.description}</p>
                    <p className="menu-price">{item.prix} dh</p> 
                    <div className="menu-actions">
                      <button
                        className="menu-button edit"
                        onClick={() => handleUpdateMenuItem(item.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="menu-button delete"
                        onClick={() => handleDeleteMenuItem(item.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No items in this category</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MenuItems;
