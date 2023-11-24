import React from 'react';
import {
    Container,
    Row,
    Col,
    Navbar,
    Nav,
    NavDropdown,
    Form,
    FormControl,
    Button,
    Card,
    CardGroup,
    Carousel
} from 'react-bootstrap';
import './styles.scss';
import Jumbotron from "../../../../components/Boots/Jumbotron";

const HomePage = () => {
    return (
        <>
        <div className="homepage-container">
            {/* Navbar */}
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">DAX</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#about">About</Nav.Link>
                        <NavDropdown title="Resources" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>

            {/* Jumbotron */}
            <Jumbotron>
                <Container>
                    <h1 className="text-white">Welcome to DAX</h1>
                    <p className="text-white">
                        This is a one-page website about crypto that uses UniSwap as a layout basis.
                    </p>
                </Container>
            </Jumbotron>

            {/* Features */}
            <Container>
                <Row className="mt-5">
                    <Col>
                        <CardGroup>
                            <Card>
                                <Card.Img variant="top" src="https://via.placeholder.com/150x100" />
                                <Card.Body>
                                    <Card.Title>Feature 1</Card.Title>
                                    <Card.Text>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae.
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <Button variant="primary">Learn more</Button>
                                </Card.Footer>
                            </Card>
                            <Card>
                                <Card.Img variant="top" src="https://via.placeholder.com/150x100" />
                                <Card.Body>
                                    <Card.Title>Feature 2</Card.Title>
                                    <Card.Text>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae.
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <Button variant="primary">Learn more</Button>
                                </Card.Footer>
                            </Card>
                            <Card>
                                <Card.Img variant="top" src="https://via.placeholder.com/150x100" />
                                <Card.Body>
                                    <Card.Title>Feature 3</Card.Title>
                                    <Card.Text>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae.
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <Button variant="primary">Learn more</Button>
                                </Card.Footer>
                            </Card>
                        </CardGroup>
                    </Col>
                </Row>
            </Container>

            {/* Carousel */}
            <Container className="mt-5">
                <Carousel>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://via.placeholder.com/1000x500"
                            alt="First slide"
                        />
                        <Carousel.Caption>
                            <h3>First slide label</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://via.placeholder.com/1000x500"
                            alt="Second slide"
                        />
                        <Carousel.Caption>
                            <h3>Second slide label</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://via.placeholder.com/1000x500"
                            alt="Third slide"
                        />
                        <Carousel.Caption>
                            <h3>Third slide label</h3>
                            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </Container>

            {/* Footer */}
            <footer className="mt-5">
                <Container>
                    <Row>
                        <Col>
                            <p>Copyright &copy; {new Date().getFullYear()} CryptoOne</p>
                        </Col>
                        <Col className="text-right">
                            <a href="#">Privacy Policy</a>
                            <a href="#">Terms of Use</a>
                        </Col>
                    </Row>
                </Container>
            </footer>
        </div>
        </>
    );
}

export default HomePage;

