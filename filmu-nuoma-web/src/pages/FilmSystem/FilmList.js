import React, { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom'
function FilmList() {
    const navigate = useNavigate();

    const [movies, setMovies] = useState({});
    const [directors, setDirectors] = useState([]);
    const [actor, setActor] = useState({});

    const goToEdit = () => {
        navigate(`/EditFilm`);
    };
    const goToAdd = () => {
        navigate(`/AddFilm`);
    };
    const handleRowClick = (id) => {
        navigate(`/film-view/${id}`);
    };

    const handleOrder = (id, movieName) => {
        navigate(`/Order/${id}?movieName=${movieName}`);
    };

    useEffect(() => {
        const fetchMovies = async () => {
          try {
            const response = await fetch(`http://localhost:5000/api/movies`);
            const data = await response.json();
            setMovies(data);
          } catch (error) {
            console.error("Error fetching movies:", error);
          }
        };
        fetchMovies();
      }, []);

    useEffect(() => {
        const fetchDirectors = async () => {
          try {
            const response = await fetch(`http://localhost:5000/api/directors`);
            const data = await response.json();
            setDirectors(data);
          } catch (error) {
            console.error("Error fetching directors:", error);
          }
        };
        fetchDirectors();
      }, []);
      useEffect(() => {
        const fetchActor = async (selectedMovieId) => {
          try {
            const response = await fetch(`http://localhost:5000/api/movies/${selectedMovieId}/actors`);
            const data = await response.json();
    
            setActor((prevActors) => ({
              ...prevActors,
              [selectedMovieId]: data,
            }));
          } catch (error) {
            console.error("Error fetching actor:", error);
          }
        };
        Object.keys(movies).forEach(async (movieId) => {
            await fetchActor(movies[movieId].id);
          });
        }, [movies]);   
    return (
        <div>
            <h2>Check out some movies</h2>
            <table className="table">
                <thead>
                    <tr>
                    <th>Movie Name</th>
                    <th>Director</th>
                    <th>Main Actor</th>
                    <th>Length</th>
                    <th>Price</th>
                    <th>Rent</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(movies).map((movieId) => (
                    <tr key={movieId} onClick={() => handleRowClick(movieId)}>
                        <td>{movies[movieId].pavadinimas}</td>
                        <td>{directors[movies[movieId]?.fk_Rezisieriusid]?.vardas +' '+ directors[movies[movieId]?.fk_Rezisieriusid]?.pavarde}</td>
                        <td>{actor[movies[movieId].id]?.vardas + ' ' + actor[movies[movieId].id]?.pavarde}</td>
                        <td>{movies[movieId].trukme}</td>
                        <td>{movies[movieId].kaina}</td>
                        <td>
                        <button className="btn" onClick={() => handleOrder(movieId,movies[movieId].pavadinimas)}>
                            Rent Movie
                        </button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
            <div className="grid-item">
                <div>
                    <h2>Movie management</h2>
                </div>
                <div>
                    <button className="btn btn-success" onClick={goToAdd}>Add a film</button>
                </div>
                <div>
                    <button className="btn btn-warning" onClick={goToEdit}>Edit a film</button>
                </div>
            </div>
        </div>
        );
    } 
export default FilmList;