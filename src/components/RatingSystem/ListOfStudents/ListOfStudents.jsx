import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListOfStudents } from "../../../store/ratingSlice";
import { Alert, Col, Spinner, Table } from "react-bootstrap";

export const ListOfStudents = () => {
    const dispatch = useDispatch();
    const {listOfStudents, statusList: status, errorList: error} = useSelector(state => state.rating);
    useEffect(() => {
        dispatch(getListOfStudents());
    }, [dispatch]);

    console.log(listOfStudents);
    return (
        <>
            {
                status === "pending" &&
                <Col className="d-flex justify-content-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </Col>
            }
            {
                status === "fulfilled" && listOfStudents.length !== 0 &&
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>№</th>
                            <th>Имя</th>
                            <th>Логин</th>
                            <th>Рейтинг</th>
                        </tr>
                    </thead>
                    <tbody>
                    {listOfStudents.map(s => (
                        <tr key={s.id}>
                            <td>{s.id}</td>
                            <td>{s.name}</td>
                            <td>{s.username}</td>
                            <td>1</td>
                        </tr>
                    ))
                    }
                    </tbody>
                </Table>
            }
            {
                status === "rejected" &&
                <Alert variant="danger" key="danger" className="text-center">{error}</Alert>
            }
            {
                status === "fulfilled" && listOfStudents.length === 0 &&
                <Alert variant="dark" key="dark" className="text-center">Нет студентов</Alert>
            }
        </>
    );
};