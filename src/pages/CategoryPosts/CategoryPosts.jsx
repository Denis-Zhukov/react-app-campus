import React, { useEffect } from "react";
import { Row, Col, Container, Spinner, Alert } from "react-bootstrap";
import { CategoryCard } from "../../components/Cards/CategoryCard/CategoryCard";

import { useDispatch, useSelector } from "react-redux";
import { PENDING, FULFILLED, REJECTED } from "../../store/statuses";

export const CategoryPosts = ({action, selector, categoryName}) => {
    const dispatch = useDispatch();
    const {status, error, items} = useSelector(selector);

    useEffect(() => {
        dispatch(action());
    }, [dispatch, action]);

    return (
        <Container fluid className="pt-3">
            <Row>
                <Col><h2 className="text-end">Какой-то заголовок</h2></Col>
            </Row>
            <Row>
                {
                    status === PENDING &&
                    <Col className="d-flex justify-content-center">
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </Col>
                }
                {
                    status === FULFILLED && items.length > 0 &&
                    items.map(item => <Col key={item.id} xs={12}>
                        <CategoryCard {...item} categoryName={categoryName} />
                    </Col>)
                }
                {
                    status === FULFILLED && items.length === 0 &&
                    <Alert variant="dark" key="dark" className="text-center text-light bg-dark">Новостей нет</Alert>
                }
                {
                    status === REJECTED &&
                    <Alert variant="danger" key="danger" className="text-center">{error}</Alert>
                }
            </Row>
        </Container>
    );
};