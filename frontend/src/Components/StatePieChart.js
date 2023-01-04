import React from 'react'
import CanvasJSReact from '../canvasjs.react'
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function StatePieChart(props){    
    const statePercentage = props.data
    const total = statePercentage['countReserved'] + statePercentage['countPending'] + statePercentage['countCancelled']
    const options = {
        animationDuration: 3000,
        animationEnabled: true,
        theme: "light2",
        yValueFormatString: "##0.00\"%\"",
        indexLabel: "{label} {y} %",
        title:{
            text: "Percentage of each state"
        },
        axisX: {
            title: "State",
            reversed: true,
        },
        axisY: {
            title: "percentage of Messages sent",
            includeZero: true
        },
        data: [{
            type: "pie",
            dataPoints: [
                { y:  (statePercentage['countReserved']/total * 100).toFixed(2), label: "Reserved" },
                { y:  (statePercentage['countPending']/total * 100).toFixed(2), label: "Pending" },
                { y:  (statePercentage['countCancelled']/total * 100).toFixed(2), label: "Cancelled" }
            ]
        }]
    }

    
    return (
    <>
      <CanvasJSChart options={options}/>
    </>
  )
}

export default StatePieChart