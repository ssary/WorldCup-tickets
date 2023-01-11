import React from "react";
import Header from "../Components/Header";
import TicketCard from "../Components/TicketCard";
import { useState } from "react";
import axios from "axios";
import { compact } from "lodash";

function FindTicket() {
    const [email, setEmail] = useState("");
    const [ticketID, setTicketID] = useState("");
    const [tickets, setTickets] = useState([]);
    const [match, setMatch] = useState([]);
    const [show, setShow] = useState(false);

    function handleChange(e) {
        var input = e.target.value;
        if (e.target.name === "email") {
            setEmail(input);
        }
        if (e.target.name === "ticketid") {
            setTicketID(input);
        }
    }
    async function handleSubmit(e) {
        e.preventDefault();

        if (e.target.name === "emailForm") {

            var reservation = await axios.get(`http://localhost:4000/api/reservation/email/${email}`)
            setTickets(reservation.data);

            var info = await axios.get(`https://world-cup-shop-microservice.vercel.app/api/matches/${reservation.data.MatchNumber}`)
            setMatch(info.data)
            setShow(true)
        }
        if (e.target.name === "idForm") {
            var reservation = await axios.get(`http://localhost:4000/api/reservation/ssid/${ticketID}`)
            setTickets(reservation.data);

            var info = await axios.get(`https://world-cup-shop-microservice.vercel.app/api/matches/${reservation.data.MatchNumber}`)
            setMatch(info.data)
            setShow(true)
        
        }



    }
    console.log(match)
    console.log(tickets)
    return (
        <div>
            <Header />
            <div className="findTicket-container">
                <h1>Search tickets</h1>
                <div className="findTicket-input">
                    <form name="emailForm" onSubmit={handleSubmit}>
                        <div className="findTicket-singleInput">
                            <label>Email</label>
                            <input onChange={handleChange} required name="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" type="email" placeholder="search by email"></input>
                        </div>
                        {/* <div className="findTicket-singleInput">
                <label>Ticket ID</label>
                <input onChange={handleChange} required name="ticketid" placeholder="search by ticket id"></input>
                </div> */}
                        <button type="submit" style={{ marginTop: "20px" }} className="btn btn-dark">Find by email</button>
                    </form>

                    <form name="idForm" onSubmit={handleSubmit}>
                        <div className="findTicket-input">

                            <div className="findTicket-singleInput">
                                <label>Ticket ID</label>
                                <input onChange={handleChange} required name="ticketid" placeholder="search by ticket id"></input>
                            </div>

                        </div>
                        <button type="submit" style={{ marginTop: "20px" }} className="btn btn-dark">Find by ID</button>
                    </form>
                </div>
                <div>
                    <div>
                        {show ? <TicketCard matchInfo={match} Reservation={tickets} /> : <></>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FindTicket;