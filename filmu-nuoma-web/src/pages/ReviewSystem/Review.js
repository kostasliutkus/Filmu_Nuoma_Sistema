import React, { useState, useEffect } from 'react';
import  {useNavigate, useParams} from 'react-router-dom';
import Rating from '@mui/material/Rating';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { FacebookShareButton, RedditShareButton,  TwitterShareButton} from "react-share";
import { FacebookIcon, TwitterIcon, RedditIcon } from "react-share";

function Review() {
  const { id } = useParams();
  const navigate = useNavigate();

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
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  const clickEditReview = () => {
    navigate(`/EditReview/${id}`);
  };
  const clickDeleteReview = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/reviews/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Review deleted successfully!');
        navigate(`/film-view/${id}`); // Navigate to the reviews page or another appropriate page
      } else {
        const errorMessage = await response.text();
        alert(`Error deleting review: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Error deleting review:', error);
      alert('Error deleting review. Please try again.');
    }
  };

  return (
    <div>
      <h2>Review Details</h2>


      <Stack direction="row" spacing={2}>
        <Avatar sx={{ backgroundColor: getRandomColor() }}>{reviewData.aprasymas.charAt(0)}</Avatar>
        <Stack direction="column" spacing={0.1}>
          <h3>{reviewData.fk_Klientasid}</h3>          
        </Stack>
        <Rating name="read-only" value={reviewData.ivertinimas} readOnly />
      </Stack>
      <br />
      <textarea readonly rows="4" cols="50">{reviewData.aprasymas}</textarea>
      <Stack direction="row" spacing={2}>
        <p>Likes {reviewData.teigiamas}</p>
        <p>Dislikes {reviewData.neigiamas}</p>
        <Button variant="contained" color="primary" onClick={clickEditReview}>
            Edit Review
        </Button>
        <Button variant="contained" color="error" onClick={clickDeleteReview}>
          Delete Review
        </Button>
        <FacebookShareButton
            url={"https://www.youtube.com/watch?v=dQw4w9WgXcQ"}
            hashtag={`#${reviewData.aprasymas}`}
            className="Demo__some-network__share-button"
        >
            <FacebookIcon size={32} round />
        </FacebookShareButton>
        <br />
        <TwitterShareButton
            title={`${reviewData.aprasymas}`}
            url={"https://www.youtube.com/watch?v=dQw4w9WgXcQ"}
        >
            <TwitterIcon size={32} round />
        </TwitterShareButton>
        <RedditShareButton
            title={"My review"}
            url={`${reviewData.aprasymas}`}
        >
            <RedditIcon size={32} round />
        </RedditShareButton>
      </Stack>      
    </div>
  );
}

export default Review;