import { Badge, Card } from "react-bootstrap";
import React from "react";

const orders = [
  { id: "123456", amount: "$100", status: "Pending", statusColor: "info" },
  { id: "789012", amount: "$200", status: "Completed", statusColor: "success" },
];

const Orders = () => (
  <section className="orders-section">
    <Card>
      <Card.Body>
        <h2>Order History</h2>
        <ul className="list-group">
          {orders.map(({ id, amount, status, statusColor }, index) => (
            <li className="list-group-item" key={index}>
              Order ID: {id}
              <br />
              Total Amount: {amount}
              <br />
              Status: <Badge bg={statusColor}>{status}</Badge>
            </li>
          ))}
        </ul>
      </Card.Body>
    </Card>
  </section>
);
export default Orders;
