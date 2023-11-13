import React from "react";
import  {useNavigate, useParams} from 'react-router-dom';
import VideoPlayer  from './VideoPlayer.js';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { deepOrange, deepPurple } from '@mui/material/colors';
import { Box } from "@mui/material";
import '@mui/material/styles';
import './FilmStyle.css'

const FilmView = () => {
    const navigate = useNavigate();
    const {id} = useParams();

    const clickReview = () => {
        navigate(`/Review`);
    };
    const clickAddReview = () => {
        navigate(`/AddReview`);
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
                    <div>
                        <h1>Reviews</h1> 
                        <Stack direction="row" spacing={2}>
                            <Typography>Average rating</Typography>
                            <Rating name="read-only" size="large" value={3} readOnly />
                            <Typography>3 users</Typography>
                        </Stack> 
                        <br></br><br></br>
                        <Box sx={{
                                width: 400,
                                ":hover": {
                                    boxShadow: 6,
                                    },
                            }}
                            onClick={() => clickReview()}>
                            <Stack direction="row" spacing={2}>
                                <Avatar >H</Avatar>
                                <Stack direction="column" spacing={0.1}>
                                    <h3>Anonimas</h3>
                                    <label>20 min ago</label>
                                </Stack>
                                <Rating name="read-only" size="large" value={1} readOnly />
                            </Stack><br></br>
                            <textarea rows="4" cols="50">Cinematek ensures a top-notch streaming experience with high-quality playback and minimal buffering. The streaming platform is adaptive, adjusting to varying internet speeds without compromising on video and audio quality. The convenience of streaming directly from the website eliminates the need for external applications, offering a hassle-free movie-watching experience.</textarea>                    
                        </Box>
                        <br></br><br></br>
                        <Box sx={{
                                width: 400,
                                ":hover": {
                                    boxShadow: 6,
                                    },
                            }}
                            onClick={() => clickReview()}>
                            <Stack direction="row" spacing={2}>
                                <Avatar sx={{ bgcolor: deepOrange[500] }}>T</Avatar>
                                <Stack direction="column" spacing={0.1}>
                                    <h3>Turtle_enjoyer</h3>
                                    <label>5 hours ago</label>
                                </Stack>
                                <Rating name="read-only" size="large" value={5} readOnly />
                            </Stack><br></br>
                            <textarea rows="4" cols="50">Cinematek ensures a top-notch streaming experience with high-quality playback and minimal buffering. The streaming platform is adaptive, adjusting to varying internet speeds without compromising on video and audio quality. The convenience of streaming directly from the website eliminates the need for external applications, offering a hassle-free movie-watching experience.</textarea>                
                        </Box>
                        <br></br><br></br>
                        <Box sx={{
                                width: 400,
                                ":hover": {
                                    boxShadow: 6,
                                    },
                            }}
                            onClick={() => clickReview()}>
                            <Stack direction="row" spacing={2}>
                                <Avatar sx={{ bgcolor: deepPurple[500] }}>A</Avatar>
                                <Stack direction="column" spacing={0.1}>
                                    <h3>Anonymus123</h3>
                                    <label>3.5 hours ago</label>
                                </Stack>
                                <Rating name="read-only" size="large" value={3} readOnly />
                            </Stack><br></br>
                            <textarea rows="4" cols="50">Cinematek ensures a top-notch streaming experience with high-quality playback and minimal buffering. The streaming platform is adaptive, adjusting to varying internet speeds without compromising on video and audio quality. The convenience of streaming directly from the website eliminates the need for external applications, offering a hassle-free movie-watching experience.</textarea>                        
                        </Box>
                        <br></br><br></br>
                        <Button size="large" onClick={() => clickAddReview()}>Add review</Button>
                    </div>
                    </div>
                </div>

            </div>


        </body>
    );  
};

export default FilmView;
