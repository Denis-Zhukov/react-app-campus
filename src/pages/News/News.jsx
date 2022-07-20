import React, { useState } from "react";
import { ViewingNews } from "./ViewingNews/ViewingNews";
import { AddNews } from "./AddNews/AddNews";


export const News = () => {
    const [show, setShow] = useState(false);

    return !show ? <ViewingNews setShow={setShow} /> : <AddNews setShow={setShow} />;
};