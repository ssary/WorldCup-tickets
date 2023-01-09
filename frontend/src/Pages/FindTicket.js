import React from "react";
import Header from "../Components/Header";
import TicketCard from "../Components/TicketCard";
import { useState } from "react";
import axios from "axios";

function FindTicket(){
    const [email, setEmail] = useState("");
    const [ticketID, setTicketID] = useState("");
    const [tickets, setTickets] = useState([]);

    function handleChange(e){
        var input = e.target.value;
        if(e.target.name === "email"){
            setEmail(input);
        }
        if(e.target.name === "ticketid"){
            setTicketID(input);
        }
    }
    function handleSubmit(e){
        e.preventDefault();

        if(e.target.name === "emailForm"){
            axios.get("",{
                email: email
            }).then(res => {
                setTickets(res.data);
            })
        }
        if(e.target.name === "idForm"){
            axios.get("",{
                ticketID: ticketID
            }).then(res => {
                setTickets(res.data);
            })
        }

        

    }

    return(
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
            <button type="submit" style={{marginTop: "20px"}} className="btn btn-dark">Find by email</button>
            </form>

            <form name="idForm" onSubmit={handleSubmit}>
            <div className="findTicket-input">

                <div className="findTicket-singleInput">
                    <label>Ticket ID</label>
                    <input onChange={handleChange} required name="ticketid" placeholder="search by ticket id"></input>
                </div>

            </div>
            <button type="submit" style={{marginTop: "20px"}} className="btn btn-dark">Find by ID</button>
            </form>
            </div>
            <div>
                <div>
                <TicketCard />
                </div>
            </div>
        </div>
        </div>
    )
}

export default FindTicket;