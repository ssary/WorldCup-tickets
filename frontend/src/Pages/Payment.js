import React from "react";
import { useEffect, useState } from "react";
import CheckoutForm from "../Components/CheckoutForm";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Header from "../Components/Header";

function Payment(){
    const location = useLocation()
    const {matchInfo, category , email, phone, quantity, name} = location.state
    console.log("matchInfo: " + matchInfo);
    console.log("email: " + email);
    console.log("phone: " + phone);
    console.log("quantity: " + quantity);
    console.log("name: " + name);
    return(
        <div>
            <Header />
        <div className="payment-container">
        <h1>{matchInfo.homeTeam} vs {matchInfo.awayTeam}</h1>
        <p style={{color: "blue"}}>Category {category}</p>
        <CheckoutForm matchInfo={matchInfo} category={category} email={email} phone={phone} quantity={quantity} name={name} />
        </div>
        </div>
        
    )
}

export default Payment;
