import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Card from "../components/Card";
import CardSwiper from "../components/CardSwiper/CardSwiper";
import { CARDS_DATA, MAIN_CONTENT_DATA, transactions } from "../constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync } from "@fortawesome/free-solid-svg-icons";
import TransactionTable from "../components/Table/TransactionTable";
import Graph from "../components/Graph/Graph";

const withButton = (Component, text) => {
  return (props) => (
      <button className="btn btn-sm btn-white btn-icon d-flex align-items-center me-2">
      <span className="btn-inner--icon">
        <span className="p-1 bg-success rounded-circle d-flex ms-auto me-2">
          <span className="visually-hidden">New</span>
        </span>
      </span>
        <span className="btn-inner--text">{text}</span>
        <Component {...props} />
      </button>
  );
};

const MessagesButton = withButton(FontAwesomeIcon, { icon: faSync, className: "me-2" })("Messages");

const Dashboard = () => {
  return (
      <main className="g-sidenav-show bg-gray-100">
        <Container fluid className="main-content position-relative max-height-vh-100 h-100 border-radius-lg p-0">
          <div className="mb-3 mx-3 d-md-flex align-items-center">
            <div className="mb-md-0 mb-3">
              <h3 className="font-weight-bold mb-0">Hello, Noah</h3>
              <p className="mb-0">Apps you might like!</p>
            </div>
            <div className="d-flex ms-auto">
              <MessagesButton />
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
          <Row>
            <Col md={6}>
              <Card title="Main Content" data={MAIN_CONTENT_DATA} className="h-100" />
            </Col>
          </Row>
          <Row>
            <Col className={"col-lg-4 col-md-3"}>
              <Graph data={transactions} />
            </Col>
            <Col className={"col-lg-8 col-md-6"}>
              <TransactionTable data={transactions} />
            </Col>
          </Row>
        </Container>
      </main>
  );
};

export default Dashboard;
