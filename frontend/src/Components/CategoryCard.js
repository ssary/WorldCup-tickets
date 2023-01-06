import React from "react";
import { useState } from "react";

function CategoryCard(props){
    const price1 = props.matchInfo.availability.category1.price;
    const price2 = props.matchInfo.availability.category2.price;
    const price3 = props.matchInfo.availability.category3.price;
    function getPrice(c){
        if(c === 1){
            return price1
        }
        if(c ===2){
            return price2
        }
        return price3
    }

    return(
        <div className={props.currentChosen === props.category? "categoryCard chosenCard" : "categoryCard"}>
            <div>
                <h1 style={{fontSize: "1rem"}} className={props.currentChosen === props.category? "chosen": ""}>Category {props.category}</h1>
            </div>
            <div>
                <button onClick={() => {props.onChoose(props.category)}} className="btn btn-success">${getPrice(props.category)}</button>
            </div>
        </div>
    )
}
export default CategoryCard;