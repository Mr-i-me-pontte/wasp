import React from "react";
import { Col } from "react-bootstrap";
import LongCard from "../../../ui-components/LongCard";

const ImageCard = ({ event, handleCardClick, imageUrl }) => {
  return (
    <Col
      className="mb-4 d-flex justify-content-center align-items-center"
      xs={12}
      xl={12}
    >
      <LongCard
        event={event}
        width="100%"
        wrap="wrap"
        display="flex"
        flex={{
          justifyContent: "flex-start",
          alignItems: "stretch",
          alignContent: "flex-start",
          wrap: "nowrap",
          gap: "1rem",
        }}
        responsive={{
          base: { width: "100%" },
          md: { width: "50%" },
          xl: { width: "33.33%" },
        }}
        overrides={{
          "CTA Button": {
            onClick: handleCardClick,
            type: "button",
          },
          image: { src: imageUrl, class: "card-img-top" },
        }}
      />
    </Col>
  );
};

export default ImageCard;
