import React from "react";
import { useEffect, useState } from "react";
import CheckoutForm from "../Components/CheckoutForm";
import axios from "axios";
import { useLocation } from "react-router-dom";

function Payment(){
    const location = useLocation()
    const {matchInfo, category , email, phone, quantity} = location.state
    console.log("matchInfo: " + matchInfo);
    console.log("email: " + email);
    console.log("phone: " + phone);
    console.log("quantity: " + quantity);
    return(
        <div className="payment-container">
        <h1>{matchInfo.homeTeam} vs {matchInfo.awayTeam}</h1>
        <p style={{color: "blue"}}>Category {category}</p>
        <CheckoutForm matchInfo={matchInfo} category={category} email={email} phone={phone} quantity={quantity} />
        </div>
        
    )
}

export default Payment;
