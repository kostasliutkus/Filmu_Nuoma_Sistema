import React from "react";
import '../FilmSystem/FilmStyle.css';
import {useNavigate} from 'react-router-dom'
function OrderList() {
    const navigate = useNavigate();

    const handleRowClick = (id) => {
        navigate(`/EditOrder/${id}`);
    };
    return (
        <html className="film-html">
        <body className="film-body">
            
            <h2>HTML Table</h2>
            <table>
                <thead>
                    <tr>
                        <th>Movie Name</th>
                        <th>Price</th>
                        <th>User</th>
                    </tr>
                </thead>
                <tbody>
                    <tr onClick={() => handleRowClick('1')}>
                        <td>BASE RACE INCIDENT</td>
                        <td>69</td>
                        <td>Admin</td>
                    </tr>
                    <tr onClick={() => handleRowClick('2')}>
                        <td>Never Gonna Give You Up</td>
                        <td>14</td>
                        <td>Admin</td>
                    </tr>
                </tbody>


            </table>

        </body>
        </html>
    );
}
export default OrderList