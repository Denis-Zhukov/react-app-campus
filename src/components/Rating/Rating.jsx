import React, { useEffect } from "react";
import { Alert, Col, Container, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getRatingInfo } from "../../store/ratingSlice";

export const Rating = ({list}) => {
    const dispatch = useDispatch();
    const {info, statusInfo: status, errorInfo: error} = useSelector(state => state.rating);
    useEffect(() => {
        dispatch(getRatingInfo());
    }, [dispatch]);

    return (
        <Container fluid>
            {
                status === "pending" &&
                <Col className="d-flex justify-content-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </Col>
            }
            {
                status === "fulfilled" &&
                <>
                    <Row><h2>{info?.title}</h2></Row>
                    <Row>{info?.body?.split("\n").map((paragraph, i) => <p key={i}>{paragraph}</p>)}</Row>
                    <Row>{list}</Row>
                </>
            }
            {
                status === "rejected" &&
                <Alert variant="danger" key="danger" className="text-center">{error}</Alert>
            }
        </Container>
    );
};