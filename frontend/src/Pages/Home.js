import React from "react";
import MatchCard from "../Components/MatchCard";
import { Row, Col, Card, Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import Select from "../Components/Select";
import Dropdown from 'react-bootstrap/Dropdown';
import Header from "../Components/Header"

function Home() {
  const [matches, setMatches] = useState([]);
  const [round, setRound] = useState(0);
    useEffect(()=>{
      if(round !== 0){
        axios.post("http://localhost:5001/api/matches/filterRound", {round: round}).then(res => {
          setMatches(res.data);
        })
        // const f =async() =>{
        //   const response = await fetch('http://localhost:5001/api/matches/filterRound',{
        //     method: 'POST',
        //     body: JSON.stringify(round)
        //   })
        //   const json = await response.json()
        //   if(response.ok){
        //     setMatches(json)
        //   }
        // }
        // f()
      }

    },[round])

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
    <div className="Home">
      <Header />
      <div className="slect">
            <h1>Stages</h1>
            <div className="match-type-container">
                <div className="match-type">
                <Dropdown>
                <Dropdown.Toggle variant="dark" id="dropdown-basic">
                    Select Round
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setRound(1)}>Round 1</Dropdown.Item>
                    <Dropdown.Item onClick={() => setRound(2)}>Round 2</Dropdown.Item>
                    <Dropdown.Item onClick={() => setRound(3)}>Round 3</Dropdown.Item>
                    <Dropdown.Item onClick={() => setRound(4)}>Round 4</Dropdown.Item>
                    <Dropdown.Item onClick={() => setRound(5)}>Round 5</Dropdown.Item>
                    <Dropdown.Item onClick={() => setRound(6)}>Round 6</Dropdown.Item>
                    <Dropdown.Item onClick={() => setRound(7)}>Round 7</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
                </div>
                <input className="searchBar" placeholder="Find match"></input>
                
            </div>
            
        </div>
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

export default Home;
