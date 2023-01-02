import React from "react";

function ReservationForm(){
    return(
            <div className="reservation-form">
                <label>Email</label>
                <input type="email"></input>
                <label>Quantity</label>
                <select>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                </select>
            </div>
    )
}
export default ReservationForm;