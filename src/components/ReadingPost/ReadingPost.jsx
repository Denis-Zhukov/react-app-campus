import { useParams } from "react-router-dom";
import { Row, Col, Container, Spinner, Alert } from "react-bootstrap";
import { useEffect } from "react";
import defaultImage from "./../../assets/images/news_default_image.jpg";
import { useDispatch, useSelector } from "react-redux";

export const ReadingPost = ({action, selector}) => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const {open: post, status, error} = useSelector(selector);

    useEffect(() => {
        dispatch(action(id));
    }, [id]);

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
                        <Col className="text-center"><h2>{post?.title}</h2></Col>
                    </Row>
                    <Row>
                        <Col xs={4}>
                            <img src={post?.image ?? defaultImage} alt="main-img" className="w-100" />
                        </Col>
                        <Col xs={8}>
                            {post?.body?.split("\n").map((paragraph, i) => <p key={i}>{paragraph}</p>)}
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