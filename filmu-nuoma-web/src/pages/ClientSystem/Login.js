import React, {useState} from "react";
import { useNavigate } from "react-router";

function Login()
{
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
    
      const handleSubmit = (e) => {
        e.preventDefault();

        console.log('Form submitted:', formData);
        navigate('/');
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