import React from "react";
import  {useParams} from 'react-router-dom';
import VideoPlayer  from './VideoPlayer.js'
const FilmView = () => {
    const {id} = useParams();
    return (
        <div>
            <VideoPlayer videoId={id} width="560" height="315" />
            <div><h2>Reviews</h2></div>
            <div><button>Reviews</button></div>
        </div>
    );
};

export default FilmView;
