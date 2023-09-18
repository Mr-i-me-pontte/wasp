import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { EventShowPage } from '../../../../../../ui-components';
import '../style.scss'
const MyComponent = () => {
    return (
        <Container>
            <Row>
                <Col className="my-4">
                    <div className="event-showpage-container">
                        <EventShowPage />
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default MyComponent;
