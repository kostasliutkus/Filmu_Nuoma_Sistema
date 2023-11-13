import React from "react";
import {useNavigate, useParams} from 'react-router-dom';
import VideoPlayer  from './VideoPlayer.js'
import './FilmStyle.css'

function EditFilm()
{
    const navigate=useNavigate();
    const goBack = () => {
        navigate(`/FilmList/`);
    };
    return (
        <div>
            <h2>Add Movie</h2>
            <form id="addMovieForm">
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" required></input>

                <label htmlFor="releaseDate">Release Date:</label>
                <input type="date" id="releaseDate" name="releaseDate" required></input>

                <label htmlFor="length">Length (minutes):</label>
                <input type="number" id="length" name="length" required></input>

                <label htmlFor="director">Director:</label>
                <input type="text" id="director" name="director" required></input>

                <label htmlFor="rating">Rating:</label>
                <input type="text" id="rating" name="rating" required></input>

                <label htmlFor="studio">Studio:</label>
                <input type="text" id="studio" name="studio" required></input>

                <label htmlFor="country">Country of Origin:</label>
                <input type="text" id="country" name="country" required></input>

                <label htmlFor="language">Language:</label>
                <input type="text" id="language" name="language" required></input>

                <label htmlFor="subtitles">Subtitles:</label>
                <select id="subtitles" name="subtitles">
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>

                <label htmlFor="price">Price:</label>
                <input type="number" id="price" name="price" required></input>
                <button type="button" onClick={(goBack)}>Change Movie</button>
            </form>
            <button onClick={(goBack)}>Back</button>
        </div>

    );
}
export default EditFilm;
