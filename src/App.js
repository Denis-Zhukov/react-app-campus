import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useBreakpoint } from "./hooks/useBreakpoint";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { Navbar } from "./components/Navbar/Navbar";

import { News } from "./components/News/News";
import { ReadingNews } from "./components/ReadingNews/ReadingNews";

import { Routes as Switch, Route } from "react-router-dom";

import { sidebarItems } from "./constants";
import { navbarItems } from "./constants";
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
                        <Route path="/campus/news/:idNews" element={<ReadingNews />}></Route>
                    </Switch>
                </Col>
            </Row>
        </Container>
    );
}

export default App;
