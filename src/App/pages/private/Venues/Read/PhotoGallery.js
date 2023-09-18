import React from 'react';
import { Image, Carousel } from 'react-bootstrap';

const PhotoGallery = ({ photos }) => {
    if (!photos || photos.length === 0) {
        return null;
    }

    return (
        <Carousel>
            {photos.map((photo, index) => (
                <Carousel.Item key={index}>
                    <Image src={photo} alt={`Photo ${index + 1}`} fluid />
                </Carousel.Item>
            ))}
        </Carousel>
    );
};

export default PhotoGallery;
