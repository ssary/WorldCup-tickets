import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../Components/Header";

function Conformation(){
    const location = useLocation()
    const {matchInfo, serialNumber, category , email, phone, quantity, name} = location.state
    console.log("matchInfo: " + matchInfo);
    console.log("serial number: " + serialNumber);
    console.log("category: " + category);
    console.log("email: " + email);
    console.log("phone: " + phone);
    console.log("quantity: " + quantity);
    console.log("name: " + name);
    return(
        <div>
            <Header />
        
        <div className="conformation-container">
            <h1 style={{fontWeight: "bold"}}>Purchase Complete</h1>
            <div style={{display: "flex", justifyContent: 'center', marginBottom: "20px"}}>
                <p style={{margin: "0 10px"}}>{matchInfo.homeTeam}</p>
                <p style={{margin: "0 10px"}}>vs</p>
                <p style={{margin: "0 10px"}}>{matchInfo.awayTeam}</p>
            </div>
            <div className="conformation-body">
                <div style={{width: "500px"}}>
                    <div className="conformation-info">
                        <h1>name </h1> <p>{name}</p>
                    </div>
                    <div className="conformation-info">
                        <h1>email </h1> <p>{email}</p>
                    </div>
                    <div className="conformation-info">
                        <h1>category </h1> <p>{category}</p>
                    </div>
                    <div className="conformation-info">
                        <h1>quantity </h1> <p>{quantity}</p>
                    </div>
                </div>
                <div style={{width: "500px"}}>
                    <h1>Ticket id </h1> <p>{serialNumber}</p>
                </div>
            </div>
        </div>
        </div>
    )
}

export default Conformation;