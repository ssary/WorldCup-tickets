import React, {Component} from 'react'
import { CanvasJSChart } from 'canvasjs-react-charts';
var CanvasJS = CanvasJSChart.CanvasJS

const CategoriesBarchart = () => {
    const options = {
        animationEnabled: true,
        theme: "light2",
        title:{
            text: "Most selling Categories"
        },
        axisX: {
            title: "Category",
            reversed: true,
        },
        axisY: {
            title: "Tickets sold",
            includeZero: true
        },
        data: [{
            type: "bar",
            dataPoints: [
                { y:  2200000000, label: "Facebook" },
                { y:  1800000000, label: "YouTube" },
                { y:  800000000, label: "Instagram" },
                { y:  563000000, label: "Qzone" },
                { y:  376000000, label: "Weibo" },
                { y:  336000000, label: "Twitter" },
                { y:  330000000, label: "Reddit" }
            ]
        }]
    }

    
    return (
    <>
      <CanvasJSChart options={options}/>
    </>
  )
}

export default CategoriesBarchart