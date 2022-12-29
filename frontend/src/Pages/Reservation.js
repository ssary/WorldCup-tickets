import React from "react";
import Header from "../Components/Header";
import Dropdown from 'react-bootstrap/Dropdown';

function Reservation(){
    return(
        <div>
            <Header />
            <div>
            <Dropdown>
                <Dropdown.Toggle className="my-drop" variant="dark" id="dropdown-basic">
                    Select Round
                </Dropdown.Toggle>

                <Dropdown.Menu className="my-drop">
                    <Dropdown.Item>Round 1</Dropdown.Item>
                    <Dropdown.Item>Round 2</Dropdown.Item>
                    <Dropdown.Item>Round 3</Dropdown.Item>
                    <Dropdown.Item>Round 4</Dropdown.Item>
                    <Dropdown.Item>Round 5</Dropdown.Item>
                    <Dropdown.Item>Round 6</Dropdown.Item>
                    <Dropdown.Item>Round 7</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            </div>
        </div>
    )
}
export default Reservation;