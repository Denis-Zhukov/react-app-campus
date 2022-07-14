import React from "react";
import { useBreakpoint } from "./hooks/useBreakpoint";
import { Container, Row, Col } from "react-bootstrap";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { Navbar } from "./components/Navbar/Navbar";

import { News } from "./components/News/News";

import { ReadingPost } from "./components/ReadingPost/ReadingPost";
import { getNewsById } from "./store/newsSlice";
import { getSportById } from "./store/sportSlice";
import { getCampusInfo } from "./store/campusSlice";

import { Sport } from "./components/Sport/Sport";
import { NoMatch } from "./components/NoMatch/NoMatch";

import { Routes as Switch, Route } from "react-router-dom";

import { sidebarItems, navbarItems } from "./constants";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
    const externalSidebar = useBreakpoint(992);

    return (
        <Container fluid="lg">
            <Row>
                <Col xs="12" lg="2"> {externalSidebar && <Sidebar items={sidebarItems} />} </Col>
                <Col xs="12" lg="10" className="m-0 p-0">
                    <Navbar items={navbarItems} />
                    {!externalSidebar && <Sidebar items={sidebarItems} />}

                    <Switch>
                        <Route path="/campus/news" element={<News />}></Route>
                        <Route
                            path="/campus/news/:id"
                            element={<ReadingPost action={getNewsById} selector={(state) => state.news} />}
                        ></Route>
                        <Route path="/campus/activity/sport" element={<Sport />}></Route>
                        <Route
                            path="/campus/activity/sport/:id"
                            element={<ReadingPost action={getSportById} selector={(state) => state.sport} />}
                        ></Route>
                        <Route
                            path="/campus/news/campus_new/campus_docs"
                            element={<ReadingPost action={getCampusInfo} selector={(state) => state.campus} />}
                        ></Route>
                        <Route path="*" element={<NoMatch />} status={404}></Route>
                    </Switch>

                </Col>
            </Row>
        </Container>
    );
}

export default App;
