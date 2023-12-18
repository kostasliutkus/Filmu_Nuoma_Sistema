import React, {useState} from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { Toast } from 'react-bootstrap';

function Login()
{
    const navigate = useNavigate();
    const [showErrorToast, setShowErrorToast] = useState(false);

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
          const response = await axios.post("http://localhost:5000/api/login", formData);
    
          const { token, userId } = response.data;
    
          console.log("Login successful");
          navigate("/verify-2fa", { state: { userId, token } });
        } catch (error) {
          console.error("login failed:", error.message);
    
          if (error.response && error.response.status === 401) {
            // Show Bootstrap Toast for authentication failure
            setShowErrorToast(true);
          }
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
          <Toast
                show={showErrorToast}
                onClose={() => setShowErrorToast(false)}
                style={{
                position: 'absolute',
                top: 20,
                right: 20,
                }}
            >
                <Toast.Header>
                <strong className="me-auto">Error</strong>
                </Toast.Header>
                <Toast.Body>Wrong login credentials</Toast.Body>
            </Toast>
        </div>
      );
    };
    
    export default Login;