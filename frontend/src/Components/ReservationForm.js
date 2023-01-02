import React from "react";

function ReservationForm(props){
    return(
            <div className="reservation-form">
            <p className="note">Please fill the following</p>
            <p className="p-category">Category: {props.category}</p>
            <div className="input-container">
                <label>Email</label>
                <input type="email"></input>
            </div>
            <div className="input-container">
                <label>Phone Number</label>
                <input></input>
            </div>
            <div className="input-container">
                <label>Quantity</label>
                <div>
                    <button className="btn btn-light">1</button>
                    <button className="btn btn-light">2</button>
                </div>
                    
            </div>
            <button className="btn btn-danger">Check Out</button>
            </div>
    )
}
export default ReservationForm;