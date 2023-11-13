import React from "react";
import Rating from '@mui/material/Rating';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

function Review()
{
    return(
        <body>
            <Stack direction="row" spacing={2}>
                <Avatar >H</Avatar>
                <Stack direction="column" spacing={0.1}>
                    <h3>Anonimas</h3>
                    <label>20 min ago</label>
                </Stack>
                <Rating name="read-only" size="large" value={1} readOnly />
            </Stack><br></br>
            <textarea rows="6" cols="100">Cinematek ensures a top-notch streaming experience with high-quality playback and minimal buffering. The streaming platform is adaptive, adjusting to varying internet speeds without compromising on video and audio quality. The convenience of streaming directly from the website eliminates the need for external applications, offering a hassle-free movie-watching experience.</textarea>                    
            <Stack direction="row" spacing={0.1}>
                <Button>LIKE</Button>
                <Button>DISLIKE</Button>
            </Stack>
        </body> );
}
export default Review