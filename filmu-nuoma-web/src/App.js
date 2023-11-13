import './App.css';
import React from "react";
import FilmList from './pages/FilmSystem/FilmList.js'
import {Link,Route,Routes } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import OrderList from "./pages/OrderSystem/OrderList.js";
import CreateOrder from "./pages/OrderSystem/CreateOrder.js";
import EditOrder from "./pages/OrderSystem/EditOrder.js";
import Review from "./pages/ReviewSystem/Review";
import Profile from "./pages/ClientSystem/Profile.js";
import FilmView from "./pages/FilmSystem/FilmView.js"
import AddFilm from "./pages/FilmSystem/AddFilm.js"
import EditFilm from "./pages/FilmSystem/EditFilm.js"
import "./App.css"

function App() {
  return (
      <>
          <nav>
              <ul>
              {/*<li><Link to="/">Home</Link></li>*/}
              <li><Link to="/FilmList">Films</Link></li>
              <li><Link to="/OrderList">Orders</Link></li>
              {/*<li><Link to="/Reviews">Reviews</Link></li>*/}
              <li><Link to="/Profile">Profile</Link></li>
          </ul>
          </nav>
          <div>

          </div>
      <Routes>
          <Route path="/" element ={<HomePage/>}/>
          <Route path="/FilmList" element ={<FilmList/>}/>
          <Route path="/OrderList" element ={<OrderList/>}/>
          <Route path="/Reviews" element ={<Review/>}/>
          <Route path="/Profile" element ={<Profile/>}/>
          <Route path="/Order/:id" element={<CreateOrder/>} />
          <Route path="/EditOrder/:id" element={<EditOrder/>} />
            <Route path="/film-view/:id" element={<FilmView/>} />
          <Route path="/AddFilm" element={<AddFilm/>} />
          <Route path="/EditFilm" element={<EditFilm/>} />
      </Routes>
      </>
  );
}
export default App;
