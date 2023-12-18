import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const RegistrationSuccess = () => {
    const navigate = useNavigate();
    const location = useLocation();
    console.log("location.state: ", location);
    const { qrCodeDataURL } = location.state;

    const handleLogin = () => {
        navigate("/login");
    };

    return (
        <div className="container mt-5 text-center">
          <h1 className="mb-4">Registration Successful</h1>
          <p>Scan the QR code with your authenticator app:</p>
          <div className="d-flex justify-content-center align-items-center flex-column">
            <img src={qrCodeDataURL} alt="QR Code" className="img-fluid mb-3" />
            <button type="button" className="btn" onClick={handleLogin}>
              Go to Login
            </button>
          </div>
        </div>
      );
};

export default RegistrationSuccess;
