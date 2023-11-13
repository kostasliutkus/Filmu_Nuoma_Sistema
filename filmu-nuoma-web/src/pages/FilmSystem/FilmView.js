import React from "react";
import {useNavigate, useParams} from 'react-router-dom';
import VideoPlayer  from './VideoPlayer.js'
import './FilmStyle.css'

const FilmView = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const goToReviews = () => {
        navigate(`/Reviews`);
    };

    return (
        <body>
            <div className="encased-div">
                <div className="grid-item">
                    <VideoPlayer videoId={id} width="560" height="315" />
                </div>

                <div className="grid-item">
                    <table className="recommendation-table">
                        <thead className="recommendation-thead">
                        <h1>Recommendations</h1>
                        <tr>
                            <th>Movie Name</th>
                            <th>Director</th>
                            <th>Main Actor</th>
                            <th>Length</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Never Gonna Give You Up</td>
                            <td>Rick Astley</td>
                            <td>Rick Astley</td>
                            <td>3:32</td>
                        </tr>
                        <tr>
                            <td>BASE RACE INCIDENT</td>
                            <td>Thebausffs</td>
                            <td>Thebausffs</td>
                            <td>15:28</td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <div className="grid-item">
                    <div>
                        <h2>Reviews</h2>
                    </div>
                    <div>
                        <button onClick={(goToReviews)}>Add a review</button>
                    </div>
                </div>

            </div>


        </body>
    );
};

export default FilmView;
