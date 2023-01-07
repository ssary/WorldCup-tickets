import React from "react";
import { useState } from "react";

function CategoryCard(props){
    const price1 = props.matchInfo.availability.category1.price;
    const price2 = props.matchInfo.availability.category2.price;
    const price3 = props.matchInfo.availability.category3.price;

    var availableCategory = null;
    var pendingCategory = null;
    if(props.category === 1){
        availableCategory = props.matchInfo.availability.category1.available;
        pendingCategory = props.matchInfo.availability.category1.pending;
    }else if(props.category === 2){
        availableCategory = props.matchInfo.availability.category2.available;
        pendingCategory = props.matchInfo.availability.category2.pending;
    }else if(props.category === 3){
        availableCategory = props.matchInfo.availability.category3.available;
        pendingCategory = props.matchInfo.availability.category3.pending;
    }
    var unavailable = (availableCategory === pendingCategory && availableCategory !== 0);
    var soldOut = (availableCategory === 0)

    var btnClass = 'buy-btn';
    var btnText = getPrice(props.category);
    var btnColor = 'btn-success';

    if(soldOut){
        btnClass = 'btn-soldOut'
        btnText = 'Sold Out'
        btnColor = 'btn-danger'
    }
    if(unavailable){
        btnClass = 'btn-soldOut'
        btnText = 'Unavailable'
        btnColor = 'btn-secondary'
    }

    function getPrice(c){
        if(c === 1){
            return price1
        }
        if(c ===2){
            return price2
        }
        return price3
    }
    console.log("available:" +availableCategory);
    console.log("pending: " +pendingCategory);
    return(
        <div className={props.currentChosen === props.category? "categoryCard chosenCard" : "categoryCard"}>
            <div>
                <h1 style={{fontSize: "1rem"}} className={props.currentChosen === props.category? "chosen": ""}>Category {props.category}</h1>
            </div>
            <div>
                <button onClick={() => {props.onChoose(props.category)}} className={`btn ${btnClass} ${btnColor}`}>{btnText}</button>
            </div>
        </div>
    )
}
export default CategoryCard;