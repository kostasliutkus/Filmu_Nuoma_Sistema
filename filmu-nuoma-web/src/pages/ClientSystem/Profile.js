import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from './AuthContext';

function Profile()
{
    const { logout } = useAuth();
    const navigate = useNavigate()

    const [userData, setUserData] = useState({});

    useEffect(() => {
        // Function to fetch user data from your API
        const token = localStorage.getItem('token')
        const fetchUserData = async () => {
          try {
            const response = await fetch('http://localhost:5000/api/user-profile', {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                });
            const data = await response.json();
            setUserData(data); // Assuming the API returns an object with user data
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        };
    
        fetchUserData();
      }, []);

    const handleEditProfile = () => {
        navigate('/EditProfile')
    };

    const handleDeleteProfile = async () => {
        const token = localStorage.getItem('token');

        const isConfirmed = window.confirm("Are you sure you want to delete your profile? This action cannot be undone.");

        if (!isConfirmed) {
          return; // Exit if user cancels the deletion
        }
    try {
      const response = await fetch('http://localhost:5000/api/delete-profile', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });

      if (response.ok) {
        console.log('Profile deleted successfully');
        logout();
        navigate('/RegLog'); // Redirect to login or registration page
      } else {
        console.error('Failed to delete profile:', response.status);
      }
    } catch (error) {
      console.error('Error deleting profile:', error);
    }
    };

    const handleGenerateReport = () => {
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
                {/*<button className="btn" onClick={handleGenerateReport}>
                    Generate Profile Report
                </button>*/}
            </div>
        </div>
        </div>
    </div>
    )
};
export default Profile