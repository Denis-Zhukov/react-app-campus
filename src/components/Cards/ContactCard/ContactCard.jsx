import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import s from "./ContactCard.module.css";

export const ContactCard = ({body}) => (
    <Card className={s.card}>
        <Row>
            <Col xs="auto"><i className={`fa-solid fa-address-card ${s.cardIcon}`}></i></Col>
            <Col>{body?.split("\n").map((paragraph, i) => <p key={i}>{paragraph}</p>)}</Col>
        </Row>
    </Card>
);