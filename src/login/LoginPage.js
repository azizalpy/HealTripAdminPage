import React, { useState} from 'react';
import './LoginPage.css'; 
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    const payload = {
      email: email,
      password: password
    }

    try {
      const responseToken = await axios.post('https://healtrip.azurewebsites.net/auth/authenticate', payload);
      localStorage.setItem("token", responseToken?.data)
      navigate("/home");
      window.location.reload(); 
    } catch (error) {
      console.error('Login error:', error);
    }
  }

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Admin Login</h2> 
        <form onSubmit={(e) => handleLogin(e)}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
