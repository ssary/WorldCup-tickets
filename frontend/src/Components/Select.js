import React from "react";

function Select(){
    return(
        <div className="slect">
            <h1>Stages</h1>
            <div className="match-type-container">
                <div className="match-type">
                    <button className="btn btn-outline-dark round-btn">Round #</button>
                    <button className="btn btn-outline-dark round-btn">Round #</button>
                    <button className="btn btn-outline-dark round-btn">Round #</button>
                    <button className="btn btn-outline-dark round-btn">Round #</button>
                </div>
                <input className="searchBar" placeholder="Find match"></input>
            </div>
            
        </div>
    )
}
export default Select;