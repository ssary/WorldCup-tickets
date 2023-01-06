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
  const [initialMatches, setInitialMatches] = useState([]);
  const [round, setRound] = useState(0);
  const [type, setType] = useState("");
  const ShopURL = "https://world-cup-shop-microservice.vercel.app/api/matches"
    useEffect(()=>{
      if(round !== 0){
        axios.post(`${ShopURL}/filterRound`, {round: round}).then(res => {
          setMatches(res.data);
          setInitialMatches(res.data);
        })
      }

    },[round])

  useEffect(()=>{
    axios.get(ShopURL).then(res => {
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
          roundNumber: match.roundNumber
        }
      }))
      setInitialMatches(res.data.map(match => {
        return {
          availability: {category1: match.availability.category1, category2: match.availability.category2, category3: match.availability.category3},
          awayTeam: match.awayTeam,
          awayTeamScore: match.awayTeamScore,
          dateUtc: match.dateUtc,
          homeTeam: match.homeTeam,
          homeTeamScore: match.homeTeamScore,
          location: match.location,
          matchNumber: match.matchNumber,
          roundNumber: match.roundNumber
        }
      }))
    })
    
  }, [])
  
  
  function handleFilter(e){
    const search = e.target.value;
    if(search !== ''){
      var filteredMatches = initialMatches.filter(m => m.awayTeam.toLowerCase().includes(search.toLowerCase()) || m.homeTeam.toLowerCase().includes(search.toLowerCase()))
      console.log(filteredMatches);
      setMatches(filteredMatches)
    }else{
      setMatches(initialMatches)
    }
  }

  console.log(matches);
  console.log(round);
  
  return (
    <div className="Home">
      <Header />
      
      <div className="matches">
      <div className="slect">
            <h1>Stages</h1>
            <div className="match-type-container">
                <div className="match-type">
                <Row xs={1} md={6} className="g-4 row">
                <Col><button onClick={() => {setRound(1);setType("Group Stage")}} className={round === 1? "my-btn chosen-btn": "my-btn"}>Group Stage</button></Col>
                <Col><button onClick={() => {setRound(4);setType("Knockout Stage")}} className={round === 4? "my-btn chosen-btn": "my-btn"}>Knock Out Stage</button></Col>
                <Col><button onClick={() => {setRound(5);setType("Quarter Finals")}} className={round === 5? "my-btn chosen-btn": "my-btn"}>Quarter-Finals</button></Col>
                <Col><button onClick={() => {setRound(6);setType("Semi Finals")}} className={round === 6? "my-btn chosen-btn": "my-btn"}>Semi-Finals</button></Col>
                <Col><button onClick={() => {setRound(7);setType("Finals")}} className={round === 7? "my-btn chosen-btn": "my-btn"}>Finals</button></Col>
                <Col><input onChange={handleFilter} className="searchBar" placeholder="Find match"></input></Col>
                </Row>
                </div>
                
                
            </div>
            
            
        </div>
      <div className="match-containter">
      {type !== ""? <h1 className="type-h1">{type}</h1> : <></>}
      {matches.map(match => (<MatchCard matchInfo={match} />))}
      </div>
      </div>
    </div>
  );
}

export default Home;
