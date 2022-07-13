import { Row, Col, Container, Alert, Spinner } from "react-bootstrap";
import { NewsCard } from "./Card/NewsCard";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getLastNews } from "../../store/newsSlice";

export const News = () => {
    const {status, error, items, ...f} = useSelector(state => state.news);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getLastNews());
    }, [dispatch]);

    return (
        <Container fluid className="pt-3">
            <Row className>
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
                    items.map(item => (
                        <Col key={item.id} className="d-flex justify-content-center pb-3">
                            <NewsCard {...item} />
                        </Col>))
                }

                {
                    items.length === 0 && status === "fulfilled" &&
                    <Alert variant="dark" key="dark" className="text-center text-light bg-dark">Новостей нет</Alert>
                }

                {
                    status === "rejected" &&
                    <Alert variant="danger" key="danger" className="text-center">{error}</Alert>
                }
            </Row>
        </Container>
    );
};