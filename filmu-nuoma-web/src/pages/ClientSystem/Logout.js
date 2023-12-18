import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const navigate = useNavigate();

    const handleLogout = async () => {
    localStorage.removeItem('token');
    navigate('/');
    };

    return (
    <div>
        {useEffect(() => {
        handleLogout();
        }, [navigate])}
    </div>
    );
}

export default Logout;