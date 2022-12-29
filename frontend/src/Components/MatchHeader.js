import React from "react";
import { Navbar } from "react-bootstrap";
import getFlag from "../flags";

function MatchHeader(props){
    var homeTeam = props.matchInfo.homeTeam;
    var awayTeam = props.matchInfo.awayTeam;
    var homeFlag = getFlag(homeTeam);
    var awayFlag = getFlag(awayTeam);
    return(
        <div className="main-header">
        <Navbar className="nav2 my-nav" expand="sm">
            <Navbar.Brand className="brand" href="/">BSMSM_inc</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
                
            </Navbar.Collapse>
        </Navbar>
            <div>
                <div className="match-header-card">
                    <div className="team-header">{homeFlag != "TBA"? <img src={homeFlag}/> : <></>}<h1>{props.matchInfo.homeTeam}</h1></div>
                    <div className="vs-header"><h1>vs</h1><p>{props.matchInfo.location}</p></div> 
                    <div className="team-header">{awayFlag != "TBA"? <img src={awayFlag}/> : <></>}<h1>{props.matchInfo.awayTeam}</h1></div>
                </div>
            </div>
        </div>
    )
}
export default MatchHeader;