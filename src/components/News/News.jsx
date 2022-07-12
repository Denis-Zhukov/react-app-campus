import { NewsCard } from "./Card/NewsCard";
import { Row, Col, Container } from "react-bootstrap";

export const News = ({items}) => (
    <Container fluid className="pt-3">
        <Row className>
            {items.map(item => <Col className="d-flex justify-content-center pb-3"><NewsCard
                img={item?.image}
                title={item.title}
            /></Col>)}
        </Row>
    </Container>
);