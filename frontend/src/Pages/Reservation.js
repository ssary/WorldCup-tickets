import React from "react";
import Header from "../Components/Header";
import Dropdown from 'react-bootstrap/Dropdown';
import CategoryCard from "../Components/CategoryCard";
import { useLocation } from "react-router-dom";
import ReservationForm from "../Components/ReservationForm";
import { useState } from "react";
import MatchHeader from "../Components/MatchHeader";
import getStadium from "../stadiums";

function Reservation(props){
    const location = useLocation()
    const {matchInfo} = location.state
    console.log(matchInfo)
    const [chosen, setChosen] = useState(0)
    const [showForm, setShowForm] = useState(false)

    function handleChoose(category){
        if(chosen === category){
            setChosen(0);
            return;
        }
        setChosen(category);
    }
    console.log(chosen)
    return(
        <div>
            <MatchHeader matchInfo={matchInfo} />
            <div className="side-div">
                <h1>Categories</h1>
                <CategoryCard currentChosen={chosen} onChoose={handleChoose} category={1}/>
                <CategoryCard currentChosen={chosen} onChoose={handleChoose} category={2}/>
                <CategoryCard currentChosen={chosen} onChoose={handleChoose} category={3}/>
                <ReservationForm />
            </div>
            
            <div className="stadium">
                 <img src={getStadium(matchInfo.location)}></img>
            </div>
            
        </div>
    )
}
export default Reservation;