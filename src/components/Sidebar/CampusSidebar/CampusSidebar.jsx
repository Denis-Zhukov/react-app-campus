import React from "react";
import { Accordion } from "react-bootstrap";
import { sidebarItems } from "../../../constants";
import { NavLink } from "react-router-dom";

export const CampusSidebar = () => (
    <Accordion defaultActiveKey="0" className="dark-accordion centeredByVertical mb-3">
        {sidebarItems.campus.map((item, index) => (
            <Accordion.Item eventKey={index} key={index} className="sidebarItem">
                <NavLink to={item.to}>{item.title}</NavLink>
            </Accordion.Item>
        ))}
    </Accordion>
);
