import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import eventsData from '../../data/eventsData';
import '../style.scss';
import Jumbotron from "../../../../../components/Boots/Jumbotron";

const ListEvents = () => {
    return (
        <div className="events">
            <Container>
                <Jumbotron>
                    <h1 className="text-center">Events</h1>
                </Jumbotron>
                <Row>
                    {eventsData.map((event) => (
                        <Col key={event.id} xs={12} sm={6} md={4} lg={3}>
                            <Card className="mb-4 h-100">
                                <Card.Img variant="top" src={event.imageUrl} alt={event.name} />
                                <Card.Body>
                                    <Card.Title>{event.name}</Card.Title>
                                    <Card.Text>{event.description}</Card.Text>
                                    <div className="d-flex flex-column align-items-start text-muted">
                                        <p className="event-info">{event.date}</p>
                                        <p className="event-info">{event.time}</p>
                                        <p className="event-info">{event.location}</p>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center mt-auto">
                                        <Button variant="primary">RSVP</Button>
                                        <p className="event-price">{event.price}</p>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
};

export default ListEvents;
