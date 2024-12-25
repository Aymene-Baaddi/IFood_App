import React, { useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from 'mdb-react-ui-kit';

const Admin = () => {

  const [admin, setAdmin] = useState({
    nom: "",
    email: "",
    motdepasse: "",
    repeatPassword: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdmin({ ...admin, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    if (admin.motdepasse !== admin.repeatPassword) {
      console.log("Les mots de passe ne correspondent pas");
      return;
    }

    try {

      const response = await axios.post("http://localhost:8080/api/admin/register", {
        nom: admin.nom,
        email: admin.email,
        motdepasse: admin.motdepasse
      });

   
      setAdmin({
        nom: "",
        email: "",
        motdepasse: "",
        repeatPassword: ""
      });

      console.log("Admin ajouté avec succès", response.data);
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'admin", error);
    }
  };

  return (
    <MDBContainer className="d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
      <MDBCard className="w-75 p-4" style={{ display: "flex", flexDirection: "row", alignItems: "center",  borderRadius: '25px', boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.2)' }}>
        <MDBCardBody className="p-0" style={{ padding: '20px 0 20px 0' }}>
          <MDBRow className="g-0">
            <MDBCol md='6' className="p-4 bg-light" style={{ borderTopLeftRadius: '25px', borderBottomLeftRadius: '25px' }}>
              <form onSubmit={handleSubmit}>
                <p className="text-center h2 fw-bold mb-5 mx-1 mx-md-4 mt-4">Ajouter un Admin</p>
                
                {/* Champ pour le nom */}
                <div className="text-center mb-4">
                  <MDBInput 
                    placeholder="Nom" 
                    id='form1' 
                    type='text' 
                    name="nom" 
                    value={admin.nom} 
                    onChange={handleChange} 
                    style={{ width: '100%', height: '50px', fontSize: '18px' }}
                  />
                </div>

                {/* Champ pour l'email */}
                <div className="text-center mb-4">
                  <MDBInput 
                    placeholder="Email" 
                    id='form2' 
                    type='email' 
                    name="email" 
                    value={admin.email} 
                    onChange={handleChange} 
                    style={{ width: '100%', height: '50px', fontSize: '18px' }}
                  />
                </div>

                {/* Champ pour le mot de passe */}
                <div className="text-center mb-4">
                  <MDBInput 
                    placeholder="Mot de passe" 
                    id='form3' 
                    type='password' 
                    name="motdepasse" 
                    value={admin.motdepasse} 
                    onChange={handleChange} 
                    style={{ width: '100%', height: '50px', fontSize: '18px' }}
                  />
                </div>

                {/* Champ pour la confirmation du mot de passe */}
                <div className="text-center mb-4">
                  <MDBInput 
                    placeholder="Répéter le mot de passe" 
                    id='form4' 
                    type='password' 
                    name="repeatPassword" 
                    value={admin.repeatPassword} 
                    onChange={handleChange} 
                    style={{ width: '100%', height: '50px', fontSize: '18px' }}
                  />
                </div>

             
                <MDBBtn type="submit" size='lg' className="w-100" style={{ backgroundColor: 'black'}}>Ajouter Admin</MDBBtn>
              </form>
            </MDBCol>

            {/* Section image */}
            <MDBCol md='6' className="p-0">
              <img src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' alt="signup" className="w-100 h-100" style={{ borderTopRightRadius: '25px', borderBottomRightRadius: '25px' }} />
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default Admin;
