import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getPageOfStudents } from "../../store/ratingSlice";
import { ModalWindow } from "../ModalWindow/ModalWindow";
import { AddPointsForm } from "../Forms/AddPointsForm/AddPointsForm";
import s from "./AdminRatingStudent.module.css";

const limit = 5;

export const AdminRatingStudent = () => {
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();
    const {list: students, countStudents} = useSelector(state => state.rating);
    const [showPoints, setShowPoints] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(-1);

    useEffect(() => {
        const timer = setTimeout(
            () => {
                dispatch(getPageOfStudents({page, limit}))
                setSelectedStudent(-1);
            },
            750);
        return () => clearTimeout(timer);
    }, [page, dispatch]);
    console.log("render");
    return (
        <Container fluid>
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
                        className={s.toolkitBtn}
                    ><i className="fa-solid fa-trash-can" /></button>
                </Col>
                <Col xs={0} md={2}></Col>
            </Row>
            <ModalWindow
                show={showPoints}
                setShow={setShowPoints}
                title={selectedStudent !== -1 && students.find(s => s.id === selectedStudent)?.name}
                body={selectedStudent !== -1 ? <AddPointsForm /> : "Не выбран студент"}
            />
        </Container>
    );
};