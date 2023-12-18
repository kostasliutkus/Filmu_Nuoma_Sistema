import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function CreateOrder() {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [isChecked, setIsChecked] = useState(false);
    const [openRentDialog, setOpenRentDialog] = useState(false);
    const [openCancelDialog, setOpenCancelDialog] = useState(false);

    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
    };

    const handleRentMovie = () => {
        setOpenRentDialog(true);
    };

    const handleCancelMovie = () => {
        setOpenCancelDialog(true);
    };

    const handleCloseRentDialog = () => {
        setIsChecked(true);
        setOpenRentDialog(false);
    };
    const handleCloseRentDialogNo = () => {
        setOpenRentDialog(false);
    };

    const handleCloseCancelDialog = () => {
        setOpenCancelDialog(false);
        returnToList();
    };

    const navigate = useNavigate();
    const { id } = useParams();
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const movieName = params.get('movieName');
    const returnToList = () => {
        navigate(`/FilmList`);
    };

// sits dar neveikia
    const postOrder = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    uzsakymo_data: startDate, // Assuming your API expects the start date in the correct format
                    uzsakytas_filmas: movieName, // Replace with the actual movie title
                    uzsakymo_data: startDate
                    // Include other relevant data for the order
                }),
            });

            if (response.ok) {
                console.log('Order created successfully');
                // You can perform additional actions after successful order creation
            } else {
                console.error('Failed to create order:', response.statusText);
            }
        } catch (error) {
            console.error('Error creating order:', error);
        }
    };
    return (
        <html className="film-html">
            <body className="order-body">
                <div className="full-page-div-order">
                    <div>
                        Movie: {movieName} 
                        </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Starting date</th>
                                <th>End date</th>
                                <th>Price</th>
                                <th>Is Paid</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <DatePicker
                                        selected={startDate}
                                        onChange={handleStartDateChange}
                                        dateFormat="dd/MM/yyyy"
                                    />
                                </td>
                                <td>
                                    <DatePicker
                                        selected={endDate}
                                        onChange={handleEndDateChange}
                                        dateFormat="dd/MM/yyyy"
                                    />
                                </td>
                                <th>5</th>
                                <td>
                                    <input type="checkbox" checked={isChecked} disabled={!isChecked} />
                                </td>
                            </tr>
                            <tr>
                                <td>Owned credits:</td>
                                <td>54</td>
                                <td>
                                    <Button variant="outlined" onClick={handleRentMovie}>
                                        Rent Movie
                                    </Button>
                                </td>
                                <td>
                                    <Button variant="outlined" onClick={handleCancelMovie}>
                                        Cancel
                                    </Button>
                                </td>
                            </tr>
                            <tr onClick={() => navigate(`/film-view/${id}`)}>
                                <td>Watch movie</td>

                            </tr>
                        </tbody>
                    </table>

                </div>

                {/* Rent Dialog */}
                <Dialog
                    open={openRentDialog}
                    onClose={handleCloseRentDialog}
                    aria-labelledby="rent-dialog-title"
                    aria-describedby="rent-dialog-description"
                >
                    <DialogTitle id="rent-dialog-title">Rent Movie</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="rent-dialog-description">
                            Confirm the rental of the movie.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseRentDialogNo}>Cancel</Button>
                        <Button onClick={handleCloseRentDialog} autoFocus>
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Cancel Dialog */}
                <Dialog
                    open={openCancelDialog}
                    onClose={handleCloseCancelDialog}
                    aria-labelledby="cancel-dialog-title"
                    aria-describedby="cancel-dialog-description"
                >
                    <DialogTitle id="cancel-dialog-title">Cancel Movie</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="cancel-dialog-description">
                            Are you sure you want to cancel the rental of the movie?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseCancelDialog}>No</Button>
                        <Button onClick={handleCloseCancelDialog} autoFocus>
                            Yes, Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </body>
        </html>
    );
}

export default CreateOrder;
