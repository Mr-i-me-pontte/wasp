import React, { useState } from "react";
import { Col, Container, Row, Spinner, Alert, Button, Card } from "react-bootstrap";
import { NewForm1, VenueCreateForm } from "../../../../../ui-components";
import "./styles.scss";

const LoadingSpinner = () => (
    <div className="d-flex justify-content-center align-items-center" style={{height: "100vh"}}>
        <Spinner animation="border" />
    </div>
);

const MessageAlert = ({ type, content }) => (
    <Alert variant={type}>
        {content}
    </Alert>
);

const FormCard = ({ title, subTitle, children, isEditing, onToggleEditing }) => (
    <Card className="mb-4">
        <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{subTitle}</Card.Subtitle>
            {children}
            <div className="text-center mt-3">
                <Button variant={isEditing ? "danger" : "primary"} onClick={onToggleEditing}>
                    {isEditing ? "Finalize Details" : "Edit Venue Details"}
                </Button>
            </div>
        </Card.Body>
    </Card>
);

const CreateItem = ({ title, subTitle, mainForm: MainFormComponent, nestedForm: NestedFormComponent }) => {
    const [formState, setFormState] = useState({
        isEditing: false,
        loading: false,
        message: { type: null, content: null },
    });

    const toggleEditing = () => {
        setFormState((prevState) => ({
            ...prevState,
            isEditing: !prevState.isEditing,
        }));
    };

    const { isEditing, loading, message } = formState;

    return (
        <Container fluid className="create-item-container">
            {loading && <LoadingSpinner />}
            {message.type && <MessageAlert type={message.type} content={message.content} />}
            <Row className="justify-content-center">
                <Col xs={12} md={8} lg={6}>
                    <FormCard title={title} subTitle={subTitle} isEditing={isEditing} onToggleEditing={toggleEditing}>
                        {!isEditing && <MainFormComponent />}
                    </FormCard>
                </Col>
            </Row>
            {isEditing && (
                <Row className="justify-content-center">
                    <Col xs={12} md={8} lg={6}>
                        <Card>
                            <Card.Body>
                                <NestedFormComponent />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            )}
        </Container>
    );
};

const CreateItemPage = () => {
    return (
        <CreateItem
            title="Create a new venue"
            subTitle="Fill out the form below to create a new venue."
            mainForm={NewForm1}
            nestedForm={VenueCreateForm}
        />
    );
};

export default CreateItemPage;
