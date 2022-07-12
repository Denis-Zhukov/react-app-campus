import React from "react";
import { Accordion } from "react-bootstrap";
import "./Sidebar.css";

export const Sidebar = ({items}) => {
    return (
        <Accordion defaultActiveKey="0" className="dark-accordion">
            {items.map((item, index) => (
                <Accordion.Item eventKey={index} key={index}>
                    <Accordion.Header>{item.title}</Accordion.Header>
                    <Accordion.Body>{item.body}</Accordion.Body>
                </Accordion.Item>
            ))}
        </Accordion>
    );
};