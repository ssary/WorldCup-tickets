import React from 'react'
import CanvasJSReact from '../canvasjs.react'
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
function CategoriesBarchart(props){
    const countCategories = props.data
    const options = {
        width:600,
        animationDuration: 3000,
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
                { y:  countCategories['category1'], label: "Category#1" },
                { y:  countCategories['category2'], label: "Category#2" },
                { y:  countCategories['category3'], label: "Category#3" }
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