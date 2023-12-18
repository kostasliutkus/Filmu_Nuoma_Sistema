import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { useNavigate, useParams } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from "axios";

function CreateOrder() {
    const [isChecked, setIsChecked] = useState(false);
    const [openRentDialog, setOpenRentDialog] = useState(false);
    const [openCancelDialog, setOpenCancelDialog] = useState(false);

    const handleRentMovie = () => {
        setOpenRentDialog(true);
    };

    const handleCancelMovie = () => {
        setOpenCancelDialog(true);
    };


    const updateOrder = async (updatedDate) => {
        try {

            const changedOrder = {
                ...orderData,
                uzsakymo_data: updatedDate,
            }
            await axios.put(`http://localhost:5000/api/orders/${orderData.id}`, orderData);

        } catch (error) {
            console.error('Error creating order:', error);
        }
    }
    const updateUserCredit = async () => {
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
        }catch(error)
        {
            console.error('Error creating order:', error);
        }
    }

    const handleCloseRentDialog = () => {
        if (!(userData.kreditas > price)) {
            setOpenRentDialog(false);
            return;
        }
        const dateParts = orderData.uzsakymo_data.split('/');
        const orderDate = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`); // Create a Date object

        // Assuming price is a number representing the number of days to add
        const priceAsNumber = parseInt(price, 10);

        // Add the price to the order date
        orderDate.setDate(orderDate.getDate() + priceAsNumber);

        // Convert the updated date back to the desired string format
        const updatedDate = `${orderDate.getDate()}/${orderDate.getMonth() + 1}/${orderDate.getFullYear()}`;
        orderData.uzsakymo_data = updatedDate;
        updateOrder(updatedDate);
        updateUserCredit();
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
    const returnToList = () => {
        navigate(`/OrderList`);
    };

    const [price, SetPrice] = useState(0);
    const [orderData, setOrderData] = useState({});
    const [userData, setUserData] = useState({});

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



    useEffect(() => {
        // Function to fetch user data from your API
        const token = localStorage.getItem('token')
        const fetchOrderData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/orders/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                });
                const data = await response.json();
                setOrderData(data); // Assuming the API returns an object with user data
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchOrderData();
    }, []);
    return (
        <html className="film-html">
            <body className="film-body">
                <table>
                    <thead>
                        <tr>
                            <th>End Date</th>
                            <th>Extension amount</th>
                            <th>Price</th>
                            <th>Is Paid</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                {orderData.uzsakymo_data}
                            </td>
                            <td>
                                <input
                                    type="number"
                                    onChange={(e) => {
                                        SetPrice(e.target.value);
                                    }}
                                />
                            </td>
                            <th>{price}</th>
                            <td>
                                <input type="checkbox" checked={true} disabled />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Button variant="outlined" onClick={handleRentMovie}>
                                    Save
                                </Button>
                            </td>
                            <td>
                                <Button variant="outlined" onClick={handleCancelMovie}>
                                    Back
                                </Button>
                            </td>
                        </tr>
                        <td>Owned credits:</td>
                        <td>{userData.kreditas}</td>
                    </tbody>
                </table>
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
                    <DialogTitle id="cancel-dialog-title">Go back</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="cancel-dialog-description">
                            Are you sure you want to leave ?
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
