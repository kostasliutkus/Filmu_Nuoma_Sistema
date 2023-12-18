import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {cyan} from '@mui/material/colors';

function EditReview()
{
    const navigate = useNavigate();
    const { id } = useParams();
    const handleRowClick = (id) => {
        navigate(`/film-view/${id}`);
    };

    const [formData, setFormData] = useState({
        ivertinimas: 0,
        aprasymas: '',
        teigiamas: 0,
        neigiamas: 0,
      });
    const [value, setValue] = React.useState(3);
    useEffect(() => {
        const fetchReview = async () => {
          try {
            const response = await fetch(`http://localhost:5000/api/reviews/${id}`);
            if (response.ok) {
              const reviewData = await response.json();
              // Set the form data with the existing review data
              setFormData({
                ivertinimas: reviewData.ivertinimas,
                aprasymas: reviewData.aprasymas,
                teigiamas: reviewData.teigiamas,
                neigiamas: reviewData.neigiamas,
              });
              // Set the rating value
              setValue(reviewData.ivertinimas);
            } else {
              const errorMessage = await response.text();
              alert(`Error fetching review: ${errorMessage}`);
            }
          } catch (error) {
            console.error('Error fetching review:', error);
            alert('Error fetching review. Please try again.');
          }
        };
    
        fetchReview();
      }, [id]);
    
      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };
      const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      };
    
      const handleEditReview = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/reviews/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
    
          if (response.ok) {
            alert('Review updated successfully!');
            // Optionally, you can redirect to another page or perform other actions.
            navigate(`/film-view/${id}`);
          } else {
            const errorMessage = await response.text();
            alert(`Error updating review: ${errorMessage}`);
          }
        } catch (error) {
          console.error('Error updating review:', error);
          alert('Error updating review. Please try again.');
        }
      };
    return(
        <body>
            <form>
                <label htmlFor="ivertinimas">Rating:</label>
                <input type="number" id="ivertinimas" name="ivertinimas" value={formData.ivertinimas} onChange={handleChange} required /><br />

                <label htmlFor="aprasymas">Description:</label>
                <textarea id="aprasymas" name="aprasymas" value={formData.aprasymas} onChange={handleChange} required></textarea><br />

                <label htmlFor="teigiamas">Positive:</label>
                <input type="number" id="teigiamas" name="teigiamas" value={formData.teigiamas} onChange={handleChange} required /><br />

                <label htmlFor="neigiamas">Negative:</label>
                <input type="number" id="neigiamas" name="neigiamas" value={formData.neigiamas} onChange={handleChange} required /><br />

                <button type="button" onClick={handleEditReview}>Update Review</button>
            </form>
            <Stack direction="row" spacing={2}>
            <Avatar sx={{ bgcolor: cyan[500] }}>M</Avatar>
                <Stack direction="column" spacing={0.1}>
                    <h3>Me</h3>
                    <label>now</label>
                </Stack>
                <Rating
                    name="simple-controlled"
                    size="large"
                    value={value}
                    onChange={(event, newValue) => {
                    setValue(newValue);
                    }}
                />
            </Stack><br></br>
            <textarea rows="4" cols="50" placeholder="Add review...">This is my review</textarea>   
            <br></br><br></br>
            <Stack direction="row" spacing={5}>
                <Button onClick={() => handleRowClick('dQw4w9WgXcQ')}>Save review</Button>
                <Button >Share</Button> 
            </Stack>              
                
        </body> );
}
export default EditReview