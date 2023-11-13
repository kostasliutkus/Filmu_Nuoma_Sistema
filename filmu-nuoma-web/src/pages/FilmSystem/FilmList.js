import React from "react";
import './FilmStyle.css';
import {useNavigate} from 'react-router-dom'
function FilmList() {
    const navigate = useNavigate();

    const handleRowClick = (id) => {
        navigate(`/film-view/${id}`);
    };
    const handleOrder = (id) => {
        navigate(`/Order/${id}`);
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
            <td><button onClick={() =>handleOrder('jDNBOy6UE1g') }>Rent Movie</button></td>
            </tbody>
        </table>

        </body>
        </html>

    );
}
export default FilmList