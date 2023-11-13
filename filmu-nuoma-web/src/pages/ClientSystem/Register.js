import React, { useState } from 'react';
import {useNavigate } from 'react-router-dom';

function Register()
{
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        phoneNumber: '',
        email: '',
        username: '',
        password: '',
      });

    const handleSubmit = (e) => {
        e.preventDefault();
        
        console.log('Form submitted:', formData);
        navigate('/');
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
                name="name"
                value={formData.name}
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
                name="surname"
                value={formData.surname}
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
                name="phoneNumber"
                value={formData.phoneNumber}
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
                name="email"
                value={formData.email}
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
                name="username"
                value={formData.username}
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
                name="password"
                value={formData.password}
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