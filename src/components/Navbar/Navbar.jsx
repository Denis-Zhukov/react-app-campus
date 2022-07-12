import React from "react";
import { Container, Nav, Navbar as BNav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import s from "./Navbar.module.css";
import "./Navbar.css";
import "./../../assets/fontawesome/css/all.min.css";

export const Navbar = ({items}) => {
    return (<BNav expand="md" bg="dark" variant="dark">
        <Container fluid>
            <BNav.Toggle aria-controls="navbarScroll" className="mb-2" />
            <BNav.Collapse id="navbarScroll">
                <Nav className="w-100 d-flex justify-content-around align-items-center">
                    {items.map((item, index) => <NavLink
                        className={`w-100 text-center nav-link ${s.navItem}`}
                        key={index}
                        to={item.to}
                    >{item.title}</NavLink>)}
                    <NavLink
                        className={`text-center nav-link ${s.navItem} ${s.exitBtn}`}
                        to="/logout"
                    > <i className={`fa-solid fa-right-from-bracket`}></i> </NavLink>
                </Nav>
            </BNav.Collapse>
        </Container>
    </BNav>);
};