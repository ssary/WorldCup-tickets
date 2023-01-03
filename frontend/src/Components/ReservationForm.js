import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect} from "react";

function ReservationForm(props){
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [quantity, setQuantity] = useState(0);
    function handleEmail(e){
        var input = e.target.value;
        setEmail(input)
    }
    function handlePhone(e){
        var input = e.target.value;
        setPhone(input)
    }
    function handleQuantity(e){
        var q = e.target.value;
        setQuantity(q);
    }
    console.log("email: " + email);
    console.log("phone: " + phone);
    console.log("quantity: " + quantity);
    return(
            <div className="reservation-form">
            <p className="note">Please fill the following</p>
            <p className="p-category">Category: {props.category}</p>
            <div className="form-body">
            <div className="input-container">
                <label>Email</label>
                <input required onChange={handleEmail} type="email"></input>
            </div>
            <div className="input-container">
                <label>Phone Number</label>
                <input onChange={handlePhone} required></input>
            </div>
            <div className="input-container">
                <label>Quantity</label>
                <div>
                    <button onClick={handleQuantity} value={1} className="btn btn-light">1</button>
                    <button onClick={handleQuantity} value={2} className="btn btn-light">2</button>
                </div>
                    
            </div>
            {email && phone && quantity!==0 ? <Link to="/payment" state={{"matchInfo": props.matchInfo, "category": props.category, "email": email, "phone": phone, "quantity": quantity}}><button className="btn btn-danger buy-btn">Check Out</button></Link> : <></>}
            
            </div>
            </div>
    )
}
export default ReservationForm;