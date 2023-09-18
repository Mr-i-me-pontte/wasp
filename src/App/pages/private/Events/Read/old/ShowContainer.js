import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DataStore } from "@aws-amplify/datastore";
import { Container, Row, Col, Button } from "react-bootstrap";
import { BsTicket } from "react-icons/bs";
import { AmplifyImage } from "../helper";
import { ErrorModal, LoadingModal } from "../components/Modals/Modals";
import { InfoCard } from "../components";

const fetchData = async (model, id) => {
    const item = await DataStore.query(model, id);
    return item;
};

const ShowContainer = ({ model }) => {
    const { id } = useParams();
    const [modelItem, setModelItem] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        fetchData(model, id)
            .then((item) => {
                setModelItem(item);
            })
            .catch((err) => {
                setError("There was an error loading data. Please try again.");
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [model, id]);

    if (isLoading) {
        return <LoadingModal />;
    }

    if (error) {
        return <ErrorModal message={error} />;
    }

    return (
        <Container className="event-show-container">
            <ModelDetails modelItem={modelItem} />
        </Container>
    );
};

const ModelDetails = ({ modelItem }) => (
    modelItem && (
        <div className="event-details">
            <h1 className="event-title">{modelItem.title}</h1>
            <Row className="my-4">
                <Col md={6}>
                    <AmplifyImage
                        imageKey={modelItem.image}
                        options={{ level: "public" }}
                        altText={modelItem.title}
                    />
                </Col>
                <Col md={6}>
                    <InfoCard
                        title="Event Details"
                        details={modelItem.details}
                        subtitle={modelItem.description}
                    />
                    <BuyTicketsButton />
                </Col>
            </Row>
        </div>
    )
);

const BuyTicketsButton = () => (
    <Row>
        <Col>
            <Button variant="primary" size="lg" className="buy-ticket-btn">
                <BsTicket className="mr-2" />
                Buy Tickets
            </Button>
        </Col>
    </Row>
);

export default ShowContainer;
