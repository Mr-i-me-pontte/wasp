import React, { memo } from "react";
import { Card } from "react-bootstrap";

const InfoCard = memo(({ title, subtitle, details, footer }) => (
  <Card className="mb-4 shadow-sm h-75">
    <Card.Header>
      <Card.Title>{title}</Card.Title>
      {subtitle && (
        <Card.Subtitle className="mb-2 text-muted">{subtitle}</Card.Subtitle>
      )}
    </Card.Header>
    <Card.Body>
      <ul className="list-unstyled px-3 mb-0">
        {details.map(({ label, value }) => (
          <li key={label}>
            <strong>{label}:</strong>
            {value}
          </li>
        ))}
      </ul>
    </Card.Body>
    {footer && <Card.Footer>{footer}</Card.Footer>}
  </Card>
));

export default InfoCard;
