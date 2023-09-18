import React, { useEffect, useState } from 'react';
import { Collection, useTheme, View } from '@aws-amplify/ui-react';
import { DataStore } from '@aws-amplify/datastore';
import { Event as EventModel } from '../../../../../../models';
import { Storage } from '@aws-amplify/storage';
import { Col, Container, Row } from 'react-bootstrap';
import { LongCard } from '../../../../../../ui-components';
import { useNavigate } from 'react-router-dom';
import '../style.scss';

// Custom hook for fetching image
const useImage = (imageKey, options) => {
    const [imageUrl, setImageUrl] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const url = await Storage.get(imageKey, options);
                setImageUrl(url);
            } catch {
                setError(true);
            }
        };
        fetchImage();
    }, [imageKey, options]);

    return { imageUrl, error };
};

// Custom hook for fetching events
const useEvents = () => {
    const [events, setEvents] = useState([]);
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const models = await DataStore.query(EventModel);
                setEvents(models);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };
        fetchEvents();
    }, []);
    return events;
};
// Image card component
const ImageCard = ({ event }) => {
    const { tokens } = useTheme();
    const navigate = useNavigate();
    const { imageUrl, error } = useImage(event.image, { level: 'public' });

    if (!imageUrl) {
        return <span>{error ? 'Error loading image' : 'Loading...'}</span>;
    }

    return (
        <Col className="mb-4 d-flex justify-content-center align-items-center" xs={12} xl={12}>
            <LongCard
                event={event}
                width="100%"
                wrap="wrap"
                display="flex"
                flex={{
                    justifyContent: "flex-start",
                    alignItems: "stretch",
                    alignContent: "flex-start",
                    wrap: "nowrap",
                    gap: "1rem",
                }}
                responsive={{
                    base: { width: "100%" },
                    md: { width: "50%" },
                    xl: { width: "33.33%" },
                }}
                overrides={{
                    "CTA Button": {
                        onClick: () => navigate(`/events/${event.id}`, { replace: true }),
                        type: "button"
                    },
                    image: { src: imageUrl, class:"card-img-top" },
                }}
            />
        </Col>
    );
};

// EventList component
const EventList = () => {
    const events = useEvents();
    const { tokens } = useTheme();

    return (
        <View>
            <Container fluid>
                <Collection
                    type="list"
                    items={events}
                    gap={tokens.space.xxl}
                    isPaginated
                    isSearchable
                    maxWidth="100%"
                >
                    {(event) => (
                        <Row className="justify-content-center" key={event.id}>
                            <ImageCard event={event} />
                        </Row>
                    )}
                </Collection>
            </Container>
        </View>
    );
};

export default EventList;
