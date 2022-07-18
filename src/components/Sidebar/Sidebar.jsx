import React from "react";
import { Routes as Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { NewsSidebar } from "./NewsSidebar/NewsSidebar";
import { RatingSidebar } from "./RatingSidebar/RatingSidebar";
import { CampusSidebar } from "./CampusSidebar/CampusSidebar";
import { ToolkitRatingSidebar } from "./ToolkitRatingSidebar/ToolkitRatingSidebar";
import "./Sidebar.css";

export const Sidebar = () => {
    const {isAuth} = useSelector(state => state.auth);

    return (
        <>
            <Switch>
                <Route path="/campus/news" element={<NewsSidebar />}></Route>
                <Route path="/campus/news/:id" element={<NewsSidebar />}></Route>
                <Route path="/campus/activity/sport/:id" element={<NewsSidebar />}></Route>
                <Route path="/campus/news/campus_new/campus_docs" element={<NewsSidebar />}></Route>
                <Route path="/campus/activity/*" element={<NewsSidebar />}></Route>
                <Route path="/campus/signin" element={<NewsSidebar />}></Route>

                <Route path="/campus/rating/ratyng_system" element={<RatingSidebar />}></Route>
                <Route path="/campus/rating/ratyng_system/students" element={<RatingSidebar />}></Route>
                {
                    isAuth &&

                    [
                        <Route key={1} path="/campus/campus_info" element={<CampusSidebar />} />,
                        <Route key={2} path="/campus/admin/rating_student" element={<ToolkitRatingSidebar />} />,
                    ]

                }
            </Switch>
        </>
    );
};