import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Row, Col, Card, Image } from 'react-bootstrap';

const Home = () => {
    return (
        <Container>
            <Row className="my-5">
                <Col md={8}>
                    <div className="jumbotron bg-light">
                        <h1 className="text-primary">Welcome to My App</h1>
                        <p className="text-secondary">
                            This is a simple example of a home page for an application that uses React, react-router-dom, and react-bootstrap.
                        </p>
                        <Link to="/crypto-prices">
                            <Button variant="primary">View Cryptocurrency Prices</Button>
                        </Link>
                    </div>
                </Col>
                <Col md={4}>
                    <Card className="bg-dark text-white">
                        <Card.Body>
                            <Card.Title>Recent News</Card.Title>
                            <Card.Text>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor, magna a bibendum congue, risus nibh faucibus ipsum, a viverra nunc mauris id urna.
                            </Card.Text>
                            <Button variant="secondary" size="sm">Read More</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row className="my-5">
                <Col md={4}>
                    <Card className="bg-light">
                        <Card.Body>
                            <Card.Title>Upcoming Events</Card.Title>
                            <Card.Text>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor, magna a bibendum congue, risus nibh faucibus ipsum, a viverra nunc mauris id urna.
                            </Card.Text>
                            <Button variant="secondary" size="sm">View Details</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="bg-light">
                        <Card.Body>
                            <Card.Title>Popular Products</Card.Title>
                            <Card.Text>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor, magna a bibendum congue, risus nibh faucibus ipsum, a viverra nunc mauris id urna.
                            </Card.Text>
                            <Button variant="secondary" size="sm">View Products</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="bg-light">
                        <Card.Body>
                            <Card.Title>Support</Card.Title>
                            <Card.Text>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor, magna a bibendum congue, risus nibh faucibus ipsum, a viverra nunc mauris id urna.
                            </Card.Text>
                            <Button variant="secondary" size="sm">Contact Us</Button>
                        </Card.Body>
                        <Card.Img variant="bottom" src="support.jpg" />
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Home;
