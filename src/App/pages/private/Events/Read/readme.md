refactor the code bellow, the goal is to implement a unique layout with premium ux, ui features


```javascript
import React, { memo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DataStore } from "@aws-amplify/datastore";
import { Event, Venue } from "../../../../../models";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { BsTicket } from "react-icons/bs";
import "./style.scss";
import { AmplifyImage } from "./helper";
import { ErrorModal, LoadingModal } from "./components/Modals/Modals";
import Map from "./components/Map";

const PhotoGallery = memo(({ photos }) => {
  if (!photos || photos.length === 0) {
    return null;
  }

  return (
    <Row className="venue-photos">
      {photos.map((photo, index) => (
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
  );
});

const ShowItem = ({ isLoading, error, onHideError, children }) => {
  if (isLoading) {
    return <LoadingModal />;
  }

  if (error) {
    return <ErrorModal onHideError={onHideError} />;
  }

  return <Container className="event-show-container">{children}</Container>;
};

const InfoCard = memo(({ title, subtitle, details }) => (
  <Card className="mb-4 shadow-sm">
    <Card.Header>
      <Card.Title>{title}</Card.Title>
      {subtitle && (
        <Card.Subtitle className="mb-2 text-muted">{subtitle}</Card.Subtitle>
      )}
    </Card.Header>
    <Card.Body>
      <ul className="list-unstyled px-3 mb-0">
        {details.map(({ label, value }) => (
          <li key={label}>
            <strong>{label}:</strong>
            {value}
          </li>
        ))}
      </ul>
    </Card.Body>
  </Card>
));

const EventSection = memo(({ event }) => {
  if (!event) {
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

  const eventDetails = [
    { label: "Start Date", value: startDate },
    { label: "End Date", value: endDate },
    { label: "Total Available Tickets", value: totalAvailableTickets },
  ];

  return (
    <div className="event-details">
      <h1 className="event-title">{title}</h1>
      <Row className="my-4">
        <Col md={6}>
          <AmplifyImage
            imageKey={image}
            options={{ level: "public" }}
            altText={title}
          />
        </Col>
        <Col md={6}>
          <InfoCard
            title="Event Details"
            details={eventDetails}
            subtitle={description}
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
});

const VenueSection = memo(({ venue }) => {
  if (!venue) {
    return null;
  }

  const { name, description, photos, Address, contactInfo, website } = venue;
  const { street, city, state, country, postalCode } = Address || {};

  const venueDetails = [
    { label: "Name", value: name },
    { label: "Description", value: description },
    {
      label: "Address",
      value: `${street}, ${city}, ${state}, ${country}, ${postalCode}`,
    },
    { label: "Contact", value: contactInfo },
    ...(website
      ? [
          {
            label: "Website",
            value: (
              <a href={website} target="_blank" rel="noreferrer">
                Visit Website
              </a>
            ),
          },
        ]
      : []),
  ];

  return (
    <div className="sidebar-container">
      <h3 className="my-4">Venue Details</h3>
      <Row className="mb-4">
        <Col md={6}>
          <InfoCard title="Venue Details" details={venueDetails} />
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
});

const EventShow = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [venue, setVenue] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
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

  return (
    <ShowItem isLoading={isLoading} error={error} onHideError={hideErrorModal}>
      <EventSection event={event} />
      <VenueSection venue={venue} />
    </ShowItem>
  );
};

export default EventShow;
```

```scss
.event-show-container {
  background-color: #f7f7f7;
  padding: 20px;
  border-radius: 4px;
}

.sidebar-container {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.event-details {
  margin-top: 20px;
}

.event-details .event-title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333333;
}

.event-details .event-description {
  padding: 20px;
  background-color: #ffffff;
  border-radius: 5px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.event-details .event-description h3 {
  margin-top: 0;
  font-size: 20px;
  font-weight: bold;
  color: #333333;
}

.event-details .event-description p {
  margin-bottom: 15px;
  color: #666666;
}

.event-details .event-description ul {
  margin-bottom: 15px;
  list-style-type: none;
  padding: 0;
}

.event-details .event-description li {
  margin-bottom: 5px;
  color: #666666;
}

.event-details .buy-ticket-btn {
  margin-top: 20px;
  font-size: 16px;
  padding: 10px 20px;
}

.related-projects {
  margin-top: 40px;
}

.related-projects h3 {
  font-size: 22px;
  font-weight: bold;
  color: #333333;
}

.related-projects .carousel {
  margin-top: 20px;
}

.related-projects .carousel-item {
  text-align: center;
}

.related-projects .carousel-item img {
  max-width: 100%;
  height: auto;
  border-radius: 5px;
}
```
