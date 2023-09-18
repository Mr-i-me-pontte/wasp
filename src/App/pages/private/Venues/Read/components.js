import React from 'react';
import { Button, Card, Image } from 'react-bootstrap';

export const VenueCard = ({ venue }) => {
    return (
        <div>
            <h1>{venue?.name}</h1>
            <p>{venue?.location}</p>
            <p>{venue?.description}</p>
            <h2>Amenities</h2>
            <ul>
                {venue?.amenities.map((amenity, index) => (
                    <li key={index}>{amenity}</li>
                ))}
            </ul>
            <Button variant="primary" href="#">
                Virtual Tour
            </Button>
        </div>
    );
};

export const VenuePhotos = ({ photos }) => {
    return (
        <div>
            <h2>Photos and Virtual Tour</h2>
            {photos.map((photo, index) => (
                <Image key={index} src={photo} thumbnail />
            ))}
        </div>
    );
};

export const Reviews = ({ reviews }) => {
    return (
        <div>
            <h2>Reviews and Ratings</h2>
            {reviews.map((review, index) => (
                <Card key={index}>
                    <Card.Body>
                        <Card.Title>{review.name}</Card.Title>
                        <Card.Text>
                            Event Type: {review.eventType}
                            <br />
                            Rating: {review.rating} out of 5 stars
                            <br />
                            Review: "{review.review}"
                        </Card.Text>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
};

export const Services = ({ services, packages }) => {
    return (
        <div>
            <h2>Services and Packages</h2>
            <h3>Services</h3>
            <ul>
                {services.map((service, index) => (
                    <li key={index}>{service}</li>
                ))}
            </ul>
            <h3>Packages</h3>
            {packages.map((pkg, index) => (
                <Card key={index}>
                    <Card.Body>
                        <Card.Title>{pkg.name}</Card.Title>
                        <Card.Text>{pkg.description}</Card.Text>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
};

export const BookingInfo = () => {
    return (
        <div>
            <h2>Booking Information</h2>
            <p>Check availability:</p>
            {/* Availability calendar component */}
            <Button variant="primary" href="#">
                Book Now
            </Button>
        </div>
    );
};

export const ContactInfo = ({ contact }) => {
    return (
        <div>
            <h2>Contact Information</h2>
            <p>Email: {contact.email}</p>
            <p>Phone: {contact.phone}</p>
            {/* Contact form component */}
        </div>
    );
};
