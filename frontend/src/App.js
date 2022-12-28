import React from "react";
import Header from "./Components/Header";
import MatchCard from "./Components/MatchCard";
import { Row, Col, Card, Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import Select from "./Components/Select";

function App() {
  const [matches, setMatches] = useState([]);
  useEffect(()=>{
    axios.get("http://localhost:5001/api/matches").then(res => {
      console.log(res.data);
      setMatches(res.data.map(match => {
        return {
          availability: {category1: match.availability.category1, category2: match.availability.category2, category3: match.availability.category3},
          awayTeam: match.awayTeam,
          awayTeamScore: match.awayTeamScore,
          dateUtc: match.dateUtc,
          homeTeam: match.homeTeam,
          homeTeamScore: match.homeTeamScore,
          location: match.location,
          matchNumber: match.matchNumber,
          pending: {category1: match.pending.category1, category2: match.pending.category2, category3: match.pending.category3} = match.pending,
          roundNumber: match.roundNumber
        }
      }))
    })
  }, [])

  console.log(matches);
  return (
    <div className="App">
      <Header />
      <Select />
      <div className="matches">
      <div className="match-containter">
      {matches.map(match => (<MatchCard matchInfo={match} />))}
      {/* <Col><MatchCard /></Col>
      <Col><MatchCard /></Col>
      <Col><MatchCard /></Col>
      <Col><MatchCard /></Col> */}
      </div>
      </div>
    </div>
  );
}

export default App;
