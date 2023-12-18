import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth } from './AuthContext';
import { Toast } from 'react-bootstrap';

const Verify2FA = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { userId, token } = location.state || {};
    const { login } = useAuth();

    const [twoFactorCode, setTwoFactorCode] = useState('');
    const [showErrorToast, setShowErrorToast] = useState(false);

    const handleVerification = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/verify-2fa", { userId, token, twoFactorCode });

            const { newtoken } = response.data;

            localStorage.setItem("token", newtoken);
            login();

            navigate("/");
        } catch (error) {
            console.error("2FA verification failed:", error.message);
      
            if (error.response && error.response.status === 401) {
              // Show Bootstrap Toast for authentication failure
              setShowErrorToast(true);
            }
          }
    };

    const handleChange = (e) => {
        e.preventDefault();
        setTwoFactorCode(e.target.value);
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Verify 2FA</h1>
            <form onSubmit={handleVerification}>
                <div className="mb-3">
                    <label htmlFor="twoFactorCode" className="form-label">2FA Code:</label>
                    <input
                        type="text"
                        id="twoFactorCode"
                        name="twoFactorCode"
                        value={twoFactorCode}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <button type="submit" className="btn">Verify 2FA</button>
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
                <Toast.Body>Invalid 2FA code. Please try again.</Toast.Body>
            </Toast>
        </div>
    );
};

export default Verify2FA;
