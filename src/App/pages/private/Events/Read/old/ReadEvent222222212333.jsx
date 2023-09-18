import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DataStore } from "@aws-amplify/datastore";
import { Event, Venue } from "../../../../../../models";
import { Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { BsTicket } from "react-icons/bs";
import { toast, ToastContainer } from "react-toastify";
import { motion } from "framer-motion";
import {  InfoCard, PhotoGallery } from "../components";
import PurchaseModal from "../sections/PurchaseModal";
import "../style.scss";
// import AmplifyImage from "./components/AmplifyImage";
import {AmplifyImage} from "./helper";
import Map from "../components/Map";
import {ErrorModal} from "../components/Modals/Modals";
const EventShow = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [venue, setVenue] = useState(null);
  const [ticketTypes, setTicketTypes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [ticketCount, setTicketCount] = useState(1);

  useEffect(() => {
    fetchData();
  }, [eventId]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const eventModel = await DataStore.query(Event, eventId);
      const tt = await eventModel.TicketTypes.toArray();
      setEvent(eventModel);
      setTicketTypes(tt);

      if (eventModel?.venueID) {
        const venueModel = await DataStore.query(Venue, eventModel.venueID);
        setVenue(venueModel);
      }
    } catch (error) {
      setError("There was an error loading data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBuyTickets = () => {
    if (window.ethereum && window.ethereum.isConnected()) {
      setShowModal(true);
    } else {
      toast.error("Please log in to MetaMask first.");
    }
  };

  const handlePurchase = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowModal(false);
      setTicketCount(1);
    }, 2000);
  };

  if (isLoading) {
    return <Spinner animation="border" variant="primary" />;
  }

  if (error) {
    return <ErrorModal onHideError={() => setError(null)} />;
  }

  return (
      <Container className="event-show-container">
        <Row className="justify-content-center">
          <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
          >
            <EventDetails event={event} onBuyTickets={handleBuyTickets} />
          </motion.div>
        </Row>
        <Row className="mt-4">
          {ticketTypes.map((ticketType) => (
              <TicketTypeCard key={ticketType.id} ticketType={ticketType} />
          ))}
        </Row>
        {venue && <VenueDetails venue={venue} />}
        <PurchaseModal
            show={showModal}
            onHide={() => setShowModal(false)}
            ticketCount={ticketCount}
            setTicketCount={setTicketCount}
            ticketTypes={ticketTypes}
            onPurchase={handlePurchase}
            isLoading={isLoading}
        />
        <ToastContainer />
      </Container>
  );
};

const EventDetails = ({ event, onBuyTickets }) => (
    <div className="event-details">
      <h1 className="event-title text-center">{event.title}</h1>
      <Row className="my-4">
        <Col md={6} className="d-flex align-items-center justify-content-center">
          <Card className="shadow-sm">
            <AmplifyImage
                imageKey={event.image}
                options={{ level: "public" }}
                altText={event.title}
                className="event-image"
            />
          </Card>
        </Col>
        <Col md={6}>
          <InfoCard
              title="Event Details"
              details={[
                { label: "Start Date", value: event.startDate },
                { label: "End Date", value: event.endDate },
                {
                  label: "Total Available Tickets",
                  value: event.totalAvailableTickets,
                },
              ]}
              subtitle={event.description}
              className="event-info-card"
          />
          <div className="text-center mt-4">
            <Button
                variant="primary"
                size="lg"
                className="buy-ticket-btn"
                onClick={onBuyTickets}
            >
              <BsTicket className="mr-2" />
              Buy Tickets
            </Button>
          </div>
        </Col>
      </Row>
    </div>
);

const TicketTypeCard = ({ ticketType }) => (
    <Col md={4}>
      <Card className="ticket-card">
        <Card.Body>
          <h4>{ticketType.name}</h4>
          <p className="ticket-price">${ticketType.price}</p>
        </Card.Body>
      </Card>
    </Col>
);

const VenueDetails = ({ venue }) => (
    <div className="sidebar-container mt-4">
      <h3 className="venue-heading">Venue Details</h3>
      <Row className="mb-4">
        <Col md={6}>
          <InfoCard title="Venue Details" details={getVenueDetails(venue)} className="venue-info-card" />
        </Col>
        <Col md={6}>
          <PhotoGallery photos={venue.photos} className="venue-photo-gallery" />
        </Col>
      </Row>
      <Card className="card mb-4 shadow-sm">
        <Card.Body>
          <Map id="venueMap" address={venue.Address} className="venue-map" />
        </Card.Body>
      </Card>
    </div>
);

const getVenueDetails = (venue) => {
  const { Address } = venue || {};
  const addressString = Address
      ? `${Address.street}, ${Address.city}, ${Address.state}, ${Address.country}, ${Address.postalCode}`
      : "";

  const details = [
    { label: "Name", value: venue.name },
    { label: "Description", value: venue.description },
    { label: "Address", value: addressString },
    { label: "Contact", value: venue.contactInfo },
  ];

  if (venue.website) {
    details.push(
        <a href={venue.website} target="_blank" rel="noreferrer" className="venue-website-link">
          Visit Website
        </a>
    );
  }

  return details;
};

export default EventShow;
