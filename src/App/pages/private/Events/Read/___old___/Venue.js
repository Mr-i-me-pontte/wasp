import React from "react";
import { Col, Row } from "react-bootstrap";
import { GoogleMap, Marker } from "@react-google-maps/api";
import "../style.scss";
import { AmplifyImage } from "../helper";

const VenueMap = ({ address }) => {
  const { latitude, longitude } = address;
  const location = { lat: latitude, lng: longitude };

  return (
    <GoogleMap
      id="venueMap"
      mapContainerStyle={{ width: "100%", height: "300px" }}
      center={location}
      zoom={15}
    >
      <Marker position={location} />
    </GoogleMap>
  );
};

const VenueDetails = ({ venue }) => {
  if (!venue) {
    return null;
  }

  const { name, description, photos, Address, contactInfo, website } = venue;

  const address = Address || {};

  return (
    <div className="sidebar-container">
      <h3 className="my-4">Venue Details</h3>
      <Row className="mb-4">
        <Col md={6}>
          <div className="card p-3">
            <h5>Name:</h5>
            <p>{name}</p>
            <h5>Description:</h5>
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
          </div>
        </Col>
        <Col md={6}>
          <Row className="venue-photos">
            {photos &&
              photos.map((photo, index) => (
                <Col md={4} key={index}>
                  <div className="card mb-4 shadow-sm">
                    <AmplifyImage
                      imageKey={photo}
                      options={{ level: "public" }}
                      altText="Venue Photo"
                    />
                  </div>
                </Col>
              ))}
          </Row>
          <Col md={12}>
            <div className="card venue-map p-3">
              <div className="card-body">
                <VenueMap address={address} />
              </div>
            </div>
          </Col>
        </Col>
      </Row>
    </div>
  );
};
export default VenueDetails;
