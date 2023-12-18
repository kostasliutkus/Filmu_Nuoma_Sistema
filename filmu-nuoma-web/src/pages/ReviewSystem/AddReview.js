import React, { useState } from "react";
import Rating from '@mui/material/Rating';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router";

function AddReview()
{
    const navigate = useNavigate();
    const handleRowClick = (id) => {
        navigate(`/film-view/${id}`);
    };
    const [formData, setFormData] = useState({
        ivertinimas: 0,
        aprasymas: '',
        teigiamas: 0,
        neigiamas: 0,
        fk_Klientasid: 0,
      });
    const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };
      const handleSubmit = async () => {
        try {
          const response = await fetch('/reviews', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
    
          if (response.ok) {
            alert('Review added successfully!');
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
    const [value, setValue] = React.useState(0);
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

            <label htmlFor="fk_Filmasid">Film ID:</label>
            <input type="number" id="fk_Filmasid" name="fk_Filmasid" value={formData.fk_Filmasid} onChange={handleChange} required /><br />

            <label htmlFor="fk_Klientasid">Client ID:</label>
            <input type="number" id="fk_Klientasid" name="fk_Klientasid" value={formData.fk_Klientasid} onChange={handleChange} required /><br />

            <button type="button" onClick={handleSubmit}>Add Review</button>
        </form>
            <Stack direction="row" spacing={2}>
                <Avatar >H</Avatar>
                <Stack direction="column" spacing={0.1}>
                    <h3>Anonimas</h3>
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
            <textarea rows="4" cols="50" placeholder="Add review..."></textarea>   
            <br></br><br></br>
            <Stack direction="row" spacing={5}>
                <Button onClick={() => handleRowClick('dQw4w9WgXcQ')}>Add review</Button>
                <Button >Share</Button> 
            </Stack>              
                
        </body> );
}
export default AddReview