import React from 'react';
import {Container, Row, Col, Nav, Navbar, Card, Table, Badge, Button, Image} from 'react-bootstrap';
import { PersonCircle, Wallet, CalendarEvent, Ticket, PencilSquare, PlusSquare } from 'react-bootstrap-icons';
import {Link as RouterLink} from 'react-router-dom';
import './styles.scss';
import Orders from "./sections/Orders";
const sections = [
  { name: 'Section 1', icon: <PersonCircle size={20} /> },
  { name: 'Section 2', icon: <Wallet size={20} /> },
  { name: 'Section 3', icon: <CalendarEvent size={20} /> },
];

const events = [
  { title: 'Event Title 1', date: 'January 1, 2023', img: 'https://source.unsplash.com/250x200/?event' },
  { title: 'Event Title 2', date: 'January 2, 2023', img: 'https://source.unsplash.com/250x200/?conference' },
];

const tickets = [
  { event: 'Event Title 1', number: '123456', status: 'AVAILABLE', statusColor: 'success' },
  { event: 'Event Title 2', number: '789012', status: 'SOLD', statusColor: 'danger' },
];


const Dashboard = () => (
    <Container fluid>
      <Header />
      <Container>
        <Row>
          <Sidebar />
          <MainContent />
        </Row>
      </Container>
    </Container>
);

const Header = () => (
    <header className="dashboard-header">
      <Container>
        <Row>

        </Row>
      </Container>
    </header>
);


const Sidebar = () => (
    <Col md={3} className="sidebar-container">
        <Navbar expand="md" bg="light" className="flex-md-column">
            <Navbar.Brand as={RouterLink} to="/">
                <Image
                    src="https://source.unsplash.com/200x100/?nature"
                    alt="Application Logo"
                    fluid
                    className="app-logo"
                />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="sidebar" />
            <Navbar.Collapse id="sidebar">
                <Nav className="flex-md-column">
                    {sections.map(({ name, icon }, index) => (
                        <Nav.Link key={index} as={RouterLink} to={`/section/${name.toLowerCase().replace(/\s/g, '')}`}>
                            {icon} {name}
                        </Nav.Link>
                    ))}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    </Col>
);
const MainContent = () => (
    <Col md={9}>
      <UserProfile />
      <WalletSection />
      <UpcomingEvents />
      <Tickets />
      <Orders />
      <CreateEvent />
    </Col>
);

const UserProfile = () => (
    <section className="user-profile-section my-3">
        <Card>
            <Card.Body>
                <Row>
                    <Col xs={12} md={6} className="text-center text-md-start mt-3 mt-md-0">
                        <h2>User's Name</h2>
                        <p>Email: user@example.com</p>
                        <Button variant="primary">Edit Profile</Button>
                    </Col>
                    <Col xs={12} md={6} className="text-center text-md-end">
                        <img
                            src="https://source.unsplash.com/100x100/?portrait"
                            alt="User Profile"
                            className="profile-image"
                        />
                    </Col>

                </Row>
            </Card.Body>
        </Card>
    </section>
);
const WalletSection = () => (
    <section className="wallet-section my-3">
      <Card>
        <Card.Img variant="top" src="https://source.unsplash.com/250x150/?wallet" alt="Wallet Icon" />
        <Card.Body>
          <h2>Wallet Balance</h2>
          <p className="balance">500 USD</p>
        </Card.Body>
      </Card>
    </section>
);
const UpcomingEvents = () => (
    <section className="upcoming-events-section my-3">
      <Row>
        {events.map(({ title, date, img }, index) => (
            <Col md={6} key={index}>
              <Card>
                <Card.Img variant="top" src={img} alt="Event Image" />
                <Card.Body>
                  <h3>{title}</h3>
                  <p>Date: {date}</p>
                  <Button variant="primary">Manage Event</Button>
                </Card.Body>
              </Card>
            </Col>
        ))}
      </Row>
    </section>
);

const Tickets = () => (
    <section className="tickets-section my-3">
      <Table striped bordered responsive>
        <thead>
        <tr>
          <th>Event</th>
          <th>Ticket Number</th>
          <th>Status</th>
        </tr>
        </thead>
        <tbody>
        {tickets.map(({ event, number, status, statusColor }, index) => (
            <tr key={index}>
              <td>
                <Ticket size={20} /> {event}
              </td>
              <td>{number}</td>
              <td>
                <Badge bg={statusColor}>{status}</Badge>
              </td>
            </tr>
        ))}
        </tbody>
      </Table>
    </section>
);


const CreateEvent = () => (
    <section className="create-event-section">
      <Button variant="primary" size="lg">
        <PlusSquare size={20} /> Create New Event
      </Button>
    </section>
);

export default Dashboard;
