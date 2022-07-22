import React, { useEffect } from "react";
import { Alert, Col, Container, Row, Spinner } from "react-bootstrap";
import { NewsCard } from "../../../components/Cards/NewsCard/NewsCard";
import s from "../News.module.css";

import { useDispatch, useSelector } from "react-redux";
import { getLastNews } from "../../../store/newsSlice";
import { PENDING, FULFILLED, REJECTED } from "../../../store/statuses";

export const ViewingNews = ({setShow}) => {
    const dispatch = useDispatch();
    const {status, error, items} = useSelector(state => state.news);
    const {isAuth} = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(getLastNews());
    }, [dispatch]);

    return (
        <Container fluid className="pt-3">
            {
                isAuth &&
                <Row>
                    <Col>
                        <button
                            onClick={() => setShow(true)}
                            className={s.toolkitBtn}
                            title="Добать статью"
                        ><i className="fa-solid fa-plus" /></button>
                    </Col>
                </Row>
            }

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
                    items.map(item => (
                        <Col key={item.id} className="d-flex justify-content-center pb-3">
                            <NewsCard {...item} />
                        </Col>))
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