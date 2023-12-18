import React, { useState} from "react";
import  {useNavigate, useParams} from 'react-router-dom';
import Rating from '@mui/material/Rating';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

function AddReview()
{
    const navigate = useNavigate();
    const {id} = useParams();
    const handleRowClick = (id) => {
        navigate(`/film-view/${id}`);
    };
    const [formData, setFormData] = useState({
        ivertinimas: 0,
        aprasymas: '',
        teigiamas: 0,
        neigiamas: 0,
      });
    const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
          fk_Filmasid: id,
          fk_Klientasid: 1,
        });
      };
      const handleSubmit = async () => {
        try {
            setFormData({
                ...formData,
                fk_Filmasid: id,
                fk_Klientasid: 1,
              });
          const response = await fetch('http://localhost:5000/api/reviews', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
    
          if (response.ok) {
            alert('Review added successfully!');
            navigate(`/film-view/${id}`);
            // Optionally, you can redirect to another page or perform other actions.
          } else {
            const errorMessage = await response.text();
            alert(`Error adding review: ${errorMessage}`);
          }
        } catch (error) {
          console.error('Error adding review:', error);
          alert('Error adding review. Please try again.');
        }
      };
      const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      };
    return(
        <body>
            <form>            
                <Stack direction="row" spacing={2}>
                    <Avatar sx={{ backgroundColor: getRandomColor() }}></Avatar>
                    <Rating
                        name="ivertinimas"
                        size="large"
                        value={formData.ivertinimas}
                        onChange={handleChange}
                    />
                </Stack><br></br>
                <textarea name="aprasymas" value={formData.aprasymas} onChange={handleChange} required rows="4" cols="50" placeholder="Add review..."></textarea>   
                <br></br><br></br>
                <Stack direction="row" spacing={5}>
                    <Button onClick={handleSubmit}>Add review</Button>
                    <Button >Share</Button> 
                </Stack>
            </form>   
        </body> );
}
export default AddReview