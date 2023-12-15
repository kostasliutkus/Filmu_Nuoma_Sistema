import React, {useState} from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { useAuth } from './AuthContext';

function Login()
{
    const { login } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        password: '',
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();

        try {
          // Send the login request to the server
          const response = await axios.post("http://localhost:5000/api/login", formData);
    
          // Assuming the server responds with a token upon successful login
          const { token } = response.data;
    
          // Store the token in localStorage or a state management solution
          localStorage.setItem("token", token);
    
          console.log("Login successful");
          login();
          navigate("/");
        } catch (error) {
          console.error("Login failed:", error.message);
        }
      };
    
      return (
        <div className="container mt-5">
          <h1 className="text-center mb-4">Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <button type="submit" className="btn">Login</button>
          </form>
        </div>
      );
    };
    
    export default Login;