import React from "react";
import { Card } from "react-bootstrap";
import s from "./NewsCard.module.css";

export const NewsCard = ({img, title}) => (
    <Card className={`card ${s.card}`}>
        <Card.Img variant="top" src={img} alt="news image" className={s.cardImage} />

        <a href="#some" className={s.hoverBlock}>
            <span className={s.hoverTitle}>{title}</span>
        </a>
    </Card>
);