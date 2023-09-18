import React, {memo} from 'react';
import {Card, Col, Row} from "react-bootstrap";
import AmplifyImage from "./AmplifyImage";

const PhotoGallery = memo(({ photos }) => {
    if (!photos || photos.length === 0) {
        return null;
    }

    return (
        <Row className="venue-photos ">
            {photos.map((photo, index) => (
                <Col md={4} key={index}>
                    <Card className="mb-4 shadow-sm h-75">
                        <AmplifyImage
                            imageKey={photo}
                            options={{ level: "public" }}
                            altText="Venue Photo"
                        />
                    </Card>
                </Col>
            ))}
        </Row>
    );
});

export default PhotoGallery;
