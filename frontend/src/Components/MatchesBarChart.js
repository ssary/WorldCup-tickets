import React from 'react'
import CanvasJSReact from '../canvasjs.react'
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function MatchesBarChart(props){    
    const statePercentage = props.data

    let datapts = []
    for(let i=0;i<5;i++){
        console.log(statePercentage[i][0], statePercentage[i][1]);
        let obj = {y: statePercentage[i][1], label: statePercentage[i][0]}
        datapts.push(obj)    
    }

    const options = {
        animationDuration: 3000,
        animationEnabled: true,
        theme: "light2",
        title:{
            text: "The top 5 matches in tickets sold"
        },
        axisX: {
            title: "Match Number",
            reversed: true,
        },
        axisY: {
            title: "Tickets sold",
            includeZero: true
        },
        data: [{
            type: "bar",
            dataPoints: datapts
        }]
    }   
    return (
    <>
      <CanvasJSChart options={options}/>
    </>
  )
}

export default MatchesBarChart