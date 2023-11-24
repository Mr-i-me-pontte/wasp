import React from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { orderBook, orderHistory, tokens } from "./sampleData";
import "./styles.scss";
import TradingViewWidget from "react-tradingview-widget";

const TableRow = ({ rowData }) => (
  <tr>
    {Object.values(rowData).map((value, index) => (
      <td key={index}>{value}</td>
    ))}
  </tr>
);

const Graph = () => (
  <Col className="text-center" md={6}>
    <h3>Graph</h3>
    <Row className="p-3 h-50">
      <TradingViewWidget
        symbol="BINANCE:BTCUSDT"
        interval="D"
        theme="dark"
        autosize
      />
    </Row>
  </Col>
);

const TableComponent = ({ title, data, columns, size = 3 }) => (
  <Col className="text-center" md={size}>
    <div className="p-3">
      {title && <h3>{title}</h3>}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={col}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>{data}</tbody>
      </Table>
    </div>
  </Col>
);

const Home = () => (
  <Container fluid className="w-100">
    <Row>
      <Col>
        <h1 className="text-center">Hello World Dapp Home</h1>
      </Col>
    </Row>
    <Row
      className="d-flex main-content-container py-5 mb-5"
      style={{ height: "75vh !important" }}
    >
      <TableComponent
        title="Token List"
        columns={["Token Symbol", "Token Value", "Token Variation %"]}
        data={tokens.map((token, index) => (
          <TableRow key={token.symbol + index} rowData={token} />
        ))}
      />
      <Graph />
      <TableComponent
        title="Order Book"
        columns={["Price", "Quantity"]}
        size={2}
        data={orderBook.map((entry, index) => (
          <TableRow key={entry.price + index} rowData={entry} />
        ))}
      />
    </Row>
    <Row>
      <TableComponent
        columns={["Order ID", "Price", "Quantity", "Status"]}
        size={12}
        data={orderHistory.map((entry, index) => (
          <TableRow key={entry.orderId} rowData={entry} />
        ))}
      />
    </Row>
  </Container>
);

// const Graph = () => (
//   <Col className="text-center" md={6}>
//     <h3>Graph</h3>
//     <Row className="p-3 h-50">
//       <TradingViewWidget
//         symbol="BINANCE:BTCUSDT"
//         interval="D"
//         theme="dark"
//         autosize
//       />
//     </Row>
//   </Col>
// );

export default Home;
