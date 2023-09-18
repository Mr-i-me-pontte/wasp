import React from 'react';
import {GoogleMap, Marker} from '@react-google-maps/api';
import {Card, Col, Row} from 'react-bootstrap';
import AmplifyImage from './AmplifyImage';

const VenueMap = ({address}) => {
    const {latitude, longitude} = address;
    const location = {lat: latitude, lng: longitude};

    return (
        <GoogleMap
            id="venueMap"
            mapContainerStyle={{width: '100%', height: '300px'}}
            center={location}
            zoom={15}
        >
            <Marker position={location}/>
        </GoogleMap>
    );
};


const VenueDetails = ({venue}) => {
    if (!venue) {
        return null;
    }

    const {description, photos, Address, contactInfo, website} = venue;

    const address = Address
        ? {
            street: Address.street || '',
            city: Address.city || '',
            state: Address.state || '',
            country: Address.country || '',
            postalCode: Address.postalCode || '',
            latitude: Address.latitude || 0,
            longitude: Address.longitude || 0,
        }
        : {};

    return (
        <div className="sidebar-container">
            <h3 className="my-4">Venue Details</h3>
            <Row className="mb-4">
                <Col md={6}>
                    <Card className="p-3">
                        <p>{description}</p>
                        <h5>Address:</h5>
                        <p>
                            {`${address.street}, ${address.city}, ${address.state}, ${address.country}, ${address.postalCode}`}
                        </p>
                        <h5>Contact:</h5>
                        <p>{contactInfo}</p>
                        {website && (
                            <p>
                                <a href={website} target="_blank" rel="noreferrer">
                                    Visit Website
                                </a>
                            </p>
                        )}
                    </Card>
                </Col>
                <Col md={6}>
                    <Row className="venue-photos">
                        {photos &&
                            photos.map((photo, index) => (
                                <Col md={4} key={index}>
                                    <Card className="mb-4 shadow-sm">
                                        <Card.Img
                                            variant="top"
                                            as={AmplifyImage}
                                            imageKey={photo}
                                            options={{level: 'public'}}
                                            altText="Venue Photo"
                                        />
                                    </Card>
                                </Col>
                            ))}
                    </Row>
                    <Col md={12}>
                        <Card className="venue-map p-3">
                            <Card.Body>
                                <VenueMap address={address}/>
                            </Card.Body>
                        </Card>
                    </Col>
                </Col>
            </Row>
        </div>
    );
};

export default VenueDetails;
