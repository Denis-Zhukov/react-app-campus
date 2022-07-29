import React, { useCallback, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Navbar } from "./components/Navbar/Navbar";
import { navbarItems } from "./assets/constants";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { SignInButton } from "./components/SignInButton/SignInButton";

import { News } from "./pages/News/News";
import { CategoryPosts } from "./pages/CategoryPosts/CategoryPosts";
import { ReadingPost } from "./pages/ReadingPost/ReadingPost";
import { getNewsById, deleteNews, editNews, clearOpen as clearOpenNews, clearResult as clearResultNews } from "./store/newsSlice";
import { getSportsPosts, getSportsPostById, deleteSportsPost, editSportsPost, clearOpen as clearOpenSport, clearResult as clearResultSport } from "./store/sportsSlice";
import { getEventsPosts, getEventsPostById, deleteEventsPost, editEventsPost, clearOpen as clearOpenEvent, clearResult as clearResultEvent } from "./store/eventsSlice";
import { getExecutionsPosts, getExecutionsPostById, deleteExecutionsPost, editExecutionsPost, clearOpen as clearOpenExecution, clearResult as clearResultExecution } from "./store/executionsSlice";

import { Campus } from "./pages/Campus/Campus";
import { getCampusSettlingInfo, clearOpen as clearOpenSettling } from "./store/campusSlice";
import { AdminRatingStudent } from "./pages/AdminRatingStudent/AdminRatingStudent";
import { Rating } from "./pages/Rating/Rating";
import { ListOfRating } from "./components/ListOfRating/ListOfRating";
import { ListOfStudents } from "./components/ListOfStudents/ListOfStudents";

import { Contacts } from "./pages/Contacts/Contacts";

import { SignIn } from "./pages/SignIn/SignIn";
import { Logout } from "./pages/Logout/Logout";

import { NoMatch } from "./pages/NoMatch/NoMatch";

import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./store/authSlice";

import { useBreakpoint } from "./hooks/useBreakpoint";
import { Routes as Switch, Route, Navigate } from "react-router-dom";


function App() {
    //Sidebar and SignInButton located in different blocks on different resolutions
    const externalSidebar = useBreakpoint(992);
    const {isAuth} = useSelector(state => state.auth);

    const newsSelector = useCallback(state => state.news, []);
    const sportSelector = useCallback(state => state.sport, []);
    const eventSelector = useCallback(state => state.event, []);
    const executionSelector = useCallback(state => state.execution, []);
    const campusSelector = useCallback(state => state.campus, []);

    const dispatch = useDispatch();
    useEffect(() => {
        if( localStorage.getItem("token") )
            dispatch(checkAuth());
    }, [dispatch]);


    return (
        <Container fluid="lg">
            <Row>
                <Col xs="12" lg="2"> {externalSidebar && <Sidebar />} </Col>
                <Col xs="12" lg="8" className="m-0 p-0">
                    <Navbar items={navbarItems} />
                    {!externalSidebar && <Row className="m-0"><SignInButton /></Row>}
                    {!externalSidebar && <Sidebar />}

                    <Switch>
                        {/*MAIN PAGE*/}
                        <Route path="/" element={<Navigate replace to="/campus/news" />} />

                        {/*NEWS*/}
                        <Route path="/campus/news" element={<News />} />
                        <Route
                            path="/campus/news/:id"
                            element={<ReadingPost
                                action={getNewsById}
                                selector={newsSelector}
                                deleteAction={deleteNews}
                                editAction={editNews}
                                clearOpenPost={clearOpenNews}
                                clearResult={clearResultNews}
                            />}
                        />

                        {/*SPORT*/}
                        <Route
                            path="/campus/activity/sport"
                            element={<CategoryPosts
                                action={getSportsPosts}
                                selector={sportSelector}
                                categoryName="sport"
                            />}
                        />
                        <Route
                            path="/campus/activity/sport/:id"
                            element={<ReadingPost
                                action={getSportsPostById}
                                selector={sportSelector}
                                deleteAction={deleteSportsPost}
                                editAction={editSportsPost}
                                clearOpenPost={clearOpenSport}
                                clearResult={clearResultSport}
                            />}
                        />

                        {/*EVENT*/}
                        <Route
                            path="/campus/activity/event"
                            element={<CategoryPosts
                                action={getEventsPosts}
                                selector={eventSelector}
                                categoryName="event"
                            />}
                        />
                        <Route
                            path="/campus/activity/event/:id"
                            element={<ReadingPost
                                action={getEventsPostById}
                                selector={eventSelector}
                                deleteAction={deleteEventsPost}
                                editAction={editEventsPost}
                                clearOpenPost={clearOpenEvent}
                                clearResult={clearResultEvent}
                            />}
                        />

                        {/*EXECUTION*/}
                        <Route
                            path="/campus/activity/execution"
                            element={<CategoryPosts
                                action={getExecutionsPosts}
                                selector={executionSelector}
                                categoryName="execution"
                            />}
                        />
                        <Route
                            path="/campus/activity/execution/:id"
                            element={<ReadingPost
                                action={getExecutionsPostById}
                                selector={executionSelector}
                                deleteAction={deleteExecutionsPost}
                                editAction={editExecutionsPost}
                                clearOpenPost={clearOpenExecution}
                                clearResult={clearResultExecution}
                            />}
                        />

                        {/*CAMPUS SETTLING*/}
                        <Route
                            path="/campus/news/campus_new/campus_docs"
                            element={<ReadingPost
                                action={getCampusSettlingInfo}
                                selector={campusSelector}
                                clearOpenPost={clearOpenSettling}
                            />}
                        />

                        {/*CAMPUS INFO*/}
                        <Route path="/campus/campus_info" element={<Campus />} />

                        {/*RATING SYSTEM*/}
                        <Route
                            path="/campus/rating/ratyng_system"
                            element={<Rating list={<ListOfRating />} />}
                        />

                        {/*STUDENTS*/}
                        <Route
                            path="/campus/rating/ratyng_system/students"
                            element={<Rating list={<ListOfStudents />} />}
                        />

                        {/*CONTACTS*/}
                        <Route path="/campus/contacts" element={<Contacts />} />

                        {/*ADMIN TOOLKIT FOR RATING SYSTEM*/}
                        {
                            isAuth &&
                            <Route path="/campus/admin/rating_student" element={<AdminRatingStudent />} />
                        }

                        {/*SIGN IN*/}
                        {
                            isAuth ?
                                <Route path="/campus/signin" element={<Navigate replace to="/campus/news" />} /> :
                                <Route path="/campus/signin" element={<SignIn />} />
                        }

                        {/*LOGOUT*/}
                        {
                            isAuth && <Route path="/logout" element={<Logout />} />
                        }

                        {/*NO MATCH, PAGE 404*/}
                        <Route path="*" element={<NoMatch />} status={404} />
                    </Switch>

                </Col>
                {externalSidebar && <Col xs="12" lg="2"> <SignInButton /> </Col>}
            </Row>
        </Container>
    );
}

export default App;
