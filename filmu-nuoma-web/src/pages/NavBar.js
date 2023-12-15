// NavigationBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './ClientSystem/AuthContext';

function NavigationBar() {
    const { isLoggedIn, logout } = useAuth();
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/FilmList">Films</Link></li>
        <li><Link to="/OrderList">Orders</Link></li>
        {isLoggedIn ? (
          <>
            <li className="profile"><Link to="/Profile">Profile</Link></li>
            <li className="profile" onClick={logout}><Link to="/">Logout</Link></li>
          </>
        ) : (
          <li className="profile"><Link to="/RegLog">Register/Login</Link></li>
        )}
      </ul>
    </nav>
  );
}

export default NavigationBar;