import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Row, Col, Container, Spinner, Alert } from "react-bootstrap";
import defaultImage from "./../../assets/images/news_default_image.jpg";
import { useDispatch, useSelector } from "react-redux";
import s from "../AdminRatingStudent/AdminRatingStudent.module.css";
import { ModalWindow } from "../ModalWindow/ModalWindow";

export const ReadingPost = ({action, selector, deleteAction, clearResult}) => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const {open: post, status, error, resultError, resultStatus} = useSelector(selector);
    const {isAuth} = useSelector(state => state.auth);
    const nav = useNavigate();

    useEffect(() => {
        dispatch(action(id));
        if( resultStatus === "fulfilled" ) {
            const timer = setTimeout(() => {
                nav("/campus/news");
                dispatch(clearResult());
            }, 2500);
            return () => clearTimeout(timer);
        }
    }, [id, action, dispatch, resultStatus, nav, clearResult]);

    const [showConfirm, setShowConfirm] = useState(false);
    const handleDeleteNews = () => dispatch(deleteAction(id));

    return (
        <Container fluid className="pt-3">
            {
                resultStatus === "pending" &&
                <Alert variant="dark" className="text-light">Отправка данных. Не закрывайте браузер</Alert>
            }
            {
                resultStatus === "fulfilled" &&
                <Alert variant="dark" className="text-light">
                    Запись удалена ({new Date(Date.now()).toLocaleString("ru-RU")})
                </Alert>
            }
            {
                resultStatus === "rejected" &&
                <Alert variant="danger">Ошибка удаление записи: {resultError}</Alert>
            }

            {
                status === "pending" &&
                <Row>
                    <Col className="d-flex justify-content-center">
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </Col>
                </Row>
            }
            {
                status === "fulfilled" &&
                <>
                    <Row>
                        <Col className="text-center"><h2>{post?.title}</h2></Col>
                    </Row>
                    <Row>
                        <Col xs={4}>
                            <img src={post?.image ?? defaultImage} alt="main-img" className="w-100" />
                            {isAuth &&
                                <>
                                    <button
                                        onClick={() => setShowConfirm(true)}
                                        className={s.toolkitBtn}
                                        title="Удалить студента"
                                    ><i className="fa-solid fa-trash-can" /></button>
                                    <button
                                        onClick={() => setShowConfirm(true)}
                                        className={s.toolkitBtn}
                                        title="Удалить студента"
                                    ><i className="fa-solid fa-arrow-right-arrow-left"></i></button>
                                    <ModalWindow
                                        show={showConfirm}
                                        setShow={setShowConfirm}
                                        title="Вы уверены?"
                                        body="Удалить данную статью?"
                                        handleAction={handleDeleteNews}
                                    />
                                </>
                            }
                        </Col>
                        <Col xs={8}>
                            {post?.body?.split("\n").map((paragraph, i) => <p key={i}>{paragraph}</p>)}
                        </Col>
                    </Row>
                </>
            }

            {
                status === "rejected" &&
                <Row> <Alert variant="danger" key="danger" className="text-center">{error}</Alert> </Row>
            }
        </Container>
    );
};