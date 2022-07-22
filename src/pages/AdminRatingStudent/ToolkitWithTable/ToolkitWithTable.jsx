import React, { useCallback, useEffect, useState } from "react";
import { Alert, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { ModalWindow } from "../../../components/ModalWindow/ModalWindow";
import { AddPointsForm } from "../../../components/Forms/AddPointsForm/AddPointsForm";
import { useDispatch, useSelector } from "react-redux";
import { getPageOfStudents, deleteStudent, clearResult } from "../../../store/ratingSlice";
import s from "../AdminRatingStudent.module.css";
import { ToolkitStudentsTable } from "./ToolkitStudentsTable/ToolkitStudentsTable";

const limit = 6;

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
    const {authRole} = useSelector(state => state.auth);

    const [page, setPage] = useState(1);
    const [showPoints, setShowPoints] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(-1);

    const handleDeleteStudent = useCallback(() => {
        dispatch(deleteStudent(selectedStudent));
        setSelectedStudent(-1);
    }, [dispatch, selectedStudent]);

    const handlePagination = useCallback((e) => {
        const nextPage = e.target.value;
        nextPage > 0 && nextPage <= Math.ceil(studentsNumber / limit) && setPage(nextPage);
    }, [studentsNumber]);

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(getPageOfStudents({page, limit}));
            setSelectedStudent(-1);
        }, 750);
        return () => {
            clearTimeout(timer);
            dispatch(clearResult());
        };
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
                            <ToolkitStudentsTable
                                selectedStudent={selectedStudent}
                                setSelectedStudent={setSelectedStudent}
                            />
                        </Col>
                        <Col xs={12} md={2}>
                            <Form.Control
                                type="number"
                                value={page}
                                onChange={handlePagination}
                            />
                        </Col>
                    </Row>
                    {
                        authRole === "admin" &&
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
                    }
                    {
                        authRole === "admin" &&
                        <>
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
                        </>
                    }
                </Container>
            }
            {status === "rejected" && <Alert variant="danger">{error}</Alert>}
        </>
    );
};