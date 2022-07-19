import React, { useCallback, useState } from "react";
import { Alert, Button, Col, Container, FloatingLabel, Form, Row } from "react-bootstrap";
import av from "./../../../assets/images/news_default_image.jpg";
import { useDispatch, useSelector } from "react-redux";
import { addNews } from "../../../store/newsSlice";
import { clearResult } from "../../../store/newsSlice";
import s from "./../News.module.css";

export const AddNews = ({setShow}) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const {resultStatus, resultError} = useSelector(state => state.news);

    const handleTitle = (e) => setTitle(e.target.value);
    const handleBody = (e) => setBody(e.target.value);

    const handleAddNews = useCallback(() => {
        dispatch(addNews({title, body}));
    }, [handleTitle, handleBody]);

    return (
        <Container fluid className="py-3">
            {
                resultStatus === "pending" &&
                <Alert variant="dark" className="text-light">Отправка данных. Не закрывайте браузер</Alert>
            }
            {
                resultStatus === "fulfilled" &&
                <Alert variant="dark" className="text-light">
                    Новость добавлена ({new Date(Date.now()).toLocaleString("ru-RU", {})})
                </Alert>
            }
            {
                resultStatus === "rejected" &&
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
                                placeholder="Leave a comment here"
                                onChange={handleTitle}
                            />
                        </FloatingLabel>
                    </Col>
                    <Col xs={12}>
                        <FloatingLabel controlId="floatingTextarea" label="Контент">
                            <Form.Control
                                as="textarea"
                                placeholder="Leave a comment here"
                                style={{height: "250px", resize: "none"}}
                                onChange={handleBody}
                            />
                        </FloatingLabel>
                    </Col>
                </Row>
                <Row>
                    <Col className="d-flex justify-content-end">
                        <Button
                            variant="outline-dark"
                            className="w-auto me-2"
                            onClick={() => {
                                setShow(false);
                                dispatch(clearResult());
                            }}
                        >Назад</Button>
                        <Button
                            variant="dark" className="w-auto" type="submit"
                            onClick={(e) => {
                                e.preventDefault();
                                handleAddNews();
                            }}
                        >Добавить</Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
};