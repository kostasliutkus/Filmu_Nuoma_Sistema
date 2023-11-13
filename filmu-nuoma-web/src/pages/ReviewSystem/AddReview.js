import React from "react";
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
    const [value, setValue] = React.useState(0);
    return(
        <body>
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