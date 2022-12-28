import React from "react";
import { Navbar } from "react-bootstrap";
import { Button, Container, Modal} from "react-bootstrap";

function Header(){
    return(
        <div className="main-header">

        <Navbar className="nav2 my-nav" expand="sm">
            <Navbar.Brand className="brand" href="/">BSMSM_inc</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
                
            </Navbar.Collapse>
    </Navbar>
        <div className="main-title">
            <img src="https://digitalhub.fifa.com/transform/3a170b69-b0b5-4d0c-bca0-85880a60ea1a/World-Cup-logo-landscape-on-dark?io=transform:fill&quality=75" />
            <h1>Qatar World Cup 2022</h1>
        </div>
    </div>
    )
}
export default Header;