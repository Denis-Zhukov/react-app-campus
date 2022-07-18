import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Col, Spinner, Table } from "react-bootstrap";
import { getRatingList } from "../../store/ratingSlice";

export const ListOfRating = () => {
    const dispatch = useDispatch();
    const {list, statusList: status, errorList: error} = useSelector(state => state.rating);

    useEffect(() => {
        dispatch(getRatingList());
    }, [dispatch]);

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
                (status === "fulfilled" || list.length !== 0) &&
                <><Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>п/п</th>
                            <th>Деятельность, повышающая и понижающая рейтинг</th>
                            <th>Кол-во баллов</th>
                        </tr>
                    </thead>
                    <tbody>
                    {list.map(s => (
                        <tr key={s.num}>
                            <td>{s.num}</td>
                            <td>{s.action}</td>
                            <td>{s.points}</td>
                        </tr>
                    ))
                    }
                    </tbody>
                </Table>
                    <p>* Лишение места в общежитии и штрафные баллы при заселении в общежитие в следующем учебном
                       году</p>
                </>
            }
            {
                status === "rejected" &&
                <Alert variant="danger" key="danger" className="text-center">{error}</Alert>
            }
            {
                status === "fulfilled" && list.length === 0 &&
                <Alert variant="dark" key="dark" className="text-center">Нет студентов</Alert>
            }
        </>
    );
};