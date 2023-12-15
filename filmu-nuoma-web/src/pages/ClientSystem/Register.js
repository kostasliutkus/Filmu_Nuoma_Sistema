import React, { useState } from 'react';
import {useNavigate } from 'react-router-dom';
import axios from 'axios'

function Register()
{
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        vardas: '',
        pavarde: '',
        telefonas: '',
        el_pastas: '',
        slapyvardis: '',
        slaptazodis: '',
        sukurimo_data: '',
      });

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
          const currentDate = new Date().toISOString().split('T')[0];
          const formDataWithDate = {
            ...formData,
            sukurimo_data: currentDate,
          };

          console.log('Form submitted:', formDataWithDate);
          await axios.post('http://localhost:5000/api/register', formDataWithDate);
      
          console.log('User registered successfully');
          navigate('/'); 
          
        } catch (error) {
          console.error('Registration failed:', error.message);
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
        </div>
      );
}
export default Register