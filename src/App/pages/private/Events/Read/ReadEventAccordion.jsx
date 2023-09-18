import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DataStore } from "@aws-amplify/datastore";
import { Event, Venue } from "../../../../../models";
import { Button, Card, Col, Container, Row, Spinner, Accordion } from "react-bootstrap";
import { BsTicket } from "react-icons/bs";
import AmplifyImage from "./components/AmplifyImage";
import { ErrorModal } from "./components/Modals/Modals";
import Map from "./components/Map";
import { toast, ToastContainer } from "react-toastify";
import { motion } from "framer-motion";
import "./style.scss";
import PurchaseModal from "./sections/PurchaseModal";
import PhotoGallery from "./components/PhotoGallery";
import InfoCard from "./components/InfoCard";

const EventDetails = ({ event, onBuyTickets }) => {
  const { title, image, startDate, endDate, totalAvailableTickets, description } = event;

  return (
    <div className="event-details">
      <h1 className="event-title">{title}</h1>
      <Row className="my-4">
        <Col md={6}>
          <Card className="shadow-sm h-75">
            <AmplifyImage imageKey={image} options={{ level: "public" }} altText={title} />
          </Card>
        </Col>
        <Col md={6}>
          <InfoCard
            title="Event Details"
            details={[
              { label: "Start Date", value: startDate },
              { label: "End Date", value: endDate },
              { label: "Total Available Tickets", value: totalAvailableTickets },
            ]}
            subtitle={description}
          />
          <Row>
            <Col>
              <Button variant="primary" size="lg" className="buy-ticket-btn" onClick={onBuyTickets}>
                <BsTicket className="mr-2" />
                Buy Tickets
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

const TicketTypeCard = ({ ticketType }) => {
  const { name, price } = ticketType;

  return (
    <Col md={6}>
      <Card className="ticket-card">
        <Card.Body>
          <h4>{name}</h4>
          <p className="ticket-price">Price: ${price}</p>
        </Card.Body>
      </Card>
    </Col>
  );
};

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
      setEvent(eventModel);
      const tt = await eventModel?.TicketTypes?.toArray();
      setTicketTypes(tt || []);

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
    return (
      <div className="loading-container">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return <ErrorModal onHideError={() => setError(null)} />;
  }

  return (
    <Container className="event-show-container">
      <Row>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <EventDetails event={event} onBuyTickets={handleBuyTickets} />
        </motion.div>
      </Row>
      <Row>
        <Accordion>
          <Accordion.Item eventKey="tickets" key="tickets">
            <Accordion.Header>Tickets</Accordion.Header>
            <Accordion.Body>
              <Row>
                {ticketTypes.map((ticketType) => (
                  <TicketTypeCard key={ticketType.id} ticketType={ticketType} />
                ))}
              </Row>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Row>
      <Row>
        <Accordion>
          <Accordion.Item eventKey="venue" key="venue">
            <Accordion.Header>Venue</Accordion.Header>
            <Accordion.Body>
              {venue && <VenueDetails venue={venue} />}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Row>
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

export default EventShow;
