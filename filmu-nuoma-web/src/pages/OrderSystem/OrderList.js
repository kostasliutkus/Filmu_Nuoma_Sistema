import React, { useState, useEffect } from "react";
import '../FilmSystem/FilmStyle.css';
import { useNavigate } from 'react-router-dom'
function OrderList() {
    const navigate = useNavigate();

    const handleRowClick = (id) => {
        navigate(`/EditOrder/${id}`);
    };
    const goToCreateInvoice = () => {
        navigate(`/CreateInvoice`);
    };
    const [orderData, setOrderData] = useState({});

    useEffect(() => {
        // Function to fetch user data from your API
        const token = localStorage.getItem('token')
        const fetchOrderData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/orders', {
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

                <h2>Movies</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Movie Name</th>
                            <th>Price</th>
                            <th>Order Date</th>
                            <th>Is paid</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(orderData).map((orderId) => (
                            <tr key={orderId} onClick={() => handleRowClick(orderId)}>
                                <td>{orderData[orderId].uzsakytas_filmas}</td>
                                <td>{orderData[orderId].kaina}</td>
                                <td>{orderData[orderId].uzsakymo_data}</td>
                                <td>{orderData[orderId].apmoketas}</td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan="3"><button onClick={goToCreateInvoice}>Create Invoice</button></td>
                        </tr>
                    </tbody>


                </table>

            </body>
        </html>
    );
}
export default OrderList