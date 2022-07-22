import React, { useState } from "react";
import { ViewingNews } from "./ViewingNews/ViewingNews";
import { AddAndEditNews } from "./AddAndEditNews/AddAndEditNews";
import { useSelector } from "react-redux";


export const News = () => {
    const [show, setShow] = useState(false);
    const {isAuth} = useSelector(state => state.auth);

    return show && isAuth ? <AddAndEditNews setShow={setShow} /> : <ViewingNews setShow={setShow} />;
};