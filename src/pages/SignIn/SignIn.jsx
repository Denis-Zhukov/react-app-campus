import React, { useCallback, useEffect, useState } from "react";
import { Col, Container, Form, Row, Alert } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearStatus, login } from "../../store/authSlice";
import s from "./SignIn.module.css";

export const SignIn = () => {
    const dispatch = useDispatch();
    const {status, error} = useSelector(state => state.auth);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);

    const signIn = useCallback((e) => {
        e.preventDefault();
        dispatch(login({login: username, password, remember}));
    }, [username, password, remember, dispatch]);

    useEffect(() => {
        dispatch(clearStatus());
    }, [dispatch]);

    return (
        <Container fluid>
            {
                status === "pending" &&
                <Alert variant="dark" className="text-light">Отправка данных...</Alert>
            }
            {
                status === "fulfilled" &&
                <Alert variant="dark" className="text-light">Авторизация прошла успешно</Alert>
            }
            {
                status === "rejected" &&
                <Alert variant="danger">{error}</Alert>
            }
            <Form method="POST">
                <h2 className="mb-3">Авторизация</h2>
                <Form.Group as={Row} className="m-0 mb-3 p-0" controlId="loginControl">
                    <Col xs={2}>
                        <Form.Label column xs="2">Логин</Form.Label>
                    </Col>
                    <Col xs={10}>
                        <Form.Control
                            type="text"
                            className="bg-dark text-light"
                            value={username}
                            placeholder="UserNamya"
                            maxLength={32}
                            onChange={e => setUsername(e.target.value)}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="m-0 mb-3 p-0" controlId="pwdControl">
                    <Col xs={2}>
                        <Form.Label column xs="2">Пароль</Form.Label>
                    </Col>
                    <Col xs={10}>
                        <Form.Control
                            type="password"
                            className="bg-dark text-light"
                            value={password}
                            placeholder="***********"
                            maxLength={128}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="d-flex m-0 mb-3 p-0" controlId="checkControl">
                    <Col xs={2}></Col>
                    <Col xs="auto"><Form.Check checked={remember} onChange={() => setRemember(!remember)} /></Col>
                    <Col xs="auto"><Form.Label>Запомнить меня</Form.Label></Col>
                </Form.Group>
                <Row className="p-0 m-0">
                    <Col xs={2}></Col>
                    <Col xs={10} className="d-flex">
                        <Form.Control
                            type="submit"
                            value="Войти"
                            className="w-50 me-2 bg-dark text-light"
                            onClick={(e) => signIn(e)}
                        />
                        <NavLink to="/campus/registration" className={s.registrationBtn}>
                            <Form.Control
                                type="submit"
                                value="Регистрация"
                                className="w-auto m-1 bg-dark text-light"
                            />
                        </NavLink>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
};