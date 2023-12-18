import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import jsPDF from 'jspdf';


function CreateInvoice() {
    const [showMessage, setShowMessage] = useState(false);
    const navigate = useNavigate();

    const buttonCheck = () => {
        generateInvoice();
        setShowMessage(true);
    };

    const goBack = () => {
        navigate(`/OrderList`);
    };

    const { id } = useParams();
    const returnToList = () => {
        navigate(`/OrderList`);
    };

    const [userData, setUserData] = useState({});
    const [orderData, setOrderData] = useState({});
    const [invoiceData, setinvoiceData] = useState({});

    useEffect(() => {
        // Fetch user data
        const token = localStorage.getItem('token');
        const fetchUserData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/user-profile', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                });
                const data = await response.json();
                console.log(data);
                setUserData(data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        // Fetch order data
        const fetchOrderData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/orders/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                });
                const data = await response.json();
                setOrderData(data);
            } catch (error) {
                console.error('Error fetching order data:', error);
            }
        };


        fetchUserData();
        fetchOrderData();

    }, []);


    const postInvoice = async () => {
        const token = localStorage.getItem('token')

        const newInvoice = {
            pirkejas: userData.name + ' ' + userData.lastName,
            suma: orderData.kaina,
            aprasas: 'Ninja Turtles Blockbuster invoice very good nice pls help',
            israso_data: Date.now(),
            suma_zodziais: orderData.kaina + 'dabloons',
            pardavejo_informacija: 'Ninja turtles web',
            fk_Uzsakymasid: orderData.id,
        }
        console.log(JSON.stringify(newInvoice));
        try {
            const response = await fetch('http://localhost:5000/api/invoices', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newInvoice),
            });
            const data = await response.json();
            setinvoiceData(data);
        } catch (error) {
        }
    }

    const generateInvoice = () => {
        postInvoice();

        const pdf = new jsPDF();

        pdf.setProperties({
            title: 'Turtle Invoice',
            subject: 'This is the subject',
            author: 'Ninja Turtles Blockbuster',
            keywords: 'invoice, movie, renting, turtles',
            creator: 'TURTLES'
        });

        pdf.setFontSize(11);

        pdf.text('Ninja turtles web\nStudentu g. 56\nKaunas, Kauno savivaldybe, 51424\n505-503-4455, bob@gmail.com', 20, 20);

        pdf.text('Date', 150, 30);
        var data = `${orderData.uzsakymo_data}`;
        pdf.text(data, 180, 30);

        pdf.text('INVOICE NO.', 150, 40);
        var invoicenum = `${invoiceData.id}`;
        pdf.text(invoicenum, 180, 40);

        var name = prompt('Your companys\'s title:');
        var contactName = `${userData.name}`;
        var address = prompt('Your companys\'s address:');
        var contactNumber = prompt('Your companys\'s contact number:');
        pdf.text('BILL TO', 20, 80);
    pdf.text('Contact Name', 20, 90);
    pdf.text(`${contactName}`, 80, 90);
    pdf.text('Client Company Name', 20, 100);
    pdf.text(`${name}`, 80, 100);
    pdf.text('Address', 20, 110);
    pdf.text(`${address}`, 80, 110);
    pdf.text('Phone', 20, 120);
    pdf.text(`${contactNumber}`, 80, 120);


    pdf.text('DESCRIPTION', 20, 170);
    pdf.text('UNIT PRICE', 80, 170);

    pdf.text(`${orderData.uzsakytas_filmas}`, 20, 180);
    pdf.text(`${orderData.kaina}`, 80, 180);

    pdf.save('invoice.pdf');
    };

    return (
        <div>
            <button onClick={buttonCheck}>Generate</button>
            <button onClick={goBack}>Back</button>
            {showMessage && <h1>Invoice generated</h1>}
        </div>
    );
}

export default CreateInvoice;
