import React, { useState, useEffect } from "react";
import axios from "axios";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBBtn, MDBCardTitle, MDBCardText } from 'mdb-react-ui-kit';
import { useNavigate } from "react-router-dom";


const MenuItems = () => {

  const [menuItems, setMenuItems] = useState([]);
 

  const navigate = useNavigate();

  const handleAddMenuItem = () => {
    navigate("/addmenuitem");
  };

  const handleUpdateMenuItem = (id) => {
    navigate(`/updatemenuitem/${id}`);  
  };

  // Fetch menu items from the API
  const fetchMenuItems = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/menuitem");
      setMenuItems(response.data);
    } catch (error) {
      console.error("Error fetching menu items", error);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);


  const handleDeleteMenuItem = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/menu-items/${id}`);
      setMenuItems(menuItems.filter(item => item.id !== id));
    } catch (error) {
      console.error("Error deleting menu item", error);
    }
  };

  

  return (
    <MDBContainer className="mt-5">
      {/* Button to add a new menu item */}
      <div className="text-center mb-4">
        <MDBBtn onClick={() => handleAddMenuItem()} style={{ backgroundColor: 'black' }}>
          Ajouter un élément de menu
        </MDBBtn>
      </div>

      <MDBRow>
        {menuItems.map((item) => (
          <MDBCol md="4" key={item.id} className="mb-4">
            <MDBCard>
              <MDBCardBody>
                <MDBCardTitle>{item.nom}</MDBCardTitle>
                <MDBCardText>
                  <strong>Catégorie:</strong> {item.categorie} <br />
                  <strong>Prix:</strong> {item.prix} <br />
                  <strong>Description:</strong> {item.description} <br />
                  <strong>Disponible:</strong> {item.disponible ? "Oui" : "Non"}
                </MDBCardText>
                {/* Image of the menu item (you can add an image URL here) */}
                <img src={item.image} alt={item.nom} className="img-fluid mb-3" />

                {/* Buttons for update and delete */}
                <div className="d-flex justify-content-between">
                  <MDBBtn size="sm" onClick={() => handleUpdateMenuItem(item.id, { ...item, nom: 'Updated Name' })}>Mettre à jour</MDBBtn>
                  <MDBBtn size="sm" color="danger" onClick={() => handleDeleteMenuItem(item.id)}>Supprimer</MDBBtn>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        ))}
      </MDBRow>
    </MDBContainer>
  );
};

export default MenuItems;
