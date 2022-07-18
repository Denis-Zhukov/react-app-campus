import React from "react";
import { Col, Container, FloatingLabel, Form, Row } from "react-bootstrap";

export const AddPointsForm = () => {

    return (
        <Container fluid>
            <Row className="mb-3">
                <Col></Col>
                <Form.Group
                    as={Col}
                    controlId="pointsControl"
                    className="d-flex justify-content-end align-items-center"
                >
                    <Form.Label className="me-3">Баллов</Form.Label>
                    <Form.Control type="number" />
                </Form.Group>
            </Row>
            <Row>
                <FloatingLabel controlId="floatingTextarea2" label="Причина">
                    <Form.Control
                        as="textarea"
                        placeholder="Leave a comment here"
                        style={{height: "250px", resize: "none"}}
                    />
                </FloatingLabel>
            </Row>
        </Container>
    );
};