import React from 'react';

const VideoPlayer = ({ videoId, width, height }) => {
    const src = `https://www.youtube.com/embed/2DeLrLEagU0?si=X7nWfXRhAClDUfMv`;

    return (
        <iframe
            width={width}
            height={height}
            src={src}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded YouTube Video"
        ></iframe>
    );
};

export default VideoPlayer;
