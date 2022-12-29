import React from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import { useState, useEffect} from "react";

function Select(){
    const [round, setRound] = useState(0);
    useEffect(()=>{
        
    },[round])
    return(
        <div className="slect">
            <h1>Stages</h1>
            <div className="match-type-container">
                <div className="match-type">
                <Dropdown>
                <Dropdown.Toggle variant="dark" id="dropdown-basic">
                    Select Round
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={setRound(1)}>Round 1</Dropdown.Item>
                    <Dropdown.Item onClick={setRound(2)}>Round 2</Dropdown.Item>
                    <Dropdown.Item onClick={setRound(3)}>Round 3</Dropdown.Item>
                    <Dropdown.Item onClick={setRound(4)}>Round 4</Dropdown.Item>
                    <Dropdown.Item onClick={setRound(5)}>Round 5</Dropdown.Item>
                    <Dropdown.Item onClick={setRound(6)}>Round 6</Dropdown.Item>
                    <Dropdown.Item onClick={setRound(7)}>Round 7</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
                </div>
                <input className="searchBar" placeholder="Find match"></input>
                
            </div>
            
        </div>
    )
}
export default Select;