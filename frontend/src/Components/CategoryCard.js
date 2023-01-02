import React from "react";
import { useState } from "react";

function CategoryCard(props){

    return(
        <div className={props.currentChosen === props.category? "categoryCard chosenCard" : "categoryCard"}>
            <div>
                <h1 className={props.currentChosen === props.category? "chosen": ""}>Category {props.category}</h1>
            </div>
            <div>
                <button onClick={() => {props.onChoose(props.category)}} className="btn btn-dark">Buy</button>
            </div>
        </div>
    )
}
export default CategoryCard;