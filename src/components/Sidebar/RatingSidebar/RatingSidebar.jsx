import React from "react";
import { Accordion } from "react-bootstrap";
import { sidebarItems } from "../../../constants";
import { NavLink } from "react-router-dom";

export const RatingSidebar = () => (
    <Accordion defaultActiveKey="0" className="dark-accordion mb-3">
        {sidebarItems.rating.map((item, index) => (
            <Accordion.Item eventKey={index} key={index} className="sidebarItem">
                <NavLink to={item.to}>{item.title}</NavLink>
            </Accordion.Item>
        ))}
    </Accordion>
);
