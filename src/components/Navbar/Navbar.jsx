import React from "react";
import { Container, Nav, Navbar as BNav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import s from "./Navbar.module.css";
import "./../../assets/fontawesome/css/all.min.css";

export const Navbar = ({items}) => {
    return (<BNav expand="md" bg="dark" variant="dark" className="mb-md-1">
        <Container fluid className="p-md-0">
            <BNav.Toggle aria-controls="navbarScroll" className="mb-2" />
            <BNav.Collapse id="navbarScroll">
                <Nav className="w-100 d-flex justify-content-around align-items-center">
                    {items.map((item, index) => <NavLink
                        className={`w-100 text-center nav-link ${s.navItem}`}
                        key={index}
                        to={item.to}
                    >{item.title}</NavLink>)}
                </Nav>
            </BNav.Collapse>
        </Container>
    </BNav>);
};