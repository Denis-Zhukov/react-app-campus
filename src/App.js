import React from "react";
import { useBreakpoint } from "./hooks/useBreakpoint";
import { Container, Row, Col } from "react-bootstrap";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { Navbar } from "./components/Navbar/Navbar";

import { News } from "./components/News/News";

import { ReadingPost } from "./components/ReadingPost/ReadingPost";
import { clearResult as clearResultNews, deleteNews, getNewsById } from "./store/newsSlice";
import { clearResult as clearResultSport, deleteSportNews, getSportById } from "./store/sportSlice";
import { getSettlingCampusInfo } from "./store/campusSlice";

import { Sport } from "./components/Sport/Sport";
import { Contacts } from "./components/Contacts/Contacts";
import { SignIn } from "./components/SignIn/SignIn";
import { NoMatch } from "./components/NoMatch/NoMatch";

import { Routes as Switch, Route, Navigate } from "react-router-dom";

import { SignInButton } from "./components/SignInButton/SignInButton";
import { Campus } from "./components/Campus/Campus";
import { Rating } from "./components/Rating/Rating";
import { ListOfRating } from "./components/ListOfRating/ListOfRating";
import { ListOfStudents } from "./components/ListOfStudents/ListOfStudents";

import { navbarItems } from "./constants";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/fontawesome/css/all.min.css";
import { useSelector } from "react-redux";
import { AdminRatingStudent } from "./components/AdminRatingStudent/AdminRatingStudent";

function App() {
    const externalSidebar = useBreakpoint(992);
    const {isAuth} = useSelector(state => state.auth);

    return (
        <Container fluid="lg">
            <Row>
                <Col xs="12" lg="2"> {externalSidebar && <Sidebar />} </Col>
                <Col xs="12" lg="8" className="m-0 p-0">
                    <Navbar items={navbarItems} />
                    <Row className="m-0">{!externalSidebar && <SignInButton />}</Row>
                    {!externalSidebar && <Sidebar />}
                    <Switch>
                        <Route path="/campus/news" element={<News />}></Route>
                        <Route
                            path="/campus/news/:id"
                            element={<ReadingPost
                                action={getNewsById}
                                selector={(state) => state.news}
                                deleteAction={deleteNews}
                                clearResult={clearResultNews}
                            />}
                        />
                        <Route path="/campus/activity/sport" element={<Sport />}></Route>
                        <Route
                            path="/campus/activity/sport/:id"
                            element={<ReadingPost
                                action={getSportById}
                                selector={(state) => state.sport}
                                deleteAction={deleteSportNews}
                                clearResult={clearResultSport}
                            />}
                        />
                        <Route
                            path="/campus/news/campus_new/campus_docs"
                            element={<ReadingPost action={getSettlingCampusInfo} selector={(state) => state.campus} />}
                        />
                        <Route path="/campus/campus_info" element={<Campus />} />
                        <Route
                            path="/campus/rating/ratyng_system"
                            element={<Rating
                                list={<ListOfRating />}
                            />}
                        />
                        <Route
                            path="/campus/rating/ratyng_system/students"
                            element={<Rating
                                list={<ListOfStudents />}
                            />}
                        />
                        <Route path="/campus/contacts" element={<Contacts />} />

                        {
                            isAuth &&
                            <Route path="/campus/admin/rating_student" element={<AdminRatingStudent />} />
                        }

                        {
                            isAuth ?
                                <Route path="/campus/signin" element={<Navigate replace to="/campus/news" />} />
                                :
                                <Route path="/campus/signin" element={<SignIn />} />
                        }

                        <Route path="*" element={<NoMatch />} status={404} />
                    </Switch>

                </Col>
                {externalSidebar && <Col xs="12" lg="2"> <SignInButton /> </Col>}
            </Row>
        </Container>
    );
}

export default App;
