import React from "react";
import { Card, Col } from "react-bootstrap";

const TicketTypeCard = ({ ticketType }) => {
    const { name, price } = ticketType;

    return (
        <Col md={6}>
            <Card className="ticket-card">
                <Card.Body>
                    <h4>{name}</h4>
                    <p className="ticket-price">Price: ${price}</p>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default TicketTypeCard;
