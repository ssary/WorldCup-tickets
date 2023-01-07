import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

function ReservationForm(props){
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [name, setName] = useState("");
    const navigate = useNavigate();
    function handleName(e){
        var input = e.target.value;
        setName(input)
    }
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
    function handleSubmit(){
        navigate("/payment", {state: {"matchInfo": props.matchInfo, "category": props.category, "email": email, "phone": phone, "quantity": quantity, "name": name}});
    }

    console.log("email: " + email);
    console.log("phone: " + phone);
    console.log("quantity: " + quantity);
    return(
            <div className="reservation-form">
            <p className="note">Please fill the following</p>
            <p className="p-category">Category: {props.category}</p>
            <form onSubmit={handleSubmit}>
            <div className="form-body">
            <div className="input-container">
                <label>Name</label>
                <input required onChange={handleName} type="text"></input>
            </div>
            <div className="input-container">
                <label>Email</label>
                <input required onChange={handleEmail} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" type="email"></input>
            </div>
            <div className="input-container">
                <label>Phone Number</label>
                <PhoneInput 
                international={true}
                placeholder="Enter phone number"
                value={phone}
                onChange={setPhone} 
                defaultCountry="EG" 
                rules={{ required: true}} 
                autoComplete="tel"
                />
            </div>
            <div className="input-container">
                <label>Quantity</label>
                <div>
                    <input required style={{display: "inline", marginLeft: "70px"}} type="radio" id="qnt-1" name="rad" onClick={handleQuantity} value={1}></input>
                    <label style={{display: "inline"}} for="qnt-1">1</label>
                    <input required style={{display: "inline", marginLeft: "70px"}} type="radio"  id="qnt-2" name="rad" onClick={handleQuantity} value={2}></input>
                    <label style={{display: "inline"}} for="qnt-2">2</label>
                </div>
                    
            </div>
            {/* {email && phone && quantity!==0 ? <Link to="/payment" state={{"matchInfo": props.matchInfo, "category": props.category, "email": email, "phone": phone, "quantity": quantity}}><button className="btn btn-danger buy-btn">Check Out</button></Link> : <></>} */}
            <button style={{width: "100px", margin: "auto"}} type="submit" className="btn btn-secondary btn-sm">Submit</button>

            </div>
            </form>
            </div>
    )
}
export default ReservationForm;