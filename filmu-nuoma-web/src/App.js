import './App.css';
import React from "react";
import FilmList from './pages/FilmSystem/FilmList.js'
import {Link,Route,Routes } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import OrderList from "./pages/OrderSystem/Order.js";
import Review from "./pages/ReviewSystem/Review";
import Profile from "./pages/ClientSystem/Profile.js";
function App() {
  return (
      <>
      <nav>
          <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/FilmList">Films</Link></li>
              <li><Link to="/OrderList">Orders</Link></li>
              <li><Link to="/Reviews">Films</Link></li>
              <li><Link to="/Profile">Orders</Link></li>
          </ul>
      </nav>
      <Routes>
          <Route path="/" element ={<HomePage/>}/>
          <Route path="/FilmList" element ={<FilmList/>}/>
          <Route path="/OrderList" element ={<OrderList/>}/>
          <Route path="/Reviews" element ={<Review/>}/>
          <Route path="/Profile" element ={<Profile/>}/>
      </Routes>
      </>
  );
}
export default App;
