import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Col, Spinner, Table } from "react-bootstrap";
import { getRatingList, clearList } from "../../store/ratingSlice";
import { PENDING, FULFILLED, REJECTED } from "../../store/statuses";


export const ListOfRating = () => {
    const dispatch = useDispatch();
    const {list, listStatus: status, listError: error} = useSelector(state => state.rating);

    useEffect(() => {
        dispatch(getRatingList());
        return () => dispatch(clearList());
    }, [dispatch]);

    return (
        <>
            {
                status === PENDING &&
                <Col className="d-flex justify-content-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </Col>
            }

            {
                (status === FULFILLED || list.length > 0) &&
                <>
                    <Table striped bordered hover>
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
                status === FULFILLED && list.length === 0 &&
                <Alert variant="dark" key="dark" className="text-center">Нет студентов</Alert>
            }
            {
                status === REJECTED &&
                <Alert variant="danger" key="danger" className="text-center">{error}</Alert>
            }
        </>
    );
};