import React from "react";
import { useBreakpoint } from "./hooks/useBreakpoint";
import { Container, Row, Col } from "react-bootstrap";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { Navbar } from "./components/Navbar/Navbar";

import { News } from "./components/News/News";

import { ReadingPost } from "./components/ReadingPost/ReadingPost";
import { getNewsById } from "./store/newsSlice";
import { getSportById } from "./store/sportSlice";
import { getSettlingCampusInfo } from "./store/campusSlice";

import { Sport } from "./components/Sport/Sport";
import { NoMatch } from "./components/NoMatch/NoMatch";

import { Routes as Switch, Route } from "react-router-dom";

import { LogoutButton } from "./components/LogoutButton/LogoutButton";
import { Campus } from "./components/Campus/Campus";

import { navbarItems } from "./constants";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/fontawesome/css/all.min.css";

function App() {
    const externalSidebar = useBreakpoint(992);

    return (
        <Container fluid="lg">
            <Row>
                <Col xs="12" lg="2"> {externalSidebar && <Sidebar />} </Col>
                <Col xs="12" lg="8" className="m-0 p-0">
                    <Navbar items={navbarItems} />
                    <Row>{!externalSidebar && <Sidebar />}</Row>
                    <Row className="m-0">{!externalSidebar && <LogoutButton />}</Row>
                    <Switch>
                        <Route path="/campus/news" element={<News />}></Route>
                        <Route
                            path="/campus/news/:id"
                            element={<ReadingPost action={getNewsById} selector={(state) => state.news} />}
                        />
                        <Route path="/campus/activity/sport" element={<Sport />}></Route>
                        <Route
                            path="/campus/activity/sport/:id"
                            element={<ReadingPost action={getSportById} selector={(state) => state.sport} />}
                        />
                        <Route
                            path="/campus/news/campus_new/campus_docs"
                            element={<ReadingPost action={getSettlingCampusInfo} selector={(state) => state.campus} />}
                        ></Route>
                        <Route path="/campus/news/campus_info/camp_1" element={<Campus />}></Route>
                        <Route path="*" element={<NoMatch />} status={404}></Route>
                    </Switch>

                </Col>
                {externalSidebar && <Col xs="12" lg="2"> <LogoutButton /> </Col>}
            </Row>
        </Container>
    );
}

export default App;
