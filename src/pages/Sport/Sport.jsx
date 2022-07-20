import React, { useEffect } from "react";
import { Row, Col, Container, Spinner, Alert } from "react-bootstrap";
import { SportCard } from "./Card/SportCard";

import { useDispatch, useSelector } from "react-redux";
import { getSportsPosts } from "../../store/sportSlice";

export const Sport = () => {
    const dispatch = useDispatch();
    const {status, error, items} = useSelector(state => state.sport);

    useEffect(() => {
        dispatch(getSportsPosts());
    }, [dispatch]);

    return (
        <Container fluid className="pt-3">
            <Row>
                <Col><h2 className="text-end">Какой-то заголовок</h2></Col>
            </Row>
            <Row>
                {
                    status === "pending" &&
                    <Col className="d-flex justify-content-center">
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </Col>
                }
                {
                    status === "fulfilled" && items.length === 0 &&
                    <Alert variant="dark" key="dark" className="text-center text-light bg-dark">Новостей нет</Alert>
                }
                {
                    status === "fulfilled" && items.length !== 0 &&
                    items.map(item => (
                            <Col key={item.id} xs={12}>
                                <SportCard {...item} />
                            </Col>
                        ),
                    )
                }
                {
                    status === "rejected" &&
                    <Alert variant="danger" key="danger" className="text-center">{error}</Alert>
                }
            </Row>
        </Container>
    );
};