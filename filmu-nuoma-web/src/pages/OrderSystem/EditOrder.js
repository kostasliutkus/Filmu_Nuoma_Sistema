import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { useNavigate, useParams } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import './OrderStyle.css';

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
    const returnToList = () => {
        navigate(`/FilmList`);
    };
    return (
        <body className="order-body">
            <div className="full-page-div-order">
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
                            <DatePicker  disabled
                                selected={new Date("2002-12-11")}
                                onChange={handleStartDateChange}
                                dateFormat="dd/MM/yyyy"
                            />
                        </td>
                        <td>
                            <DatePicker
                                selected={new Date("2002-12-16")}
                                onChange={handleEndDateChange}
                                dateFormat="dd/MM/yyyy"
                            />
                        </td>
                        <th>5</th>
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
                                Cancel
                            </Button>
                        </td>
                    </tr>
                    <tr onClick={() => navigate(`/film-view/${id}`)}>
                        Watch movie
                    </tr>
                </tbody>
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
    );
}

export default CreateOrder;
