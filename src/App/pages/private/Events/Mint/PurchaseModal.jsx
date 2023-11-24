import React, { useState } from "react";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { DataStore } from "@aws-amplify/datastore";
import {Order, Ticket} from "../../../../../models";

const mintNft = async () => {
  return new Promise((resolve) => {
    // Simulate a delay to mimic payment processing time
    setTimeout(() => {
      // Simulate a successful payment
      const success = Math.random() < 0.8; // 80% success rate
      const paymentResult = {
        success,
        error: success ? null : "Payment failed",
      };

      resolve(paymentResult);
    }, 2000);
  });
};

const PurchaseModal = ({
  show,
  onHide,
  ticketCount,
  setTicketCount,
  ticketTypes,
}) => {
  const [ticketType, setTicketType] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const ticketPrices = ticketTypes.reduce(
    (prices, { id, price }) => ({ ...prices, [id]: price }),
    {}
  );

  const handleTicketTypeChange = (e) => {
    setTicketType(e.target.value);
  };

  const total = ticketCount * ticketPrices[ticketType];

  const handlePurchase = async () => {
    setIsLoading(true);

    try {
      // Simulate blockchain payment processing
      const paymentResult = await mintNft();

      // Check payment result
      if (paymentResult.success) {
        // Payment succeeded
        const createdOrder = await DataStore.save(
            new Order({
              totalAmount: total,
              status: "PENDING",
            })
        );

        // Create a ticket associated with the order
        const createdTicket = await DataStore.save(
            new Ticket({
              createdAt: new Date().toISOString(),
              price: ticketPrices[ticketType],
              seat: "",
              status: "AVAILABLE",
              orderID: createdOrder.id,
              Order: createdOrder,
            })
        );

        // Perform additional actions related to the ticket creation
        // For example: Assign a seat, update ticket availability, etc.

        // Update the order status to COMPLETED
        const updatedOrder = await DataStore.save(
            Order.copyOf(createdOrder, (updated) => {
              updated.status = "COMPLETED";
            })
        );

        setIsLoading(false);
        onHide();
        setTicketCount(1);
      } else {
        // Payment failed
        throw new Error(paymentResult.error);
      }
    } catch (error) {
      console.error("Error creating order:", error);
      setIsLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Purchase Tickets</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formTicketType">
            <Form.Label>Ticket Type</Form.Label>
            <Form.Control
              as="select"
              value={ticketType}
              onChange={handleTicketTypeChange}
            >
              <option value="">Select a ticket type</option>
              {ticketTypes.map(({ id, name, price }) => (
                <option value={id} key={id}>
                  {name} - ${price}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formTicketCount">
            <Form.Label>Number of Tickets</Form.Label>
            <Form.Control
              type="number"
              value={ticketCount}
              onChange={(e) => setTicketCount(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <div>Total: ${total}</div>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={handlePurchase}
          disabled={isLoading || !ticketType}
        >
          {isLoading ? <Spinner animation="border" size="sm" /> : "Purchase"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PurchaseModal;
