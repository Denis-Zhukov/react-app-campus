import React, { useCallback, useEffect, useState } from "react";
import { Alert, Col, Container, Form, Row, Spinner, Table } from "react-bootstrap";
import s from "../AdminRatingStudent.module.css";
import { ModalWindow } from "../../ModalWindow/ModalWindow";
import { AddPointsForm } from "../../Forms/AddPointsForm/AddPointsForm";
import { useDispatch, useSelector } from "react-redux";
import { getPageOfStudents, deleteStudent, clearResult } from "../../../store/ratingSlice";

const limit = 5;

export const ToolkitWithTable = () => {
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();
    const {list: students, countStudents, statusList: status, errorList: error, statusResult, statusError, lastUpdate} = useSelector(state => state.rating);

    const [showPoints, setShowPoints] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(-1);

    const handleDeleteStudent = useCallback(() => {
        dispatch(deleteStudent({id: selectedStudent}));
        const timer = setTimeout(() => {
            dispatch(clearResult());
        }, 5000);
        return () => clearTimeout(timer);
    }, [dispatch, selectedStudent]);

    useEffect(() => {
        const timer = setTimeout(
            () => {
                dispatch(getPageOfStudents({page, limit}));
                setSelectedStudent(-1);
            }, 750);
        return () => clearTimeout(timer);
    }, [page, dispatch, lastUpdate]);

    return (
        <>
            {status === "fulfilled" &&
                <Container fluid>
                    <Row>
                        {statusResult === "pending" &&
                            <Alert variant="dark" className="text-light">Отправка запроса. Не закрывайте браузер</Alert>
                        }
                        {
                            statusResult === "fulfilled" &&
                            <Alert variant="dark" className="text-light">Изминения внесенны</Alert>
                        }
                        {
                            statusResult === "rejected" &&
                            <Alert variant="danger">Прозашла ошибка: {statusError}</Alert>
                        }
                    </Row>
                    <Row>
                        <Col xs={12} md={10}>
                            <Table>
                                <thead style={{background: "#212529", color: "white", fontWeight: "bold"}}>
                                    <tr>
                                        <th>#</th>
                                        <th>Имя студента</th>
                                        <th>Факультет</th>
                                        <th>Баллы</th>
                                        <th>Номер общежития</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    students?.map((s, i) => (
                                        <tr
                                            key={s.id} onClick={(e) => {
                                            setSelectedStudent(s.id);
                                        }}
                                            style={
                                                {
                                                    cursor: "pointer",
                                                    color: "white",
                                                    background: selectedStudent === s.id ? "#999" : i % 2 === 0 ? "#2c3034" : "#212529",
                                                }
                                            }
                                        >
                                            <td>{s.id}</td>
                                            <td>{s.name}</td>
                                            <td>{s.email}</td>
                                            <td>{s.phone}</td>
                                            <td>{s.website}</td>
                                        </tr>
                                    ))
                                }
                                </tbody>
                            </Table>
                        </Col>
                        <Col xs={12} md={2}>
                            <Form.Control
                                type="number"
                                value={page}
                                onChange={(e) => {
                                    const page = e.target.value;
                                    page > 0 && page <= Math.ceil(countStudents / limit) && setPage(+page);
                                }}
                            />
                        </Col>
                    </Row>
                    <Row className="d-flex justify-content-end">
                        <Col xs={1} className="text-center">
                            <button
                                onClick={() => setShowPoints(true)}
                                className={s.toolkitBtn}
                                title="Добать баллов студенту"
                            >
                                <i className="fa-solid fa-plus" /></button>
                        </Col>
                        <Col xs={1} className="text-center">
                            <button
                                onClick={() => setShowDelete(true)}
                                className={s.toolkitBtn}
                                title="Удалить студента"
                            ><i className="fa-solid fa-trash-can" /></button>
                        </Col>
                        <Col xs={0} md={2}></Col>
                    </Row>
                    <ModalWindow
                        show={showPoints}
                        setShow={setShowPoints}
                        title={selectedStudent !== -1 && students.find(s => s.id === selectedStudent)?.name}
                        body={selectedStudent !== -1 ? <AddPointsForm /> : "Студент не выбран"}
                    />
                    <ModalWindow
                        show={showDelete}
                        setShow={setShowDelete}
                        title={selectedStudent !== -1 && students.find(s => s.id === selectedStudent)?.name}
                        body={selectedStudent !== -1 ? "Удалить выбранного студента?" : "Студент не выбран"}
                        handleAction={handleDeleteStudent}
                        selector={selectedStudent !== -1 ? (state => state.rating) : null}
                        statusProp="statusResult"
                        errorProp="errorResult"
                        resultProp="result"
                    />
                </Container>
            }
            {status === "pending" &&
                <Container fluid className="d-flex justify-content-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </Container>
            }
            {status === "rejected" && <Alert variant="danger">{error}</Alert>}
        </>
    );
};