import React, { useEffect } from "react";
import { Alert, Col, Container, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getRatingInfo, clearInfo } from "../../store/ratingSlice";
import { PENDING, FULFILLED, REJECTED } from "../../store/statuses";

export const Rating = ({list}) => {
    const dispatch = useDispatch();
    const {info, infoStatus: status, infoError: error} = useSelector(state => state.rating);

    useEffect(() => {
        dispatch(getRatingInfo());
        return () => dispatch(clearInfo());
    }, [dispatch]);

    return (
        <Container fluid>
            {
                status === PENDING &&
                <Col className="d-flex justify-content-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </Col>
            }
            
            {
                status === FULFILLED &&
                <>
                    <Row><h2>{info?.title}</h2></Row>
                    <Row>{info?.body?.split("\n").map((paragraph, i) => <p key={i}>{paragraph}</p>)}</Row>
                    <Row>{list}</Row>
                </>
            }

            {
                status === REJECTED &&
                <Alert variant="danger" key="danger" className="text-center">{error}</Alert>
            }
        </Container>
    );
};