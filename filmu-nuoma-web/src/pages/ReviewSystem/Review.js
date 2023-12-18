import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

function Review() {
  const { id } = useParams();

  const [reviewData, setReviewData] = useState(null);

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/reviews/${id}`);

        if (response.ok) {
          const data = await response.json();
          setReviewData(data);
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

  if (!reviewData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Review Details</h2>

      <Stack direction="row" spacing={2}>
        <Avatar>H</Avatar>
        <Stack direction="column" spacing={0.1}>
          <h3>{reviewData.kurejas}</h3>
          <label>{/* Display the date or other relevant information */}</label>
        </Stack>
        <Rating name="read-only" value={reviewData.ivertinimas} readOnly />
      </Stack>
      <br />
      <p>Description: {reviewData.aprasymas}</p>
      <p>Positive: {reviewData.teigiamas}</p>
      <p>Negative: {reviewData.neigiamas}</p>

      {/* Add any other information you want to display */}
      
      <Button variant="contained" color="primary">
        Edit Review
      </Button>
    </div>
  );
}

export default Review;