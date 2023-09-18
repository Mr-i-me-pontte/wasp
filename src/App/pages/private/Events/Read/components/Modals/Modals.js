import {Alert, Button, Container, Modal, Spinner} from "react-bootstrap";
import React from "react";
import "./style.scss";

const LoadingModal = () => (
    <Container className="event-show-container">
        <Modal centered show>
            <Modal.Body>
                <Spinner animation="border" role="status"/>
                <p>Loading...</p>
            </Modal.Body>
        </Modal>
    </Container>
);

const ErrorModal = ({onHide}) => (
    <Container className="event-show-container">
        <Modal centered show onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Error</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Alert variant="danger">
                    Error loading event or venue. Please try again later.
                </Alert>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    </Container>
);

export {LoadingModal, ErrorModal};
