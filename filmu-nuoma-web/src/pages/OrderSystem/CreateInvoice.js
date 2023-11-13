import React, { useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';

function CreateInvoice() {
    const [showMessage, setShowMessage] = useState(false);
    const navigate=useNavigate();
    const buttonCheck = () => {
        alert('Invoice Generated');
        setShowMessage(true);
    }
    const goBack = () => {
        navigate(`/OrderList`);
    };
    return(
        <div>
            <button onclick={(buttonCheck)}>Generate</button>
            {showMessage && <h1>Invoice generated</h1>}
            <button onClick={(goBack)}>Back</button>
        </div>
    );
}
export default CreateInvoice;