import React from "react";
import VideoPlayer from './VideoPlayer.js'
import './FilmStyle.css'
function Film() {

    return (
        <body className="FilmBody">
        <div className="full-page-div">
            <VideoPlayer videoId={'dQw4w9WgXcQ'} width="560" height="315" />
        </div>
        </body>
    );
}
export default Film