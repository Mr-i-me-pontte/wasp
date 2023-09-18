import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DataStore } from "@aws-amplify/datastore";
import { Event, Venue } from "../../../../../models";
import { Container, Row, Spinner } from "react-bootstrap";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import PurchaseModal from "./sections/PurchaseModal";
import { ErrorModal } from "./components/Modals/Modals";
import EventDetails from "./sections/EventDetails";
import TicketTypeCard from "./sections/TicketTypeCard";
import VenueDetails from "./sections/VenueDetails";
import "./style.scss";
const checkMetamaskConnection=()=>window.ethereum && window.ethereum.isConnected()
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
    // const connectced = checkMetamaskConnection()
    const connectced = true
    if (connectced) {
      setShowModal(true);
    } else {
      toast.error("Please log in to MetaMask first.");
    }
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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <EventDetails event={event} onBuyTickets={handleBuyTickets} />
        </motion.div>
      </Row>
      <Row>
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
        isLoading={isLoading}
      />
      <ToastContainer />
    </Container>
  );
};

export default EventShow;
