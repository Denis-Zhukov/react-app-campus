import React, { useCallback, useEffect, useState } from "react";
import { Alert, Col, Container, Form, Row, Spinner, Table } from "react-bootstrap";
import { ModalWindow } from "../../../components/ModalWindow/ModalWindow";
import { AddPointsForm } from "../../../components/Forms/AddPointsForm/AddPointsForm";
import { useDispatch, useSelector } from "react-redux";
import { getPageOfStudents, deleteStudent, clearResult } from "../../../store/ratingSlice";
import s from "../AdminRatingStudent.module.css";

const limit = 5;

export const ToolkitWithTable = () => {
    const dispatch = useDispatch();
    const {
        list: students,
        studentsNumber,
        listStatus: status,
        listError: error,
        resultStatus,
        resultError,
        lastUpdate,
    } = useSelector(state => state.rating);

    const [page, setPage] = useState(1);
    const [showPoints, setShowPoints] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(-1);

    const handleDeleteStudent = useCallback(() => {
        dispatch(deleteStudent(selectedStudent));
        setSelectedStudent(-1);
        return () => dispatch(clearResult());
    }, [dispatch, selectedStudent]);

    const handlePagination = useCallback((e) => {
        const nextPage = e.target.value;
        nextPage > 0 && nextPage <= Math.ceil(studentsNumber / limit) && setPage(nextPage);
    }, [studentsNumber]);

    useEffect(() => {
        setTimeout(() => {
            dispatch(getPageOfStudents({page, limit}));
            setSelectedStudent(-1);
        }, 750);
        return () => dispatch(clearResult());
    }, [page, dispatch]);

    return (
        <>
            {status === "pending" &&
                <Container fluid className="d-flex justify-content-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </Container>
            }
            {status === "fulfilled" &&
                <Container fluid>
                    <Row>
                        {resultStatus === "pending" &&
                            <Alert variant="dark" className="text-light">Отправка запроса. Не закрывайте браузер</Alert>
                        }
                        {
                            resultStatus === "fulfilled" &&
                            <Alert variant="dark" className="text-light">Изминения внесенны
                                                                         ({new Date(lastUpdate).toLocaleString("ru-RU")})</Alert>
                        }
                        {
                            resultStatus === "rejected" &&
                            <Alert variant="danger">Прозашла ошибка: {resultError}</Alert>
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
                                onChange={handlePagination}
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
            {status === "rejected" && <Alert variant="danger">{error}</Alert>}
        </>
    );
};