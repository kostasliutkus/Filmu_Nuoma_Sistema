import React from "react";
import './OrderStyle.css';
function OrderList() {

    return (
        <html className="order-html">
        <body className="order-body">
            
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
                    <tr>
                        <td>BASE RACE INCIDENT</td>
                        <td>69</td>
                        <td>Admin</td>
                    </tr>
                </tbody>


            </table>

        </body>
        </html>
    );
}
export default OrderList