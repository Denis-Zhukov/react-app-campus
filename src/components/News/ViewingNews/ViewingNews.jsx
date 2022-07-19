import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLastNews } from "../../../store/newsSlice";
import { Alert, Col, Container, Row, Spinner } from "react-bootstrap";
import { NewsCard } from "../Card/NewsCard";
import s from "./../News.module.css";

export const ViewingNews = ({setShow}) => {
    const {status, error, items} = useSelector(state => state.news);
    const {isAuth} = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getLastNews());
    }, [dispatch]);

    return (
        <Container fluid className="pt-3">
            {isAuth &&
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