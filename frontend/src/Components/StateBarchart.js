import React from 'react'
import CanvasJSReact from '../canvasjs.react'
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function StateBarChart(props){    
    const statePercentage = props.data

    const options = {
        animationDuration: 3000,
        animationEnabled: true,
        theme: "light2",
        title:{
            text: "Number of tickets of each state"
        },
        axisX: {
            title: "State",
            reversed: true,
        },
        axisY: {
            title: "# of Messages sent",
            includeZero: true
        },
        data: [{
            type: "bar",
            dataPoints: [
                { y:  statePercentage['countReserved'], label: "Reserved" },
                { y:  statePercentage['countPending'], label: "Pending" },
                { y:  statePercentage['countCancelled'], label: "Cancelled" }
            ]
        }]
    }   
    return (
    <>
      <CanvasJSChart options={options}/>
    </>
  )
}

export default StateBarChart