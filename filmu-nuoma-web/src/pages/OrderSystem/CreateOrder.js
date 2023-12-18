import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from "axios";

function CreateOrder() {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [isChecked, setIsChecked] = useState(false);
    const [openRentDialog, setOpenRentDialog] = useState(false);
    const [openCancelDialog, setOpenCancelDialog] = useState(false);
    const [price, SetPrice] = useState(0);

    const CheckDates = (startDate, endDate) => {
        if (startDate == null || endDate == null) {
            return false;
        }
        const oneDay = 24 * 60 * 60 * 1000;
        const startMilliseconds = startDate.getTime();
        const endMilliseconds = endDate.getTime();

        // Calculate the difference in days
        const differenceInDays = Math.abs((endMilliseconds - startMilliseconds) / oneDay) + 1;

        // Calculate the price based on the difference in days
        SetPrice(differenceInDays);
        return true;
    };
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
        if (!CheckDates(startDate, endDate)){
            setOpenRentDialog(false);
            return;
        }
        setIsChecked(true);
        postOrder();
        setOpenRentDialog(false);
    };
    const handleCloseRentDialogNo = () => {
        setOpenRentDialog(false);
    };

    const handleCloseCancelDialog = () => {
        setOpenCancelDialog(false);
        returnToList();
    };
    const CanWatch = () => {
        if (isChecked) {
            navigate(`/film-view/${id}`);
        }
    };

    const navigate = useNavigate();
    const { id } = useParams();
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const movieName = params.get('movieName');
    const returnToList = () => {
        navigate(`/FilmList`);
    };
    const formattedDate = `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`;
    const [userData, setUserData] = useState({});
    const [orderData, setOrderData] = useState({
        apmoketas: 1,
        uzsakymo_data: formattedDate,
        uzsakytas_filmas: movieName,
        fk_Filmasid: 0,
        fk_Klientasid: 0,
    });


    useEffect(() => {
        // Function to fetch user data from your API
        const token = localStorage.getItem('token')
        const fetchUserData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/user-profile', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                });
                const data = await response.json();
                setUserData(data); // Assuming the API returns an object with user data
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);
    const postOrder = async () => {
        const token = localStorage.getItem('token');
        userData.kreditas -= price;
        console.log(userData);
        try {
            const response = await fetch('http://localhost:5000/api/update-profile', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                console.log('Profile updated successfully');
                //navigate('/OrderList');



                const orderchanges = {
                    ...orderData,
                    kaina: price,
                    fk_Filmasid: parseInt(id),
                    fk_Klientasid: userData.id,
                }


                console.log('order form: ', orderchanges);
                await axios.post('http://localhost:5000/api/orders', orderchanges);





            } else {
                console.error('Failed to update profile:', response.status);
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
                                        onChange={(date) => {
                                            handleStartDateChange(date);
                                            CheckDates(date, endDate);
                                        }}
                                        dateFormat="dd/MM/yyyy"

                                    />
                                </td>
                                <td>
                                    <DatePicker
                                        selected={endDate}
                                        onChange={(date) => {
                                            handleEndDateChange(date);
                                            CheckDates(startDate, date);
                                        }}
                                        dateFormat="dd/MM/yyyy"
                                    />
                                </td>
                                <th>{price}</th>
                                <td>
                                    <input type="checkbox" checked={isChecked} disabled={!isChecked} />
                                </td>
                            </tr>
                            <tr>
                                <script>

                                </script>
                                <td>Owned credits:</td>
                                <td>{userData.kreditas}</td>
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
                            <tr onClick={() => CanWatch()}>
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
