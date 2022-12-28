import React from "react";
import getFlag from "../flags";

function MatchCard(props){
    var date = new Date(props.matchInfo.dateUtc)
    var time = date.toString().substring(16,21)
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["Jan", "Feb", "March", "Apr", "May", "June", "July", "August", "Sept", "Oct", "Nov", "Dec"];
    var homeTeam = props.matchInfo.homeTeam;
    var awayTeam = props.matchInfo.awayTeam;
    return(
        <div className="match-card">
            <h1>Match {props.matchInfo.matchNumber}</h1>
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
                {/* <hr /> */}
                <div className="matchLocation">
                    <p>{time}</p>
                    <p><span class="material-symbols-outlined icons">location_on</span>{props.matchInfo.location}</p>
                </div>
            </div>
            <div className="team"><img className="flag" src={getFlag(homeTeam)}/><h1>{props.matchInfo.homeTeam}</h1></div>
            <div className="vs"><p>vs</p></div>
            <div className="team"><img className="flag" src={getFlag(awayTeam)}/><h1>{props.matchInfo.awayTeam}</h1></div>
            <button className="btn btn-dark my-btn">Buy Ticket</button>
        </div>
    )
}
export default MatchCard;