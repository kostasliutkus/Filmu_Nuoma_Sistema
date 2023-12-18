import React, { useState, useEffect } from "react";
import  {useNavigate, useParams} from 'react-router-dom';
import VideoPlayer  from './VideoPlayer.js';
import Rating from '@mui/material/Rating';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { deepOrange, deepPurple, cyan} from '@mui/material/colors';
import { Box } from "@mui/material";
import '@mui/material/styles';
import './FilmStyle.css'

const FilmView = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [reviews, setReviews] = useState([]);
    const [userId, setUserId] = useState(null);
    const [username, setUsername] = useState(null);

    const clickReview = (id) => {
        navigate(`/Review/${id}`);
    };
    const clickAddReview = () => {
        navigate(`/AddReview/${id}`);
    };
    const clickEditReview = () => {
        navigate(`/EditReview/${id}`);
    };
    useEffect(() => {
        const fetchReviews = async () => {
          try {
            const response = await fetch('http://localhost:5000/api/reviews');
    
            if (response.ok) {
              const data = await response.json();
              setReviews(data);
            } else {
              const errorMessage = await response.text();
              alert(`Error fetching reviews: ${errorMessage}`);
            }
          } catch (error) {
            console.error('Error fetching reviews:', error);
            alert('Error fetching reviews. Please try again.');
          }
        };
    
        fetchReviews();
      }, []);
      const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
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
                    <h1>Reviews</h1>
                    <Stack direction="row" spacing={2}>
                        <h5>Average rating</h5>
                        <Rating name="read-only" size="large" value={3} readOnly />
                        <h4>{reviews.length} users</h4>
                    </Stack> 
                    <br></br><br></br>
                        {reviews.map((review) => (
                            <Box 
                            key={review.id}
                            sx={{
                                width: 400,
                                ":hover": {
                                    boxShadow: 6,
                                    cursor:'pointer',
                                    },
                            }}
                            onClick={() => clickReview(review.id)}>
                            <Stack direction="row" spacing={2}>
                                <Avatar sx={{ backgroundColor: getRandomColor() }}>{review.aprasymas.charAt(0)}</Avatar>
                                <Stack direction="column" spacing={0.1}>
                                    <h3>{review.fk_Klientasid}</h3>
                                </Stack>
                                <Rating name="read-only" size="large" value={1} readOnly />
                            </Stack><br></br>
                            <textarea rows="4" cols="50">{review.aprasymas}</textarea>
                            <Stack direction="row" spacing={2}><p>Likes {review.teigiamas}</p>
                            <p>Dislikes {review.neigiamas}</p></Stack>

                            <Box sx={{ bgcolor: '#c5cae9' }}> MORE</Box>                   
                        </Box>
                        ))}
                        <br></br><br></br>
                        <Button onClick={clickAddReview} variant="contained" color="primary">
                            Add Review
                        </Button>
                </div>   
            </div>
        </body>
    );  
};

export default FilmView;
