import React from 'react'
import { CanvasJSChart } from 'canvasjs-react-charts';
import axios from 'axios';

const StateBarChart = () => {
    const statePercentage = axios.get('https://cors-anywhere.herokuapp.com/http://localhost:4002/Analytics/percentage')
    const options = {
        animationEnabled: true,
        theme: "light2",
        title:{
            text: "Percentage of each state"
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
                // { y:  100, label: "Reserved" },
                // { y:  54321, label: "Pending" },
                // { y:  84325, label: "Cancelled" }
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