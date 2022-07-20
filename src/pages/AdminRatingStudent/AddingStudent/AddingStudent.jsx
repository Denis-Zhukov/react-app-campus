import React, { useCallback, useEffect, useState } from "react";
import { Form, Button, Col, Container, Row, Alert } from "react-bootstrap";
import { hideAddingWindow } from "../../../store/applicationSlice";
import { useDispatch, useSelector } from "react-redux";
import { addStudent, clearResult } from "../../../store/ratingSlice";
import student from "../../../assets/images/news_default_image.jpg";

export const AddingStudent = () => {
    const dispatch = useDispatch();
    const {resultStatus, resultError} = useSelector(state => state.rating);

    const [name, setName] = useState("");
    const [faculty, setFaculty] = useState("");
    const [studentId, setStudentId] = useState(1);
    const [points, setPoints] = useState(0);
    const [campus, setCampus] = useState("");

    const nameHandle = (e) => setName(e.target.value);
    const facultyHandle = (e) => setFaculty(e.target.value);
    const studentIdHandle = (e) => e.target.value > 0 && setStudentId(e.target.value);
    const pointsHandle = (e) => setPoints(e.target.value);
    const campusHandle = (e) => setCampus(e.target.value);

    const handleAddStudent = useCallback(() => {
        dispatch(addStudent({name, faculty, studentId, points, campus}));
    }, [name, faculty, studentId, points, campus, dispatch]);

    useEffect(() => () => dispatch(clearResult()), [dispatch]);

    return (
        <Container fluid>
            <Row>
                {
                    resultStatus === "pending" &&
                    <Alert variant="dark" className="text-light">Отправа данных</Alert>
                }
                {
                    resultStatus === "fulfilled" &&
                    <Alert variant="dark" className="text-light">Студент добавлен</Alert>
                }
                {
                    resultStatus === "rejected" &&
                    <Alert variant="danger">Ошибка добавления студента: {resultError}</Alert>
                }
            </Row>
            <Row className="mb-3">
                <Col xs={12} md={4}>
                    <img
                        src={student}
                        alt="student"
                        style={{objectFit: "cover"}}
                        className="w-100 mb-3"
                    />
                </Col>
                <Col xs={12} md={8}>
                    <Form>
                        <Form.Group controlId="nameControl" as={Row} className="mb-2">
                            <Form.Label column xs={3} className="text-end">Имя</Form.Label>
                            <Col xs={9}><Form.Control
                                type="text"
                                value={name}
                                onChange={nameHandle}
                            /></Col>
                        </Form.Group>

                        <Form.Group controlId="facultyControl" as={Row} className="mb-2">
                            <Form.Label column xs={3} className="text-end">Факультет</Form.Label>
                            <Col xs={9}><Form.Control
                                type="text"
                                value={faculty}
                                onChange={facultyHandle}
                            /></Col>
                        </Form.Group>

                        <Form.Group controlId="idStudentControl" as={Row} className="mb-2">
                            <Form.Label column xs={3} className="text-end">ID студента</Form.Label>
                            <Col xs={9}><Form.Control
                                type="number"
                                value={studentId}
                                onChange={studentIdHandle}
                            /></Col>
                        </Form.Group>

                        <Form.Group controlId="pointsControl" as={Row} className="mb-2">
                            <Form.Label column xs={3} className="text-end">Баллов</Form.Label>
                            <Col xs={9}><Form.Control
                                type="number"
                                value={points}
                                onChange={pointsHandle}
                            /></Col>
                        </Form.Group>

                        <Form.Group controlId="campusControl" as={Row} className="mb-2">
                            <Form.Label column xs={3} className="text-end">Общежитие</Form.Label>
                            <Col xs={9}><Form.Control
                                type="text"
                                value={campus}
                                onChange={campusHandle}
                            /></Col>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
            <Row className="d-flex justify-content-center">
                <Button
                    as={Col}
                    variant="dark"
                    xs={3}
                    className="me-3"
                    onClick={handleAddStudent}
                > Добавить </Button>
                <Button
                    as={Col}
                    variant="secondary"
                    xs={3}
                    onClick={() => dispatch(hideAddingWindow())}
                > Отмена </Button>
            </Row>
        </Container>
    );
};