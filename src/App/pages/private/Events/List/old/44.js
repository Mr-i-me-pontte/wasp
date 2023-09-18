import React from "react";
import {Button, Col, Container, Image, Row} from "react-bootstrap";
import "./styles2.scss";
import {Collection, useBreakpointValue, useTheme, View} from "@aws-amplify/ui-react";
import {LongCard} from '../../../../../../ui-components';
import {useNavigate} from 'react-router-dom';
import '../style.scss';
import {useEvents, useImage} from "../hooks";

// Image card component
const ImageCard = ({event}) => {
    const {tokens} = useTheme();
    const navigate = useNavigate();
    const {imageUrl, error} = useImage(event.image, {level: 'public'});

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
                    base: {width: "100%"},
                    md: {width: "50%"},
                    xl: {width: "33.33%"},
                }}
                overrides={{
                    "CTA Button": {
                        onClick: () => navigate(`/events/${event.id}`, {replace: true}),
                        type: "button"
                    },
                    image: {src: imageUrl, class: "card-img-top"},
                }}
            />
        </Col>
    );
};

// EventList component
const EventList = () => {
    const events = useEvents();
    const {tokens} = useTheme();

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
                            <ImageCard event={event}/>
                        </Row>
                    )}
                </Collection>
            </Container>
        </View>
    );
};


const heroImage =
    "https://www.ledgerinsights.com/wp-content/uploads/2022/08/nft-ticket-810x524.jpg";

const List = () => {
    const isSmallScreen = useBreakpointValue({base: true, md: false});
    const cardsPerRow = useBreakpointValue({base: 1, md: 2, lg: 3});

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
                            <EventList/>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
};

export default List;
