import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../Components/Header";
import getFlag from "../flags";

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
                <p style={{margin: "0 10px"}}>{matchInfo.homeTeam}</p> <img style={{width: "20px", height: "20px", borderRadius: "100%"}} src={getFlag(matchInfo.homeTeam)}></img>
                <p style={{margin: "0 10px"}}>vs</p>
                <img style={{width: "20px", height: "20px", borderRadius: "100%"}} src={getFlag(matchInfo.awayTeam)}></img> <p style={{margin: "0 10px"}}>{matchInfo.awayTeam}</p>
            </div>
            <p style={{color: "#579BB1"}}>Category {category}</p>
            <p style={{color: "#579BB1"}}>Match # {matchInfo.matchNumber}</p>
            <hr style={{border: "1px solid"}} />
            <div className="conformation-body">
                <div style={{width: "500px"}}>
                    <div style={{display: "flex", justifyContent: "space-between"}} className="conformation-info">
                        <h1>Name </h1> <p>{name}</p>
                    </div>
                    <div style={{display: "flex", justifyContent: "space-between"}} className="conformation-info">
                        <h1>Email </h1> <p>{email}</p>
                    </div>
                    <div style={{display: "flex", justifyContent: "space-between"}} className="conformation-info">
                        <h1>Quantity </h1> <p>{quantity}</p>
                    </div>
                </div>
                <div style={{width: "500px"}}>
                    <h1>Ticket ID </h1> <p>{serialNumber}</p>
                </div>
            </div>
        </div>
        </div>
    )
}

export default Conformation;