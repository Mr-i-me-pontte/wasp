import React from "react";
import { Outlet } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Header from "../Header";

const Layout = () => {
  return (
      <div>
        <Header />
        {/*<Container fluid className="layout-container">*/}
          <Row>
            <Col className="content-container">
              <Outlet />
            </Col>
          </Row>
        {/*</Container>*/}
      </div>
  );
};

export default Layout;
