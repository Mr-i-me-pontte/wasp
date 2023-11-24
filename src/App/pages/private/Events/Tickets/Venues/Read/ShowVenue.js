import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Image, Button, Card } from 'react-bootstrap';
import { DataStore } from '@aws-amplify/datastore';
import { Venue } from '../../../../../../../models';
import { BookingInfo } from './components';
import { Storage } from '@aws-amplify/storage';

import './styles.scss';

const getImageUrl = async (imageKey, options) => {
  try {
    return await Storage.get(imageKey, options);
  } catch (error) {
    console.error('Error retrieving image from storage:', error);
  }
};

const AmplifyImage = ({ imageKey, options }) => {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    getImageUrl(imageKey, options).then(setImageUrl);
  }, [imageKey, options]);

  return <Image src={imageUrl} alt="Amplify Image" fluid thumbnail />;
};

const PhotoGallery = ({ photos }) => {
  if (!photos?.length) return null;

  return (
      <section>
        <h2 className="section-title">Photos and Virtual Tour</h2>
        <Row>
          {photos.map((photo, index) => (
              <Col key={index} md={4}>
                <AmplifyImage imageKey={photo} options={{ level: 'public' }} />
              </Col>
          ))}
        </Row>
      </section>
  );
};

const fetchVenueData = async id => {
  try {
    return await DataStore.query(Venue, id);
  } catch (error) {
    console.error('Error fetching venue data:', error);
  }
};

const VenuePage = () => {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchVenueData(id).then(data => {
      setVenue(data);
      setIsLoading(false);
    });
  }, [id]);

  if (isLoading) return <div>Loading...</div>;

  const { photos, name, Address, description, Events, email, phone } = venue;

  return (
      <Container className="venue-page">
        <Row>
          <Col md={6}>
            <AmplifyImage imageKey={photos?.[0]} options={{ level: 'public' }} />
          </Col>
          <Col md={6}>
            <VenueDescription name={name} address={Address} description={description} />
          </Col>
        </Row>
        <PhotoGallery photos={photos} />
        <EventSpaces events={Events} />
        <ServicesAndPackages />
        <BookingInfo />
        <ContactInformation email={email} phone={phone} />
      </Container>
  );
};

const VenueDescription = ({ name, address, description }) => (
    <>
      <h1 className="venue-name">{name}</h1>
      <p className="venue-address">{`${address.street}, ${address.city}, ${address.state}, ${address.country}`}</p>
      <p className="venue-description">{description}</p>
      <h2 className="section-title">Amenities</h2>
      <ul className="amenities-list">
        <li>Parking</li>
        <li>Wi-Fi</li>
        <li>Catering options</li>
      </ul>
      <Button variant="primary" href="#" className="virtual-tour-btn">
        Virtual Tour
      </Button>
    </>
);

const EventSpaces = ({ events }) => (
    <section>
      <h2 className="section-title">Event Spaces</h2>
      {events?.length > 0 &&
          events.map((event) => (
              <Card key={event.id} className="event-card">
                <Card.Img variant="top" src={event.image} fluid />
                <Card.Body>
                  <Card.Title>{event.title}</Card.Title>
                  <Card.Text>Capacity: {event.totalAvailableTickets} guests</Card.Text>
                </Card.Body>
              </Card>
          ))}
    </section>
);

const ServicesAndPackages = () => (
    <section>
      <h2 className="section-title">Services and Packages</h2>
      <ServiceList />
      <PackageList />
    </section>
);

const ServiceList = () => (
    <>
      <h3 className="subsection-title">Services</h3>
      <ul className="services-list">
        <li>Catering</li>
        <li>Audiovisual equipment</li>
        <li>Event planning assistance</li>
      </ul>
    </>
);

const PackageList = () => (
    <>
      <h3 className="subsection-title">Packages</h3>
      <PackageCard title="Package 1" description="Description of Package 1" />
      <PackageCard title="Package 2" description="Description of Package 2" />
    </>
);

const PackageCard = ({ title, description }) => (
    <Card className="package-card">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
);

const ContactInformation = ({ email, phone }) => (
    <section>
      <h2 className="section-title">Contact Information</h2>
      <p className="contact-info">Email: {email}</p>
      <p className="contact-info">Phone: {phone}</p>
      {/* Contact form component */}
    </section>
);

export default VenuePage;
