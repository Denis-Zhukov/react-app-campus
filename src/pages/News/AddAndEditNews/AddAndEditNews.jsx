import React, { useCallback, useEffect, useState } from "react";
import { Alert, Button, Col, Container, FloatingLabel, Form, Row } from "react-bootstrap";
import { ModalWindow } from "../../../components/ModalWindow/ModalWindow";
import av from "../../../assets/images/news_default_image.jpg";
import s from "../News.module.css";

import { useDispatch, useSelector } from "react-redux";
import { addNews, clearResult } from "../../../store/newsSlice";
import { PENDING, FULFILLED, REJECTED } from "../../../store/statuses";

export const AddAndEditNews = ({setShow, editable = null}) => {
    const [title, setTitle] = useState(editable?.post?.title ?? "");
    const [body, setBody] = useState(editable?.post?.body ?? "");

    const dispatch = useDispatch();
    const {resultStatus, resultError} = useSelector(state => state.news);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleTitle = editable === null ? (e) => setTitle(e.target.value) :
        (e) => {
            editable.setPost({...editable.post, title: e.target.value});
            setTitle(e.target.value);
        };

    const handleBody = editable === null ? (e) => setBody(e.target.value) :
        (e) => {
            editable.setPost({...editable.post, body: e.target.value});
            setBody(e.target.value);
        };

    const handleAddNews = useCallback(() => {
        dispatch(addNews({id: editable?.post?.id ?? undefined, title, body}));
    }, [title, body, dispatch, editable?.post?.id]);

    useEffect(() => {
        dispatch(clearResult());
        return () => dispatch(clearResult());
    }, [dispatch]);

    return (
        <Container fluid className="py-3">
            {
                resultStatus === PENDING &&
                <Alert variant="dark" className="text-light">Отправка данных. Не закрывайте браузер</Alert>
            }

            {
                resultStatus === FULFILLED &&
                <Alert variant="dark" className="text-light">
                    Новость добавлена ({new Date(Date.now()).toLocaleString("ru-RU", {})})
                </Alert>
            }

            {
                resultStatus === REJECTED &&
                <Alert variant="danger">Ошибка добавление новости: {resultError}</Alert>
            }

            <Form method="POST">
                <Row className="mb-3">
                    <Col className="d-flex justify-content-center">
                        <img src={av} alt="av" className={s.avatarNews} />
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col xs={12} className="mb-1">
                        <FloatingLabel controlId="floatingText" label="Заголовок?">
                            <Form.Control
                                as="input"
                                placeholder="Leave a title here"
                                onChange={handleTitle}
                                value={title}
                            />
                        </FloatingLabel>
                    </Col>
                    <Col xs={12}>
                        <FloatingLabel controlId="floatingTextarea" label="Контент">
                            <Form.Control
                                as="textarea"
                                placeholder="Leave a text here"
                                style={{height: "250px", resize: "none"}}
                                onChange={handleBody}
                                value={body}
                            />
                        </FloatingLabel>
                    </Col>
                </Row>

                {
                    editable === null &&
                    <Row>
                        <Col className="d-flex justify-content-end">
                            <Button
                                variant="outline-dark"
                                className="w-auto me-2"
                                onClick={() => setShow(false)}
                            >Назад</Button>
                            <Button
                                variant="dark" className="w-auto"
                                onClick={(e) => setShowConfirm(true)}
                            >Добавить</Button>
                        </Col>
                    </Row>
                }
            </Form>

            <ModalWindow
                show={showConfirm}
                setShow={setShowConfirm}
                title="Вы уверены?"
                body="Добавить данную статью?"
                handleAction={handleAddNews}
            />
        </Container>
    );
};