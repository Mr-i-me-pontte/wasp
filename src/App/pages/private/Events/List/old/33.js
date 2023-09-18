import React, { useEffect, useState } from "react";
import { Collection, useTheme, View } from "@aws-amplify/ui-react";
import { DataStore } from "@aws-amplify/datastore";
import { Event } from "../../../../../../models";
import { Storage } from "@aws-amplify/storage";
import { Col, Container, Image, Row } from "react-bootstrap";
import { LongCard, ReviewCard } from "../../../../../../ui-components";
import { useNavigate } from "react-router-dom";

const useImage = (imageKey, options) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const url = await Storage.get(imageKey, options);
        setImageUrl(url);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, [imageKey, options]);

  return { imageUrl, loading, error };
};

const ImageCard = ({ event, imageKey, options }) => {
  const { imageUrl, loading, error } = useImage(imageKey, options);
  const { tokens } = useTheme();
  const navigate = useNavigate();

  if (loading) {
    return <span>Loading...</span>;
  }

  if (error || !imageUrl) {
    return <span>Error loading image</span>;
  }

  return (
      <Col md={6} lg={4} xxl={3} className="mb-4">
        <LongCard
            event={event}
            width="100%"
            wrap="wrap"
            display={{ base: "block", lg: "flex" }}
            responsive={true}
            overrides={{
              "CTA Button": {
                onClick: () => navigate("/events/" + event.id, { replace: true }),
              },
              image: { src: imageUrl },
            }}
        />
      </Col>
  );
};

const EventList = () => {
  const [events, setEvents] = useState([]);
  const { tokens } = useTheme();

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

  return (
      <View>
        <Container>
          <Collection
              type="list"
              items={events}
              gap={tokens.space.xxl}
              isPaginated={true}
              isSearchable={true}
              maxWidth="100%"
          >
            {(event) => (
                <Row className={"w-100"}>
                  <ImageCard
                      key={event.id}
                      event={event}
                      imageKey={event.image}
                      options={{ level: "public" }}
                  />
                </Row>
            )}
          </Collection>
        </Container>
      </View>
  );
};

export default EventList;
