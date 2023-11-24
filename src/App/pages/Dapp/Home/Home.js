import React, { useState } from "react";
import {
  Card,
  Col,
  Container,
  FormControl,
  InputGroup,
  Row,
  Table
} from "react-bootstrap";
import TradingViewWidget from "react-tradingview-widget";
import { orderBook, orderHistory, tokens } from "./sampleData";
import TableComponent from "./components/TableComponent";
import { FullTable, TokenListItemCollection } from "../../../../ui-components";
import TokenTable from "./components/TokenTable";
// import TokenTable from "./components/TokenTable";

const TradingDashboard = () => {
  // State to manage input values
  const [tokenValue, setTokenValue] = useState("");
  const [amountToPurchase, setAmountToPurchase] = useState("");

  return (
    <Container fluid>
      <Row className="mt-1">
        <Col md={3}>
          <Card>
            <TokenListItemCollection
              searchLabel="Search Tokens"
              isPaginated
              rowGap="1pt"
              itemsPerPage={12}
              data={tokens}
            />
            {/*<TokenList/>*/}
          </Card>
        </Col>
        <Col md={7} className="pt-3">
          <Card className="p-3 h-100">
            <TradingViewWidget
              symbol="BINANCE:BTCUSDT"
              interval="D"
              theme="dark"
              autosize
            />
            <Card>
              <Table>
                <Row>
                  <Col md={6}>
                    <InputGroup className="mb-3">
                      <InputGroup.Text id="tokenValueLabel">
                        Token Value
                      </InputGroup.Text>
                      <FormControl
                        type="number"
                        aria-label="Token Value"
                        aria-describedby="tokenValueLabel"
                        value={tokenValue}
                        onChange={(e) => setTokenValue(e.target.value)}
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroup.Text id="amountToPurchaseLabel">
                        Amount to Purchase
                      </InputGroup.Text>
                      <FormControl
                        type="number"
                        aria-label="Amount to Purchase"
                        aria-describedby="amountToPurchaseLabel"
                        value={amountToPurchase}
                        onChange={(e) => setAmountToPurchase(e.target.value)}
                      />
                    </InputGroup>
                  </Col>
                  <Col md={6}>
                    <InputGroup className="mb-3">
                      <InputGroup.Text id="tokenValueLabel">
                        Token Value
                      </InputGroup.Text>
                      <FormControl
                        type="number"
                        aria-label="Token Value"
                        aria-describedby="tokenValueLabel"
                        value={tokenValue}
                        onChange={(e) => setTokenValue(e.target.value)}
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroup.Text id="amountToPurchaseLabel">
                        Amount to Sell
                      </InputGroup.Text>
                      <FormControl
                        type="number"
                        aria-label="Amount to Purchase"
                        aria-describedby="amountToPurchaseLabel"
                        value={amountToPurchase}
                        onChange={(e) => setAmountToPurchase(e.target.value)}
                      />
                    </InputGroup>
                  </Col>
                </Row>
              </Table>
            </Card>
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
      <Row className="mt-4">
        <Col md={12}>
          {/*<FullTable />*/}
          <TokenTable
            title="Order History"
            columns={["Order ID", "Price", "Quantity", "Status"]}
            data={orderHistory}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default TradingDashboard;
