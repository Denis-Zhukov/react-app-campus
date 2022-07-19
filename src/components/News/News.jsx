import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { ViewingNews } from "./ViewingNews/ViewingNews";
import { AddNews } from "./AddNews/AddNews";


export const News = () => {
    const {status, error, items} = useSelector(state => state.news);
    const {isAuth} = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const [show, setShow] = useState(false);

    return (<>
        {
            !show ?
                <ViewingNews setShow={setShow} /> :
                <AddNews setShow={setShow}/>
        }
    </>);
};