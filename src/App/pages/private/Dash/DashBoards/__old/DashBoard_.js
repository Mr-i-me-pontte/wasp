import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Card from "../components/Card";
import CardSwiper from "../components/CardSwiper/CardSwiper";
import { MAIN_CONTENT_DATA } from "../constants";

const MainContent = () => {
    return (
        <div className="content">
            <Row>
                {MAIN_CONTENT_DATA.map((data) => (
                    <Col key={data.id} lg={4} className="mb-4">
                        <Card data={data} />
                    </Col>
                ))}
            </Row>
        </div>
    );
};

const Dashboard = () => {
    return (
        <body className="g-sidenav-show bg-gray-100">
        <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
            <Container fluid>
                <Row>
                    <Col md={12}>
                        <div className="d-md-flex align-items-center mb-3 mx-2">
                            <div className="mb-md-0 mb-3">
                                <h3 className="font-weight-bold mb-0">Hello, Noah</h3>
                                <p className="mb-0">Apps you might like!</p>
                            </div>
                            <button className="btn btn-sm btn-white btn-icon d-flex align-items-center mb-0 ms-md-auto mb-sm-0 mb-2 me-2" type="button">
                  <span className="btn-inner--icon">
                    <span className="p-1 bg-success rounded-circle d-flex ms-auto me-2">
                      <span className="visually-hidden">New</span>
                    </span>
                  </span>
                                <span className="btn-inner--text">Messages</span>
                            </button>
                            <button className="btn btn-sm btn-dark btn-icon d-flex align-items-center mb-0" type="button">
                  <span className="btn-inner--icon">
                    <svg className="d-block me-2" fill="none" height="16" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                                <span className="btn-inner--text">Sync</span>
                            </button>
                        </div>
                    </Col>
                </Row>
                <hr className="my-0" />
                <Row>
                    <Col xs={12} className="position-relative overflow-hidden">
                        <CardSwiper />
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <MainContent />
                    </Col>
                </Row>
            </Container>
        </main>
        </body>
    );
};

export default Dashboard;
