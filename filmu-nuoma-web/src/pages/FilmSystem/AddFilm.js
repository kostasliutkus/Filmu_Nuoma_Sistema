import React,{useState,useEffect} from "react";
import {useNavigate, useParams} from 'react-router-dom';
import VideoPlayer  from './VideoPlayer.js' 

function AddFilm() {
//     const [genres, setGenres] = useState([]);

//     useEffect(() => {
//     const fetchGenres = async () => {
//         try {
//             const response = await fetch('http://localhost:5000/api/genres'); // Replace with your actual API endpoint
//             const data = await response.json();
//             setGenres(data);
//         } catch (error) {
//             console.error('Error fetching genres:', error);
//         }
//     };

//     fetchGenres();
// }, []);

    const navigate=useNavigate();
    const goBack = () => {
        navigate(`/FilmList/`);
    };
    const [directors, setDirectors] = useState([]);

    useEffect(() => {
        const fetchDirectors = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/directors'); // Replace with your actual API endpoint
                const data = await response.json();
                setDirectors(data);
            } catch (error) {
                console.error('Error fetching directors:', error);
            }
        };

    fetchDirectors();
    }, []);
    return (
        
        <div class="container mt-5">
    <h2 class="mb-4">Add a Movie</h2>
    <form id="addMovieForm">
        <div class="form-group">
            <label for="name" class="form-label">Name:</label>
            <input type="text" id="name" class="form-control" required />
        </div>

        <div class="form-group">
            <label for="releaseDate" class="form-label">Release Date:</label>
            <input type="date" id="releaseDate" name="releaseDate" class="form-control" required />
        </div>

        <div class="form-group">
            <label for="length" class="form-label">Length (minutes):</label>
            <input type="number" id="length" name="length" class="form-control" required />
        </div>

        <div class="form-group">
            <label for="director" class="form-label">Director:</label>
            <select id="director" name="director" class="form-control" required>
                {directors.map((director) => (
                    <option key={director.id} value={director.id}>
                        {director.vardas} {director.pavarde}
                    </option>
                ))}
            </select>
        </div>
        
        <div class="form-group">
            <label for="rating" class="form-label">Rating:</label>
            <input type="text" id="rating" name="rating" class="form-control" required />
        </div>

        <div class="form-group">
            <label for="studio" class="form-label">Studio:</label>
            <input type="text" id="studio" name="studio" class="form-control" required />
        </div>

        <div class="form-group">
            <label for="country" class="form-label">Country of Origin:</label>
            <input type="text" id="country" name="country" class="form-control" required />
        </div>

        <div class="form-group">
            <label for="language" class="form-label">Language:</label>
            <input type="text" id="language" name="language" class="form-control" required />
        </div>

        <div class="form-group">
            <label for="subtitles" class="form-label">Subtitles:</label>
            <select id="subtitles" name="subtitles" class="form-control">
                <option value="true">Yes</option>
                <option value="false">No</option>
            </select>
        </div>

        <div class="form-group">
            <label for="price" class="form-label">Price:</label>
            <input type="number" id="price" name="price" class="form-control" required />
        </div>

        <div class="form-group">
            <label for="genre" class="form-label">Genre:</label>
            <select id="genre" name="genre" class="form-control" required>
                {/* {genres.map((genre) => (
                    <option key={genre.id_Zanras} value={genre.id_Zanras}>
                        {genre.name}
                    </option>
                ))} */}
            </select>
        </div>

        <br></br>
        <div><button type="button" class="btn btn-primary">Add Film</button><button class="btn" onClick={(goBack)}>Back</button></div>
        <br></br>
    </form>
</div>
);
}
export default AddFilm
