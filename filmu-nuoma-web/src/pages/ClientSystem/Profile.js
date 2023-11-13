import React, { useState } from "react";
import { useNavigate } from "react-router";

function Profile()
{
    const navigate = useNavigate()

    const [userData] = useState({
        username: 'john_doe',
        name: 'John',
        lastName: 'Doe',
        phoneNumber: '123-456-7890',
        email: 'john.doe@example.com',
    });

    const handleEditProfile = () => {
        navigate('/EditProfile')
    };

    const handleDeleteProfile = () => {
        navigate('/RegLog')
    };

    const handleGenerateReport = () => {
    };

    const handleLogout = () => {
        navigate('/RegLog')
    };

    
    return (
    <div className="container mt-5">
        <h1 className="text-center mb-4">Profile Information</h1>
        <div className="card">
        <div className="card-body text-center">
            <p className="card-text">Username: {userData.username}</p>
            <p className="card-text">Name: {userData.name}</p>
            <p className="card-text">Last Name: {userData.lastName}</p>
            <p className="card-text">Phone Number: {userData.phoneNumber}</p>
            <p className="card-text">Email: {userData.email}</p>

            <div className="buttons mt-5">
                <button className="btn" onClick={handleEditProfile}>
                    Edit Profile
                </button>
                <button className="btn" onClick={handleDeleteProfile}>
                    Delete Profile
                </button>
                <button className="btn" onClick={handleGenerateReport}>
                    Generate Profile Report
                </button>
                <button className="btn" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </div>
        </div>
    </div>
    )
};
export default Profile