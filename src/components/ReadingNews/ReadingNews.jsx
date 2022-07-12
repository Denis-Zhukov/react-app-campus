import { useParams } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import defaultImage from "./../../assets/images/news_default_image.jpg";
import axios from "axios";

export const ReadingNews = () => {
    const {idNews} = useParams();
    const [news, setNews] = useState({});

    useEffect(() => {
        (async () => {
                const url = "https://jsonplaceholder.typicode.com/posts/" + idNews;
                const news = await axios.get(url);
                setNews(news.data);
                console.log(news)
            }
        )();
    });

    return (
        <Container fluid className="pt-3">
            <Row>
                <Col className="text-center"><h2>{news.title}</h2></Col>
            </Row>
            <Row>
                <Col xs={4}>
                    <img src={news.image ?? defaultImage} alt = "main-img" className="w-100" />
                </Col>
                <Col xs={8}>
                    {news.body?.split("\n").map(paragraph => <p>{paragraph}</p>)}
                </Col>
            </Row>
        </Container>
    );
};