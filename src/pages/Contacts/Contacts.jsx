import React, { useEffect } from "react";
import { Alert, Col, Container, Row, Spinner } from "react-bootstrap";
import { ContactCard } from "../../components/Cards/ContactCard/ContactCard";

import { useDispatch, useSelector } from "react-redux";
import { getContacts } from "../../store/contactsSlice";
import { PENDING, FULFILLED, REJECTED } from "../../store/statuses";


export const Contacts = () => {
    const dispatch = useDispatch();
    const {contacts, status, error} = useSelector(state => state.contacts);

    useEffect(() => {
        dispatch(getContacts());
    }, [dispatch]);


    return (
        <Container fluid>
            <Row><h2 className="text-center">Какой-то заголовок</h2></Row>
            {
                status === PENDING &&
                <Col className="d-flex justify-content-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </Col>
            }
            {
                status === FULFILLED && contacts.length > 0 &&
                contacts.map(c => (
                    <Row key={c.id}>
                        <ContactCard body={c.phone} />
                    </Row>
                ))
            }
            {
                status === FULFILLED && contacts.length === 0 &&
                <Alert variant="dark">Контактов нет</Alert>
            }
            {
                status === REJECTED &&
                <Alert variant="danger">{error}</Alert>
            }
        </Container>
    );
};