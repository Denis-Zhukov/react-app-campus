import React from "react";
import { Accordion } from "react-bootstrap";
import { sidebarItems } from "../../constants";
import { Routes as Switch, Route, NavLink } from "react-router-dom";
import "./Sidebar.css";

const NewsSidebar = (
    <Accordion defaultActiveKey="0" className="dark-accordion">
        {sidebarItems.news.map((item, index) => (
            <Accordion.Item eventKey={index} key={index}>
                <Accordion.Header>{item.title}</Accordion.Header>
                <Accordion.Body>{item.body.map((item, index) => (
                    <NavLink key={index} to={item.to}>{item.children}</NavLink>
                ))}</Accordion.Body>
            </Accordion.Item>
        ))}
    </Accordion>
);

const RatingSidebar = (
    <Accordion defaultActiveKey="0" className="dark-accordion">
        {sidebarItems.rating.map((item, index) => (
            <Accordion.Item eventKey={index} key={index}>
                <Accordion.Header>{item.title}</Accordion.Header>
                <Accordion.Body>{item?.body?.map((item, index) => (
                    <NavLink key={index} to={item.to}>{item.children}</NavLink>
                ))}</Accordion.Body>
            </Accordion.Item>
        ))}
    </Accordion>
);

export const Sidebar = () => {
    return (
        <Switch>
            <Route path="/campus/news" element={NewsSidebar}></Route>
            <Route path="/campus/news/:id" element={NewsSidebar}></Route>
            <Route path="/campus/activity/sport/:id" element={NewsSidebar}></Route>
            <Route path="/campus/news/campus_new/campus_docs" element={NewsSidebar}></Route>
            <Route path="/campus/activity/*" element={NewsSidebar}></Route>

            <Route path="/campus/rating/ratyng_system" element={RatingSidebar}></Route>
        </Switch>
    );
};