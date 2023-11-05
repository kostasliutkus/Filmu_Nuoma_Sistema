import './App.css';
import React from "react";
import FilmList from './pages/FilmSystem/FilmList.js'
import {Link,Route,Routes } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import OrderList from "./pages/OrderSystem/Order.js";
function App() {
  return (
      <>
      <nav>
          <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/FilmList">Films</Link></li>
              <li><Link to="/OrderList">Orders</Link></li>
          </ul>
      </nav>
      <Routes>
          <Route path="/" element ={<HomePage/>}/>
          <Route path="/FilmList" element ={<FilmList/>}/>
          <Route path="/OrderList" element ={<OrderList/>}/>
      </Routes>
      </>
  );
}
export default App;
