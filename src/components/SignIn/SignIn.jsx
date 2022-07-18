import React, { useCallback, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, NavLink } from "react-router-dom";
import s from "./SignIn.module.css";

export const SignIn = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);

    const nav = useNavigate();
    const signIn = useCallback((e) => {
        e.preventDefault();
        nav("/");
    }, [nav]);

    return (
        <Container fluid>
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
                            value={login}
                            placeholder="UserNamya"
                            maxLength={32}
                            onChange={e => setLogin(e.target.value)}
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
                    <Col xs="auto"><Form.Check checked={remember} onClick={() => setRemember(!remember)} /></Col>
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