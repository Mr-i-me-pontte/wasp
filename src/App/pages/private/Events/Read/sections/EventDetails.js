import React from "react";
import { Card, Col, Row, Button } from "react-bootstrap";
import { BsTicket } from "react-icons/bs";
import AmplifyImage from "../components/AmplifyImage";
import InfoCard from "../components/InfoCard";

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

export default EventDetails;
