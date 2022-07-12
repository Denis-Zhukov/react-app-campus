import { NewsCard } from "./Card/NewsCard";
import { Row, Col, Container, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { setNews } from "../../store/newsSlice";

export const News = () => {
    const items = useSelector(state => state.news);
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            try {
                const url = "https://jsonplaceholder.typicode.com/posts";
                const posts = await axios.get(url);
                dispatch(setNews(posts.data));
            } catch(e) {
                console.error(e);
            }
        })();
    });

    return (
        <Container fluid className="pt-3">
            <Row className>
                {items.length > 0 ? (
                    items.map(item => (
                        <Col key={item.id} className="d-flex justify-content-center pb-3">
                            <NewsCard {...item} />
                        </Col>),
                    )) : <Alert variant="dark" className="text-center text-light bg-dark">Новостей нет</Alert>}
            </Row>
        </Container>
    );
};