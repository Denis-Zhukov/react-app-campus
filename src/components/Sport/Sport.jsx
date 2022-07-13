import React, { useEffect } from "react";
import { Row, Col, Container, Spinner, Alert } from "react-bootstrap";
import { getSportPosts } from "../../store/sportSlice";
import { useDispatch, useSelector } from "react-redux";
import { SportCard } from "./Card/SportCard";

export const Sport = () => {
    const {status, error, items} = useSelector(state => state.sport);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getSportPosts());
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
                    status === "rejected" &&
                    <Alert variant="danger" key="danger" className="text-center">{error}</Alert>
                }
                {
                    items.length === 0 && status === "fulfilled" &&
                    <Alert variant="dark" key="dark" className="text-center text-light bg-dark">Новостей нет</Alert>
                }
                {
                    status === "fulfilled" &&
                    items.map(item => (
                        // className="d-flex flex-column flex-sm-row"
                            <Col key={item.id} xs={12} >
                                <SportCard {...item} />
                            </Col>
                        ),
                    )
                }
            </Row>
        </Container>
    );
};