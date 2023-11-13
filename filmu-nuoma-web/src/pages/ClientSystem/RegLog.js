import React from "react";
import { Link } from 'react-router-dom';
import './ClientStyles.css';

function RegLog()
{
    return (
        <div className="text-center">
            <h1 className="mb-4">Register or Login</h1>
            <div className="d-flex justify-content-center">
                <Link to="/register" className="btn">
                    Register
                </Link>
                <Link to="/login" className="btn">
                    Login
                </Link>
            </div>
        </div>
      );
}
export default RegLog