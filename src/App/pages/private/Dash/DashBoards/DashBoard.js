import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync } from "@fortawesome/free-solid-svg-icons";
import CardSwiper from "./components/CardSwiper/CardSwiper";
import TransactionTable from "./components/Table/TransactionTable";
import Graph from "./components/Graph/Graph";
import { CARDS_DATA, transactions } from "./constants";

const Dashboard = () => {
  return (
    <main className="g-sidenav-show bg-gray-100">
      <Container
        fluid
        className="main-content position-relative max-height-vh-100 h-100 border-radius-lg p-0"
      >
        <div className="mb-3 mx-3 d-md-flex align-items-center">
          <div className="mb-md-0 mb-3">
            <h3 className="font-weight-bold mb-0">Hello, Noah</h3>
            <p className="mb-0">Apps you might like!</p>
          </div>
          <div className="d-flex ms-auto">
            <button className="btn btn-sm btn-white btn-icon d-flex align-items-center me-2">
              <span className="btn-inner--icon">
                <span className="p-1 bg-success rounded-circle d-flex ms-auto me-2">
                  <span className="visually-hidden">New</span>
                </span>
              </span>
              <span className="btn-inner--text">Messages</span>
            </button>
            <button className="btn btn-sm btn-dark btn-icon d-flex align-items-center">
              <span className="btn-inner--icon">
                <FontAwesomeIcon icon={faSync} className="me-2" />
              </span>
              <span className="btn-inner--text">Sync</span>
            </button>
          </div>
        </div>
        <hr className="my-0" />
        <Row>
          <Col xs={12} className="position-relative overflow-hidden">
            <CardSwiper data={CARDS_DATA} />
          </Col>
        </Row>
        <Row className="my-4">
          <GraphSection />
          <TransactionTableSection />
        </Row>
      </Container>
    </main>
  );
};

const GraphSection = () => (
  <div className="col-lg-4 col-md-6 mb-md-0 mb-4">
    <Graph data={transactions} />
  </div>
);

const TransactionTableSection = () => (
  <Col className="col-lg-8 col-md-6">
    <TransactionTable data={transactions} />
  </Col>
);

export default Dashboard;
