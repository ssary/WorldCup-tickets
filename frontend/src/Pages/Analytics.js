import React from "react";
import { useEffect, useState } from "react";
import Header from "../Components/Header";
import axios from "axios";
import StateBarChart from "../Components/StateBarchart";
import StatePieChart from "../Components/StatePieChart";
import CategoriesBarchart from "../Components/CategoriesBarchart";
import {FaChartPie} from 'react-icons/fa'
import MatchesBarChart from "../Components/MatchesBarChart";
const ANALYTICS_URL = 'https://world-cup-analytics-microservice.vercel.app/Analytics'
 function Analytics(){
    const [statePercentage, setStatePercentage] = useState(null);
    const [countCategories, setCounteCategories] = useState(null);
    const [countMatches, setCountMatches] = useState(null);
    
        useEffect(()=>{
        axios.get(`${ANALYTICS_URL}/percentage`).then(
            (response)=>{
                setStatePercentage(response.data)
            }
        );
        axios.get(`${ANALYTICS_URL}/countCategories`).then(
            (response)=>{
                setCounteCategories(response.data)
            }
        );
        axios.get(`${ANALYTICS_URL}/countMatches`).then(
            (response)=>{
                setCountMatches(response.data)
            }
        )

    },[]);

    if(!statePercentage || !countCategories || !countMatches)    return null;

    return(
        <>
            <Header/>
            <div>
                <FaChartPie style={{display: 'inline-block', fontSize:'30px', marginBottom:'15px', marginRight:'10px'}} icon="fa-solid fa-chart-pie fa-xl" />
                <h3 style={{display:'inline-block'}}>Analytics</h3>
            </div>
            
            <StateBarChart data={statePercentage}/>
            <hr/>
            <StatePieChart data={statePercentage}/>
            <hr/>
            <CategoriesBarchart data={countCategories}/>
            <hr/>
            <MatchesBarChart data={countMatches}/>
            
        </>
    )
}

export default Analytics