import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useWindowWidth } from "./hooks/useWindowSize";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { Navbar } from "./components/Navbar/Navbar";
import { News } from "./components/News/News";

import { sidebarItems } from "./constants";
import { navbarItems } from "./constants";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
    const width = useWindowWidth();
    const [externalSidebar, setExternalSidebar] = useState(true);
    const [collapsedNavbar, setCollapsedNavbar] = useState(false);

    //TODO: Ререндринг происходит при каждом изменении окна, нужно исправить

    useEffect(() => {
        console.log(externalSidebar)
        setExternalSidebar(width >= 992);
        setCollapsedNavbar(width < 768);
    }, [width]);

    return (
        <Container fluid="lg" className="p-0">
            <Row>
                <Col xs="12" lg="2"> {externalSidebar && <Sidebar items={sidebarItems} />} </Col>
                <Col xs="12" lg="10" className="p-0 m-0">
                    <Navbar items={navbarItems} collapsedNavbar={collapsedNavbar} />
                    {!externalSidebar && <Sidebar items={sidebarItems} />}

                    <News items={[]} />
                </Col>
            </Row>
        </Container>
    );
}

export default App;
