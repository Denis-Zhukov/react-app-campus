import { Card } from "./Card/Card";
import { Container } from "react-bootstrap";

export const News = ({items}) => (
    <Container fluid>
        {items.map(item => <Card img={item?.image} />)}
    </Container>
);