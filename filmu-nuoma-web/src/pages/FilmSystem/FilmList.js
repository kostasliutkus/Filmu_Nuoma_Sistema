import React from "react";
import {useNavigate} from 'react-router-dom'
function FilmList() {
    const navigate = useNavigate();
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
    return (
        <html className="film-html">
        <body className="film-body">
        <h2>Film List Works!</h2>

        <table>
            <thead>
            <tr>
                <th>Movie Name</th>
                <th>Director</th>
                <th>Main Actor</th>
                <th>Length</th>
            </tr>
            </thead>
            <tbody>
            <tr onClick={() => handleRowClick('dQw4w9WgXcQ')}>
                <td>Never Gonna Give You Up</td>
                <td>Rick Astley</td>
                <td>Rick Astley</td>
                <td>3:32</td>
                
                
            </tr>
            <td><button onClick={() =>handleOrder('dQw4w9WgXcQ') }>Rent Movie</button></td>
            <tr onClick={() => handleRowClick('jDNBOy6UE1g')}>
                <td>BASE RACE INCIDENT</td>
                <td>Thebausffs</td>
                <td>Thebausffs</td>
                <td>15:28</td>
                <td>
                
                </td>
            </tr>
            <script>
                // cia i handle order 
                // pirmas param movie id 
                // antras movie name
            </script>
            <td><button onClick={() =>handleOrder('1', "BASE RACE INCIDENT") }>Rent Movie</button></td>
            </tbody>
        </table>
        <div className="grid-item">
            <div>
                <h2>Film management</h2>
            </div>
            <div>
                <button onClick={(goToAdd)}>Add a film</button>
            </div>
            <div>
                <button onClick={(goToEdit)}>Edit a film</button>
            </div>
        </div>
        </body>
        </html>

    );
}
export default FilmList