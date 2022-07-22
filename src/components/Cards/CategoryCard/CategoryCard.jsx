import React from "react";
import { Card } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import defaultImage from "../../../assets/images/news_default_image.jpg";
import s from "./CategoryCard.module.css";

export const CategoryCard = ({id, image, title, categoryName}) => {
    return (
        <NavLink to={`/campus/activity/${categoryName}/${id}`} className={s.linkWrapper}>
            <Card key="dark" bg="dark" text="white" className={`d-sm-block rounded-0 mb-3`}>
                <img src={image ?? defaultImage} alt="sport" className={s.image} />
                <div className={s.title}>{title}</div>
            </Card>
        </NavLink>
    );
};