import React,{useState,useEffect} from "react";
import {useNavigate, useParams} from 'react-router-dom';

function AddFilm() {


    const navigate=useNavigate();
    const goBack = () => {
        navigate(`/FilmList/`);
    };
    const [directors, setDirectors] = useState([]);
    const [genres, setGenres] = useState([]);
    const [actors, setActors] = useState([]);
    const [newActor, setNewActor] = useState({
        vardas: '',
        pavarde: '',
        amzius: '',
        spec: '',
        kaskadininkas: '',
        pilietybe: '',
    });
    const [selectedActors, setSelectedActors] = useState([]);
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
    const handleAddFilm = async () => {
        try {
            const form = document.getElementById('addMovieForm');
            const formData = new FormData(form);
    
            console.log('Fetching API to add movie...');
            const response = await fetch('http://localhost:5000/api/movies', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(Object.fromEntries(formData)),
            });
    
            console.log('API Response:', response);
    
            if (response.ok) {
                // Movie added successfully
                const movieId = (await response.json()).id;
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
            } else {
                console.error('Error adding movie:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding movie:', error);
        }
    };
    
    const handleAddActor = async () => {
        try {
            const form = document.getElementById('addActorForm');
            const formData = new FormData(form);
            console.log('Fetching API to add actor...');
            const response = await fetch('http://localhost:5000/api/actors', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(Object.fromEntries(formData)),
            });
            console.log('API Response:', response);
        } catch (error) {
            console.error('Error adding actor:', error);
        }
    };

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
    const fetchActors = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/actors');
            const data = await response.json();
            setActors(data);
            return data;
        } catch (error) {
            console.error('Error fetching actors:', error);
            return [];
        }
    };
    
    const [showActorDialog, setShowActorDialog] = useState(false);

    const handleShowActorDialog = () => {
        setShowActorDialog(true);
    };

    const handleCloseActorDialog = () => {
        setShowActorDialog(false);
    };
    return (
        
        <div className="container mt-5">
    <h2 className="mb-4">Add a Movie</h2>
    <form id="addMovieForm">
        <div className="form-group">
            <label htmlFor="pavadinimas" className="form-label">Name:</label>
            <input type="text" id="pavadinimas" name="pavadinimas" className="form-control" required />
        </div>

        <div className="form-group">
            <label htmlFor="isleidimo_data" className="form-label">Release Date:</label>
            <input type="date" id="isleidimo_data" name="isleidimo_data" className="form-control" required />
        </div>

        <div className="form-group">
            <label htmlFor="trukme" className="form-label">Length (minutes):</label>
            <input type="number" id="trukme" name="trukme" className="form-control" required />
        </div>

        <div className="form-group">
            <label htmlFor="fk_Rezisieriusid" className="form-label">Director:</label>
            <select id="fk_Rezisieriusid" name="fk_Rezisieriusid" className="form-control" required>
                {directors.map((director) => (
                    <option key={director.id} value={director.id}>
                        {director.vardas} {director.pavarde}
                    </option>
                ))}
            </select>
        </div>

        <div className="form-group">
            <label htmlFor="amziaus_cenzas" className="form-label">Rating:</label>
            <input type="text" id="amziaus_cenzas" name="amziaus_cenzas" className="form-control" required />
        </div>

        <div className="form-group">
            <label htmlFor="studija" className="form-label">Studio:</label>
            <input type="text" id="studija" name="studija" className="form-control" required />
        </div>

        <div className="form-group">
            <label htmlFor="kilmes_salis" className="form-label">Country of Origin:</label>
            <input type="text" id="kilmes_salis" name="kilmes_salis" className="form-control" required />
        </div>

        <div className="form-group">
            <label htmlFor="Kalba" className="form-label">Language:</label>
            <input type="text" id="Kalba" name="Kalba" className="form-control" required />
        </div>

        <div className="form-group">
            <label htmlFor="subtitrai" className="form-label">Subtitles:</label>
            <select id="subtitrai" name="subtitrai" className="form-control">
                <option value="true">Yes</option>
                <option value="false">No</option>
            </select>
        </div>

        <div className="form-group">
            <label htmlFor="kaina" className="form-label">Price:</label>
            <input type="number" id="kaina" name="kaina" className="form-control" required />
        </div>

        <div className="form-group">
            <label htmlFor="Zanras" className="form-label">Genre:</label>
            <select id="Zanras" name="Zanras" className="form-control" required>
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

            {/* Add Actor Dialog */}
            <div className={`modal fade ${showActorDialog ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: showActorDialog ? 'block' : 'none' }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add Actor</h5>
                            <button type="button" className="close" onClick={handleCloseActorDialog}>
                                &times;
                            </button>
                        </div>
                        <div className="modal-body">
                            <form id="addActorForm">
                                {/* Actor form fields */}
                                <div className="form-group">
                                    <label htmlFor="vardas" className="form-label">
                                        First Name:
                                    </label>
                                    <input
                                        type="text"
                                        id="vardas"
                                        name="vardas"
                                        className="form-control"
                                        value={newActor.vardas}
                                        onChange={(e) => setNewActor({ ...newActor, vardas: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="pavarde" className="form-label">
                                        Last Name:
                                    </label>
                                    <input
                                        type="text"
                                        id="pavarde"
                                        name="pavarde"
                                        className="form-control"
                                        value={newActor.pavarde}
                                        onChange={(e) => setNewActor({ ...newActor, pavarde: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="amzius" className="form-label">
                                        Age:
                                    </label>
                                    <input
                                        type="number"
                                        id="amzius"
                                        name="amzius"
                                        className="form-control"
                                        value={newActor.amzius}
                                        onChange={(e) => setNewActor({ ...newActor, amzius: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="spec" className="form-label">
                                        Specialization:
                                    </label>
                                    <input
                                        type="text"
                                        id="spec"
                                        name="spec"
                                        className="form-control"
                                        value={newActor.spec}
                                        onChange={(e) => setNewActor({ ...newActor, spec: e.target.value })}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="kaskadininkas" className="form-label">
                                        Stuntman?:
                                    </label>
                                    <select
                                        id="kaskadininkas"
                                        name="kaskadininkas"
                                        className="form-control"
                                        value={newActor.kaskadininkas}
                                        onChange={(e) => setNewActor({ ...newActor, kaskadininkas: e.target.value })}
                                    >
                                        <option value="1">Yes</option>
                                        <option value="0">No</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="pilietybe" className="form-label">
                                        Nationality:
                                    </label>
                                    <input
                                        type="text"
                                        id="pilietybe"
                                        name="pilietybe"
                                        className="form-control"
                                        value={newActor.pilietybe}
                                        onChange={(e) => setNewActor({ ...newActor, pilietybe: e.target.value })}
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={handleCloseActorDialog}>
                                Close
                            </button>
                            <button type="button" className="btn btn-primary" onClick={handleAddActor}>
                                Add Actor
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <br />
      <div>
        <button type="button" className="btn btn-primary" onClick={handleAddFilm}>
          Add Film
        </button>
        <button className="btn" onClick={goBack}>
          Back
        </button>
        <button type="button" className="btn btn-primary" onClick={handleShowActorDialog}>
          Add Actor
        </button>
      </div>
      <br />
    </form>
</div>
);
}
export default AddFilm
