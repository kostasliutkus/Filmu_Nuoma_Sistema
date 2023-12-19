import React, { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom'
function FilmList() {
    const navigate = useNavigate();

    const [movies, setMovies] = useState({});
    const [directors, setDirectors] = useState([]);
    const [actor, setActor] = useState({});
    //atitinkamai koreguoti naudojama keiciant mygtukus
    const isPaid = false;
    const [isAdmin, setIsAdmin] = useState(true);
    const goToEdit = (id) => {
        navigate(`/EditFilm/${id}`);
    };
    const goToAdd = () => {
        navigate(`/AddFilm`);
    };
    const goToMovie = (id) => {
        navigate(`/film-view/${id}`);
    };
    const goHome = () =>{
      navigate('/')
    }
    const handleOrder = (id, movieName) => {
        navigate(`/Order/${id}?movieName=${movieName}`);
    };
    const deleteMovie = async (movieId) => {
      try {
        const response = await fetch(`http://localhost:5000/api/movies/${movieId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (response.ok) {
          console.log('Movie deleted successfully');
        } else {
          console.error('Error deleting movie:', response.statusText);
        }
      } catch (error) {
        console.error('Error deleting movie:', error);
      }
      goHome();
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
    const fetchDirectorById = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/directors/${id}`);
            const data = await response.json();
            return(data);
        } catch (error) {
            console.error("Error fetching directors:", error);
        }
    };
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
                    {isAdmin && (
                        <th>Edit</th>
                        )}
                    {isAdmin && (
                    <th>Delete</th>
                    )}
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(movies).map((movieId) => (
                    <tr key={movieId} >
                        <td>{movies[movieId].pavadinimas}</td>
                        <td>{directors[movies[movieId].fk_Rezisieriusid]?.vardas +' '+ directors[movies[movieId].fk_Rezisieriusid]?.pavarde}</td>
                        {/*<td>{fetchDirectorById(movies[movieId].fk_Rezisieriusid).name}</td>*/}
                        <td>{actor[movies[movieId].id]?.vardas + ' ' + actor[movies[movieId].id]?.pavarde}</td>
                        <td>{movies[movieId].trukme}</td>
                        <td>{movies[movieId].kaina}</td>
                        <td>
                          <button className="btn" onClick={isPaid ? (() => goToMovie(movies[movieId].id)) : (() => handleOrder(movies[movieId].id, movies[movieId].pavadinimas))}>
                            {isPaid ? (
                                "Watch"
                            ) : (
                                "Order"
                            )}
                          </button>
                        </td>
                        {isAdmin && (
                        <td>
                            <button className="btn btn-primary" onClick={() => goToEdit(movies[movieId].id)}>
                                Edit
                            </button>
                        </td>)}
                        {isAdmin && (
                        <td>
                            <button className="btn btn-danger" onClick={() => deleteMovie(movies[movieId].id)}>
                                Delete
                            </button>
                        </td>
                        )}
                    </tr>
                    ))}
                </tbody>
            </table>
            <div className="grid-item">
                {isAdmin && (
                <div className="grid-item">
                    <div>
                        <button className="btn btn-success" onClick={goToAdd}>
                            Add a film
                        </button>
                    </div>
                </div>
                )}
            </div>
        </div>
        );
    } 
export default FilmList;