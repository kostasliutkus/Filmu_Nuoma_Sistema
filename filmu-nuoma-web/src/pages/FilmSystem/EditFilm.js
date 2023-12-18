import React,{useState,useEffect} from "react";
import {useNavigate, useParams} from 'react-router-dom';
import VideoPlayer  from './VideoPlayer.js'
import './FilmStyle.css'

function EditFilm()
{
    const {id} = useParams();
    const navigate=useNavigate();
    const goBack = () => {
        navigate(`/FilmList/`);
    };
    const [directors, setDirectors] = useState([]);
    const [genres, setGenres] = useState([]);
    const [actors, setActors] = useState([]);
    const [selectedActors, setSelectedActors] = useState([]);
    const [movieDetails, setMovieDetails] = useState({
        pavadinimas: '',
        isleidimo_data: '',
        trukme: '',
        fk_Rezisieriusid: '',
        amziaus_cenzas: '',
        studija: '',
        kilmes_salis: '',
        Kalba: '',
        subtitrai: '',
        kaina: '',
        Zanras: '',
    });
    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/movies/${id}`);
                const data = await response.json();
                setMovieDetails({
                    pavadinimas: data.pavadinimas || '',
                    isleidimo_data: data.isleidimo_data || '',
                    trukme: data.trukme || '',
                    fk_Rezisieriusid: data.fk_Rezisieriusid || '',
                    amziaus_cenzas: data.amziaus_cenzas || '',
                    studija: data.studija || '',
                    kilmes_salis: data.kilmes_salis || '',
                    Kalba: data.Kalba || '',
                    subtitrai: data.subtitrai || '',
                    kaina: data.kaina || '',
                    Zanras: data.Zanras || '',
                });
                const actorsResponse = await fetch(`http://localhost:5000/api/movie_actors/${id}`);
                const actorsData = await actorsResponse.json();
                setSelectedActors(actorsData.map(actor => actor.fk_Aktoriusid));
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        };
        fetchMovieDetails();
    }, [id]);
    useEffect(() => {
        const fetchActors = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/actors');
                const data = await response.json();
                setActors(data);
            } catch (error) {
                console.error('Error fetching actors:', error);
            }
        };
        fetchActors();
    }, []);
    useEffect(() => {
        const fetchDirectors = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/directors');
                const data = await response.json();
                setDirectors(data);
            } catch (error) {
                console.error('Error fetching directors:', error);
            }
        };

    fetchDirectors();
    }, []);
    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/genres');
                const data = await response.json();
                setGenres(data);
            } catch (error) {
                console.error('Error fetching genres:', error);
            }
        };
        fetchGenres();
        }, []);
        const handleEditFilm = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/movies/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(movieDetails),
                });
    
                if (response.ok) {
                    console.log('Movie updated successfully');
                    //delete unchecked boxes
                    // Get the movie ID
                    const movieId = (await response.json()).id;

                    // Delete existing associations for the movie
                    const deleteAssociationsResponse = await fetch(`http://localhost:5000/api/movie_actor/${movieId}`, {
                        method: 'DELETE',
                    });

                    if (!deleteAssociationsResponse.ok) {
                        console.error('Error deleting associations:', deleteAssociationsResponse.statusText);
                        return;
                    }

                    console.log('Deleted existing associations successfully');

                        //also add new tables
                        // Movie edited successfully
                        // const movieId = (await response.json()).id;
                        console.log('Selected Actors:', selectedActors);
                        // Now, associate the selected actors with the movie
                        const associateActorsResponse = await fetch(`http://localhost:5000/api/movies_actors/${movieId}/actors`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ actorIds: selectedActors }),
                            
                        });
                        console.log('CIA',associateActorsResponse);
                        if (associateActorsResponse.ok) {
                            // Actors associated successfully
                            navigate(`/FilmList/`);
                        } else {
                            console.error('Error associating actors with movie:', associateActorsResponse.statusText);
                        }
                    navigate(`/FilmList/`);
                }
            } catch (error) {
                console.error('Error updating movie:', error);
            }
        };
    return (
        <div className="container mt-5">
    <h2 className="mb-4">Edit Movie</h2>
    <form id="editMovieForm">
        <div className="form-group">
            <label htmlFor="pavadinimas" className="form-label">Name:</label>
            <input type="text" id="pavadinimas" name="pavadinimas" className="form-control" value={movieDetails.pavadinimas}required />
        </div>

        <div className="form-group">
            <label htmlFor="isleidimo_data" className="form-label">Release Date:</label>
            <input type="date" id="isleidimo_data" name="isleidimo_data" className="form-control" value={movieDetails.isleidimo_data} required />
        </div>

        <div className="form-group">
            <label htmlFor="trukme" className="form-label">Length (minutes):</label>
            <input type="number" id="trukme" name="trukme" className="form-control"value={movieDetails.trukme} required />
        </div>

        <div className="form-group">
            <label htmlFor="fk_Rezisieriusid" className="form-label">Director:</label>
            <select id="fk_Rezisieriusid" name="fk_Rezisieriusid" className="form-control"value={movieDetails.fk_Rezisieriusid} required>
                {directors.map((director) => (
                    <option key={director.id} value={director.id}>
                        {director.vardas} {director.pavarde}
                    </option>
                ))}
            </select>
        </div>

        <div className="form-group">
            <label htmlFor="amziaus_cenzas" className="form-label">Rating:</label>
            <input type="text" id="amziaus_cenzas" name="amziaus_cenzas" className="form-control" value={movieDetails.amziaus_cenzas}required />
        </div>

        <div className="form-group">
            <label htmlFor="studija" className="form-label">Studio:</label>
            <input type="text" id="studija" name="studija" className="form-control"value={movieDetails.studija} required />
        </div>

        <div className="form-group">
            <label htmlFor="kilmes_salis" className="form-label">Country of Origin:</label>
            <input type="text" id="kilmes_salis" name="kilmes_salis" className="form-control" value={movieDetails.kilmes_salis} required />
        </div>

        <div className="form-group">
            <label htmlFor="Kalba" className="form-label">Language:</label>
            <input type="text" id="Kalba" name="Kalba" className="form-control" value={movieDetails.Kalba} required />
        </div>

        <div className="form-group">
            <label htmlFor="subtitrai" className="form-label">Subtitles:</label>
            <select id="subtitrai" name="subtitrai" className="form-control" value={movieDetails.subtitrai}>
                <option value="true">Yes</option>
                <option value="false">No</option>
            </select>
        </div>

        <div className="form-group">
            <label htmlFor="kaina" className="form-label">Price:</label>
            <input type="number" id="kaina" name="kaina" className="form-control" value={movieDetails.kaina} required />
        </div>

        <div className="form-group">
            <label htmlFor="Zanras" className="form-label">Genre:</label>
            <select id="Zanras" name="Zanras" className="form-control" value={movieDetails.Zanras} required >
                {genres.map((genre) => (
                    <option key={genre.id_Zanras} value={genre.id_Zanras}>
                        {genre.name}
                    </option>
                ))}
            </select>
        </div>
        <div className="form-group">
                <label className="form-label">Select Actors:</label>
                {actors.map((actor) => (
                    <div key={actor.id} className="form-check">
                        <input
                            type="checkbox"
                            id={`actor-${actor.id}`}
                            name={`actor-${actor.id}`}
                            className="form-check-input"
                            checked={selectedActors.includes(actor.id)}
                            onChange={() =>
                                setSelectedActors((prevSelected) =>
                                    prevSelected.includes(actor.id)
                                        ? prevSelected.filter((id) => id !== actor.id)
                                        : [...prevSelected, actor.id]
                                )
                            }
                        />
                        <label className="form-check-label" htmlFor={`actor-${actor.id}`} >
                            {actor.vardas} {actor.pavarde}
                        </label>
                    </div>
                ))}
            </div>
            <button type="button" className="btn btn-primary" onClick={handleEditFilm}>
                    Update Film
                </button>
                <button className="btn" onClick={goBack}>
                    Back
                </button>
        </form>
    </div>
    );
}
export default EditFilm;
