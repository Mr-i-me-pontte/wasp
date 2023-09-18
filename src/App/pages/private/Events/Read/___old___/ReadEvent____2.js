import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DataStore } from "@aws-amplify/datastore";
import { Event, Venue } from "../../../../../../models";
import { Storage } from "@aws-amplify/storage";
import { Button, Col, Container, Modal, Row, Spinner } from "react-bootstrap";
import { BsTicket } from "react-icons/bs";
import { GoogleMap, Marker } from "@react-google-maps/api";
import "../style.scss";

const AmplifyImage = ({ imageKey, options, altText }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const url = await Storage.get(imageKey, options);
        setImageUrl(url);
      } catch (error) {
        console.error("Error retrieving image from storage:", error);
        setError(true);
      }
    };

    fetchImage();
  }, [imageKey, options]);

  if (error || !imageUrl) {
    return <span>Error loading image</span>;
  }

  return <img src={imageUrl} alt={altText} className="card-img-top" />;
};

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

const EventImage = ({ image, altText }) => (
    <AmplifyImage
        imageKey={image}
        options={{ level: "public" }}
        altText={altText}
    />
);

const EventDetailItem = ({ label, value }) => (
    <li>
      <strong>{label}:</strong> {value}
    </li>
);

const EventDetails = ({ event, venue }) => {
  if (!event || !venue) {
    return null;
  }

  const {
    title,
    description,
    startDate,
    endDate,
    image,
    totalAvailableTickets,
  } = event;
  const { name, photos, Address, contactInfo, website } = venue;

  const address = Address || {};

  return (
      <div className="event-details">
        <h1 className="event-title">{title}</h1>
        <Row className="my-4">
          <Col md={6}>
            <EventImage image={image} altText={title} />
          </Col>
          <Col md={6}>
            <div className="card event-description p-3">
              <h5 className="my-3">Event Description</h5>
              <p>{description}</p>
              <h5 className="my-3">Event Details</h5>
              <ul className="list-unstyled">
                <EventDetailItem label="Start Date" value={startDate} />
                <EventDetailItem label="End Date" value={endDate} />
                <EventDetailItem
                    label="Total Available Tickets"
                    value={totalAvailableTickets}
                />
                <EventDetailItem label="Venue" value={name} />
              </ul>
            </div>
            <Row>
              <Col>
                <Button variant="primary" size="lg" className="buy-ticket-btn">
                  <BsTicket className="mr-2" />
                  Buy Tickets
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>

        <VenueDetails venue={venue} />
      </div>
  );
};

const EventShow = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [venue, setVenue] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventModel = await DataStore.query(Event, eventId);
        setEvent(eventModel);

        if (eventModel?.venueID) {
          const venueModel = await DataStore.query(Venue, eventModel.venueID);
          setVenue(venueModel);
        }
      } catch (error) {
        console.error("Error fetching event or venue:", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [eventId]);

  const hideErrorModal = () => {
    setError(null);
  };

  if (isLoading) {
    return (
        <Container className="event-show-container">
          <Modal centered show>
            <Modal.Body>
              <Spinner animation="border" role="status" />
              <p>Loading...</p>
            </Modal.Body>
          </Modal>
        </Container>
    );
  }

  if (error) {
    return (
        <Container className="event-show-container">
          <Modal centered show onHide={hideErrorModal}>
            <Modal.Header closeButton>
              <Modal.Title>Error</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="alert alert-danger">
                Error loading event or venue. Please try again later.
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={hideErrorModal}>
                Close            </Button>
            </Modal.Footer>
          </Modal>
        </Container>
    );
  }

  return (
      <Container className="event-show-container">
        <EventDetails event={event} venue={venue} />
      </Container>
  );
};

export default EventShow;
