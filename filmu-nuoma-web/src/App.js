import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import FilmList from './pages/FilmSystem/FilmList.js';
import {Link,Route,Routes } from 'react-router-dom';
import HomePage from "./pages/HomePage";
import OrderList from "./pages/OrderSystem/OrderList.js";
import CreateOrder from "./pages/OrderSystem/CreateOrder.js";
import EditOrder from "./pages/OrderSystem/EditOrder.js";
import Review from "./pages/ReviewSystem/Review";
import EditReview from "./pages/ReviewSystem/EditReview";
import AddReview from "./pages/ReviewSystem/AddReview";
import Profile from "./pages/ClientSystem/Profile.js";
import FilmView from "./pages/FilmSystem/FilmView.js"
import AddFilm from "./pages/FilmSystem/AddFilm.js"
import EditFilm from "./pages/FilmSystem/EditFilm.js"
import CreateInvoice from "./pages/OrderSystem/CreateInvoice.js"
import RegLog from './pages/ClientSystem/RegLog.js';
import Register from './pages/ClientSystem/Register.js';
import Login from './pages/ClientSystem/Login.js';
import EditProfile from './pages/ClientSystem/EditProfile.js';

function App() {
  return (
      <>
          <nav>
              <ul>
              {/*<li><Link to="/">Home</Link></li>*/}
              <li><Link to="/FilmList">Films</Link></li>
              <li><Link to="/OrderList">Orders</Link></li>
              <li className='profile'><Link to="/Profile">Profile</Link></li>
              <li className='profile'><Link to="/RegLog">Register/Login</Link></li>
          </ul>
          </nav>
          <div>

          </div>
      <Routes>
          <Route path="/" element ={<HomePage/>}/>
          <Route path="/FilmList" element ={<FilmList/>}/>
          <Route path="/OrderList" element ={<OrderList/>}/>
          <Route path="/Review" element ={<Review/>}/>
          <Route path="/EditReview" element ={<EditReview/>}/>
          <Route path="/AddReview" element ={<AddReview/>}/>
          <Route path="/Profile" element ={<Profile/>}/>
          <Route path="/RegLog" element ={<RegLog/>}/>
          <Route path="/Register" element ={<Register/>}/>
          <Route path="/Login" element ={<Login/>}/>
          <Route path="/EditProfile" element ={<EditProfile/>}/>
          <Route path="/film-view/:id" element={<FilmView/>} />
          <Route path="/Order/:id" element={<CreateOrder/>} />
          <Route path="/EditOrder/:id" element={<EditOrder/>} />
            <Route path="/film-view/:id" element={<FilmView/>} />
          <Route path="/AddFilm" element={<AddFilm/>} />
          <Route path="/EditFilm" element={<EditFilm/>} />
          <Route path="/CreateInvoice" element={<CreateInvoice/>} />
          <Route path="/film-view/:id" element={<FilmView/>} /> 
      </Routes>
      </>
  );
}
export default App;
