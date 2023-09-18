import React from "react";
import {Row} from "react-bootstrap";

const Map = () => {
  return (
    <Row className={"w-100"}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14144.188403126569!2d-48.525210576196265!3d-27.592069307892086!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbr!4v1689005911283!5m2!1sen!2sbr"
        width="600"
        height="450"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </Row>
  );
};

export default Map;
