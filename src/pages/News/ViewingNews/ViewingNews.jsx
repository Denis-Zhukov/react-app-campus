import React, { useEffect } from "react";
import { Alert, Col, Container, Row, Spinner } from "react-bootstrap";
import { NewsCard } from "../../../components/Cards/NewsCard/NewsCard";
import s from "../News.module.css";

import { useDispatch, useSelector } from "react-redux";
import { getLastNews } from "../../../store/newsSlice";

export const ViewingNews = ({setShow}) => {
    const {status, error, items} = useSelector(state => state.news);
    const {isAuth} = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getLastNews());
    }, [dispatch]);

    return (
        <Container fluid className="pt-3">
            {
                isAuth &&
                <Row className="d-flex justify-content-start">
                    <Col>
                        <button
                            onClick={() => setShow(true)}
                            className={s.toolkitBtn}
                            title="Добать баллов студенту"
                        ><i className="fa-solid fa-plus" /></button>
                    </Col>
                </Row>
            }
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
                    status === "fulfilled" && items.length !== 0 &&
                    items.map(item => (
                        <Col key={item.id} className="d-flex justify-content-center pb-3">
                            <NewsCard {...item} />
                        </Col>))
                }

                {
                    status === "fulfilled" && items.length === 0 &&
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