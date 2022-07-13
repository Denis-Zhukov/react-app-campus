import { useParams } from "react-router-dom";
import { Row, Col, Container, Spinner, Alert } from "react-bootstrap";
import { useEffect } from "react";
import defaultImage from "./../../assets/images/news_default_image.jpg";
import { useDispatch, useSelector } from "react-redux";
import { getSportById } from "../../store/sportSlice";

export const ReadingSport = () => {
    const {idSport} = useParams();
    const dispatch = useDispatch();
    const {openSport: sport, status, error} = useSelector(state => state.sport);

    useEffect(() => {
        dispatch(getSportById(idSport));
    }, [idSport]);

    return (
        <Container fluid className="pt-3">
            {
                status === "pending" &&
                <Row>
                    <Col className="d-flex justify-content-center">
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </Col>
                </Row>
            }
            {
                status === "fulfilled" &&
                <>
                    <Row>
                        <Col className="text-center"><h2>{sport?.title}</h2></Col>
                    </Row>
                    <Row>
                        <Col xs={4}>
                            <img src={sport?.image ?? defaultImage} alt="main-img" className="w-100" />
                        </Col>
                        <Col xs={8}>
                            {sport?.body?.split("\n").map((paragraph, i) => <p key={i}>{paragraph}</p>)}
                        </Col>
                    </Row>
                </>
            }

            {

                status === "rejected" &&
                <Row>
                    <Alert variant="danger" key="danger" className="text-center">{error}</Alert>
                </Row>
            }
        </Container>
    );
};