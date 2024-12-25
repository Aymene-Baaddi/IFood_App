import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Login = ({onLogin}) => {
  const [email, setEmail] = useState("");
  const [motdepasse, setMotdepasse] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/admin/login", {
        email,
        motdepasse,
      });
      if (response.status === 200) {
        onLogin();
        navigate("/dashboard");
      }
    } catch (error) {
      setErrorMessage("Email ou mot de passe incorrect");
    }
  };

  return (
    <div className="login-container">
      <h1>Connexion Admin</h1>
      <form className="login-form" onSubmit={handleLogin}>
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

export default Login;