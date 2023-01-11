import React from "react";
import getFlag from "../flags";

function TicketCard(props) {
    return (
        <div className="conformation-container">
                <div style={{ display: "flex", justifyContent: 'center', marginBottom: "20px" }}>
                    <p style={{ margin: "0 10px" }}>{props.matchInfo.homeTeam}</p><img style={{ width: "20px", height: "20px", borderRadius: "100%" }} src={getFlag(props.matchInfo.homeTeam)}></img>
                    <p style={{ margin: "0 10px" }}>vs</p>
                    <p style={{ margin: "0 10px" }}>{props.matchInfo.awayTeam}</p><img style={{ width: "20px", height: "20px", borderRadius: "100%" }} src={getFlag(props.matchInfo.awayTeam)}></img>
                </div>
                <p style={{ color: "#579BB1" }}>Category {props.Reservation.Category}</p>
                <p style={{ color: "#579BB1" }}>Match # {props.matchInfo.matchNumber}</p>
                <hr style={{ border: "1px solid" }} />
                <div className="conformation-body">
                    <div style={{ width: "500px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between" }} className="conformation-info">
                            <p>Name </p> <p>{props.Reservation.Buyer.Name}</p>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }} className="conformation-info">
                            <p>Email </p> <p>{props.Reservation.Buyer.Email}</p>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }} className="conformation-info">
                            <p>Quantity </p> <p>{props.Reservation.quantity}</p>
                        </div>
                    </div>
                    <div style={{ width: "500px" }}>
                        <p>Ticket ID </p> <p>{props.Reservation.serialNumber}</p>
                    </div>
                </div>
            </div>
        
    )
}

export default TicketCard;
