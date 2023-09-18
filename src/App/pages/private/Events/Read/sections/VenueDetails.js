import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import PhotoGallery from "../components/PhotoGallery";
import Map from "../components/Map";
import InfoCard from "../components/InfoCard";

const VenueDetails = ({ venue }) => {
    const { Address, name, description, contactInfo, website, photos } = venue || {};
    const addressString = Address
        ? `${Address.street}, ${Address.city}, ${Address.state}, ${Address.country}, ${Address.postalCode}`
        : "";

    const details = [
        { label: "Name", value: name },
        { label: "Description", value: description },
        { label: "Address", value: addressString },
        { label: "Contact", value: contactInfo },
    ];

    if (website) {
        details.push(
            <a href={website} target="_blank" rel="noreferrer">
                Visit Website
            </a>
        );
    }

    return (
        <div className="venue-details">
            <h3 className="venue-heading">Venue Details</h3>
            <Row className="mb-4">
                <Col md={6}>
                    <InfoCard title="Venue Details" details={details} />
                </Col>
                <Col md={6}>
                    <PhotoGallery photos={photos} />
                </Col>
            </Row>
            <Card className="card mb-4 shadow-sm">
                <Card.Body>
                    <Map id="venueMap" address={Address} />
                </Card.Body>
            </Card>
        </div>
    );
};

export default VenueDetails;
