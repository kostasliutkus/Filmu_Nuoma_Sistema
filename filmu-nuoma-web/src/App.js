import './App.css';
import React from "react";
import FilmList from './pages/FilmSystem/FilmList.js'
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
      <body>
      <div >
          <header className="App-header">Filmų nuomos Sistema
              <button onClick={FilmList}>Filmų sąrašas</button>
          </header>
      </div>
      </body>

  );
}
export default App;
