import React from "react";
import getFlag from "../flags";
import { Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";

function MatchCard(props){
    var date = new Date(props.matchInfo.dateUtc)
    var time = date.toString().substring(16,21)
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["Jan", "Feb", "March", "Apr", "May", "June", "July", "August", "Sept", "Oct", "Nov", "Dec"];
    var homeTeam = props.matchInfo.homeTeam;
    var awayTeam = props.matchInfo.awayTeam;
    var homeFlag = getFlag(homeTeam);
    var awayFlag = getFlag(awayTeam);
    const availableCategory1 = props.matchInfo.availability.category1.available
    const pendingCategory1 = props.matchInfo.availability.category1.pending
    const availableCategory2 = props.matchInfo.availability.category2.available
    const pendingCategory2 = props.matchInfo.availability.category2.pending
    const availableCategory3 = props.matchInfo.availability.category3.available
    const pendingCategory3 = props.matchInfo.availability.category3.pending;
    const unavailable = (availableCategory1 === pendingCategory1 && availableCategory2 === pendingCategory2 && availableCategory3 === pendingCategory3)
    const soldOut = (availableCategory1 === 0 && availableCategory2 === 0 && availableCategory3 === 0)
    var btnClass = 'buy-btn';
    var btnText = 'Buy Ticket';
    var btnColor = 'btn-dark';

    if(soldOut){
        btnClass = 'btn-soldOut'
        btnText = 'Sold Out'
        btnColor = 'btn-danger'
    }
    else if(unavailable){
        btnClass = 'btn-soldOut'
        btnText = 'Currently Unavailable'
        btnColor = 'btn-secondary'
    }

    return(
        <div className="match-card">
            <h1 className="matchNumber">Match {props.matchInfo.matchNumber}</h1>
            <div className="matchInfo">
                <div className="matchDate">
                    <div className="day">
                        <p>{days[date.getDay()]}</p>
                    </div>
                    <div className="month">
                        <p>{months[date.getMonth()]} {date.getDate()}</p>
                    </div>
                    <div className="year">
                        <p>{date.getFullYear()}</p>
                    </div>
                </div>
                <div className="matchLocation">
                    <p>{time}</p>
                    <p><span class="material-symbols-outlined icons">location_on</span>{props.matchInfo.location}</p>
                </div>
            </div>
            <div className="team">{homeFlag != "TBA"? <img className="flag" src={homeFlag}/> : <span class="material-symbols-outlined">question_mark</span>}<h1>{props.matchInfo.homeTeam}</h1></div>
            <div className="vs"><p>vs</p></div>
            <div className="team">{awayFlag != "TBA"? <img className="flag" src={awayFlag}/> : <span class="material-symbols-outlined">question_mark</span>}<h1>{props.matchInfo.awayTeam}</h1></div>
            <Link to="/reservation" className={btnClass} state={{"matchInfo": props.matchInfo}}><button className={`btn ${btnColor} ${btnClass}`}>{btnText}</button></Link>
        </div>
    )
}
export default MatchCard;