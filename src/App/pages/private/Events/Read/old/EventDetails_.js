import React from 'react';
import { Row, Col, Button, Card, Carousel } from 'react-bootstrap';
import { BsTicket } from 'react-icons/bs';
import AmplifyImage from '../components/AmplifyImage';
import { GoogleMap, Marker } from '@react-google-maps/api';

const EventDetails = ({ event, venue }) => {
    const {
        title,
        description,
        startDate,
        endDate,
        image,
        totalAvailableTickets,
    } = event;
    const { name, photos, Address, contactInfo, website } = venue;

    return (
        <Card className="event-details my-4">
            <Card.Body>
                <Card.Title className="event-title mb-4">{title}</Card.Title>
                <Row className="mb-4">
                    <Col md={6}>
                        <Carousel>
                            <Carousel.Item>
                                <EventImage image={image} altText={title} />
                            </Carousel.Item>
                            {photos &&
                                photos.map((photo, index) => (
                                    <Carousel.Item key={index}>
                                        <EventImage image={photo} altText="Venue Photo" />
                                    </Carousel.Item>
                                ))}
                        </Carousel>
                    </Col>
                    <Col md={6}>
                        <EventDescription
                            description={description}
                            startDate={startDate}
                            endDate={endDate}
                            totalAvailableTickets={totalAvailableTickets}
                            venueName={name}
                            address={Address}
                            contactInfo={contactInfo}
                            website={website}
                        />
                    </Col>
                </Row>
                <Button variant="primary" size="lg" className="buy-ticket-btn mb-4">
                    <BsTicket className="mr-2" />
                    Buy Tickets
                </Button>
                <VenueMap address={Address} />
            </Card.Body>
        </Card>
    );
};

const EventImage = ({ image, altText }) => (
    <AmplifyImage
        imageKey={image}
        options={{ level: 'public' }}
        altText={altText}
        className="event-image"
    />
);

const EventDescription = ({
                              description,
                              startDate,
                              endDate,
                              totalAvailableTickets,
                              venueName,
                              address,
                              contactInfo,
                              website,
                          }) => (
    <Card className="event-description p-3">
        <Card.Title className="my-3">Event Description</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Card.Title className="my-3">Event Details</Card.Title>
        <ul className="list-unstyled">
            <EventDetailItem label="Start Date" value={startDate} />
            <EventDetailItem label="End Date" value={endDate} />
            <EventDetailItem
                label="Total Available Tickets"
                value={totalAvailableTickets}
            />
            <EventDetailItem label="Venue" value={venueName} />
            <EventDetailItem
                label="Address"
                value={`${address.street}, ${address.city}, ${address.state}, ${address.country}, ${address.postalCode}`}
            />
            <EventDetailItem label="Contact" value={contactInfo} />
            {website && (
                <li>
                    <a href={website} target="_blank" rel="noreferrer">
                        Visit Website
                    </a>
                </li>
            )}
        </ul>
    </Card>
);

const EventDetailItem = ({ label, value }) => (
    <li>
        <strong>{label}:</strong> {value}
    </li>
);

const VenueMap = ({ address }) => {
    const { latitude, longitude } = address;
    const location = { lat: latitude, lng: longitude };

    return (
        <Card className="venue-map my-4">
            <Card.Body>
                <GoogleMap
                    id="venueMap"
                    mapContainerStyle={{ width: '100%', height: '300px' }}
                    center={location}
                    zoom={15}
                >
                    <Marker position={location} />
                </GoogleMap>
            </Card.Body>
        </Card>
    );
};

export default EventDetails;
