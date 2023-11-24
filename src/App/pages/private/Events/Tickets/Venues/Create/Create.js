import React, { useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { VenueCreateForm } from "../../../../../../../ui-components";

const CreateVenue = (props) => {
  const [imgPath, setImgPath] = useState();
  console.log({ imgPath });
  return (
    <Container className="create-event">
      <Row className="justify-content-md-center">
        <Col xs={12} md={8}>
          <Card className="card mt-5">
            <Card.Header as="h2" className="text-center">
              Create New Venue
            </Card.Header>
            <Card.Body>
              <VenueCreateForm />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateVenue;
