import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [motdepasse, setMotdepasse] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [, setLoggedInUser] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/admin/login", {
        email,
        motdepasse,
      });
      if (response.data) {
        const adminid = response.data.id; 
        setLoggedInUser(response.data);
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userId", adminid);
        alert('Connexion réussie ! Utilisateur connecté :', response.data);
        navigate("/dashboard");
      } else {
        alert('La connexion a échoué. Veuillez vérifier vos informations d\'identification.');
      }
    } catch (error) {
      setErrorMessage("Email ou mot de passe incorrect");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h1>Connexion Admin</h1>
        <div>
          <label>Email :</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Entrez votre email"
          />
        </div>
        <div>
          <label>Mot de passe :</label>
          <input
            type="password"
            value={motdepasse}
            onChange={(e) => setMotdepasse(e.target.value)}
            placeholder="Entrez votre mot de passe"
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
};

export default Login;
