import React, { useEffect, useState } from "react";
import { Collection } from "@aws-amplify/ui-react";
import { DataStore } from "@aws-amplify/datastore";
import { Event } from "../../../../../../models";
import { Storage } from "@aws-amplify/storage";
import { Col, Container, Image, Row } from "react-bootstrap";
import {ReviewCard} from "../../../../../../ui-components";

const AmplifyImage = ({ imageKey, options, altText }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const url = await Storage.get(imageKey, options);
        setImageUrl(url);
      } catch (error) {
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

const EventCollection = (events) => {
  return(
      <Collection type="list" items={events} gap="1.5rem">
        {(event) => (
            <Row key={event.id}>
              {console.log({ event })}
              <Col>
                <ReviewCard event={event}/>

              </Col>
            </Row>
        )}
      </Collection>

  )
}
const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const models = await DataStore.query(Event);
        setEvents(models);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);
  const fetchImage = async (imageKey) => {
    try {
     return  await Storage.get(imageKey, {level:'public'});
    } catch (error) {
    }
  };
  return (
    <Container>
      {events.map((event) => (
        <Row key={event.id}>
          <Col>
            <Image src={event.image} className="img-fluid" alt="" />
            <div>{event.image}</div>
          </Col>
        </Row>
      ))}
    </Container>
  );
};

export default EventList;
