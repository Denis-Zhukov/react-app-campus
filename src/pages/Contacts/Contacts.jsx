import React, { useEffect } from "react";
import { Alert, Col, Container, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getContacts } from "../../store/contactsSlice";
import { ContactCard } from "../../components/Cards/ContactCard/ContactCard";

export const Contacts = () => {
    const dispatch = useDispatch();
    const {contacts, status, error} = useSelector(state => state.contacts);

    useEffect(() => {
        dispatch(getContacts());
    }, [dispatch]);


    return (
        <Container fluid>
            {
                status === "pending" &&
                <Col className="d-flex justify-content-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </Col>
            }
            {
                status === "fulfilled" && contacts.length > 0 &&
                contacts.map(c => (
                    <Row key={c.id}>
                        <ContactCard body={c.phone} />
                    </Row>
                ))
            }
            {
                status === "fulfilled" && contacts.length === 0 &&
                <Alert variant="dark">Контактов нет</Alert>
            }
            {
                status === "rejected" &&
                <Alert variant="danger">{error}</Alert>
            }
        </Container>
    );
};