import React from "react";
import { Accordion } from "react-bootstrap";
import { sidebarItems } from "../../../assets/constants";
import { NavLink } from "react-router-dom";

export const NewsSidebar = () => (
    <Accordion defaultActiveKey="0" className="dark-accordion mb-3">
        {sidebarItems.news.map((item, index) => (
            item.body ?
                <Accordion.Item eventKey={index} key={index}>
                    <Accordion.Header>{item.title}</Accordion.Header>
                    <Accordion.Body>{item.body.map((item, index) => (
                        <NavLink  key={index} to={item.to}>{item.children}</NavLink>
                    ))}</Accordion.Body>
                </Accordion.Item> :
                <Accordion.Item eventKey={index} key={index} className="sidebarItem">
                    <NavLink end to={item.to}>{item.title}</NavLink>
                </Accordion.Item>
        ))}
    </Accordion>
);
