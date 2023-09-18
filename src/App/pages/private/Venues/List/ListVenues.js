import React from "react";
import { VenuesCollection } from "../../../../../ui-components";
import { Card, Col, Container, Row } from "react-bootstrap";

const Listvenues = () => {
  return (
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={8}>
            <Card className="my-5">
              <Card.Body>
                <Card.Title className="text-center mb-4">
                  List Venues
                </Card.Title>
                <VenuesCollection />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
  );
};

export default Listvenues;
