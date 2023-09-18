import React, {useEffect, useState} from "react";
import {Button, Col, Container, Image, Row} from "react-bootstrap";
import {Collection, useTheme, View,} from "@aws-amplify/ui-react";
import {useEvents} from "./hooks";
import ImageCard from "../../../../components/ImageCard/ImageCard";
import "./style.scss";
import {useNavigate} from "react-router-dom";
import {Storage} from "@aws-amplify/storage";

const heroImage =
    "https://www.ledgerinsights.com/wp-content/uploads/2022/08/nft-ticket-810x524.jpg";
const EventCard = ({event}) => {
    const [imageUrl, setImageUrl] = useState(null);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const url = await Storage.get(event.image, {level: "public"});
                setImageUrl(url);
            } catch (error) {
                setError(true);
            }
        };
        fetchImage();
    }, [event.image]);

    if (!imageUrl) {
        return <span>{error ? "Error loading image" : "Loading..."}</span>;
    }
    const handleCardClick = () => {
        navigate(`/events/${event.id}`);
    };

    return (
        <Row className="justify-content-center" key={event.id}>
            <ImageCard
                handleCardClick={handleCardClick}
                event={event}
                imageUrl={imageUrl}
            />
        </Row>
    );
};

const List = () => {
    return (
        <>
            <section className="ticket-hero">
                <Container>
                    <Row className="ticket-hero-row align-items-center">
                        <Col md={6}>
                            <h1 className="ticket-hero-title">
                                Find the best tickets for your favorite events!
                            </h1>
                            <p className="ticket-hero-description">
                                TicketMaster has the largest selection of tickets for concerts,
                                sports, theater, and more.
                            </p>
                            <Button variant="primary" size="lg" className="ticket-hero-btn">
                                Browse Tickets
                            </Button>
                        </Col>
                        <Col md={6}>
                            <Image
                                src={heroImage}
                                fluid
                                className="ticket-hero-image"
                                alt="Hero Image"
                            />
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className="ticket-content my-5">
                <Container>
                    <Row>
                        <Col xs={12} md={10} lg={8} className="mx-auto">
                            <EventList />
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
};

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
                    {(event) => <EventCard event={event} />}
                </Collection>
            </Container>
        </View>
    );
};

export default List;
