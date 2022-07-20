import React from "react";
import { Card } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import defaultImage from "../../../assets/images/news_default_image.jpg"
import s from "./NewsCard.module.css";

export const NewsCard = ({id, title, image}) => (
    <Card className={`card ${s.card}`}>
        <Card.Img variant="top" src={image ?? defaultImage} alt="news image" className={s.cardImage} />

        <NavLink to={`/campus/news/${id}`} className={s.hoverBlock}>
            <span className={s.hoverTitle}>{title}</span>
        </NavLink>
    </Card>
);