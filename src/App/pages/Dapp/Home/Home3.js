import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import TradingViewWidget from "react-tradingview-widget";
import { orderBook, orderHistory, tokens } from "./sampleData";
import TableComponent from "./components/TableComponent";

const TradingDashboard = () => (
  <Container fluid>
    <header className="bg-primary text-white text-center py-3">
      <h1>Hello World Dapp Home</h1>
    </header>
    <Row className="mt-4">
      <Col md={4}>
        <TableComponent
          title="Token List"
          columns={["Token Symbol", "Token Value", "Token Variation %"]}
          data={tokens}
        />
      </Col>
      <Col md={6}>
        <Card className="p-3">
          <h3>Graph</h3>
          <TradingViewWidget
            symbol="BINANCE:BTCUSDT"
            interval="D"
            theme="dark"
            autosize
          />
        </Card>
      </Col>
      <Col md={2}>
        <TableComponent
          title="Order Book"
          columns={["Price", "Quantity"]}
          data={orderBook}
        />
      </Col>
    </Row>
    <Row className="mt-5">
      <Col md={12}>
        <TableComponent
          title="Order History"
          columns={["Order ID", "Price", "Quantity", "Status"]}
          data={orderHistory}
        />
      </Col>
    </Row>
  </Container>
);

export default TradingDashboard;
