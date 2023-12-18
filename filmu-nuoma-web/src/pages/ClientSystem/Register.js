import React, { useState } from 'react';
import {useNavigate } from 'react-router-dom';
import axios from 'axios'
import { Toast } from 'react-bootstrap';

function Register()
{
    const navigate = useNavigate();
    const [showErrorToast, setShowErrorToast] = useState(false);

    const [formData, setFormData] = useState({
        vardas: '',
        pavarde: '',
        telefonas: '',
        el_pastas: '',
        tipas: 'vartotojas',
        slapyvardis: '',
        slaptazodis: '',
        sukurimo_data: '',
        kreditas: '',
      });

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
          const currentDate = new Date().toISOString().split('T')[0];
          const formDataWithDate = {
            ...formData,
            sukurimo_data: currentDate,
            kreditas: 100
          };

          console.log('Form submitted:', formDataWithDate);
          const response = await axios.post('http://localhost:5000/api/register', formDataWithDate);
          

          const { message, qrCodeDataURL } = response.data;
          
          navigate("/registration-success", { state: { qrCodeDataURL } });
          
        } catch (error) {
          console.error("registering failed:", error.message);
    
          if (error.response && error.response.status === 400) {
            // Show Bootstrap Toast for authentication failure
            setShowErrorToast(true);
          }
        }
    };

    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
        ...formData,
        [name]: value,
    });
    };

    return(
        <div className="container mt-5">
          <h1 className="text-center mb-4">Registration Form</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name:</label>
              <input
                type="text"
                id="name"
                name="vardas"
                value={formData.vardas}
                className="form-control"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="surname" className="form-label">Surname:</label>
              <input
                type="text"
                id="surname"
                name="pavarde"
                value={formData.pavarde}
                className="form-control"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phoneNumber" className="form-label">Phone Number:</label>
              <input
                type="tel"
                id="phoneNumber"
                name="telefonas"
                value={formData.telefonas}
                className="form-control"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email:</label>
              <input
                type="email"
                id="email"
                name="el_pastas"
                value={formData.el_pastas}
                className="form-control"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username:</label>
              <input
                type="text"
                id="username"
                name="slapyvardis"
                value={formData.slapyvardis}
                className="form-control"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password:</label>
              <input
                type="password"
                id="password"
                name="slaptazodis"
                value={formData.slaptazodis}
                className="form-control"
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn">Register</button>
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
                <Toast.Body>Username is already taken</Toast.Body>
            </Toast>
        </div>
      );
}
export default Register