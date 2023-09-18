import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { DataStore } from "@aws-amplify/datastore";
import { Event, Venue } from "../../../../../../models";
import { Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { BsTicket } from "react-icons/bs";
import "../style.scss";
import { AmplifyImage } from "../helper";
import { ErrorModal } from "../components/Modals/Modals";
import Map from "../components/Map";
import {InfoCard, PhotoGallery} from "../components";
// A single function to load all data
const useFetchData = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [venue, setVenue] = useState(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const eventModel = await DataStore.query(Event, eventId);
      setEvent(eventModel);

      if (eventModel?.venueID) {
        const venueModel = await DataStore.query(Venue, eventModel.venueID);
        setVenue(venueModel);
      }
    } catch (error) {
      setError("There was an error loading data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [eventId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const hideErrorModal = () => {
    setError(null);
  };

  return { isLoading, error, event, venue, hideErrorModal };
};

// Individual components for each part of the page
const EventSection = ({ event }) => {
  const eventDetails = useMemo(
    () => [
      { label: "Start Date", value: event?.startDate },
      { label: "End Date", value: event?.endDate },
      { label: "Total Available Tickets", value: event?.totalAvailableTickets },
    ],
    [event]
  );

  if (!event) {
    return null;
  }

  return (
    <div className="event-details">
      <h1 className="event-title">{event.title}</h1>
      <Row className="my-4">
        <Col md={6}>
          <AmplifyImage
            imageKey={event.image}
            options={{ level: "public" }}
            altText={event.title}
          />
        </Col>
        <Col md={6}>
          <InfoCard
            title="Event Details"
            details={eventDetails}
            subtitle={event.description}
          />
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
    </div>
  );
};

const VenueSection = ({ venue }) => {
  const venueDetails = useMemo(
    () => [
      { label: "Name", value: venue?.name },
      { label: "Description", value: venue?.description },
      {
        label: "Address",
        value: `${venue?.Address.street}, ${venue?.Address.city}, ${venue?.Address.state}, ${venue?.Address.country}, ${venue?.Address.postalCode}`,
      },
      { label: "Contact", value: venue?.contactInfo },
      ...(venue?.website
        ? [
            {
              label: "Website",
              value: (
                <a href={venue?.website} target="_blank" rel="noreferrer">
                  Visit Website
                </a>
              ),
            },
          ]
        : []),
    ],
    [venue]
  );

  if (!venue) {
    return null;
  }

  return (
    <div className="sidebar-container">
      <h3 className="my-4">Venue Details</h3>
      <Row className="mb-4">
        <Col md={6}>
          <InfoCard title="Venue Details" details={venueDetails} />
        </Col>
        <Col md={6}>
          <PhotoGallery photos={venue.photos} />
        </Col>
      </Row>
      <Card className="card mb-4 shadow-sm">
        <Card.Body>
          <Map id="venueMap" address={venue.Address} />
        </Card.Body>
      </Card>
    </div>
  );
};

const EventShow = () => {
  const { isLoading, error, event, venue, hideErrorModal } = useFetchData();

  if (isLoading) {
    return <Spinner animation="border" variant="primary" />;
  }

  if (error) {
    return <ErrorModal onHideError={hideErrorModal} />;
  }

  return (
    <Container className="event-show-container">
      <EventSection event={event} />
      <VenueSection venue={venue} />
    </Container>
  );
};

export default EventShow;
